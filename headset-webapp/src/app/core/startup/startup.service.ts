import { Inject, Injectable, Injector }                                 from '@angular/core';
import { HttpClient }                                                   from '@angular/common/http';
import { zip }                                                          from 'rxjs';
import { catchError }                                                   from 'rxjs/operators';
import { ALAIN_I18N_TOKEN, MenuService, SettingsService, TitleService } from '@delon/theme';
import { DA_SERVICE_TOKEN, ITokenService }                              from '@delon/auth';
import { ACLService }                                                   from '@delon/acl';
import { TranslateService }                                             from '@ngx-translate/core';
import { I18NService }                                                  from '../i18n/i18n.service';

import { NzIconService }  from 'ng-zorro-antd/icon';
import { ICONS_AUTO }     from '../../../style-icons-auto';
import { ICONS }          from '../../../style-icons';
import { AccountService } from "@core/auth/account.service";
import { ArrayService }   from "@delon/util";

/**
 * Used for application startup
 * Generally used to get the basic data of the application, like: Menu Data, User Data, etc.
 */
@Injectable()
export class StartupService
{
    constructor(
        iconSrv: NzIconService,
        private menuService: MenuService,
        private translate: TranslateService,
        @Inject(ALAIN_I18N_TOKEN) private i18n: I18NService,
        private settingService: SettingsService,
        private aclService: ACLService,
        private titleService: TitleService,
        @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
        private httpClient: HttpClient,
        private arraySrv: ArrayService,
        private injector: Injector
    )
    {
        iconSrv.addIcon(...ICONS_AUTO, ...ICONS);
        iconSrv.fetchFromIconfont({
            scriptUrl: 'https://at.alicdn.com/t/font_1107796_ivuqz6a05s.js'
        })
    }

    private viaHttp( resolve: any, reject: any )
    {
        zip(
            this.httpClient.get(`assets/tmp/i18n/${ this.i18n.defaultLang }.json`),
            this.httpClient.get('app/config'),
            // this.injector.get(AccountService).fetch()
        ).pipe(
            catchError(( [ langData, appData ] ) =>
            {
                resolve(null);
                return [ langData, appData ];
            })
        ).subscribe(( [ langData, appData ] ) =>
            {
                // Setting language data
                this.translate.setTranslation(this.i18n.defaultLang, langData);
                this.translate.setDefaultLang(this.i18n.defaultLang);

                // Application data
                const res: any = appData;
                // Application information: including site name, description, year
                this.settingService.setApp(res.app);
                // User information: including name, avatar, email address
                this.injector.get(AccountService).identity().then(account =>
                {
                    console.log(account);
                    if ( account )
                        this.settingService.setUser({
                            ...account,
                            name  : account.nickName,
                            avatar: account.imageUrl,
                        });
                });
                // this.settingService.setUser({
                //     ...account,
                //     name  : account.nickName,
                //     avatar: account.imageUrl,
                // });
                // ACL: Set the permissions to full, https://ng-alain.com/acl/getting-started
                // this.aclService.setRole(account.authorities);
                this.aclService.setFull(true);
                const menus = this.arraySrv.arrToTree(res.menus);
                console.log(menus);
                this.menuService.add(menus);
                // Can be set page suffix title, https://ng-alain.com/theme/title
                this.titleService.suffix = res.siteName;
            },
            () =>
            {
            },
            () =>
            {
                resolve(null);
            });
    }

    load(): Promise<any>
    {
        return new Promise(( resolve, reject ) =>
        {
            this.viaHttp(resolve, reject);
        });
    }
}

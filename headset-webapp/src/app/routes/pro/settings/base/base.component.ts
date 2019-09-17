import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { _HttpClient }                                                   from '@delon/theme';
import { NzMessageService }                                              from 'ng-zorro-antd';
import { AccountService }                                                from "@core/auth/account.service";
import { IUser }                                                         from "@core/user/user.model";

@Component({
    selector       : 'app-account-settings-base',
    templateUrl    : './base.component.html',
    styleUrls      : [ './base.component.less' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProAccountSettingsBaseComponent implements OnInit
{

    constructor( private http: _HttpClient,
                 private cdr: ChangeDetectorRef,
                 private msg: NzMessageService,
                 private accountSrv: AccountService )
    {
    }

    avatar = '';
    userLoading = true;
    user: IUser;

    // #region geo

    provinces: any[] = [];
    cities: any[] = [];

    ngOnInit(): void
    {
        this.accountSrv.identity().then(value =>
        {
            console.log(value);
            this.user = value;
            this.cdr.detectChanges();
        });
        // zip(this.http.get('/user/current'), this.http.get('/geo/province')).subscribe(([user, province]: any) =>
        // {
        //   this.userLoading = false;
        //   this.user        = user;
        //   this.provinces   = province;
        //   this.choProvince(user.geographic.province.key, false);
        //   this.cdr.detectChanges();
        // });
    }

    choProvince( pid: string, cleanCity = true )
    {
        // this.http.get(`/geo/${pid}`).subscribe((res: any) =>
        // {
        //   this.cities = res;
        //   if (cleanCity) this.user.geographic.city.key = '';
        //   this.cdr.detectChanges();
        // });
    }

    // #endregion

    save()
    {
        this.msg.success(JSON.stringify(this.user));
        return false;
    }
}

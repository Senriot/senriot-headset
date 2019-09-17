import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router }                                                        from '@angular/router';
import { SettingsService }                                               from '@delon/theme';
import { AccountService }                                                from "@core/auth/account.service";
import { LoginService }                                                  from "@core/login/login.service";

@Component({
    selector       : 'header-user',
    template       : `
        <div
                class="alain-default__nav-item d-flex align-items-center px-sm"
                nz-dropdown
                nzPlacement="bottomRight"
                [nzDropdownMenu]="userMenu"
        >
            <nz-avatar
                    nzSize="small"
                    nzShape="square"
                    [ngStyle]="{ 'background-color': '#505ae2' }"
                    [nzText]="settings.user.name.substr(0,1)"
                    class="mr-sm"></nz-avatar>
            {{ settings.user.name }}
        </div>
        <nz-dropdown-menu #userMenu="nzDropdownMenu">
            <div nz-menu
                 class="width-sm">
                <!--        <div nz-menu-item-->
                <!--             routerLink="/pro/account/center">-->
                <!--          <i nz-icon-->
                <!--             nzType="user"-->
                <!--             class="mr-sm"></i>-->
                <!--          {{ 'menu.account.center' | translate }}-->
                <!--        </div>-->
                <div nz-menu-item
                     routerLink="/pro/settings">
                    <i nz-icon
                       nzType="setting"
                       class="mr-sm"></i>
                    {{ 'menu.account.settings' | translate }}
                </div>
                <!--        <div nz-menu-item-->
                <!--             routerLink="/exception/trigger">-->
                <!--          <i nz-icon-->
                <!--             nzType="close-circle"-->
                <!--             class="mr-sm"></i>-->
                <!--          {{ 'menu.account.trigger' | translate }}-->
                <!--        </div>-->
                <li nz-menu-divider></li>
                <div nz-menu-item
                     (click)="logout()">
                    <i nz-icon
                       nzType="logout"
                       class="mr-sm"></i>
                    {{ 'menu.account.logout' | translate }}
                </div>
            </div>
        </nz-dropdown-menu>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderUserComponent implements OnInit
{
    constructor(
        public settings: SettingsService,
        private router: Router,
        private loginService: LoginService
    )
    {
    }


    logout()
    {
        // this.store.dispatch( LogoutStart() );
        this.loginService.logout();
        this.router.navigateByUrl('/passport/login');
    }

    ngOnInit(): void
    {
        // this.accountService.identity().then(value => {
        //   this.settings.setUser({
        //     ...value,
        //     avatar: value.imageUrl,
        //     name: value.firstName,
        //   });
        //   this.cdr.detectChanges()
        // })
    }
}

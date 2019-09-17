import { SettingsService }                                from '@delon/theme';
import { Component, Inject, OnDestroy, OnInit, Optional } from '@angular/core';
import { Router }                                         from '@angular/router';
import { FormBuilder, FormGroup, Validators }             from '@angular/forms';
import { NzMessageService, NzModalService }               from 'ng-zorro-antd';
import { ReuseTabService }                                from '@delon/abc';
import { StartupService }                                 from '@core';
import { DA_SERVICE_TOKEN, ITokenService }                from '@delon/auth';
import { LoginService }                                   from "@core/login/login.service";
import { AccountService }                                 from "@core/auth/account.service";

@Component({
    selector   : 'passport-login',
    templateUrl: './login.component.html',
    styleUrls  : [ './login.component.less' ],
})
export class UserLoginComponent implements OnInit, OnDestroy
{

    constructor(
        fb: FormBuilder,
        modalSrv: NzModalService,
        private router: Router,
        private settingsService: SettingsService,
        @Optional()
        @Inject(ReuseTabService)
        private reuseTabService: ReuseTabService,
        private startupSrv: StartupService,
        public msg: NzMessageService,
        private loginSrv: LoginService,
        private accountSrv: AccountService,
        @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    )
    {
        this.form = fb.group({
            userName: [ null, [ Validators.required, Validators.minLength(4) ] ],
            password: [ null, Validators.required ],
            mobile  : [ null, [ Validators.required, Validators.pattern(/^1\d{10}$/) ] ],
            captcha : [ null, [ Validators.required ] ],
            remember: [ false ],
        });
        modalSrv.closeAll();
    }

    // #region fields

    get userName()
    {
        return this.form.controls.userName;
    }

    get password()
    {
        return this.form.controls.password;
    }

    get mobile()
    {
        return this.form.controls.mobile;
    }

    get captcha()
    {
        return this.form.controls.captcha;
    }

    get rememberMe()
    {
        return this.form.controls.remember;
    }

    form: FormGroup;
    type = 0;


    count = 0;
    interval$: any;

    // #endregion

    switch( ret: any )
    {
        this.type = ret.index;
    }

    getCaptcha()
    {
        if ( this.mobile.invalid )
        {
            this.mobile.markAsDirty({ onlySelf: true });
            this.mobile.updateValueAndValidity({ onlySelf: true });
            return;
        }
        this.count = 59;
        this.interval$ = setInterval(() =>
        {
            this.count -= 1;
            if ( this.count <= 0 )
            {
                clearInterval(this.interval$);
            }
        }, 1000);
    }

    // #endregion

    submit()
    {
        if ( this.type === 0 )
        {
            this.userName.markAsDirty();
            this.userName.updateValueAndValidity();
            this.password.markAsDirty();
            this.password.updateValueAndValidity();
            if ( this.userName.invalid || this.password.invalid )
            {
                return;
            }
        }
        else
        {
            this.mobile.markAsDirty();
            this.mobile.updateValueAndValidity();
            this.captcha.markAsDirty();
            this.captcha.updateValueAndValidity();
            if ( this.mobile.invalid || this.captcha.invalid )
            {
                return;
            }
        }

        this.loginSrv.login({
            username  : this.userName.value,
            password  : this.password.value,
            rememberMe: this.rememberMe.value,
        }, v =>
        {
            console.log(v);
            if ( !v )
            {
                this.startupSrv.load().then(value =>
                {
                    const url = this.tokenService.referrer.url ? this.tokenService.referrer.url : '/';
                    this.router.navigateByUrl(url);
                });
            }
        }).catch(err => this.msg.error(err.error.detail));
        // this.store.dispatch( LoginStart( {
        //   credentials: {
        //     username: this.userName.value,
        //     password: this.password.value,
        //     rememberMe: this.rememberMe.value,
        //   },
        // } ) );
    }


    // #endregion

    ngOnDestroy(): void
    {
        if ( this.interval$ )
        {
            clearInterval(this.interval$);
        }
    }

    ngOnInit(): void
    {
        if ( this.accountSrv.isAuthenticated() )
        {
            const url = this.tokenService.referrer.url ? this.tokenService.referrer.url : '/';
            this.router.navigateByUrl(url);
        }
        // this.store.pipe(takeUntil(this.ngDestroy), select(selectIsAuthenticated)).subscribe(value =>
        // {
        //   if (value)
        //     this.startupSrv.load().then(() =>
        //     {
        //       this.router.navigateByUrl('/');
        //     });
        // });
    }

    open( github: string, window1: string )
    {

    }
}

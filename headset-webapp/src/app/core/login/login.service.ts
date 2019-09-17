import { Injectable }         from '@angular/core';
import { AccountService }     from "@core/auth/account.service";
import { AuthServerProvider } from "@core/auth/auth-jwt.service";
import { TrackerService }     from "@core/tracker/tracker.service";

    @Injectable({ providedIn: 'root' })
    export class LoginService
{
    constructor(
        private accountService: AccountService,
        private trackerService: TrackerService,
        private authServerProvider: AuthServerProvider
    )
    {
    }
    
    login( credentials, callback? )
    {
        // tslint:disable-next-line:only-arrow-functions
        const cb = callback || function ()
        {
        };
        return new Promise(( resolve, reject ) =>
        {
            this.authServerProvider.login(credentials).subscribe(
                data =>
                {
                    this.accountService.identity(true).then(account =>
                    {
                        this.trackerService.sendActivity();
                        resolve(data);
                    });
                    return cb();
                },
                err =>
                {
                    this.logout();
                    reject(err);
                    return cb(err);
                }
            );
        });
    }
    
    loginWithToken( jwt, rememberMe )
    {
        return this.authServerProvider.loginWithToken(jwt, rememberMe);
    }
    
    logout()
    {
        this.authServerProvider.logout().subscribe(null, null, () =>
            this.accountService.authenticate(null));
    }
}

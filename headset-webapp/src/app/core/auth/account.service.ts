import { Injectable }          from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { TranslateService }    from "@ngx-translate/core";
import { Account }             from "@core/user/account.model";
import { _HttpClient }         from "@delon/theme";
import { TrackerService }      from "@core/tracker/tracker.service";


@Injectable({ providedIn: 'root' })
export class AccountService
{
    private userIdentity: any;
    private authenticated = false;
    private authenticationState = new Subject<any>();

    constructor(
        private http: _HttpClient,
        private trackerService: TrackerService,
        private translate: TranslateService,
    )
    {
    }

    fetch(): Observable<Account>
    {
        return this.http.get<Account>('api/account');
    }

    save( account: any ): Observable<any>
    {
        return this.http.post('api/account', account);
    }

    authenticate( identity )
    {
        this.userIdentity = identity;
        this.authenticated = identity !== null;
        this.authenticationState.next(this.userIdentity);
    }

    hasAnyAuthority( authorities: string[] ): boolean
    {
        if ( !this.authenticated || !this.userIdentity || !this.userIdentity.authorities )
        {
            return false;
        }

        for (const auth of authorities)
        {
            if ( this.userIdentity.authorities.includes(auth) )
            {
                return true;
            }
        }

        return false;
    }

    hasAuthority( authority: string ): Promise<boolean>
    {
        if ( !this.authenticated )
        {
            return Promise.resolve(false);
        }

        return this.identity().then(
            id =>
            {
                return Promise.resolve(id.authorities && id.authorities.includes(authority));
            },
            () =>
            {
                return Promise.resolve(false);
            }
        );
    }

    identity( force?: boolean ): Promise<Account>
    {
        if ( force )
        {
            this.userIdentity = undefined;
        }

        // check and see if we have retrieved the userIdentity data from the server.
        // if we have, reuse it by immediately resolving
        if ( this.userIdentity )
        {
            return Promise.resolve(this.userIdentity);
        }

        // retrieve the userIdentity data from the server, update the identity object, and then resolve.
        return this.fetch()
            .toPromise()
            .then(account =>
            {
                if ( account )
                {
                    this.userIdentity = account;
                    this.authenticated = true;
                    this.trackerService.connect();
                    // After retrieve the account info, the language will be changed to
                    // the user's preferred language configured in the account setting
                    if ( this.userIdentity.langKey )
                    {
                        this.translate.setDefaultLang(this.userIdentity.langKey);
                    }
                }
                else
                {
                    this.userIdentity = null;
                    this.authenticated = false;
                }
                this.authenticationState.next(this.userIdentity);
                return this.userIdentity;
            })
            .catch(err =>
            {
                console.error(err);
                if ( this.trackerService.stompClient && this.trackerService.stompClient.connected )
                {
                    this.trackerService.disconnect();
                }
                this.userIdentity = null;
                this.authenticated = false;
                this.authenticationState.next(this.userIdentity);
                return null;
            });
    }

    isAuthenticated(): boolean
    {
        return this.authenticated;
    }

    isIdentityResolved(): boolean
    {
        return this.userIdentity !== undefined;
    }

    getAuthenticationState(): Observable<any>
    {
        return this.authenticationState.asObservable();
    }

    getImageUrl(): string
    {
        return this.isIdentityResolved() ? this.userIdentity.imageUrl : null;
    }
}

import { Inject, Injectable }              from '@angular/core';
import { HttpClient }                      from '@angular/common/http';
import { Observable }                      from 'rxjs';
import { map }                             from 'rxjs/operators';
import { DA_SERVICE_TOKEN, ITokenService } from "@delon/auth";


@Injectable({ providedIn: 'root' })
export class AuthServerProvider
{
    constructor( private http: HttpClient, @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService, )
    {
    }
    
    getToken()
    {
        return this.tokenService.get().token
    }
    
    login( credentials ): Observable<any>
    {
        const data = {
            username  : credentials.username,
            password  : credentials.password,
            rememberMe: credentials.rememberMe
        };
        return this.http.post('api/authenticate', data, { observe: 'response' }).pipe(map(authenticateSuccess.bind(this)));
        
        function authenticateSuccess( resp )
        {
            const bearerToken = resp.headers.get('Authorization');
            if ( bearerToken && bearerToken.slice(0, 7) === 'Bearer ' )
            {
                const jwt = bearerToken.slice(7, bearerToken.length);
                this.storeAuthenticationToken(jwt, credentials.rememberMe);
                return jwt;
            }
        }
    }
    
    loginWithToken( jwt, rememberMe )
    {
        if ( jwt )
        {
            this.storeAuthenticationToken(jwt, rememberMe);
            return Promise.resolve(jwt);
        }
        else
        {
            return Promise.reject('auth-jwt-service Promise reject'); // Put appropriate error message here
        }
    }
    
    storeAuthenticationToken( jwt, rememberMe )
    {
        this.tokenService.set({ token: jwt });
    }
    
    logout(): Observable<any>
    {
        return new Observable(observer =>
        {
            this.tokenService.clear();
            observer.complete();
        });
    }
}

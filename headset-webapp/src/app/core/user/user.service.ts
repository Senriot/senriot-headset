import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IUser }       from './user.model';
import { BaseService } from "@shared/service/base.service";

@Injectable({ providedIn: 'root' })
export class UserService extends BaseService<IUser>
{
    public resourceUrl = 'api/users';
    
    authorities(): Observable<string[]>
    {
        return this.http.get<string[]>('api/users/authorities');
    }
}

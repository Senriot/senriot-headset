import {Injectable} from '@angular/core';
import {IMenu} from "@shared/model/menu.model";
import {BaseService} from "@shared/service/base.service";
import {IRole} from "@shared/model/role.model";
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class RoleService extends BaseService<IRole> {
  public resourceUrl = 'api/roles';

  updatePermission(role: IRole, menus: number[]): Observable<IRole> {
    return this.http.put(`${this.resourceUrl}/permission/${role.id}`, menus)
  }
}

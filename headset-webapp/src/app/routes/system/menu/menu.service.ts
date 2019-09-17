import {Injectable} from '@angular/core';
import {IMenu} from "@shared/model/menu.model";
import {BaseService} from "@shared/service/base.service";

@Injectable({providedIn: 'root'})
export class MenuService extends BaseService<IMenu> {
  public resourceUrl = 'api/menus';
}

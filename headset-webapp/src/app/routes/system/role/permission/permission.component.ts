import {Component, Input, OnInit} from '@angular/core';
import {NzDrawerRef, NzFormatEmitEvent, NzMessageService} from 'ng-zorro-antd';
import {ArrayService} from '@delon/util';
import {_HttpClient} from '@delon/theme';
import {Observable} from 'rxjs';
import {IRole} from "@shared/model/role.model";
import {MenuService} from "../../menu/menu.service";
import {RoleService} from "../role.service";

@Component({
  selector: 'app-user-manager-roles-permission',
  templateUrl: './permission.component.html',
})
export class RolesPermissionComponent implements OnInit {

  @Input()
  record: IRole;

  isLoading$;

  treeNodes;

  menuIds$: Observable<number[]>;

  constructor(private arrayService: ArrayService,
              private msgSrv: NzMessageService,
              private http: _HttpClient,
              private menuService: MenuService,
              private modal: NzDrawerRef,
              private roleService: RoleService) {
    this.menuService.loadAll({sort: 'sortOrder,asc'}).subscribe(value => {
      this.treeNodes = this.arrayService.arrToTreeNode(value, {titleMapName: 'text'})
    })
    // this.isLoading$ = this.store.select(roleLoading).pipe(takeUntil(this.ngDestroy));
    // // this.treeNodes = this.menuFacade.treeNodes().pipe(takeUntil(this.ngDestroy));
    // this.treeNodes  = this.store.select(menu).pipe(takeUntil(this.ngDestroy), map(value => {
    //   if (value && value.length > 0)
    //     return this.arrayService.arrToTreeNode(deepCopy(value), {
    //       titleMapName: 'text',
    //     });
    //   else return [];
    // }));
  }

  ngOnInit() {
    // this.menuFacade.total.pipe(first()).subscribe(value => value <= 0 ? this.menuFacade.loadAll() : 0);
    // this.store.select(menuTotal).pipe(first()).subscribe(value => value <= 0 ? this.store.dispatch(LoadMenuAll()) : 0);
    // this.menuIds$ = this.http.get<Array<number>>('api/roles/menus/' + this.record.id);
  }

  onChecked(e: NzFormatEmitEvent) {
   this.record.menus = e.keys
  }

  cancel() {

  }

  save(nodes: any) {
    console.log(this.record);
    this.roleService.update(this.record).subscribe(() => this.modal.close(true))
    // this.roleService.updatePermission(this.record, keys).subscribe(() => this.modal.close(true))
    // this.http.post(`api/roles/${this.record.id}`, keys).subscribe(value => {
    //
    //   return this.msgSrv.success('权限保存成功');
    // }, err => this.msgSrv.error('保存失败'));
    // console.log(keys);
    // this.record.menus = keys;
    // this.roleFacade.update(this.record);
  }

}

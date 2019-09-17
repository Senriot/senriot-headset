import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ModalHelper} from '@delon/theme';
import {STChange, STColumn, STComponent, STPage} from '@delon/abc';
import {SFComponent, SFSchema} from '@delon/form';
import {SystemRoleEditComponent} from './edit/edit.component';
import {Observable} from 'rxjs';
import {RolesPermissionComponent} from './permission/permission.component';
import {IRole, Role} from "@shared/model/role.model";
import {RoleService} from "./role.service";

@Component({
  selector: 'app-system-role',
  templateUrl: './role.component.html',
})
export class SystemRoleComponent implements OnInit, OnDestroy {
  selected?: any[] = [];
  @ViewChild('st', {static: true}) st: STComponent;
  @ViewChild('sf', {static: true}) sf: SFComponent;

  url: string;

  searchSchema: SFSchema = {
    properties: {
      name: {
        type: 'string',
        title: '角色标识',
      },
      roleName: {
        type: 'string',
        title: '名称',
      },
    },
  };

  columns: STColumn[] = [
    {title: '编号', index: 'id.value', type: 'checkbox'},
    {title: '#', type: 'no'},
    {title: '角色标识', index: 'name'},
    {title: '角色名称', index: 'roleName'},
    {title: '备注', index: 'description'},
    {title: '创建时间', type: 'date', index: 'createdDate'},
    {title: '更新时间', type: 'date', index: 'lastModifiedDate'},
    {
      title: '操作',
      buttons: [
        {
          text: '编辑',
          type: 'static',
          modal: {
            component: SystemRoleEditComponent,
            params: record => ({record, isEdit: true}),
            size: 'md',
          },
          click: "reload"
        },
        {
          text: '删除', type: 'del', click: (record: any) => {
            // this.roleFacade.delete(record);
            // this.store.dispatch(DeleteRole(record));
            this.service.delete(record.id).subscribe(() => this.st.reload())
          },
        },
        {
          text: '权限',
          type: 'drawer',
          drawer: {
            title: '角色权限',
            component: RolesPermissionComponent,
          },
          click: "reload"
        },
      ],
    },

  ];
  page: STPage = {
    show: false
  };


  constructor(private modal: ModalHelper, public service: RoleService) {
    this.url = service.resourceUrl + "/list"
  }

  ngOnInit() {
  }

  add() {
    this.modal
      .createStatic(SystemRoleEditComponent, {record: new Role()}, {size: 'md'})
      .subscribe(() => this.st.reload());
  }

  change(e: STChange) {

  }

  deleteMany() {

  }

  ngOnDestroy(): void {
  }
}

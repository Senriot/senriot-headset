import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ModalHelper }                                                from '@delon/theme';
import { STChange, STColumn, STComponent }                            from '@delon/abc';
import { SFComponent, SFSchema }                                      from '@delon/form';
import { SystemUserViewComponent }                                    from './view/view.component';
import { userStatus }                                                 from './index';
import { SystemUserEditComponent }                                    from './edit/edit.component';
import { UserService }                                                from "@core/user/user.service";
import { IUser, User }                                                from "@core/user/user.model";

@Component({
    selector   : 'app-system-user',
    templateUrl: './user.component.html',
})
export class SystemUserComponent implements OnInit, OnDestroy
{
    searchSchema: SFSchema = {
        properties: {
            login   : {
                type : 'string',
                title: '账号',
            },
            nickName: {
                type : 'string',
                title: '名称',
            },
            phone   : {
                type : 'string',
                title: '手机号',
            },
            email   : {
                type : 'string',
                title: '邮箱',
            },
        },
    };
    @ViewChild('sf', { static: true }) sf: SFComponent;
    @ViewChild('st', { static: true }) st: STComponent;
    columns: STColumn[] = [
        { title: '编号', index: 'id', type: 'checkbox' },
        { title: '头像', width: '60px', render: 'custom' },
        { title: '用户账号', index: 'login' },
        { title: '用户名称', index: 'nickName' },
        {
            title : '性别', index: 'sex', filter: {
                multiple: false,
                menus: [
                    { text: '男', value: '1' },
                    { text: '女', value: '2' },
                    { text: '未知', value: '3' },
                ],
            },
            format: (item =>
            {
                switch (item.sex)
                {
                    case 1:
                        return '男';
                    case 2:
                        return '女';
                    default:
                        return '未知';
                }
            }),
        },
        { title: '生日', index: 'birthday', type: 'date', dateFormat: 'YYYY-MM-DD' },
        { title: '手机号', index: 'phone' },
        { title: '邮箱', index: 'email' },
        { title: '状态', index: 'status', type: 'tag', tag: userStatus, default: '0' },
        {
            title: '创建时间',
            type : 'date',
            index: 'createdDate',
            sort : { default: 'descend', reName: { ascend: 'asc', descend: 'desc' } },
        },
        {
            title  : '操作',
            buttons: [
                {
                    text: '查看', type: 'drawer', drawer: {
                        title    : '用户详情',
                        component: SystemUserViewComponent,
                    },
                    icon: 'eye',
                },
                {
                    text : '权限',
                    icon : 'edit',
                    type : 'static',
                    acl  : {
                        ability: [ 'user-edit' ],
                    },
                    modal: {
                        component: SystemUserEditComponent,
                        params   : record => ({ record }),
                    },
                },
                {
                    text : '编辑',
                    icon : 'edit',
                    type : 'static',
                    acl  : {
                        ability: [ 'user-edit' ],
                    },
                    modal: {
                        component: SystemUserEditComponent,
                        params   : record => ({ record }),
                    },
                    click: "reload"
                },
                {
                    text : '删除',
                    icon : 'delete',
                    type : 'del',
                    acl  : {
                        ability: [ 'user-del' ],
                    },
                    click: ( item: IUser ) => this.userSrv.delete(item.id).subscribe(() => this.st.reload()),
                },
            ],
        },
    ];

    selectedRows: any[] = [];

    url: string;

    constructor( private modal: ModalHelper,
                 private cdr: ChangeDetectorRef,
                 private userSrv: UserService )
    {
        this.url = userSrv.resourceUrl + "/page"
    }

    ngOnInit()
    {
    }

    add()
    {
        this.modal
            .createStatic(SystemUserEditComponent, { record: new User() })
            .subscribe(() => this.st.reload());
    }

    export()
    {
        // this.userSrv.exportXls().subscribe(res => {
        //   const blob = new Blob([res], {type: 'application/vnd.ms-excel'});
        //   const fileName = '用户列表' + '.xlsx';
        //
        //   const objectUrl = URL.createObjectURL(blob);
        //   const a = document.createElement('a');
        //   document.body.appendChild(a);
        //   a.setAttribute('style', 'display:none');
        //   a.setAttribute('href', objectUrl);
        //   a.setAttribute('download', fileName);
        //   a.click();
        //   URL.revokeObjectURL(objectUrl);
        // });
    }

    onChanged( change: STChange )
    {
        switch (change.type)
        {
            case 'checkbox':
                this.selectedRows = change.checkbox!;
                this.cdr.detectChanges();
                break;
            case 'pi':
                break;
        }
    }

    deleteMany( selectedRows: any[] )
    {
        // this.userSrv.deleteMany(selectedRows);
    }

    ngOnDestroy(): void
    {
    }
}

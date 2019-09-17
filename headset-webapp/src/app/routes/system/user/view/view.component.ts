import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NzDrawerRef }                         from 'ng-zorro-antd';
import { userStatus }                          from '..';
import { Observable }                          from 'rxjs';
import { IUser }                               from "@core/user/user.model";
import { IRole }                               from "@shared/model/role.model";
import { RoleService }                         from "../../role/role.service";

@Component({
    selector   : 'app-system-user-view',
    templateUrl: './view.component.html',
})
export class SystemUserViewComponent implements OnInit, OnDestroy
{
    
    @Input()
    record: IUser;
    loading: any;
    
    userStatus = userStatus;
    
    sex = {
        1: { text: '男' },
        2: { text: '女' },
        3: { text: '未知' },
    };
    roles$: Observable<IRole[]>;
    
    constructor(
        private ref: NzDrawerRef,
        private roleService: RoleService
    )
    {
        this.roles$ = roleService.loadAll()
    }
    
    ngOnInit(): void
    {
    }
    
    close()
    {
    }
    
    findRole( roles: IRole[], role: string )
    {
        const r = roles.find(value => value.id === role);
        return r ? r.roleName : '-';
    }
    
    ngOnDestroy(): void
    {
    }
}

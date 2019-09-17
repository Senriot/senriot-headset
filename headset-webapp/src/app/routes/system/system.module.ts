import { NgModule }                   from '@angular/core';
import { SharedModule }               from '@shared';
import { SystemRoutingModule }        from './system-routing.module';
import { SystemUserComponent }        from './user/user.component';
import { SystemUserEditComponent }    from './user/edit/edit.component';
import { SystemUserViewComponent }    from './user/view/view.component';
import { SystemRoleComponent }        from './role/role.component';
import { SystemRoleEditComponent }    from './role/edit/edit.component';
import { SystemMenuComponent }        from './menu/menu.component';
import { SystemMenuEditComponent }    from './menu/edit/edit.component';
import { RolesPermissionComponent }   from './role/permission/permission.component';
import { SystemMenuAddTypeComponent } from './menu/add-type/add-type.component';
import { SystemMenuAddComponent }     from './menu/add/add.component';
import { DatePipe }                   from "@angular/common";

const COMPONENTS = [
    SystemUserComponent,
    SystemRoleComponent,
    SystemMenuComponent, ];
const COMPONENTS_NOROUNT = [
    SystemUserEditComponent,
    SystemUserViewComponent,
    SystemRoleEditComponent,
    RolesPermissionComponent,
    SystemMenuEditComponent,
    SystemMenuAddTypeComponent,
    SystemMenuAddComponent ];

@NgModule({
    imports        : [
        SharedModule,
        SystemRoutingModule,
    ],
    providers      : [ DatePipe ],
    declarations   : [
        ...COMPONENTS,
        ...COMPONENTS_NOROUNT,
    ],
    entryComponents: COMPONENTS_NOROUNT,
})
export class SystemModule
{
}

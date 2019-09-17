import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SystemUserComponent} from './user/user.component';
import {SystemRoleComponent} from './role/role.component';
import {SystemMenuComponent} from './menu/menu.component';

const routes: Routes = [

  {path: 'users', component: SystemUserComponent},
  {path: 'roles', component: SystemRoleComponent},
  {path: 'menus', component: SystemMenuComponent},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SystemRoutingModule {
}

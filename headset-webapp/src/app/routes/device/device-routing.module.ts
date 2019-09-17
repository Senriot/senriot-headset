import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeviceListComponent }  from './list/list.component';
import { DeviceViewComponent }  from "./view/view.component";

const routes: Routes = [
    { path: '', component: DeviceListComponent },
    {
        path    : 'view/:id', component: DeviceViewComponent,
        data    : { title: '设备详情' }
    },
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class DeviceRoutingModule {}

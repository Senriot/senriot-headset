import { NgModule }                         from '@angular/core';
import { SharedModule }                     from '@shared';
import { DeviceRoutingModule }              from './device-routing.module';
import { DeviceListComponent }              from './list/list.component';
import { DeviceViewComponent }              from './view/view.component';
import { DeviceEditComponent }              from './edit/edit.component';
import { DeviceViewBonusComponent }         from './view/bonus/bonus.component';
import { DeviceViewReplenishmentComponent } from './view/replenishment/replenishment.component';
import { DeviceViewLogComponent }           from './view/log/log.component';
import { DeviceViewInfoComponent }          from './view/info/info.component';
import { ViewHostDirective }                from './view/view-host.directive';

const COMPONENTS = [
    DeviceListComponent ];
const COMPONENTS_NOROUNT = [
    DeviceViewComponent,
    DeviceViewInfoComponent,
    DeviceViewBonusComponent,
    DeviceViewReplenishmentComponent,
    DeviceViewLogComponent,
    DeviceEditComponent ];

@NgModule({
    imports        : [
        SharedModule,
        DeviceRoutingModule
    ],
    declarations   : [
        ...COMPONENTS,
        ...COMPONENTS_NOROUNT,
        ViewHostDirective
    ],
    entryComponents: COMPONENTS_NOROUNT
})
export class DeviceModule {}

import { NgModule }                from '@angular/core';
import { SharedModule }            from '@shared';
import { MonitorRoutingModule }    from './monitor-routing.module';
import { MonitorLogsComponent }    from './logs/logs.component';
import { MonitorTrackerComponent } from './tracker/tracker.component';
import { MonitorAuditsComponent }  from './audits/audits.component';

const COMPONENTS         = [
  MonitorLogsComponent,
  MonitorTrackerComponent,
  MonitorAuditsComponent];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports        : [
    SharedModule,
    MonitorRoutingModule,
  ],
  declarations   : [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT,
  ],
  entryComponents: COMPONENTS_NOROUNT,
})
export class MonitorModule {
}

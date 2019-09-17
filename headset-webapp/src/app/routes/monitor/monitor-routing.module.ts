import { NgModule }                from '@angular/core';
import { RouterModule, Routes }    from '@angular/router';
import { MonitorLogsComponent }    from './logs/logs.component';
import { MonitorTrackerComponent } from './tracker/tracker.component';
import { MonitorAuditsComponent }  from './audits/audits.component';

const routes: Routes = [

  { path: 'logs', component: MonitorLogsComponent },
  { path: 'tracker', component: MonitorTrackerComponent },
  { path: 'audits', component: MonitorAuditsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MonitorRoutingModule {
}

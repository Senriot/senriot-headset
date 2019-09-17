import { NgModule }                                from '@angular/core';
import { SharedModule }                            from '@shared';
import { ProRoutingModule }                        from './pro-routing.module';
import { ProAccountSettingsSecurityComponent }     from './settings/security/security.component';
import { ProAccountSettingsNotificationComponent } from './settings/notification/notification.component';
import { ProAccountSettingsBindingComponent }      from './settings/binding/binding.component';
import { ProAccountSettingsBaseComponent }         from './settings/base/base.component';
import { ProAccountSettingsComponent }             from './settings/settings.component';

const COMPONENTS         = [
  ProAccountSettingsComponent,
  ProAccountSettingsBaseComponent,
  ProAccountSettingsBindingComponent,
  ProAccountSettingsNotificationComponent,
  ProAccountSettingsSecurityComponent,
];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports        : [
    SharedModule,
    ProRoutingModule,
  ],
  declarations   : [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT,
  ],
  entryComponents: COMPONENTS_NOROUNT,
})
export class ProModule {
}

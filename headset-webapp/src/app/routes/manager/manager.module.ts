import { NgModule }                       from '@angular/core';
import { SharedModule }                   from '@shared';
import { ManagerRoutingModule }           from './manager-routing.module';
import { ManagerAdComponent }             from './ad/ad.component';
import { ManagerAdEditComponent }         from './ad/edit/edit.component';
import { ManagerAdViewComponent }         from './ad/view/view.component';
import { ManagerStoreComponent }          from './store/store.component';
import { ManagerStoreEditComponent }      from './store/edit/edit.component';
import { ManagerStoreViewComponent }      from './store/view/view.component';
import { ManagerFinanceComponent }        from './finance/finance.component';
import { ManagerFinanceEditComponent }    from './finance/edit/edit.component';
import { ManagerFinanceViewComponent }    from './finance/view/view.component';
import { ManagerAdScheduleComponent }     from './ad-schedule/ad-schedule.component';
import { ManagerAdScheduleEditComponent } from './ad-schedule/edit/edit.component';
import { ManagerAdScheduleViewComponent } from './ad-schedule/view/view.component';
import { ManagerOrderComponent }          from './order/order.component';
import { ManagerOrderEditComponent }      from './order/edit/edit.component';
import { ManagerOrderViewComponent }      from './order/view/view.component';
import { ManagerCashOutComponent }        from './cash-out/cash-out.component';
import { ManagerCashOutEditComponent }    from './cash-out/edit/edit.component';
import { ManagerCashOutViewComponent }    from './cash-out/view/view.component';
import { ManagerFileManagerComponent } from './file-manager/file-manager.component';
import { ManagerFileManagerEditComponent } from './file-manager/edit/edit.component';
import { ManagerFileManagerViewComponent } from './file-manager/view/view.component';
import { ManagerProductComponent } from './product/product.component';
import { ManagerProductEditComponent } from './product/edit/edit.component';
import { ManagerProductViewComponent } from './product/view/view.component';
import { ManagerAgencyComponent } from './agency/agency.component';
import { ManagerAgencyEditComponent } from './agency/edit/edit.component';
import { ManagerAgencyViewComponent } from './agency/view/view.component';

const COMPONENTS         = [
  ManagerAdComponent,
  ManagerStoreComponent,
  ManagerFinanceComponent,
  ManagerAdScheduleComponent,
  ManagerOrderComponent,
  ManagerCashOutComponent,
  ManagerFileManagerComponent,
  ManagerProductComponent,
  ManagerAgencyComponent];
const COMPONENTS_NOROUNT = [
  ManagerAdEditComponent,
  ManagerAdViewComponent,
  ManagerStoreEditComponent,
  ManagerStoreViewComponent,
  ManagerFinanceEditComponent,
  ManagerFinanceViewComponent,
  ManagerAdScheduleEditComponent,
  ManagerAdScheduleViewComponent,
  ManagerOrderEditComponent,
  ManagerOrderViewComponent,
  ManagerCashOutEditComponent,
  ManagerCashOutViewComponent,
  ManagerFileManagerEditComponent,
  ManagerFileManagerViewComponent,
  ManagerProductEditComponent,
  ManagerProductViewComponent,
  ManagerAgencyEditComponent,
  ManagerAgencyViewComponent];

@NgModule({
  imports        : [
    SharedModule,
    ManagerRoutingModule,
  ],
  declarations   : [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT,
  ],
  entryComponents: COMPONENTS_NOROUNT,
})
export class ManagerModule {
}

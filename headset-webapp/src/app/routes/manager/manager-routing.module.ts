import { NgModule }                    from '@angular/core';
import { RouterModule, Routes }        from '@angular/router';
import { ManagerAdComponent }          from './ad/ad.component';
import { ManagerStoreComponent }       from './store/store.component';
import { ManagerFinanceComponent }     from './finance/finance.component';
import { ManagerAdScheduleComponent }  from './ad-schedule/ad-schedule.component';
import { ManagerOrderComponent }       from './order/order.component';
import { ManagerCashOutComponent }     from './cash-out/cash-out.component';
import { ManagerFileManagerComponent } from './file-manager/file-manager.component';
import { ManagerProductComponent }     from './product/product.component';
import { ManagerAgencyComponent }      from './agency/agency.component';

const routes: Routes = [

    { path: 'ad', component: ManagerAdComponent },
    { path: 'store', component: ManagerStoreComponent },
    { path: 'finance', component: ManagerFinanceComponent },
    { path: 'ad-schedule', component: ManagerAdScheduleComponent },
    { path: 'order', component: ManagerOrderComponent },
    { path: 'cash-out', component: ManagerCashOutComponent },
    { path: 'file-manager', component: ManagerFileManagerComponent },
    { path: 'product', component: ManagerProductComponent },
    { path: 'agency', component: ManagerAgencyComponent } ];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ],
})
export class ManagerRoutingModule
{
}

import { NgModule }                    from '@angular/core';
import { RouterModule, Routes }        from '@angular/router';
import { JWTGuard }                    from '@delon/auth';
import { environment }                 from '@env/environment';
// layout
import { LayoutDefaultComponent }      from '../layout/default/default.component';
import { LayoutPassportComponent }     from '../layout/passport/passport.component';
// dashboard pages
// passport pages
import { UserLoginComponent }          from './passport/login/login.component';
import { UserRegisterComponent }       from './passport/register/register.component';
import { UserRegisterResultComponent } from './passport/register-result/register-result.component';
// single pages
import { CallbackComponent }           from './callback/callback.component';
import { UserLockComponent }           from './passport/lock/lock.component';
import { DashboardAnalysisComponent }  from "./dashboard/analysis/analysis.component";
import { SeriDocsComponent }           from "./docs/docs.component";

const routes: Routes = [
    {
        path       : '',
        component  : LayoutDefaultComponent,
        canActivate: [ JWTGuard ],
        children   : [
            { path: '', redirectTo: 'device', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardAnalysisComponent, data: { title: '仪表盘' } },
            {
                path        : 'exception',
                loadChildren: () => import('./exception/exception.module').then(m => m.ExceptionModule)
            },
            {
                path        : 'system',
                loadChildren: () => import('./system/system.module').then(m => m.SystemModule),
            },
            {
                path        : 'device',
                loadChildren: () => import('./device/device.module').then(m => m.DeviceModule),
            },
            {
                path        : 'track',
                loadChildren: () => import('./track/track.module').then(m => m.TrackModule),
            },
            {
                path        : 'manager',
                loadChildren: () => import('./manager/manager.module').then(m => m.ManagerModule),
            },
            {
                path        : 'monitor',
                loadChildren: () => import('./monitor/monitor.module').then(m => m.MonitorModule),
            },
            {
                path        : 'pro',
                loadChildren: () => import('./pro/pro.module').then(m => m.ProModule),
            },
            { path: 'docs', component: SeriDocsComponent },
            // 业务子模块
            // { path: 'widgets', loadChildren: () => import('./widgets/widgets.module').then(m => m.WidgetsModule) },
        ]
    },
    // 全屏布局
    // {
    //     path: 'fullscreen',
    //     component: LayoutFullScreenComponent,
    //     children: [
    //     ]
    // },
    // passport
    {
        path     : 'passport',
        component: LayoutPassportComponent,
        children : [
            { path: 'login', component: UserLoginComponent, data: { title: '登录' } },
            { path: 'register', component: UserRegisterComponent, data: { title: '注册' } },
            { path: 'register-result', component: UserRegisterResultComponent, data: { title: '注册结果' } },
            { path: 'lock', component: UserLockComponent, data: { title: '锁屏' } },
        ]
    },
    // 单页不包裹Layout
    { path: 'callback/:type', component: CallbackComponent },
    { path: '**', redirectTo: 'exception/404' },
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            routes, {
                useHash                  : environment.useHash,
                // NOTICE: If you use `reuse-tab` component and turn on keepingScroll you can set to `disabled`
                // Pls refer to https://ng-alain.com/components/reuse-tab
                scrollPositionRestoration: 'top',
            }
        ) ],
    exports: [ RouterModule ],
})
export class RouteRoutingModule
{
}

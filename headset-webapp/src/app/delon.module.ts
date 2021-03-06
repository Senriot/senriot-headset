/**
 * 进一步对基础模块的导入提炼
 * 有关模块注册指导原则请参考：https://ng-alain.com/docs/module
 */
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { throwIfAlreadyLoaded }                              from '@core';

import { AlainThemeModule }           from '@delon/theme';
import { DelonACLModule }             from '@delon/acl';
// #region mock
import { DelonMockModule }            from '@delon/mock';
import * as MOCKDATA                  from '../../_mock';
// #region reuse-tab
/**
 * 若需要[路由复用](https://ng-alain.com/components/reuse-tab)需要：
 * 1、增加 `REUSETAB_PROVIDES`
 * 2、在 `src/app/layout/default/default.component.html` 修改：
 *  ```html
 *  <section class="alain-default__content">
 *    <reuse-tab></reuse-tab>
 *    <router-outlet></router-outlet>
 *  </section>
 *  ```
 */
// tslint:disable-next-line: no-duplicate-imports
import { PageHeaderConfig, STConfig } from '@delon/abc';
import { DelonAuthConfig }            from '@delon/auth';
import { DelonUtilConfig }            from "@delon/util";

const MOCK_MODULES = [ DelonMockModule.forRoot({ data: MOCKDATA }) ];
// #endregion

const REUSETAB_PROVIDES = [
    // {
    //   provide: RouteReuseStrategy,
    //   useClass: ReuseTabStrategy,
    //   deps: [ReuseTabService],
    // },
];
// #endregion

// #region global config functions

export function fnPageHeaderConfig(): PageHeaderConfig
{
    return {
        ...new PageHeaderConfig(),
        homeI18n: '主页',
    };
}

export function fnDelonAuthConfig(): DelonAuthConfig
{
    return {
        ...new DelonAuthConfig(),
        login_url: '/passport/login',
        ignores  : [ /\/authenticate/, /assets\//, /passport\//, /app\//, /\/files/ ]
    };
}


export function fnSTConfig(): STConfig
{
    return {
        ...new STConfig(),
        ...{
            modal     : { size: "lg" },
            req       : {
                reName: {
                    pi: 'page', ps: 'size',
                },
            },
            page      : {
                zeroIndexed    : true,
                showSize       : true,
                showQuickJumper: true
            },
            res       : { reName: { total: 'totalElements', list: 'content' } },
            sortReName: { ascend: 'asc', descend: 'desc' },
            singleSort: { nameSeparator: ',' },
        } as STConfig,
    };
}


export function fnDelonUtilConfig(): DelonUtilConfig
{
    return Object.assign(new DelonUtilConfig(), {
        array: {
            idMapName      : 'id',
            parentIdMapName: 'parentId',
        },
    } as DelonUtilConfig);
}

const GLOBAL_CONFIG_PROVIDES = [
    // TIPS：@delon/abc 有大量的全局配置信息，例如设置所有 `st` 的页码默认为 `20` 行
    { provide: STConfig, useFactory: fnSTConfig },
    { provide: PageHeaderConfig, useFactory: fnPageHeaderConfig },
    { provide: DelonAuthConfig, useFactory: fnDelonAuthConfig },
    { provide: DelonUtilConfig, useFactory: fnDelonUtilConfig },
];

// #endregion

@NgModule({
    imports: [ AlainThemeModule.forRoot(), DelonACLModule.forRoot(), ...MOCK_MODULES ],
})
export class DelonModule
{
    constructor( @Optional() @SkipSelf() parentModule: DelonModule )
    {
        throwIfAlreadyLoaded(parentModule, 'DelonModule');
    }

    static forRoot(): ModuleWithProviders
    {
        return {
            ngModule : DelonModule,
            providers: [ ...REUSETAB_PROVIDES, ...GLOBAL_CONFIG_PROVIDES ],
        };
    }
}

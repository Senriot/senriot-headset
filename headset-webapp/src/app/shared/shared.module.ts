import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
// delon
import {AlainThemeModule} from '@delon/theme';
import {DelonABCModule} from '@delon/abc';
import {DelonACLModule} from '@delon/acl';
import {DelonFormModule} from '@delon/form';
// i18n
import {TranslateModule} from '@ngx-translate/core';
// #region third libs
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {CountdownModule} from 'ngx-countdown';
import {DelonChartModule} from "@delon/chart";
import {NgxAmapModule} from "ngx-amap";
import {IconComponent} from './component/icon/icon.component';
import {MapComponent} from "@shared/component/map/map.component";

const THIRDMODULES = [
    NgZorroAntdModule,
    CountdownModule
];
// #endregion

// #region your componets & directives
const COMPONENTS = [IconComponent, MapComponent];
const DIRECTIVES = [];

// #endregion

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        AlainThemeModule.forChild(),
        NgxAmapModule.forRoot({
            apiKey: 'b374afd425253385d77e7254f69e5ca6',
        }),
        DelonABCModule,
        DelonACLModule,
        DelonFormModule,
        DelonChartModule,
        // third libs
        ...THIRDMODULES
    ],
    declarations: [
        // your components
        ...COMPONENTS,
        ...DIRECTIVES,
        IconComponent
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        AlainThemeModule,
        DelonABCModule,
        DelonACLModule,
        DelonFormModule,
        // i18n
        TranslateModule,
        DelonChartModule,
        NgxAmapModule,
        // third libs
        ...THIRDMODULES,
        // your components
        ...COMPONENTS,
        ...DIRECTIVES
    ],
    entryComponents: [...COMPONENTS,]
})
export class SharedModule {
}

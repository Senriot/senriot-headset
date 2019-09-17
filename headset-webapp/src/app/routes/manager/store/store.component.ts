import { ChangeDetectorRef, Component, OnInit, ViewChild }           from '@angular/core';
import { ModalHelper, SettingsService }                              from '@delon/theme';
import { STChange, STColumn, STComponent }                           from '@delon/abc';
import { SFComponent, SFDateWidgetSchema, SFSchema, SFUISchemaItem } from '@delon/form';
import { of }                                                        from 'rxjs';
import { map }                                                       from 'rxjs/operators';
import { ManagerStoreEditComponent }                                 from './edit/edit.component';
import { CacheService }                                              from '@delon/cache';
import { City }                                                      from '@shared/model/city';
import { ArrayService }                                              from '@delon/util';
import { StoreService }                                              from "./store.service";
import { Store }                                                     from "@shared/model/store-dto";

@Component({
    selector   : 'app-manager-store',
    templateUrl: './store.component.html',
})
export class ManagerStoreComponent implements OnInit
{

    url: string;
    // stores$: Observable<Array<Store>>;
    // isLoading$: Observable<boolean>;
    // page: StoreSearchPage;
    private pid: number;

    searchSchema: SFSchema = {
        properties: {
            name     : {
                type : 'string',
                title: '商家名称',
            },
            province : {
                type : 'string',
                title: '省份',
            },
            city     : {
                type : 'string',
                title: '城市',
            },
            startDate: {
                type : 'string',
                title: '加入时间',
                ui   : { widget: 'date', end: 'endDate' } as SFDateWidgetSchema,
            },
            endDate  : {
                type: 'string',
                ui  : { widget: 'date', end: 'endDate' } as SFDateWidgetSchema,
            },
        },
    };

    ui: SFUISchemaItem = {
        $province: {
            widget   : 'select',
            width    : 180,
            asyncData: () => this.cacheService.get<City[]>('api/cities?level=0')
                .pipe(map(value => value.map(item => ({
                    value: item.id,
                    label: item.name,
                })))),
            validator: ( value, formProperty, form ) =>
            {
                this.pid = value;
                if ( value )
                {
                    form.searchProperty('/city').resetValue(null, false);
                }
            },
        },
        $city    : {
            widget   : 'select',
            width    : 180,
            asyncData: () =>
            {
                return this.pid ? this.cacheService.get<City[]>(`api/cities?parentId=${ this.pid }`)
                    .pipe(map(value => value.map(i => ({
                        value: i.id,
                        label: i.name,
                    })))) : of([]);
            },
        },
    };

    @ViewChild('st', { static: true }) st: STComponent;
    @ViewChild('sf', { static: true }) sf: SFComponent;
    columns: STColumn[] = [
        { title: '编号', index: 'id', type: 'checkbox' },
        { title: '省份', index: 'address.province.name' },
        { title: '城市', index: 'address.city.name' },
        { title: '商家名称', index: 'name' },
        {
            title: '加入时间',
            index: 'createdDate',
            type : 'date',
            sort : { default: 'descend', reName: { ascend: 'asc', descend: 'desc' } },
        },
        { title: '联系电话', index: 'phone' },
        { title: '详细地址', index: 'address.address' },
        // { title: '调用次数', type: 'number', index: 'callNo' },
        // { title: '头像', type: 'img', width: '50px', index: 'avatar' },
        // { title: '时间', type: 'date', index: 'updatedAt' },
        {
            title  : '操作',
            buttons: [
                // { text: '查看', click: (item: any) => `/form/${item.id}` },
                {
                    text : '编辑', icon: 'edit', type: 'static', modal: {
                        component: ManagerStoreEditComponent,
                        params   : record => ({ record }),
                    },
                    click: 'reload',
                },
                {
                    text: '删除', icon: 'delete', type: 'del', click: ( item: any ) =>
                    {
                        this.storeService.delete(item.id).subscribe(() => this.st.reload());
                    },
                },
            ],
        },
    ];
    selectedRows = [];

    constructor( private modal: ModalHelper,
                 private arrayService: ArrayService,
                 private cdr: ChangeDetectorRef,
                 private cacheService: CacheService,
                 private settingService: SettingsService,
                 private storeService: StoreService )
    {
        this.url = `${ storeService.resourceUrl }/page`;
    }

    ngOnInit()
    {

    }

    add()
    {
        const record = new Store();
        record.address.province = {};
        record.address.city = {};
        this.modal
            .createStatic(ManagerStoreEditComponent, { record })
            .subscribe(() => this.st.reload());
    }

    export()
    {

    }

    deleteMany( selectedRows: any[] )
    {

    }

    onChange( change: STChange )
    {
        switch (change.type)
        {
            case 'pi':
                // console.log(this.sf.value);
                // this.mStore.dispatch(LoadStorePage({
                //   page: this.st.pi - 1,
                //   size: this.st.ps,
                //   sort: [{ name: 'createdDate', asc: 'desc' }],
                // }, this.sf.value));
                break;
            case 'ps':
                break;
            case 'checkbox':
                this.selectedRows = change.checkbox!;
                break;
            case 'radio':
                break;
            case 'sort':
                break;
            case 'filter':
                break;
            case 'click':
                break;
            case 'dblClick':
                break;
            case 'expand':
                break;
        }
    }
}

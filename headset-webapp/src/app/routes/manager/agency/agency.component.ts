import { Component, OnInit, ViewChild }                                       from '@angular/core';
import { _HttpClient, ModalHelper }                                           from '@delon/theme';
import { STColumn, STComponent }                                              from '@delon/abc';
import { SFDateWidgetSchema, SFSchema, SFSelectWidgetSchema, SFUISchemaItem } from '@delon/form';
import { AgencyResourceService }                                              from "./agency-resource.service";
import { ManagerAgencyEditComponent }                                         from "./edit/edit.component";
import { City }                                                               from "@shared/model/city";
import { map }                                                                from "rxjs/operators";
import { of }                                                                 from "rxjs";
import { CacheService }                                                       from "@delon/cache";
import { userStatus }                                                         from "../../system/user";
import { AgencyType }                                                         from "./index";

@Component({
    selector   : 'app-manager-agency',
    templateUrl: './agency.component.html',
})
export class ManagerAgencyComponent implements OnInit
{
    url: string;
    searchSchema: SFSchema = {
        properties: {
            name                 : {
                type : 'string',
                title: '名称',
            },
            'address.province.id': {
                type : 'string',
                title: '省份',
                ui   : {
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
                            form.searchProperty('/address.city.id').resetValue(null, false);
                        }
                    },
                } as SFSelectWidgetSchema
            },
            "address.city.id"    : {
                type : 'string',
                title: '城市',
                ui:{
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
                }
            },
            startDate            : {
                type : 'string',
                title: '加入时间',
                ui   : { widget: 'date', end: 'endDate' } as SFDateWidgetSchema,
            },
            endDate              : {
                type: 'string',
                ui  : { widget: 'date', end: 'endDate' } as SFDateWidgetSchema,
            },
        },
    };

    ui: SFUISchemaItem = {
        "$address.city.id": {
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
        $name             : {}
    };
    @ViewChild('st', { static: false }) st: STComponent;
    columns: STColumn[] = [
        {
            title: "代理类型", index: "agencyType", type: 'tag', tag: AgencyType,
        },
        { title: "名称", index: "name" },
        { title: "省份", index: "address.province.name" },
        { title: "市区", index: "address.city.name" },
        { title: "联系人", index: "contact" },
        { title: "电话", index: "phone" },
        { title: "地址", index: "address.address" },
        {
            title: '加入时间', type: 'date', index: 'createdDate',
            sort : { default: 'ascend', reName: { ascend: 'asc', descend: 'desc' } },
        },
        {
            title  : '',
            buttons: [
                { text: '删除', type: 'del', click: item => this.service.delete(item.id).subscribe(this.st.reload) },
                { text: '编辑', type: 'static', modal: { component: ManagerAgencyEditComponent }, click: 'reload' },
            ]
        }
    ];
    private pid: any;

    constructor( private service: AgencyResourceService,
                 private modal: ModalHelper,
                 private cacheService: CacheService, )
    {
        this.url = service.resourceUrl + "/page"
    }

    ngOnInit() { }

    add()
    {
        this.modal
            .createStatic(ManagerAgencyEditComponent, { record: { id: "" } })
            .subscribe(() => this.st.reload());
    }

    export()
    {

    }
}

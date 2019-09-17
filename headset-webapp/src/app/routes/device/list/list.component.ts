import { Component, OnInit, TemplateRef, ViewChild }   from '@angular/core';
import { ModalHelper }                                 from '@delon/theme';
import { STChange, STColumn, STComponent }             from '@delon/abc';
import { SFComponent, SFSchema, SFSelectWidgetSchema } from '@delon/form';
import { City }                                        from "@shared/model/city";
import { map }                                         from "rxjs/operators";
import { of }                                          from "rxjs";
import { Device, DeviceStatistics }                    from "@shared/model/device-dto";
import { CacheService }                                from "@delon/cache";
import { NzModalService }                              from "ng-zorro-antd";
import { DeviceEditComponent }                         from "../edit/edit.component";
import { deviceStatus }                                from "../index";
import { DeviceService }                               from "../device.service";

@Component({
    selector   : 'app-device-list',
    templateUrl: './list.component.html',
})
export class DeviceListComponent implements OnInit
{
    url: string;
    private pid: string;
    searchSchema: SFSchema = {
        properties: {
            deviceName           : {
                type : 'string',
                title: '设备名称',
            },
            'province.id': {
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
                            form.searchProperty('/city.id').resetValue(null, false);
                        }
                    }
                } as SFSelectWidgetSchema
            },
            'city.id'    : {
                type : 'string',
                title: '城市',
                ui   : {
                    widget   : 'select',
                    width    : 180,
                    asyncData: () =>
                    {
                        return this.pid ? this.cacheService.get<City[]>(`api/cities?parentId=${ this.pid }`)
                            .pipe(map(value => value.map(i => ({
                                value: i.id,
                                label: i.name,
                            })))) : of([]);
                    }
                }
            },
        },
    };

    @ViewChild('st', { static: true }) st: STComponent;
    @ViewChild('sf', { static: true }) sf: SFComponent;

    columns: STColumn[] = [
        { title: '编号', index: 'id', type: 'checkbox' },
        // { title: '设备ID', index: 'deviceId' },
        { title: '设备名称', index: 'deviceName' },
        // { title: '地址', index: 'address' },
        { title: '省份', index: 'province.name' },
        { title: '城市', index: 'city.name' },
        { title: '商家', index: 'storeName' },
        {
            title: '创建时间',
            type : 'date',
            index: 'createdDate',
            sort : { default: 'descend', reName: { ascend: 'asc', descend: 'desc' } },
        },
        { title: '最近在线', index: 'onlineDate', default: '-' },
        { title: 'ip地址', index: 'ipAddress', default: '-' },
        { title: '状态', index: 'status', type: 'badge', badge: deviceStatus, default: "UNACTIVE" },
        {
            title  : '操作',
            buttons: [
                {
                    text : '查看',
                    type : 'link',
                    icon : 'eye',
                    click: ( item: any ) => '/device/view/' + item.id,
                },
                {
                    text : '编辑',
                    type : 'modal',
                    icon : 'edit',
                    modal: {
                        component: DeviceEditComponent,
                        params   : record => ({ record })
                    },
                    click: "reload"
                },
                {
                    text: '删除', icon: 'delete', type: 'del', click: ( item: any ) =>
                    {
                        this.deviceService.delete(item.id).subscribe(() =>
                        {
                            this.queryDeviceStatistics();
                            return this.st.reload();
                        });
                    },
                },
            ],
        },
    ];
    deviceStatistics: DeviceStatistics = new DeviceStatistics();
    selectedRows = [];
    price = 1;
    // devices$: Observable<Array<Device>>;
    // isLoading$: Observable<boolean>;

    constructor( private modal: ModalHelper,
                 public deviceService: DeviceService,
                 private cacheService: CacheService,
                 private modalService: NzModalService )
    {
        this.url = `${ deviceService.resourceUrl }/page`;
        // this.deviceStatistics = store.select(deviceStatistics).pipe(takeUntil(this.ngDestroy));
        // this.devices$         = store.select(device).pipe(takeUntil(this.ngDestroy));
        // this.isLoading$       = store.select(deviceLoading).pipe(takeUntil(this.ngDestroy));
    }

    ngOnInit()
    {
        this.queryDeviceStatistics();
        // this.store.dispatch(QueryDeviceStatistics());
        // this.store.dispatch(LoadDevicePage({
        //   size: this.st.ps,
        //   page: this.st.pi - 1,
        //   sort: [{ name: 'createdDate', asc: 'desc' }],
        // }));
    }

    private queryDeviceStatistics()
    {
        this.deviceService.queryDeviceStatistics().subscribe(value => this.deviceStatistics = value);
    }

    add()
    {
        this.modal
            .createStatic(DeviceEditComponent, { record: new Device() })
            .subscribe(() =>
            {
                this.queryDeviceStatistics();
                return this.st.reset();
            });
    }

    // onChanged(e: STChange) {
    //   console.log(e);
    //
    // }
    export()
    {

    }

    stOnChange( change: STChange )
    {
        console.log(change);
        switch (change.type)
        {
            case "pi":
                this.selectedRows = [];

                break;
            case "ps":
                break;
            case "checkbox":
                this.selectedRows = change.checkbox!;
                break;
            case "radio":
                break;
            case "sort":
                break;
            case "filter":
                break;
            case "click":
                break;
            case "dblClick":
                break;
            case "expand":
                break;

        }
    }

    updatePrice( tp: TemplateRef<any> )
    {
        const ids = this.selectedRows.map(value => value.id);

        this.modalService.create({
            nzTitle  : "修改单价",
            nzContent: tp,
            nzOnOk   : () => this.deviceService.updatePrices(ids, this.price).subscribe()
        }).afterClose.subscribe(res =>
        {
            if ( res )
                this.st.reload()
        })
    }

}

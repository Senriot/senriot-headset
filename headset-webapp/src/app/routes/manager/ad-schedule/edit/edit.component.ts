import { Component, Input, OnInit }                                         from '@angular/core';
import { NzMessageService, NzModalRef }                                     from 'ng-zorro-antd';
import { _HttpClient }                                                      from '@delon/theme';
import { SFDateWidgetSchema, SFSchema, SFTransferWidgetSchema, SFUISchema } from '@delon/form';
import { map }                                                              from 'rxjs/operators';
import { AdResourceService }                                                from "../../ad/ad-resource.service";
import { AdScheduleResourceService }                                        from "../ad-schedule-resource.service";
import { DeviceService }                                                    from "../../../device/device.service";

@Component({
    selector   : 'app-manager-ad-schedule-edit',
    templateUrl: './edit.component.html',
})
export class ManagerAdScheduleEditComponent implements OnInit
{
    @Input()
    record: any = {};
    schema: SFSchema = {
        properties: {
            name     : { type: 'string', title: '计划名称', maxLength: 15 },
            startDate: {
                type : 'string',
                title: '开始时间',
                ui   : { widget: 'date', end: 'endDate', showTime: true } as SFDateWidgetSchema,
            },
            endDate  : { type: 'string', title: '结束时间' },
            devices  : {
                type   : 'number',
                title  : '启用设备',
                ui     : {
                    widget    : 'transfer',
                    showSearch: true,
                    titles    : [ '设备', '已选' ],
                    listStyle : { 'width.px': 300, 'height.px': 400 },
                    asyncData : () => this.deviceService.loadAll({
                        "product.hasAd": true
                    }).pipe(map(value => value.map(item => ({
                        title: item.deviceName,
                        value: item.id,
                    })))),
                } as SFTransferWidgetSchema,
                default: [ 11, 12 ],
            },
            ads      : {
                type : 'number',
                title: '启用广告',

                // enum   : [
                //   { title: 'DNS管理', value: 10 },
                //   { title: 'ECS管理', value: 11 },
                //   { title: 'OSS管理', value: 12 },
                //   { title: 'RDS管理', value: 13 },
                // ],
                ui     : {
                    widget    : 'transfer',
                    titles    : [ '广告', '已选' ],
                    showSearch: true,
                    listStyle : { 'width.px': 300, 'height.px': 400 },
                    asyncData : () => this.adService.loadAll({
                        online: true
                    }).pipe(map(value => value.map(item => ({
                        title: item.name,
                        value: item.id,
                    })))),
                } as SFTransferWidgetSchema,
                default: [ 11, 12 ],
            },
        },
        required  : [ 'name', 'start', 'end', 'adId', 'deviceId' ],
    };
    ui: SFUISchema = {
        '*'  : {
            spanLabelFixed: 100,
            grid          : { span: 24 },
        },
        $name: {
            grid: { span: 24 },
        },
        // $start       : {
        //   widget: 'date',
        // },
        // $description: {
        //   widget: 'textarea',
        //   grid  : { span: 24 },
        // },
    };

    constructor(
        private modal: NzModalRef,
        private msgSrv: NzMessageService,
        public http: _HttpClient,
        private deviceService: DeviceService,
        private adService: AdResourceService,
        private adScheduleResourceService: AdScheduleResourceService,
    )
    {
    }

    ngOnInit(): void
    {
        console.log(this.record);
    }

    save( value: any )
    {
        console.log(value);
        const ac = this.record.id ? this.adScheduleResourceService.update(value) : this.adScheduleResourceService.create(value);
        ac.subscribe(() => this.modal.destroy(true))
    }

    close()
    {
        this.modal.destroy();
    }
}

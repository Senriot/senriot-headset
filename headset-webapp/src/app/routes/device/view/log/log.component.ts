import { Component, Input, OnInit } from '@angular/core';
import { _HttpClient }              from '@delon/theme';
import { STColumn }                 from "@delon/abc";
import { SFDateWidgetSchema }       from "@delon/form";
import { DeviceLog }                from "@shared/model/device-log.model";

@Component({
    selector   : 'app-device-view-log',
    templateUrl: './log.component.html',
})
export class DeviceViewLogComponent implements OnInit
{

    @Input()
    deviceId: string;

    logUrl: string;

    columns: STColumn[] = [
        { title: '消息ID', index: 'messageId' },
        { title: '设备名称', index: 'deviceName' },
        {
            title: '时间',
            type : 'date',
            index: 'generateTime',
            width: 260,
            sort : { default: 'descend', reName: { ascend: 'asc', descend: 'desc' } },
        },
        {
            title: '类别', index: 'msgType', format: ( item: DeviceLog ) =>
            {
                if ( item.msgType === "Status" )
                {
                    if ( item.payload.status === 'online' )
                    {
                        return "上线"
                    }
                    else
                    {
                        return "离线"
                    }
                }
                return ""
            }
        },
        // { title: "消息内容", width: 300, index: 'payload', format: item => JSON.stringify(item) }
    ];
    schema = {
        properties: {
            fromDate: {
                type  : 'string',
                title : '开始时间',
                format: 'date',
                ui    : { widget: 'date', end: 'toDate' } as SFDateWidgetSchema,
            },
            toDate  : {
                type  : 'string',
                format: 'date',
                ui    : { widget: 'date', end: 'toDate' } as SFDateWidgetSchema,
            },
        },
    };

    constructor( private http: _HttpClient ) { }

    ngOnInit()
    {
        this.logUrl = `api/devices/logs?deviceId=${ this.deviceId }`;
    }

}

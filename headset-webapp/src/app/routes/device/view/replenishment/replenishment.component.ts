import { Component, OnInit } from '@angular/core';
import { _HttpClient }       from '@delon/theme';
import { STColumn }          from "@delon/abc";
import { channelStatus }     from "../../index";

@Component({
    selector   : 'app-device-view-replenishment',
    templateUrl: './replenishment.component.html',
})
export class DeviceViewReplenishmentComponent implements OnInit
{

    deviceId: string;
    columns: STColumn[] = [
        { title: '通道编号', type: 'no', width: 120 },
        { title: '状态', index: 'status', type: 'badge', badge: channelStatus },
        // { title: '当前播放ID', index: 'currentPlayId' },
        { title: '当前播放', index: 'currentPlayName' },
        {
            title  : '操作',
            buttons: [
                {
                    text: '播放列表',
                },
                {
                    text: '禁用',
                    icon: 'close-circle',
                },
                {
                    text: '更多', children: [
                        {
                            text: '上一曲', click: ( item: any ) =>
                            {
                            },
                        },
                        {
                            text: '下一曲', click: ( item: any ) =>
                            {
                            },
                        },
                        {
                            text : '暂停/播放',
                            click: ( item: any ) =>
                            {
                            },
                        },
                        {
                            text : '清空列表',
                            click: ( item: any ) =>
                            {
                            },
                        },
                    ],
                },
            ],
        },
    ];
    url: string;

    constructor( private http: _HttpClient ) { }

    ngOnInit()
    {
        this.url = `api/devices/channels/${ this.deviceId }`
    }

}

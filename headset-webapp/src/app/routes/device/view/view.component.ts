import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Device }                                      from "@shared/model/device-dto";
import { ActivatedRoute, Router }                      from "@angular/router";
import { Observable }                                  from "rxjs";
import { ViewHostDirective }                           from "./view-host.directive";
import { DeviceService }                               from "../device.service";

@Component({
    selector   : 'app-device-view',
    templateUrl: './view.component.html',
})
export class DeviceViewComponent implements OnInit, AfterViewInit
{
    device$: Observable<Device>;
    deviceId = this.route.snapshot.params.id;
    menus: any[] = [
        {
            key     : 'info',
            title   : '设备信息',
            selected: true
        },
        {
            key  : 'channel',
            title: '通道管理',
        },
        {
            key  : 'log',
            title: '事件日志',
        },
    ];

    @ViewChild(ViewHostDirective, { static: true }) viewHostDirective: ViewHostDirective;

    constructor( private deviceService: DeviceService,
                 private route: ActivatedRoute,
                 private router: Router)
    {
    }

    ngAfterViewInit()
    {
    }

    ngOnInit()
    {
        this.device$ = this.deviceService.load(this.deviceId);
    }
}

import {Component, OnInit} from '@angular/core';
import {NzIconService, NzModalRef} from "ng-zorro-antd";

@Component({
    selector: 'app-icon',
    templateUrl: './icon.component.html',
    styleUrls: ['./icon.component.less'],
})
export class IconComponent implements OnInit {

    constructor(private modal: NzModalRef, private iconSrv: NzIconService) {
    }

    ngOnInit() {
    }

}

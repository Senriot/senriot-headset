import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalHelper} from '@delon/theme';
import {STChange, STColumn, STComponent} from '@delon/abc';
import {SFSchema} from '@delon/form';
import {ManagerAdScheduleEditComponent} from './edit/edit.component';
import {AdSchedule} from '@shared/model/ad-schedule';
import {AdScheduleResourceService} from "./ad-schedule-resource.service";

@Component({
    selector: 'app-manager-ad-schedule',
    templateUrl: './ad-schedule.component.html',
})
export class ManagerAdScheduleComponent implements OnInit {
    url = `api/adSchedule/page`;
    searchSchema: SFSchema = {
        properties: {
            name: {
                type: 'string',
                title: '标题',
            },
        },
    };
    @ViewChild('st', {static: false}) st: STComponent;
    columns: STColumn[] = [
        {title: '编号', index: 'id', type: 'checkbox'},
        {title: '标题', index: 'name'},
        {title: '开始时间', type: 'date', index: 'startDate', sort: {reName: {ascend: 'asc', descend: 'desc'}}},
        {title: '结束时间', type: 'date', index: 'endDate', sort: {reName: {ascend: 'asc', descend: 'desc'}}},
        {
            title: '创建时间',
            type: 'date',
            index: 'createdDate',
            sort: {default: 'descend', reName: {ascend: 'asc', descend: 'desc'}},
        },
        {
            title: '',
            buttons: [
                {
                    text: '编辑', icon: 'edit', type: 'static', modal: {
                        component: ManagerAdScheduleEditComponent,
                        params: record => ({record}),
                    }, click: 'reload',
                },
                {
                    text: '删除', icon: 'delete', type: 'del', click: (item: any) => {
                        this.adScheduleResourceService.delete(item.id).subscribe(() => this.st.reload());
                    },
                },
            ],
        },
    ];
    selectedRows = [];

    constructor(private adScheduleResourceService: AdScheduleResourceService, private modal: ModalHelper) {
    }

    ngOnInit() {
    }

    add() {
        this.modal
            .createStatic(ManagerAdScheduleEditComponent, {record: new AdSchedule()})
            .subscribe(() => this.st.reload());
    }

    export() {

    }

    deleteMany(selectedRows: any) {

    }

    stChange(e: STChange) {
        switch (e.type) {
            case 'checkbox':
                this.selectedRows = e.checkbox!;
                break;
            default:
                break;
        }
    }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper }     from '@delon/theme';
import { STColumn, STComponent }        from '@delon/abc';
import { SFSchema }                     from '@delon/form';
import { ManagerAdEditComponent }       from './edit/edit.component';
import { Ad }                           from '@shared/model/ad';
import { AdResourceService }            from "./ad-resource.service";

@Component({
    selector   : 'app-manager-ad',
    templateUrl: './ad.component.html',
})
export class ManagerAdComponent implements OnInit
{
    url: string;
    searchSchema: SFSchema = {
        properties: {
            name: {
                type : 'string',
                title: '名称',
            },
        },
    };
    @ViewChild('st', { static: false }) st: STComponent;
    columns: STColumn[] = [
        { title: '编号', index: 'id', type: 'checkbox' },
        { title: '广告名称', index: 'name' },
        {
            title    : '广告类型', index: 'type', type: 'tag', tag: {
                1: { text: '图片', color: 'blue' },
                2: { text: '视频', color: 'purple' },
            }, filter: {
                multiple: false,
                menus   : [ { text: '图片', value: 1 }, { text: '视频', value: 2 } ],
            },
        },
        {
            title: '创建时间',
            index: 'createdDate',
            type : 'date',
            sort : { default: 'descend', reName: { ascend: 'asc', descend: 'desc' } },
        },
        { title: '上线状态', index: 'online', type: 'yn' },
        {
            title  : '操作',
            buttons: [
                {
                    text: '删除', icon: 'delete', type: 'del', click: item =>
                    {
                        this.adService.delete(item.id).subscribe(() => this.st.reload())
                    }
                },
                {
                    text : '编辑',
                    icon : 'delete',
                    type : 'static',
                    modal: { component: ManagerAdEditComponent },
                    click: 'reload'
                },
                {
                    text: '上线', icon: 'check', click: ( item: any ) =>
                    {
                        item.online = true;
                        this.adService.update(item).subscribe(() => this.st.reload())
                    }
                },
            ],
        },
    ];
    selectedRows = [];

    constructor( private adService: AdResourceService, private modal: ModalHelper )
    {
        this.url = adService.resourceUrl + "/page"
    }

    ngOnInit()
    {
    }

    add()
    {
        this.modal
            .createStatic(ManagerAdEditComponent, { record: new Ad() })
            .subscribe(() => this.st.reload());
    }

    export()
    {

    }

    deleteMany( selectedRows: any )
    {

    }
}

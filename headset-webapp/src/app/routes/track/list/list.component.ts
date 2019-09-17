import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalHelper }                  from '@delon/theme';
import { STColumn, STComponent }        from '@delon/abc';
import { SFSchema }                     from '@delon/form';
import { TrackEditComponent }           from "../edit/edit.component";
import { TrackService }                 from "../track.service";

@Component({
    selector   : 'app-track-list',
    templateUrl: './list.component.html',
})
export class TrackListComponent implements OnInit
{
    url = `api/tracks/page`;

    searchSchema: SFSchema = {
        properties: {
            name: {
                type : 'string',
                title: '名称'
            }
        }
    };
    @ViewChild('st', { static: false }) st: STComponent;
    columns: STColumn[] = [
        { title: '名称', index: 'name' },
        { title: '备注', index: 'remark' },
        { title: '创建时间', type: 'date', index: 'createdDate' },
        {
            title  : '',
            buttons: [
                {
                    text : '编辑',
                    icon : 'edit',
                    type : 'static',
                    modal: {
                        component: TrackEditComponent,
                        params   : record => ({ record }),
                    },
                    click: "reload"
                },
                {
                    text: '删除', icon: 'delete', type: 'del', click: ( record: any ) =>
                    {
                        // this.roleFacade.delete(record);
                        // this.store.dispatch(DeleteRole(record));
                        this.service.delete(record.id).subscribe(() => this.st.reload())
                    },
                },
            ]
        }
    ];

    constructor( public service: TrackService, private modal: ModalHelper ) { }

    ngOnInit() { }

    add()
    {
        this.modal
            .createStatic(TrackEditComponent, { record: { fileInfo: {} } })
            .subscribe(() => this.st.reload());
    }

    export()
    {

    }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper }     from '@delon/theme';
import { STColumn, STComponent }        from '@delon/abc';
import { SFDateWidgetSchema, SFSchema } from '@delon/form';

@Component({
  selector   : 'app-monitor-audits',
  templateUrl: './audits.component.html',
})
export class MonitorAuditsComponent implements OnInit {
  url                    = `management/audits`;
  searchSchema: SFSchema = {
    properties: {
      fromDate: {
        type  : 'string',
        title : '开始时间',
        format: 'date',
        ui    : { widget: 'date', end: 'toDate', dateFormat: 'YYYY-MM-DD' } as SFDateWidgetSchema,
      },
      toDate  : {
        type  : 'string',
        format: 'date',
        ui    : { widget: 'date', end: 'toDate', dateFormat: 'YYYY-MM-DD' } as SFDateWidgetSchema,
      },
    },
  };
  @ViewChild('st', { static: false }) st: STComponent;
  columns: STColumn[]    = [
    {
      title: '时间',
      type : 'date',
      index: 'timestamp',
      // sort : { default: 'descend', reName: { ascend: 'asc', descend: 'desc' }, key: 'id' },
    },
    { title: '用户', index: 'principal' },
    { title: '状态', index: 'type' },
    { title: '消息', index: 'data.message' },
    { title: '远程地址', index: 'data.remoteAddress' },
    {
      title  : '',
      buttons: [
        // { text: '查看', click: (item: any) => `/form/${item.id}` },
        // { text: '编辑', type: 'static', component: FormEditComponent, click: 'reload' },
      ],
    },
  ];

  constructor(private http: _HttpClient, private modal: ModalHelper) {
  }

  ngOnInit() {
  }

  add() {
    // this.modal
    //   .createStatic(FormEditComponent, { i: { id: 0 } })
    //   .subscribe(() => this.st.reload());
  }

}

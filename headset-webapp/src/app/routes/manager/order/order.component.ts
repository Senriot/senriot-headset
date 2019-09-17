import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper }     from '@delon/theme';
import { STColumn, STComponent }        from '@delon/abc';
import { SFDateWidgetSchema, SFSchema } from '@delon/form';

@Component({
    selector   : 'app-manager-order',
    templateUrl: './order.component.html',
})
export class ManagerOrderComponent implements OnInit
{
    url = `api/orders/page`;
    searchSchema: SFSchema = {
        properties: {
            text : {
                type : 'string',
                title: '',
                ui   : {
                    placeholder: '城市、商家、设备、交易人员',
                    width      : 260,
                },
            },
            start: {
                type : 'string',
                title: '时间',
                ui   : { widget: 'date', end: 'end' } as SFDateWidgetSchema,
            },
            end  : {
                type: 'string',
                ui  : { widget: 'date', end: 'end' } as SFDateWidgetSchema,
            },
        },
    };
    @ViewChild('st', { static: false }) st: STComponent;
    columns: STColumn[] = [
        { title: '省份', index: 'province' },
        { title: '城市', index: 'city' },
        {
            title: '交易时间',
            index: 'createdDate',
            type : 'date',
            sort : { reName: { ascend: 'asc', descend: 'desc' } },
        },
        {
            title : '支付方式', index: 'orderType',
            type  : 'tag', tag: {
                'weixin': { text: '微信支付', color: 'green' },
                'alipay': { text: '支付宝', color: 'blue' },
            },
            filter: {
                multiple: false,
                menus   : [ { text: '微信', value: 'weixin' }, { text: '支付宝', value: 'alipay' } ],
            },
        },
        { title: '商家', index: 'storeName' },
        { title: '操作员', index: 'opName' },
        { title: '设备名称', index: 'deviceName' },
        { title: '售价', index: 'amount', type: 'currency' },
        {
            title    : '支付状态', index: 'status', type: 'tag', tag: {
                0: { text: '未支付', color: 'red' },
                1: { text: '已支付', color: 'geekblue' },
            }, filter: {
                multiple: false,
                menus   : [ { text: '未支付', value: 0 }, { text: '已支付', value: 1 } ],
            },
        },
    ];

    constructor( private http: _HttpClient, private modal: ModalHelper )
    {
    }

    ngOnInit()
    {
    }

    add()
    {
        // this.modal
        //   .createStatic(FormEditComponent, { i: { id: 0 } })
        //   .subscribe(() => this.st.reload());
    }

    export()
    {

    }
}

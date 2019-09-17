import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalHelper }                  from '@delon/theme';
import { STColumn, STComponent }        from '@delon/abc';
import { SFSchema }                     from '@delon/form';
import { ProductService }               from "./product.service";
import { ManagerProductEditComponent }  from "./edit/edit.component";
import { Product }                      from "@shared/model/product.model";

@Component({
    selector   : 'app-manager-product',
    templateUrl: './product.component.html',
})
export class ManagerProductComponent implements OnInit
{
    url;
    searchSchema: SFSchema = {
        properties: {
            name: {
                type : 'string',
                title: '名称', ui: {
                    placeholder: '输入产品名称搜索'
                }
            }
        }
    };
    @ViewChild('st', { static: true }) st: STComponent;
    columns: STColumn[] = [
        { title: '编号', index: 'id', type: "no" },
        { title: "产品名称", index: "name" },
        { title: '广告推送', type: 'yn', index: 'hasAd' },
        { title: "设备数", index: "deviceCount" },
        { title: "备注", index: "remark" },
        { title: '创建时间', type: 'date', index: 'createdDate' },
        {
            title  : '',
            buttons: [
                {
                    text    : '编辑', icon: 'edit', type: 'modal', modal: {
                        component: ManagerProductEditComponent,
                    }, click: 'reload'
                },
                {
                    text : '删除',
                    type : 'del',
                    click: ( record ) => this.productService.delete(record.id).subscribe(() => this.st.reload())
                },
            ]
        }
    ];
    
    constructor( private productService: ProductService, private modal: ModalHelper )
    {
        this.url = productService.resourceUrl + "/list"
    }
    
    ngOnInit()
    {
    }
    
    add()
    {
        this.modal
            .createStatic(ManagerProductEditComponent, { record: new Product() })
            .subscribe(() => this.st.reload());
    }
    
    export()
    {
    
    }
}

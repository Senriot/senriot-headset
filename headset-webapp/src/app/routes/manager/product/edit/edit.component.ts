import {Component, Input, OnInit} from '@angular/core';
import {NzModalRef} from 'ng-zorro-antd';
import {SFSchema, SFUISchema} from '@delon/form';
import {ProductService} from "../product.service";

@Component({
    selector: 'app-manager-product-edit',
    templateUrl: './edit.component.html',
})
export class ManagerProductEditComponent implements OnInit {
    @Input()
    record: any = {};
    i: any;

    title = "添加产品";

    schema: SFSchema = {
        properties: {
            name: {type: 'string', title: '产品名称', maxLength: 15},
            hasAd: {type: 'boolean', title: "广告"},
            description: {type: 'string', title: '备注', maxLength: 140},
        },
        required: ['name'],
    };
    ui: SFUISchema = {
        '*': {
            spanLabelFixed: 100,
            grid: {span: 12},
        },
        $name: {
            placeholder: '输入设备名称'
        },
        $description: {
            widget: 'textarea',
            grid: {span: 24},
            placeholder: '输入备注信息'
        },
        $hasAd: {
            optionalHelp: '产品下设备是否可以推送广告'
        }
    };

    constructor(
        private modal: NzModalRef,
        public productService: ProductService,
    ) {
    }

    ngOnInit(): void {
        if (!this.record.id) {
            this.i = this.record
        } else {
            this.productService.load(this.record.id).subscribe(value => this.i = value)
        }
    }

    save(value: any) {
        const ac = this.record.id ? this.productService.update(value) : this.productService.create(value);
        ac.subscribe(() => this.modal.destroy(true))
    }

    close() {
    }
}

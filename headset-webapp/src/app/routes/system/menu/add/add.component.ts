import {Component, OnInit, ViewChild} from '@angular/core';
import {NzModalRef, NzMessageService} from 'ng-zorro-antd';
import {_HttpClient} from '@delon/theme';
import {SFSchema, SFUISchema} from '@delon/form';
import {Menu} from "@shared/model/menu.model";

@Component({
    selector: 'app-system-menu-add',
    templateUrl: './add.component.html',
})
export class SystemMenuAddComponent implements OnInit {
    i = new Menu();
    schema: SFSchema = {
        properties: {
            text: {
                type: 'string', title: '分类名称', ui: {
                    placeholder: '输入菜单名称'
                }
            },
            icon: {
                type: 'string', title: '图标', ui: {
                    placeholder: '编辑图标'
                }
            },
            link: {
                type: 'string', title: '路由', ui: {
                    placeholder: '输入菜单路由'
                }
            },
            externalLink: {
                type: 'string', title: '外部链接',
                ui: {
                    placeholder: '输入外部链接'
                }
            },
            sortOrder: {
                type: 'number', title: '排序',
                ui: {
                    placeholder: '排序'
                }
            },
            remark: {
                type: 'string', title: '备注',
                ui: {
                    placeholder: '备注'
                }
            },
        },
        required: ["text"]
    };
    ui: SFUISchema = {
        '*': {
            spanLabelFixed: 100,
            grid: {span: 12},
        }
    };

    constructor(
        private modal: NzModalRef,
        private msgSrv: NzMessageService,
        public http: _HttpClient,
    ) {
    }

    ngOnInit(): void {
    }

    save(value: any) {
    }

    close() {
        this.modal.destroy();
    }
}

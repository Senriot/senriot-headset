import { Component, Input, OnInit }     from '@angular/core';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { SFSchema, SFUISchema }         from '@delon/form';
import { IMenu }                        from "@shared/model/menu.model";
import { RoleService }                  from "../../role/role.service";
import { MenuService }                  from "../menu.service";
import { ModalHelper }                  from "@delon/theme";
import { IconComponent }                from "@shared/component/icon/icon.component";

@Component({
    selector   : 'app-system-menu-edit',
    templateUrl: './edit.component.html',
})
export class SystemMenuEditComponent implements OnInit
{
    @Input()
    record: any;
    i: IMenu;
    schema: SFSchema = {
        properties: {
            text        : {
                type: 'string', title: '分类名称', ui: {
                    placeholder: '输入菜单名称'
                }
            },
            icon        : {
                type: 'string', title: '图标', ui: {}
            },
            link        : {
                type: 'string', title: '路由', ui: {
                    placeholder: '输入菜单路由'
                }
            },
            externalLink: {
                type: 'string', title: '外部链接',
                ui  : {
                    placeholder: '输入外部链接'
                }
            },
            sortOrder   : {
                type: 'number', title: '排序',
                ui  : {
                    placeholder: '排序'
                }
            },
            remark      : {
                type: 'string', title: '备注',
                ui  : {
                    placeholder: '备注'
                }
            },
        },
        required  : [ "text" ]
    };

    ui: SFUISchema = {
        '*'  : {
            spanLabelFixed: 100,
            grid          : { span: 12 },
        },
        $no  : {
            widget: 'text'
        },
        $text: {
            widget     : 'string',
            placeholder: '输入菜单分类的名称'
        },
    };
    isSaving: boolean;

    constructor(
        private modal: NzModalRef,
        private msgSrv: NzMessageService,
        private roleSrv: RoleService,
        public menuSrv: MenuService,
        private modalHelper: ModalHelper,
    )
    {
    }

    ngOnInit(): void
    {
        if ( this.record.id )
            this.menuSrv.load(this.record.id).subscribe(value => this.i = value);
        else this.i = this.record
    }

    save( value: any )
    {
        console.log(value)
        // this.isSaving = true;
        const action = this.record.id ? this.menuSrv.update(value) : this.menuSrv.create(value);
        action.subscribe(() => this.modal.destroy(true), err => this.isSaving = false)
    }

    close()
    {
        this.modal.destroy();
    }

    reset()
    {

    }

    showIcon()
    {
        this.modalHelper.createStatic(IconComponent, null, { size: "md" }).subscribe()
    }
}

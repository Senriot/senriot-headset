import { Component, Input, OnInit, ViewChild }                                          from '@angular/core';
import { NzMessageService, NzModalRef }                                                 from 'ng-zorro-antd';
import { SFComponent, SFRadioWidgetSchema, SFSchema, SFUISchema, SFUploadWidgetSchema } from '@delon/form';
import { AdResourceService }                                                            from "../ad-resource.service";
import { of }                                                                           from "rxjs";
import { map }                                                                          from "rxjs/operators";
import { Ad }                                                                           from "@shared/model/ad";

@Component({
    selector   : 'app-manager-ad-edit',
    templateUrl: './edit.component.html',
})
export class ManagerAdEditComponent implements OnInit
{
    @Input()
    record: Ad = {};
    i: any;
    @ViewChild('sf', { static: true }) sf: SFComponent;
    schema: SFSchema;
    ui: SFUISchema = {
        '*'         : {
            spanLabelFixed: 130,
            grid          : { span: 12 },
        },
        $description: {
            widget: 'textarea',
            grid  : { span: 24 },
        },
    };

    constructor(
        private modal: NzModalRef,
        private msgSrv: NzMessageService,
        public adResourceService: AdResourceService,
    )
    {
    }

    ngOnInit(): void
    {
        this.schema = {
            properties: {
                name: { type: 'string', title: '广告名称', maxLength: 15 },
                type: {
                    type: 'string', title: '广告类型', enum: [ { label: "图片", value: 1 }, { label: "视频", value: 2 } ],
                    ui  : {
                        widget     : 'radio',
                        styleType  : 'button',
                        buttonStyle: 'solid',
                    } as SFRadioWidgetSchema,
                },

                files      : {
                    type    : 'string',
                    title   : '文件',
                    readOnly: !!this.record.id,
                    ui      : {
                        errors   : { 'required': "上传广告文件" },
                        widget   : 'upload',
                        urlReName: 'url',
                        resReName: "url",
                        action   : 'http://47.103.89.201:8080/upload',
                        multiple : true,
                        grid     : { span: 24 },
                        data     : { output: 'json', scene: 'image' },
                        listType : 'picture-card',
                        asyncData: () =>
                        {
                            return of(this.record.urls).pipe(map(value => value.map(i => ({ url: i }))))
                        },
                        change   : v =>
                        {
                            console.log(v)
                        }
                    } as SFUploadWidgetSchema,
                },
                repeat     : {
                    type : 'boolean',
                    title: '循环',
                    ui   : {
                        checkedChildren  : '开',
                        unCheckedChildren: '关',
                    },
                },
                description: { type: 'string', title: '备注', maxLength: 140 },
            },
            required  : [ 'name', "type", ],
        };
        if ( !this.record.id )
        {
            this.i = this.record;
        }
        else
        {
            this.adResourceService.load(this.record.id).subscribe(value =>
            {
                this.i = value;
            });

        }
    }

    save( value: any )
    {
        value.urls = value.files;

        console.log(value);
        const action = this.record.id ? this.adResourceService.update(value) : this.adResourceService.create(value);
        action.subscribe(() => this.modal.destroy(true))
    }

    close()
    {
        this.modal.destroy();
    }
}

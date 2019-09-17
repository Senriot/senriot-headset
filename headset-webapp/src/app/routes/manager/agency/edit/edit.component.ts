import { Component, OnInit }                                        from '@angular/core';
import { CascaderOption, NzMessageService, NzModalRef, NzTreeNode } from 'ng-zorro-antd';
import { _HttpClient, ModalHelper }                                 from '@delon/theme';
import { SFSchema, SFUISchema }                                     from '@delon/form';
import { Agency }                                                   from "@shared/model/agency-dto";
import { CacheService }                                             from "@delon/cache";
import { City }                                                     from "@shared/model/city";
import { ArrayService }                                             from "@delon/util";
import { MapComponent }                                             from "@shared/component/map/map.component";
import { Address }                                                  from "@shared/model/address";
import { AgencyResourceService }                                    from "../agency-resource.service";
import { UserService }                                              from "@core/user/user.service";

@Component({
    selector   : 'app-manager-agency-edit',
    templateUrl: './edit.component.html',
})
export class ManagerAgencyEditComponent implements OnInit
{
    record: any = {};
    i: Agency;
    schema: SFSchema = {
        properties: {
            agencyType : {
                type: 'string', title: '代理类型',
                enum: [
                    { label: '省代', value: 'PROVINCE' },
                    { label: '市代', value: 'CITY' }
                ],
            },
            name       : { type: 'string', title: '名称', maxLength: 15 },
            contact    : { type: 'string', title: '联系人' },
            phone      : { type: 'string', title: '联系电话' },
            description: { type: 'string', title: '描述', maxLength: 140 },
        },
        required  : [ 'owner', 'callNo', 'href', 'description' ],
    };
    ui: SFUISchema = {
        '*'         : {
            spanLabelFixed: 100,
            grid          : { span: 12 },
        },
        $agencyType : {
            widget: 'select'
        },
        $href       : {
            widget: 'string',
        },
        $description: {
            widget: 'textarea',
            grid  : { span: 24 },
        },
    };
    cities = [];

    selectedCities: any;

    constructor(
        private modal: NzModalRef,
        private msgSrv: NzMessageService,
        private cacheService: CacheService,
        private arrayService: ArrayService,
        public agencyService: AgencyResourceService,
        private modalHelper: ModalHelper,
        private userService: UserService
    )
    {}

    ngOnInit(): void
    {
        if ( !this.record.id )
            this.i = { agencyType: "PROVINCE", address: {} };
        else
        {
            this.agencyService.load(this.record.id).subscribe(( value: Agency ) =>
            {
                this.i = value;
                if ( value.agencyType == 'PROVINCE' )
                {
                    this.selectedCities = [ value.address.province.id ]

                }
                else
                {
                    this.selectedCities = [ value.address.province.id, value.address.city.id ]
                    this.cacheService.get<City[]>('api/cities/city?level=1').subscribe(value =>
                    {
                        this.cities = this.arrayService.arrToTreeNode(value, {
                            titleMapName: 'name'
                        });
                    })
                }

            })
        }

        this.cacheService.get<City[]>('api/cities?level=0').subscribe(value =>
        {
            this.cities = this.arrayService.arrToTreeNode(value, {
                titleMapName: 'name'
            });
        })
    }

    save( value: any )
    {
        const action = this.i.id ? this.agencyService.update(this.i) : this.agencyService.create(this.i);
        action.subscribe(() => this.modal.destroy(true))
        // this.http.post(`/user/${this.record.id}`, value).subscribe(res => {
        //   this.msgSrv.success('保存成功');
        //   this.modal.close(true);
        // });
    }

    close()
    {
        this.modal.destroy();
    }

    agencyTypeChanged( e: any )
    {
        this.cities = [];
        this.i.address = {};
        console.log(e);
        if ( e === 'CITY' )
        {
            this.cacheService.get<City[]>('api/cities/city?level=1').subscribe(value =>
            {
                this.cities = this.arrayService.arrToTreeNode(value, {
                    titleMapName: 'name'
                });
            })
        }
        else
        {
            this.cacheService.get<City[]>('api/cities?level=0').subscribe(value =>
            {
                this.cities = this.arrayService.arrToTreeNode(value, {
                    titleMapName: 'name'
                });
            })
        }
    }


    cityChanged( e: NzTreeNode[] )
    {
        const last = e[e.length - 1];
        console.log(this.selectedCities);
        if ( last.level > 0 )
        {
            this.i.address = {
                province: { id: last.parentNode.key },
                city    : { id: last.key },
                address : last.origin.mergerName
            }
        }
        else
        {
            this.i.address = {
                province: { id: last.key },
                address : last.origin.name
            }
        }
    }

    showMap()
    {
        this.modalHelper.createStatic(MapComponent, { address: this.i.address.address }, {
            size        : 'md',
            modalOptions: { nzMask: false },
        }).subscribe(( res ) =>
        {
            console.log(res);
            if ( res )
            {
                this.i.address.address = res.address;
            }
        });
    }
}

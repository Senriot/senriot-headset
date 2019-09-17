import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, TemplateRef } from '@angular/core';
import { Device }                                                                  from "@shared/model/device-dto";
import { Observable }                                                              from "rxjs";
import { Store }                                                                   from "@shared/model/store-dto";
import { StoreService }                                                            from "../../../manager/store/store.service";
import { NzMessageService, NzModalService }                                        from "ng-zorro-antd";
import { copy }                                                                    from '@delon/util';
import { DeviceService }                                                           from "../../device.service";
import { deviceStatus }                                                            from "../../index";
import { _HttpClient }                                                             from "@delon/theme";

@Component({
    selector   : 'app-device-view-info',
    templateUrl: './info.component.html',
})
export class DeviceViewInfoComponent implements OnInit, AfterViewInit
{
    
    deviceId: string;
    @Input()
    device: Device;
    store$: Observable<Store>;
    stores: Store[];
    status = deviceStatus;
    categories = [];
    
    constructor( private service: DeviceService,
                 private storeSrv: StoreService,
                 public msgSrv: NzMessageService,
                 private modal: NzModalService,
                 private cdRef: ChangeDetectorRef,
                 public http: _HttpClient )
    { }
    
    ngOnInit()
    {
        this.http.get("api/book/category").subscribe(( value: any[] ) =>
        {
            this.categories.push({
                id   : 0,
                text : "全部",
                value: false
            });
            value.forEach(( value1, index ) =>
            {
                this.categories.push({
                    id   : value1.value,
                    text : value1.key,
                    value: this.device.bookCategories.includes(value1.value)
                })
            })
        })
    }
    
    copy( content: string )
    {
        copy(content).then(value => this.msgSrv.info('复制成功'));
    }
    
    editStore( tp: TemplateRef<any> )
    {
        this.storeSrv.loadAll().subscribe(value =>
        {
            this.stores = value;
            this.modal.create({
                nzTitle  : "修改商家",
                nzContent: tp,
                nzOnOk   : () => this.service.update(this.device).subscribe()
            }).afterClose.subscribe(res =>
            {
                if ( res )
                    this.store$ = this.storeSrv.load(this.device.storeId);
            })
        })
        
    }
    
    
    ngAfterViewInit(): void
    {
        if ( this.deviceId )
        {
            this.service.load(this.deviceId).subscribe(value =>
            {
                this.device = value;
                if ( value.storeId )
                    this.store$ = this.storeSrv.load(value.storeId);
                this.cdRef.detectChanges();
            })
        }
    }
    
    change( res: any )
    {
        console.log(res);
        if ( res.id !== 0 ) return;
        this.categories.forEach(i => i.value = res.value);
    }
    
    saveCategory()
    {
        const st = this.categories.filter(item => item.value === true && item.id != 0).map(i => i.id);
        console.log(st)
        this.http.post(`/api/book/device/${ this.device.id }`, st).subscribe(() => this.msgSrv.info("保存成功"))
    }
}

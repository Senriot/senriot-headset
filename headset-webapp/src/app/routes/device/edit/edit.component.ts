import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NzModalRef }                          from 'ng-zorro-antd';
import { _HttpClient, ModalHelper }            from '@delon/theme';
import { Observable }                          from "rxjs";
import { Store }                               from "@shared/model/store-dto";
import { Product }        from "@shared/model/product.model";
import { CacheService }   from "@delon/cache";
import { StoreService }   from "../../manager/store/store.service";
import { ProductService } from "../../manager/product/product.service";
import { Device }         from "@shared/model/device-dto";
import { NgForm }         from "@angular/forms";
import { MapComponent }   from "@shared/component/map/map.component";
import { Address }        from "@shared/model/address";
import { User }           from "@core/user/user.model";
import { DeviceService }  from "../device.service";

@Component({
    selector   : 'app-device-edit',
    templateUrl: './edit.component.html',
})
export class DeviceEditComponent implements OnInit
{
    stores$: Observable<Array<Store>>;
    managers$: Observable<Array<User>>;


    constructor(
        private modal: NzModalRef,
        private modalHelper: ModalHelper,
        private cacheService: CacheService,
        private deviceService: DeviceService,
        public storeService: StoreService,
        private productService: ProductService,
        private http: _HttpClient
    )
    {
        this.stores$ = storeService.loadAll();
        this.managers$ = http.get(`api/users/device-managers`)
    }

    @Input()
    record: Device;

    @ViewChild('f', { static: true }) form: NgForm;


    private searchText = '';
    values = [];
    isShowMap = false;

    ngOnInit(): void
    {
        if ( this.record.id )
            this.deviceService.load(this.record.id).subscribe(value => this.record = value)
    }

    getCityData( lst: any[] )
    {
        return lst.map(item =>
        {
            if ( !item.children )
            {
                item.isLeaf = true;
            }
            else
            {
                this.getCityData(item.children);
            }
            return item;
        });
    }

    save( value: any )
    {
        const ac = this.record.id ? this.deviceService.update(this.record) : this.deviceService.create(this.record);
        ac.subscribe(() => this.modal.destroy(true));
    }

    close()
    {
        this.modal.destroy();
    }

    showMap()
    {
        this.modalHelper.createStatic(MapComponent, { address: this.record.address }, {
            size        : 'md',
            modalOptions: { nzMask: false },
        }).subscribe(( res ) =>
        {
            console.log(res);
            if ( res )
            {
                this.http.get<Address>("api/cities/address", { areaCode: res.addressComponent.adcode }).subscribe(value =>
                {
                    this.record.address = res.address;
                    this.record.province = value.province;
                    this.record.city = value.city;
                    this.record.district = value.district
                })
                // this.record.address    = res.address;
                // this.record.coordinate = res.coordinate;
                // // this.record.province   = res.addressComponent.province;
                // // this.record.city       = res.addressComponent.city;
                // this.cacheService.get<City[]>('seri-quickup/api/cities').subscribe(value => {
                //   this.record.province = value.find(city => city.name === res.addressComponent.province);
                //   this.record.city     = value.find(city => city.cityCode === res.addressComponent.citycode);
                // });
                // this.record.district   = res.addressComponent.district;
            }
        });
    }

    loadMore( e: void )
    {
        // if (this.storePage && this.storePage.last)
        //   return;
        // this.storeService.loadPage({
        //     page: this.storePage ? this.storePage.number + 1 : 0,
        //     size: 20,
        //     sort: [{
        //         name: 'createdDate', asc: 'desc',
        //     }],
        // }, {name: this.searchText}).subscribe(value => {
        //     this.storePage = value;
        //     this.optionList = [...this.optionList, ...value.content];
        // });
        // this.store.dispatch(LoadStorePage({
        //   page: this.storePage ? this.storePage.number + 1 : 0,
        //   size: 20,
        //   sort: [{ name: 'createdDate', asc: 'desc' }],
        // }, { name: this.searchText }));
    }

    storeOnSearch( e: string )
    {
        this.searchText = e;
        // this.storePage = null;
        this.loadMore();
        // this.store.dispatch(LoadStorePage({
        //   page: 0,
        //   size: 20,
        //   sort: [{ name: 'createdDate', asc: 'desc' }],
        // }, { name: this.searchText }));
    }

    onChanges( e: any )
    {
        this.isShowMap = e.length > 0;
    }
}

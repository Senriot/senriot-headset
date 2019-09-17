import { Component, OnInit }        from '@angular/core';
import { NzModalRef }               from 'ng-zorro-antd';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { MapComponent }             from '@shared/component/map/map.component';
import { Store }                    from "@shared/model/store-dto";
import { StoreService }             from "../store.service";
import { EventManagerService }      from "@core/event/event-manager.service";
import { SFSchema, SFUISchema }     from "@delon/form";
import { CacheService }             from "@delon/cache";
import { City }                     from "@shared/model/city";
import { map }                      from "rxjs/operators";
import { Observable }               from "rxjs";
import { Address }                  from "@shared/model/address";
import { Agency }                   from "@shared/model/agency-dto";
import { AgencyResourceService }    from "../../agency/agency-resource.service";

@Component({
    selector   : 'app-manager-store-edit',
    templateUrl: './edit.component.html',
})
export class ManagerStoreEditComponent implements OnInit
{
    record: Store = {};
    i: Store;

    provinceData: Observable<City[]>;
    cityData: Observable<City[]>;
    agencies$: Observable<Agency[]>;

    // isLoading$: Observable<boolean>;

    constructor(
        // private store: NgStore<AppState>,
        public service: StoreService,
        private modal: NzModalRef,
        private modalHelper: ModalHelper,
        private cacheService: CacheService,
        private agencyService: AgencyResourceService,
        private http: _HttpClient
    )
    {
        this.provinceData = this.cacheService.get<City[]>('api/cities?level=0');
        this.agencies$ = this.agencyService.loadAll()
    }

    ngOnInit(): void
    {
        if ( this.record.id )
        {
            this.service.load(this.record.id).subscribe(value => this.i = value)
        }
        else
        {
            this.i = this.record
        }
    }

    save( value: any )
    {
        const ac = this.record.id ? this.service.update(this.i) : this.service.create(this.i);
        ac.subscribe(() => this.modal.destroy(true));
    }

    close()
    {
        this.modal.destroy();
    }

    showMap()
    {
        this.modalHelper.createStatic(MapComponent, { address: this.i.address.address ? this.i.address.address : null }, {
            size        : 'md',
            modalOptions: { nzMask: false },
        }).subscribe(( res ) =>
        {
            console.log(res);
            if ( res )
            {
                this.http.get<Address>("api/cities/address", { areaCode: res.addressComponent.adcode }).subscribe(value =>
                {
                    this.i.address = value;
                    this.i.address.address = res.address;
                })
                // this.i.address.address = res.address;
                // this.record.province = res.addressComponent.province;
                // this.record.city     = res.addressComponent.city;
            }
        });
    }

    provinceChange( e: any )
    {
        console.log(e);
        this.cityData = this.cacheService.get<City[]>(`api/cities?parentId=${ e }`)
        this.record.address.city = {}
    }
}

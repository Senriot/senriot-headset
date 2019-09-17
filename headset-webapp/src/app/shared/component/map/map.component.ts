import { Component, Input, OnInit }                                   from '@angular/core';
import { NzMessageService, NzModalRef }                               from 'ng-zorro-antd';
import { _HttpClient }                                                from '@delon/theme';
import { AddressComponent, AmapGeocoderService, AmapGeocoderWrapper } from 'ngx-amap';

@Component({
  selector   : 'app-device-map',
  templateUrl: './map.component.html',
})
export class MapComponent implements OnInit {
  @Input()
  address?: any;
  @Input()
  point?: any;
  private geoPromise: Promise<AmapGeocoderWrapper>;
  searchText: string;
  addressComponent: AddressComponent;

  constructor(
    private modal: NzModalRef,
    public msgSrv: NzMessageService,
    public http: _HttpClient,
    private amapGeocoder: AmapGeocoderService,
  ) {
    this.geoPromise = amapGeocoder.of();
  }

  ngOnInit(): void {
    this.getAddress();
    if (this.address) {
      this.geoPromise.then(geocoder => geocoder.getLocation(this.address))
        .then(data => {
          console.log('get location of address:', this.address);
          console.log('status:', data.status);
          console.log('result:', data.result);
          if (data.status === 'complete' && data.result.info === 'OK') {
            this.point   = data.result.geocodes[0].location;
            this.address = data.result.geocodes[0].formattedAddress;
          }
        });
    }
  }

  close() {
    this.modal.destroy();
  }

  onMapEvent(e: { lnglat: any; }, mapClick: string) {
    this.point = e.lnglat;
    this.getAddress();
  }

  ok() {
    this.modal.close({
      coordinate      : this.point,
      address         : this.address,
      addressComponent: this.addressComponent,
    });
  }

  onSearch(e) {
    this.point = [e.poi.location.lng, e.poi.location.lat];
    this.getAddress();
  }

  getAddress() {
    if (this.point) {
      this.geoPromise
        .then(geocoder => geocoder.getAddress(this.point))
        .then(data => {
          if (data.status === 'complete' && data.result.info === 'OK') {
            this.address          = data.result.regeocode.formattedAddress;
            this.addressComponent = data.result.regeocode.addressComponent;
          }
        });
    }
  }

}

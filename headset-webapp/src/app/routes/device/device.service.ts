/*
 * TODO:
 * This file should not remain in the state folder. Move it to somewhere within
 * your app code.
 */

import { Injectable } from '@angular/core';

import { Observable }               from 'rxjs';
import { BaseService }              from "@shared/service/base.service";
import { Device, DeviceStatistics } from "@shared/model/device-dto";
import { IPage, IPageRes }          from "@shared/model/page";

@Injectable({
    providedIn: 'root',
})
export class DeviceService extends BaseService<Device>
{
    resourceUrl = "api/devices";

    queryDeviceStatistics(): Observable<DeviceStatistics>
    {
        return this.http.get(`${ this.resourceUrl }/statistics`);
    }

    search( page: IPage, criteria?: any ): Observable<IPageRes<Device>>
    {
        let sortParam = null;
        if ( page.sort )
        {
            const s = page.sort.map(value => `${ value.name },${ value.asc }`);
            sortParam = ({
                sort: s,
            });
        }
        return this.http.get(`${ this.resourceUrl }/search`, {
            ...criteria,
            page: page.page,
            size: page.size, ...sortParam
        });
    }

    updatePrices( ids: string[], price: number ): Observable<void>
    {
        return this.http.post(`${ this.resourceUrl }/prices`, {
            ids,
            price
        })
    }
}

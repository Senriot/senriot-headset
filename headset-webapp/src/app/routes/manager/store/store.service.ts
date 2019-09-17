import {Injectable} from '@angular/core';
import {BaseService} from "@shared/service/base.service";
import {Store} from "@shared/model/store-dto";

@Injectable({
    providedIn: 'root',
})
export class StoreService extends BaseService<Store> {
    resourceUrl = "api/stores"
}

import {Ad} from '@shared/model/ad';
import {_HttpClient} from '@delon/theme';
import {Injectable} from '@angular/core';
import {BaseService} from "@shared/service/base.service";

@Injectable({
    providedIn: 'root',
})
export class AdResourceService extends BaseService<Ad> {
    resourceUrl = "api/ads";
}

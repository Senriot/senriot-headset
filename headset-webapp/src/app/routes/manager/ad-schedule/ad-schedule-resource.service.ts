import {_HttpClient} from '@delon/theme';
import {AdSchedule} from '@shared/model/ad-schedule';
import {Injectable} from '@angular/core';
import {BaseService} from "@shared/service/base.service";

@Injectable({
    providedIn: 'root',
})
export class AdScheduleResourceService extends BaseService<AdSchedule> {
    resourceUrl = "api/adSchedule"
}

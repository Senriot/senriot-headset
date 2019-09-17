import { Injectable }  from '@angular/core';
import { BaseService } from "@shared/service/base.service";
import { Track }       from "@shared/model/track-dto";

@Injectable({
    providedIn: 'root',
})
export class TrackService extends BaseService<Track>
{
    resourceUrl = "api/tracks"
}

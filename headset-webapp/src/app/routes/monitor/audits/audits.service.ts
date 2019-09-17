import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

import {Audit} from './audit.model';
import {createRequestOption} from "@shared/utils/request-util";

@Injectable({providedIn: 'root'})
export class AuditsService {
  constructor(private http: HttpClient) {
  }

  query(req: any): Observable<HttpResponse<Audit[]>> {
    const params: HttpParams = createRequestOption(req);
    params.set('fromDate', req.fromDate);
    params.set('toDate', req.toDate);

    const requestURL = 'management/audits';

    return this.http.get<Audit[]>(requestURL, {
      params,
      observe: 'response',
    });
  }
}

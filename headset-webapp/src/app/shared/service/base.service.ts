import {_HttpClient} from '@delon/theme';
import {Observable, of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {IPage, IPageRes} from "@shared/model/page";
import {IEntity} from "@shared/model/entity";

export class BaseService<T extends IEntity> {
  public resourceUrl = '';

  constructor(public http: _HttpClient) {
  }



  create(entity: T): Observable<T> {
    return this.http.post(`${this.resourceUrl}`, entity);
  }

  delete(id: any, criteria?: any): Observable<any> {
    return this.http.delete(`${this.resourceUrl}/${id}`, criteria).pipe(switchMap(() => of(id)));
  }

  load(keys: any, criteria?: any): Observable<T> {
    return this.http.get(`${this.resourceUrl}/${keys}`, criteria);
  }

  loadAll(criteria?: any): Observable<T[]> {
    console.log('loadAll');
    return this.http.get(`${this.resourceUrl}/list`, criteria);
  }

  loadPage(page: IPage, criteria?: any): Observable<IPageRes<T>> {
    let sortParam = null;
    if (page.sort) {
      const s = page.sort.map(value => `${value.name},${value.asc}`);
      sortParam = ({
        sort: s,
      });
    }

    return this.http.get(`${this.resourceUrl}/page`, {...criteria, page: page.page, size: page.size, ...sortParam});
  }

  update(entity: T, criteria?: any): Observable<T> {
    return this.http.put(`${this.resourceUrl}`, entity, criteria);
  }

  updateMany(entities: T[], criteria?: any): Observable<T[]> {
    return this.http.put(`${this.resourceUrl}/many`, entities, criteria).pipe(map(() => entities));
  }

  deleteMany(entities: T[], criteria?: any): Observable<any[]> {
    return this.http.delete(`${this.resourceUrl}/many`, {ids: entities.map(value => value.id)}).pipe(map(() => entities.map(value => value.id)));
  }

  exportXls(): Observable<any> {
    return this.http.post(`${this.resourceUrl}/importExcel`, null, null, {responseType: 'blob'});
  }
}

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable, Injector }                                               from '@angular/core';
import { Observable }                                                         from 'rxjs';
import { tap }                                                                from 'rxjs/operators';
import { NzMessageService, NzNotificationService }                            from "ng-zorro-antd";
import { TranslateService }                                                   from "@ngx-translate/core";

@Injectable()
export class NotificationInterceptor implements HttpInterceptor
{
    constructor( private injector: Injector, private translate: TranslateService )
    {
    }
    
    private get notification(): NzNotificationService
    {
        return this.injector.get(NzNotificationService);
    }
    
    private get msgSrv(): NzMessageService
    {
        return this.injector.get(NzMessageService);
    }
    
    intercept( request: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>>
    {
        return next.handle(request).pipe(
            tap(
                ( event: HttpEvent<any> ) =>
                {
                    if ( event instanceof HttpResponse )
                    {
                        const arr = event.headers.keys();
                        let alert = null;
                        let alertParams = null;
                        arr.forEach(entry =>
                        {
                            if ( entry.toLowerCase().endsWith('app-alert') )
                            {
                                alert = event.headers.get(entry);
                            }
                            else if ( entry.toLowerCase().endsWith('app-params') )
                            {
                                alertParams = event.headers.get(entry);
                            }
                        });
                        if ( alert )
                        {
                            if ( typeof alert === 'string' )
                            {
                                const msg = this.translate.instant(alert, { param: decodeURI(alertParams) });
                                this.msgSrv.info(msg)
                            }
                        }
                    }
                },
                ( err: any ) =>
                {
                }
            )
        );
    }
}

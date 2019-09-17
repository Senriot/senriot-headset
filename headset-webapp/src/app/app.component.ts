import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { NavigationEnd, Router }                    from '@angular/router';
import { filter }                                   from 'rxjs/operators';
import { TitleService, VERSION as VERSION_ALAIN }   from '@delon/theme';
import { NzModalService, VERSION as VERSION_ZORRO } from 'ng-zorro-antd';
import { SplashScreenService }                      from "./layout/splash-screen/splash-screen.service";

@Component({
    selector: 'app-root',
    template: `
        <kt-splash-screen></kt-splash-screen>
        <router-outlet></router-outlet>
    `,
})
export class AppComponent implements OnInit
{
    constructor(
        el: ElementRef,
        renderer: Renderer2,
        private router: Router,
        private titleSrv: TitleService,
        private modalSrv: NzModalService,
        private splashScreenService: SplashScreenService,
    )
    {
        renderer.setAttribute(el.nativeElement, "ng-alain-version", VERSION_ALAIN.full);
        renderer.setAttribute(el.nativeElement, 'ng-zorro-version', VERSION_ZORRO.full);
    }
    
    ngOnInit()
    {
        this.router.events.pipe(filter(evt => evt instanceof NavigationEnd)).subscribe(() =>
        {
            this.splashScreenService.hide();
            this.titleSrv.setTitle();
            this.modalSrv.closeAll();
        });
    }
}

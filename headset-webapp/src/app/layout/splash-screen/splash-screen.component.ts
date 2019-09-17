// Angular
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SplashScreenService }                      from './splash-screen.service';
// Object-Path
// Layout

@Component( {
  selector: 'kt-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.less'],
} )
export class SplashScreenComponent implements OnInit
{
  @ViewChild( 'splashScreen', { static: true } ) splashScreen: ElementRef;

  /**
   * Component constructor
   *
   * @param el: ElementRef
   * @param layoutConfigService: LayoutConfigService
   * @param splashScreenService: SplachScreenService
   */
  constructor(
    private el: ElementRef, private splashScreenService: SplashScreenService)
  {
  }

  /**
   * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
   */

  /**
   * On init
   */
  ngOnInit()
  {
    this.splashScreenService.init( this.splashScreen );
  }
}

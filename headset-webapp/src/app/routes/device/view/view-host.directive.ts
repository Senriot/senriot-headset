import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appViewHost]'
})
export class ViewHostDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}

import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appScrollLock]'
})
export class ScrollLockDirective {

  constructor(private element: ElementRef) { }

  @HostListener('window:scroll', ['$event'])
  updateWindow(event: any): void{
    const clientHeight = this.element.nativeElement.clientHeight;
    const innerHeight = event.target.defaultView.innerHeight
    if(window.scrollY >= clientHeight - innerHeight){
      window.scrollTo(0, clientHeight - innerHeight);
    }
  }

}

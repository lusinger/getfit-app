import { trigger, animate, style, transition } from "@angular/animations";


const growVertically = trigger('growV', [
  transition(':enter', [
    style({opacity: 0, transform: 'scaleY(0)'}),
    animate(300, style({opacity: 1, transform: 'scaleY(1)'})),
  ]),
  transition(':leave', [
    style({opacity: 1, transform: 'scaleY(1)'}),
    animate(300, style({opacity: 0, transform: 'scaleY(0)'})),
  ]),
]);

export {growVertically};
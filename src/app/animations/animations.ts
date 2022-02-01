import { animate, trigger, style, transition } from "@angular/animations";

const topIn = trigger('topIn', [
  transition(':enter', [
    style({transform: 'translateY(-100vh)'}),
    animate(300, style({transform: 'translateY(0vh)'})),
  ]),
  transition(':leave', [
    style({transform: 'translateY(0vh)'}),
    animate(300, style({transform: 'translateY(-100vh)'})),
  ]),
]);

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

export {topIn, growVertically};
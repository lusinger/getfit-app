import { animate, trigger, style, transition, animation } from "@angular/animations";

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

export {topIn};
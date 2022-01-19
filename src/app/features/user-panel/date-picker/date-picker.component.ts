import { Component, OnInit, Input } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'getfit-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.sass'],
  animations: [
    trigger('toggleOverlay', [
      transition(':enter', [
        style({transform: 'translateY(-100vh)'}),
        animate(300, style({transform: 'translateY(0vh)'})),
      ]),
      transition(':leave', [
        style({transform: 'translateY(0vh)'}),
        animate(300, style({transform: 'translateY(-100vh)'})),
      ]),
    ])
  ],
})
export class DatePickerComponent implements OnInit {
  @Input() overlayState: 'open' | 'closed' = 'closed';

  days: string[] = ['Mo', 'Th', 'Tu', 'We', 'Fr', 'Sa', 'Su'];
  fields: number[] = [1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7, 1, 31, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7,]

  constructor() { }

  ngOnInit(): void {
    addEventListener('scroll', () => {
      if(this.overlayState === 'open'){
        window.scrollTo(0, 0);
      }
    });
  }

  toggleOverlay(): void{
    if(this.overlayState === 'open'){
      this.overlayState = 'closed';
    }else{
      this.overlayState = 'open';
    }
  }
}

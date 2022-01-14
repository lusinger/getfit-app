import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'getfit-scroll-up',
  templateUrl: './scroll-up.component.html',
  styleUrls: ['./scroll-up.component.sass'],
  animations: [
    trigger('toggleScroll', [
      transition(':enter', [
        style({opacity: 0, transform: 'scale(0.75)'}),
        animate(250, style({opacity: 1, transform: 'scale(1)'})),
      ]),
      transition(':leave', [
        style({opacity: 1, transform: 'scale(1)'}),
        animate(250, style({opacity: 0, transform: 'scale(0.75)'})),
      ]),
    ])
  ]
})
export class ScrollUpComponent implements OnInit {
  showScrollUp: boolean = false;

  constructor() { }

  ngOnInit(): void {
    document.addEventListener('scroll', (event) => {
      const height = window.innerHeight + window.outerHeight;
      if(Math.floor((100 / height) * window.scrollY) > 40){
        this.showScrollUp = true;
      }else{
        this.showScrollUp = false;
      }
    });
  }

  onClick(): void{
    window.scrollTo(0, 0);
  }
}

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
  windowHeight: number = 0;

  constructor() { }

  ngOnInit(): void {
    document.addEventListener('scroll', (event) => {
      if(Math.floor((100 / this.windowHeight) * window.scrollY) > 35){
        this.showScrollUp = true;
      }else{
        this.showScrollUp = false;
      }
    });
    document.addEventListener('resize', this.calculateViewSize);
  }

  onClick(): void{
    window.scrollTo(0, 0);
  }

  calculateViewSize(): void{
    this.windowHeight = window.innerHeight + window.outerHeight;
  } 
}

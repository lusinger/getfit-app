import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'getfit-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.sass']
})
export class DatePickerComponent implements OnInit {

  days: string[] = ['Mo', 'Th', 'Tu', 'We', 'Fr', 'Sa', 'Su'];
  fields: number[] = [1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7, 1, 31, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7,]

  constructor() { }

  ngOnInit(): void {
    addEventListener('scroll', () => {
      window.scrollTo(0, 0);
    });
  }
}

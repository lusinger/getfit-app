import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { StateMachineService } from 'src/app/services/state-machine.service';

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
  @Input() currentDate: Date = new Date();

  @Output() selectedDateChanged = new EventEmitter<Date>();

  selectedDate: Date = {} as Date;

  days: string[] = ['Mo', 'Th', 'Tu', 'We', 'Fr', 'Sa', 'Su'];
  dates: Date[] = [];

  constructor(private state: StateMachineService) { }

  ngOnInit(): void {
    this.state.selectedDate.subscribe((date) => {
      this.selectedDate = date;
    });
    this.dates = this.generateCalendar(this.selectedDate);
    addEventListener('scroll', () => {
      if(this.overlayState === 'open'){
        window.scrollTo(0, 0);
      }
    });
  }

  generateCalendar(date: Date): Date[]{
    const dates: Date[] = [];
    dates.push(date);
    if(date.getDate() !== 0){
      for(let index = 1; index < date.getDate(); index++){
        dates.unshift(this.getPrevDate(dates[0]));
      }
      const firstDay = dates[0].getDay();
      if(dates[0].getDay() !== 1){
        for(let index = 1; index < firstDay; index++){
          dates.unshift(this.getPrevDate(dates[0]));
        }
      }
    }else{
      const firstDay = dates[0].getDay();
      if(dates[0].getDay() !== 1){
        for(let index = 1; index < firstDay; index++){
          dates.unshift(this.getPrevDate(dates[0]));
        }
      }
    }
    const length = dates.length;
    for(let index = 1; index <= 42 - length; index++){
      dates.push(this.getNextDate(dates[dates.length - 1]));
    }
    return dates;
  }

  getPrevDate(date: Date): Date{
    const prevDate = new Date(date);
    prevDate.setDate(prevDate.getDate() - 1);
    return prevDate;
  }

  getNextDate(date: Date): Date{
    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1);
    return nextDate;
  }

  getPrevMonth(date: Date): Date{
    const prevMonth = new Date(date);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    return prevMonth;
  }

  getNextMonth(date: Date): Date{
    const nextMonth = new Date(date);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    return nextMonth;
  }

  selectPrevDate(date: Date): void{
    this.selectDate(this.getPrevDate(date));
  }

  selectNextDate(date: Date): void{
    this.selectDate(this.getNextDate(date));
  }

  selectPrevMonth(date: Date): void{
    this.selectDate(this.getPrevMonth(date));
  }

  selectNextMonth(date: Date): void{
    this.selectDate(this.getNextMonth(date));
  }


  selectDate(date: Date): void{
    if(date.getMonth() !== this.selectedDate.getMonth()){
      this.selectedDate = date;
      this.dates = [];
      this.dates = this.generateCalendar(this.selectedDate);
    }else{
      this.selectedDate = date;
    }
    this.state.setSelectedDate(date);
  }

  toggleOverlay(): void{
    if(this.overlayState === 'open'){
      this.overlayState = 'closed';
    }else{
      this.overlayState = 'open';
    }
  }
}

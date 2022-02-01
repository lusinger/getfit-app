import { Component, OnInit, Input } from '@angular/core';
import { StateMachineService } from 'src/app/services/state-machine.service';
import { State } from 'src/app/types/types';

import { topIn } from 'src/app/animations/animations';

@Component({
  selector: 'getfit-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.sass'],
  animations: [topIn,],
})
export class DatePickerComponent implements OnInit {
  @Input() overlayState: State = 'closed';
  
  currentDate: Date = new Date();
  selectedDate: Date = {} as Date;

  days: string[] = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  dates: Date[] = [];

  constructor(private state: StateMachineService) { }

  ngOnInit(): void {
    this.state.selectedDate.subscribe((date) => {
      this.selectedDate = date;
    });
    this.dates = this.generateCalendar(this.selectedDate);
  }

  generateCalendar(date: Date): Date[]{
    this.dates = [];
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

  selectDate(date: Date): void{
    if(date.getMonth() !== this.selectedDate.getMonth()){
      this.state.setSelectedDate(date);
      this.dates = this.generateCalendar(this.selectedDate);
    }else{
      this.state.setSelectedDate(date);
    }
  }

  toggleOverlay(): void{
    if(this.overlayState === 'open'){
      this.overlayState = 'closed';
    }else{
      this.overlayState = 'open';
    }
  }
}

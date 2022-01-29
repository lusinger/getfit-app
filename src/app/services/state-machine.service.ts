import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateMachineService {
  _selectedDate = new BehaviorSubject<Date>(new Date());
  selectedDate = this._selectedDate.asObservable();

  constructor() { }

  getSelectedDate(): Observable<Date>{
    return this.selectedDate;
  }
  setSelectedDate(date: Date){
    this._selectedDate.next(date);
  }
}

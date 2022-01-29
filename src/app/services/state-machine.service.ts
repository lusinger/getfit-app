import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Sections } from '../types/sections';

@Injectable({
  providedIn: 'root'
})
export class StateMachineService {
  _selectedDate = new BehaviorSubject<Date>(new Date());
  selectedDate = this._selectedDate.asObservable();

  _selectedSection = new BehaviorSubject<Sections>('breakfast');
  selectedSection = this._selectedSection.asObservable();

  constructor() { }

  getSelectedDate(): Observable<Date>{
    return this.selectedDate;
  }
  setSelectedDate(date: Date){
    this._selectedDate.next(date);
  }

  getSelectedSection(): Observable<Sections>{
    return this.selectedSection;
  }
  setSelectedSection(section: Sections){
    this._selectedSection.next(section);
  }
}

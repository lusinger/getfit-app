import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { Sections } from '../types/sections';
import { Entry } from '../interfaces/entry';

@Injectable({
  providedIn: 'root'
})
export class StateMachineService {
  _selectedDate = new BehaviorSubject<Date>(new Date());
  selectedDate = this._selectedDate.asObservable();

  _selectedSection = new BehaviorSubject<Sections>('breakfast');
  selectedSection = this._selectedSection.asObservable();

  _entries = new BehaviorSubject<Entry[]>([]);
  entries = this._entries.asObservable();

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

  getEntries(): Observable<Entry[]>{
    return this.entries;
  }
  setEntries(entries: Entry[]){
    this._entries.next(entries);
  }
}

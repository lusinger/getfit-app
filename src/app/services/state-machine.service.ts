import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { Sections } from '../types/sections';
import { Entry } from '../interfaces/entry';
import { User } from '../interfaces/user';

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

  _entriesRemoved = new BehaviorSubject<Entry>({} as Entry);
  entriesRemoved = this._entriesRemoved.asObservable();

  _loadedUser = new BehaviorSubject<User>({} as User);
  loadedUser = this._loadedUser.asObservable();

  _entryToEdit = new BehaviorSubject<Entry>({} as Entry);
  entryToEdit = this._entryToEdit.asObservable();

  constructor() { }

  //#region getting and setting application state
  getApplicationState(){
    return localStorage.getItem('applicationState');
  }
  setApplicationState(state: 'loged in' | 'loged out'){
    localStorage.setItem('applicationState', state);
  }
  //#endregion

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

  getEntryToEdit(): Observable<Entry>{
    return this.entryToEdit;
  }
  setEntryToEdit(entry: Entry){
    this._entryToEdit.next(entry);
  }

  getLoadedUser(): Observable<User>{
    return this.loadedUser;
  }
  setLoadedUser(user: User): void{
    this._loadedUser.next(user);
  }
}

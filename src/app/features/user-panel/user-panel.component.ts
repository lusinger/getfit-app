import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { DataService } from 'src/app/services/data.service';

import {User} from '../../interfaces/user';

interface EntryData{
  breakfast: any[];
  lunch: any[];
  dinner: any[];
  snack: any[];
}

@Component({
  selector: 'getfit-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.sass']
})
export class UserPanelComponent implements OnInit {
  userData: User | null = null;
  entryData: EntryData = {
    breakfast: [], 
    lunch: [], 
    dinner: [], 
    snack: []
  };

  selectedDate: Date = new Date();
  settingsState: 'open' | 'closed' = 'closed';
  searchState: 'open' | 'closed' = 'closed';

  constructor(
    private auth: AuthService,
    private data: DataService) { }

  ngOnInit(): void {
    this.auth.loadUser().subscribe({
      next: (response) => {
        console.log(response);
        this.userData = response.payload;
      },
    });
    this.data.getEntries(this.selectedDate).subscribe({
      next: (response) => {
        this.entryData = {breakfast: [], lunch: [], dinner: [], snack: []};
        this.entryData.breakfast = response.payload?.breakfast;
        this.entryData.lunch = response.payload?.lunch;
        this.entryData.dinner = response.payload?.dinner;
        this.entryData.snack = response.payload?.snack;
        console.log(this.entryData);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  openSettings(): void{
    this.settingsState = 'open';
  }

  closeSettings($event: 'open' | 'closed'): void{
    this.settingsState = $event;
  }
  
  onOpenSearchOverlay(): void{
    this.settingsState = 'closed';
    this.searchState = 'open';
  }

  toggleOverlay($event: 'open' | 'closed'): void{
    if(this.searchState === 'open'){
      this.searchState = 'closed';
    }else{
      this.searchState = 'open';
    }
  }
  
  onSelectedDateChanged($event: Date): void{
    this.selectedDate = $event;
    this.data.getEntries(this.selectedDate).subscribe({
      next: (response) => {
        this.entryData = {breakfast: [], lunch: [], dinner: [], snack: []};
        this.entryData.breakfast = response.payload.breakfast;
        this.entryData.lunch = response.payload.lunch;
        this.entryData.dinner = response.payload.dinner;
        this.entryData.snack = response.payload.snack;
        console.log(this.entryData);
      }
    });
  }
}

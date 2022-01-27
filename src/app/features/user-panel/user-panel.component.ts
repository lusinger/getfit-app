import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

import {Entry} from '../../interfaces/entry';
import { Sections } from 'src/app/types/sections';
import { SectionEntries } from 'src/app/classes/section-entries';
import { AuthResponse } from 'src/app/interfaces/auth-response';

@Component({
  selector: 'getfit-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.sass']
})
export class UserPanelComponent implements OnInit {
  entries = new SectionEntries([], [], [], []);
  entriesChanged: boolean = false;

  selectedDate: Date = new Date();
  selectedSection: Sections = 'undefined';
  settingsState: 'open' | 'closed' = 'closed';
  searchState: 'open' | 'closed' = 'closed';

  constructor(
    private auth: AuthService,
    private data: DataService) { }

  ngOnInit(): void {
    this.auth.loadUser().subscribe({
      next: (response) => {
        this.auth.setUser(response.payload);
      },
    });
    this.fetchEntries(this.selectedDate);
  }

  openSettings(): void{
    this.settingsState = 'open';
  }

  closeSettings($event: 'open' | 'closed'): void{
    this.settingsState = $event;
  }
  
  onOpenSearchOverlay($event: Sections): void{
    this.settingsState = 'closed';
    this.selectedSection = $event;
    this.searchState = 'open';
  }

  toggleOverlay($event: 'open' | 'closed'): void{
    if(this.searchState === 'open'){
      this.searchState = 'closed';
    }else{
      this.searchState = 'open';
    }
  }
  
  onDateChanged($event: Date): void{
    this.selectedDate = $event;
    this.data.changeToDate(this.selectedDate);
    this.fetchEntries(this.selectedDate);
  }

  fetchEntries(date: Date): void{
    this.entries.clearData();
    this.data.getEntries(date).subscribe({
      next: (response: Entry[]) => {
        this.entries.addData(response);
        this.data.entryToAdd(response);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {

      }
    });
  }

  onEntriesAdded(): void{
    this.fetchEntries(this.selectedDate);
  }
}

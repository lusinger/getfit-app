import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { StateMachineService } from 'src/app/services/state-machine.service';

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

  selectedDate: Date = {} as Date;
  settingsState: 'open' | 'closed' = 'closed';
  searchState: 'open' | 'closed' = 'closed';

  constructor(
    private auth: AuthService,
    private data: DataService,
    private state: StateMachineService) { }

  ngOnInit(): void {
    this.state.selectedDate.subscribe((date) => {
      this.selectedDate = date;
      this.fetchEntries(this.selectedDate);
    });

    this.auth.loadUser().subscribe({
      next: (response) => {
        this.state.setLoadedUser(response.payload);
      },
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

  fetchEntries(date: Date): void{
    this.entries.clearData();
    this.data.getEntries(date).subscribe({
      next: (response: Entry[]) => {
        this.state.setEntries(response);
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

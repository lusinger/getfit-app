import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class UserPanelComponent implements OnInit, OnDestroy {
  entries = new SectionEntries([], [], [], []);
  refreshInterval: NodeJS.Timeout = {} as NodeJS.Timeout;

  selectedDate: Date = {} as Date;
  settingsState: 'open' | 'closed' = 'closed';
  searchState: 'open' | 'edit' | 'closed' = 'closed';

  constructor(
    private auth: AuthService,
    private data: DataService,
    private state: StateMachineService) { }

  ngOnInit(): void {
    //--refresh token all 10min => 600000ms
    this.refreshInterval = setInterval(() => {
      if(this.auth.user){
        this.auth.refreshToken(this.auth.user.mail).subscribe({
          next: response => {
            console.log(response);
          }
        });
      }
    }, 600000);

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

  ngOnDestroy(): void {
    //--clear interval if Component is destroyed
    clearInterval(this.refreshInterval);
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

  toggleOverlay($event: 'open' | 'edit' | 'closed'): void{
    if(this.searchState === 'open' || this.searchState === 'edit'){
      this.searchState = 'closed';
    }else{
      this.searchState = $event;
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

  onOpenEdit($event: {section: Sections, entry: Entry}): void{
    this.selectedSection = $event.section;
    this.selectedEntry = $event.entry;
    this.toggleOverlay('edit');
    this.data.updateEntry(this.entries.breakfast[0]);
  }
}

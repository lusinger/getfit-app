import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { StateMachineService } from 'src/app/services/state-machine.service';

import { SectionEntries } from 'src/app/classes/section-entries';
import { AuthResponse, Entry } from 'src/app/interfaces/interfaces';
import { Sections } from 'src/app/types/types';

@Component({
  selector: 'getfit-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.sass']
})
export class UserPanelComponent implements OnInit, OnDestroy {
  entries = new SectionEntries([], [], [], []);
  refreshInterval: any;

  selectedDate: Date = {} as Date;
  settingsState: 'open' | 'closed' = 'closed';
  searchState: 'open' | 'edit' | 'closed' = 'closed';

  constructor(
    private auth: AuthService,
    private data: DataService,
    private state: StateMachineService) { }

  ngOnInit(): void {
    //--refresh token all 10min => 500000ms
    this.refreshInterval = setInterval(() => {
      if(this.auth.user){
        this.auth.refreshToken(this.auth.user.mail).subscribe({
          next: response => {
            console.log(response);
          }
        });
      }
    }, 500000);

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

  onOpenEdit($event: Entry): void{
    this.state.setEntryToEdit($event);
    this.toggleOverlay('edit');
  }
}

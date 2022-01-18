import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

import {User} from '../../interfaces/user';

@Component({
  selector: 'getfit-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.sass']
})
export class UserPanelComponent implements OnInit {
  userData: User | null = null;

  selectedDate: Date = new Date();
  settingsState: 'open' | 'closed' = 'closed';
  searchState: 'open' | 'closed' = 'closed';

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    console.log('hello');
    this.auth.loadUser().subscribe({
      next: (response) => {
        console.log(response);
        this.userData = response.payload;
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
    
  }
}

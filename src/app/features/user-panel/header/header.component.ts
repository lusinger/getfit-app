import { Component, OnInit } from '@angular/core';
import { State } from 'src/app/types/state';

@Component({
  selector: 'getfit-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  settingsState: State = 'closed';

  constructor() { }

  ngOnInit(): void {
  }

  toggleSettings(): void{
    this.settingsState === 'closed' ? this.settingsState = 'open' : this.settingsState = 'closed';
  }
}

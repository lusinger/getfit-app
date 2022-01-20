import { Component, OnInit} from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'getfit-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.sass'],
  animations: [
    trigger('toggleSettings', [
      transition(':enter', [
        style({transform: 'translateY(-100%)'}),
        animate(350, style({transform: 'translateY(0)'})),
      ]),
      transition(':leave', [
        style({transform: 'translateY(0)'}),
        animate(350, style({transform: 'translateY(-100%)'})),
      ]),
    ]),
  ]
})
export class UserSettingsComponent implements OnInit {
  settingsState: 'open' | 'closed' = 'closed';

  constructor() { }

  ngOnInit(): void {
    addEventListener('scroll', () => {
      if(this.settingsState === 'open'){
        window.scrollTo(0, 0);
      }
    });
  }

  toggleSettings(): void{
    if(this.settingsState === 'open'){
      this.settingsState = 'closed';
    }else{
      this.settingsState = 'open';
    }
  }
}

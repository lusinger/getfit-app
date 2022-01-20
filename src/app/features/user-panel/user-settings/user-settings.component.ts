import { Component, HostListener, OnInit} from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';

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

  constructor(
    private auth: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  toggleSettings(): void{
    if(this.settingsState === 'open'){
      this.settingsState = 'closed';
    }else{
      this.settingsState = 'open';
    }
  }

  logout(): void{
    this.auth.logout().subscribe({
      next: response => {
        this.auth.toggleLogin();
        this.router.navigate(['login']);
      }
    });
  }

  @HostListener('window:scroll', ['$event'])
  lockScroll(event: any): void{
    if(this.settingsState === 'open'){
      window.scrollTo(0, 0);
    }
  }
}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user';

import { checkPassword } from 'src/app/validators/check-password';

@Component({
  selector: 'getfit-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.sass'],
  animations: [
    trigger('inOut', [
      transition(':enter', [
        style({opacity: 1, transform: 'translateY(-100%)'}),
        animate(500, style({opacity: 1, transform: 'translateY(0%)'})),
      ]),
      transition(':leave', [
        style({opacity: 1, transform: 'translateY(0%)'}),
        animate(500, style({opacity: 1, transform: 'translateY(-100%)'})),
      ]),
    ])
  ]
})
export class UserSettingsComponent implements OnInit {
  @Input() userData: User | null = null;
  @Input() settingsState: 'open' | 'closed' = 'closed';

  @Output() onSettingClose = new EventEmitter<'open' | 'closed'>();

  settingsForm = new FormGroup({
    userName: new FormControl('', []),
    mail: new FormControl('', [Validators.email]),
    oldPassword: new FormControl('', [Validators.minLength(8)]),
    password: new FormControl('', [Validators.minLength(8)]),
    retype: new FormControl('', [Validators.minLength(8)]),
    fullName: new FormControl('', []),
    age: new FormControl('', []),
    height: new FormControl('', []),
    currentWeight: new FormControl('', []),
    targetWeight: new FormControl('', []),
    changePerWeek: new FormControl('', []),
    gender: new FormControl('', []),
  }, [checkPassword('password', 'retype')]);

  constructor() { }

  ngOnInit(): void {
  }

  closeSettings(): void{
    this.onSettingClose.emit('closed');
  }
}

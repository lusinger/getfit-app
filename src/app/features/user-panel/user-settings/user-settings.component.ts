import { Component, HostListener, OnInit} from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { User } from 'src/app/interfaces/user';
import { StateMachineService } from 'src/app/services/state-machine.service';

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
  settingsForm = this.fb.group({
    userName: [''],
    mail:  [''],
    oldPassword: [''],
    newPassword: [''],
    retype: [''],
    fullName: [''],
    age: [''],
    height: [''],
    currentWeight: [''],
    targetWeight: [''],
    changePerWeek: [''],
    activityRating: [''],
    gender: [''],
  });

  currentCalories: number = 0;
  profilePicture: File | null = null;

  settingsState: 'open' | 'closed' = 'closed';
  confirmationState: 'open' | 'closed' = 'closed';

  subStates: ('open' | 'closed')[] = ['closed', 'closed'];
  userData: User | null = null;
  fd = new FormData();

  constructor(
    private auth: AuthService,
    private router: Router,
    private state: StateMachineService,
    private data: DataService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  toggleSettings(): void{
    if(this.settingsState === 'open'){
      this.settingsState = 'closed';
    }else{
      this.settingsState = 'open';
    }
    if(this.auth.user !== null && this.userData === null){
      this.userData = this.auth.getUser();
    }
  }

  toggleConfirmation(): void{
    this.confirmationState === 'open' ? this.confirmationState = 'closed' : this.confirmationState = 'open';
  }

  logout(): void{
    this.auth.logout().subscribe({
      next: response => {
        this.state.setApplicationState('loged out');
        this.router.navigate(['login']);
      }
    });
  }

  deleteUser(): void{
    this.toggleConfirmation();
    if(this.auth.user){
      this.auth.deleteUser(this.auth.user.id).subscribe({
        next: (response) => {
          if(response.statusCode === 200){
            this.router.navigate(['']);
          }
        }
      });
    }
  }

  toggleSection(index: number): void{
    if(this.subStates[index] === 'closed'){
      this.subStates[index] = 'open';
      this.subStates.map((state, i) => {
        if(i !== index){
          this.subStates[i] === 'open' ? this.subStates[i] = 'closed' : this.subStates[i];
        }
      });
    }else{
      this.subStates[index] = 'closed';
      this.subStates.map((state, i) => {
        if(i !== index){
          this.subStates[i] === 'closed' ? this.subStates[i] : this.subStates[i] = 'open';
        }
      });
    }
  }

  fileSelected($event: any): void{
    this.profilePicture = $event.target.files[0];
    if(this.profilePicture){
      this.fd.append('profilePicture', this.profilePicture, this.profilePicture.name);
    }
  }

  onSendImage(): void{
    if(this.profilePicture !== null){
      this.data.addImage(this.fd).subscribe({
        next: (response) => {
        }
      })
    }
  }
}

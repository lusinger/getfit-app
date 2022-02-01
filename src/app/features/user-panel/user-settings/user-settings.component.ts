import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { User } from 'src/app/interfaces/user';
import { StateMachineService } from 'src/app/services/state-machine.service';
import { State } from 'src/app/types/state';

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

  @Input() settingsState: State = 'closed';
  @Output() closingSettings = new EventEmitter();
  confirmationState: State = 'closed';

  subStates: State[] = ['open', 'closed'];
  userData: User = {} as User;
  fd = new FormData();

  constructor(
    private auth: AuthService,
    private router: Router,
    private state: StateMachineService,
    private data: DataService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.state.loadedUser.subscribe({
      next: user => {
        this.userData = user;
        this.settingsForm.get('userName')?.setValue(this.userData.userName);
        this.settingsForm.get('mail')?.setValue(this.userData.mail);
        this.settingsForm.get('fullName')?.setValue(this.userData.fullName);
        this.settingsForm.get('age')?.setValue(this.userData.age);
        this.settingsForm.get('height')?.setValue(this.userData.height);
        this.settingsForm.get('currentWeight')?.setValue(this.userData.currentWeight);
        this.settingsForm.get('targetWeight')?.setValue(this.userData.targetWeight);
        this.settingsForm.get('changePerWeek')?.setValue(this.userData.changePerWeek);
        this.settingsForm.get('activityRating')?.setValue(this.userData.activityRating);
        this.settingsForm.get('gender')?.setValue(this.userData.gender);
      },
    });
    /* this.state.sectionCalories.subscribe((data) => {
      this.currentCalories = (data.breakfast + data.dinner + data.lunch + data.snack);
    }); */
  }

  onChangingOption($event: {[key: string]: number | string}): void{
    this.settingsForm.get('activityRating')?.setValue($event['value']);
  }

  closeSettings(): void{
    this.closingSettings.emit();
  }

  toggleConfirmation(): void{
    this.confirmationState === 'open' ? this.confirmationState = 'closed' : this.confirmationState = 'open';
  }

  logout(): void{
    this.auth.logout().subscribe({
      next: (response) => {
        this.state.setApplicationState('loged out');
        this.router.navigate(['login']);
      }
    });
  }

  deleteUser(): void{
    this.toggleConfirmation();
    this.auth.deleteUser(this.userData.id).subscribe({
      next: (response) => {
        if(response.statusCode === 200){
          this.router.navigate(['']);
        }
      }
    });
  }

  updateUser(): void{
    this.auth.updateUser({data: this.settingsForm.value, id: this.userData.id}).subscribe({
      next: (response) => {
        console.log(response);
      }
    });
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

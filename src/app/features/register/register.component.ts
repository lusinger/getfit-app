import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { checkPassword } from 'src/app/validators/check-password';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'getfit-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    userName: new FormControl('', [Validators.required, ]),
    mail: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    retype: new FormControl('', [Validators.required, Validators.minLength(8)]),
    fullName: new FormControl('', [Validators.required, ]),
    age: new FormControl('', [Validators.required, ]),
    height: new FormControl('', [Validators.required, ]),
    currentWeight: new FormControl('', [Validators.required, ]),
    targetWeight: new FormControl('', [Validators.required, ]),
    changePerWeek: new FormControl('', [Validators.required, ]),
    gender: new FormControl('', [Validators.required, ]),
    activityRate: new FormControl('', [Validators.required]),
  }, [checkPassword('password', 'retype')]);

  formTitle: string = 'getfit';
  errorMessage: string = '';

  optionsShown: boolean = false;
  selectedActivity: {key: string, value: number} = {
    key: 'sedentary',
    value: 1.2,
  };

  activityRatings: {[key: string]: number} = {
    'sedentary': 1.2,
    'lightly active': 1.375,
    'moderatly active': 1.55,
    'very active': 1.725,
    'extra active': 1.9,
  };

  constructor(
    private auth: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.registerForm.get('activityRate')?.setValue(1.2);
  }

  onTextChanged($event: string): void{
    this.formTitle = $event;
  }

  onRegisterSubmit(): void{
    this.errorMessage = '';
    this.auth.register(this.registerForm.value).subscribe({
      next: (response) => {
        if(response.statusCode === 201){
          this.registerForm.reset();
          this.navigateTo('login');
        }
        if(response.statusCode === 409){
          this.errorMessage = response.message;
        }
      },
    });
  }

  changeActivity(option: any): void{
    this.selectedActivity = option
    this.registerForm.get('activityRate')?.setValue(option.value);
    this.optionsShown = false;
  }

  toggleOptions(): void{
    this.optionsShown = !this.optionsShown;
  }

  navigateTo(route: string): void{
    this.router.navigate([location]);
  }
}

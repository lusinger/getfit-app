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
      },
      error: (err) => {
        if(err.error.statusCode === 409){
          this.errorMessage = err.error.message;
        }
      }
    });
  }

  onChangingOption($event: {[key: string]: number | string}): void{
    this.registerForm.get('activityRate')?.setValue($event['value']);
    this.registerForm.get('activityRate')?.value;
  }

  navigateTo(route: string): void{
    this.router.navigate([route]);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { checkPassword } from 'src/app/validators/check-password';

import { AuthService } from 'src/app/services/auth.service';
import { AuthResponse } from 'src/app/interfaces/auth-response';
import { RegisterRequest } from 'src/app/interfaces/register-request';

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

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
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
        }
        if(response.statusCode === 409){
          this.errorMessage = response.message;
        }
      },
    });
  }
}

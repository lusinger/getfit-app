import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthResponse } from 'src/app/interfaces/auth-response';

import { AuthService } from 'src/app/services/auth.service';
import { StateMachineService } from 'src/app/services/state-machine.service';

//--import for whitespace validator to refuse usernames white leading and trailing whitespaces
import { checkWhitespace } from 'src/app/validators/check-whitespace';
@Component({
  selector: 'getfit-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  formTitle: string = 'getfit';
  errorMessage: string = '';
  
  loginForm = new FormGroup({
    user: new FormControl('', [checkWhitespace(), Validators.required, ]),
    password: new FormControl('', [Validators.required]),
  });
  
  constructor(
    private auth: AuthService,
    private router: Router,
    private state: StateMachineService,
  ) { }

  ngOnInit(): void {
    this.state.setApplicationState('loged out');
  }

  login(): void{
    this.auth.login(this.loginForm.value).subscribe({
      next: (response) => {
        switch(response.statusCode){
          case 200:
            this.state.setApplicationState('loged in');
            this.loginForm.reset();
            this.navigateTo('userpanel');
            break;
        }
      },
      error: (err) => {
        if(err.error.statusCode === 404){
          this.errorMessage = err.error.message;
        }
      }
    });
  };

  onTextChanged($event: string): void{
    this.formTitle = $event;
  }

  navigateTo(location: string): void{
    this.router.navigate([location]);
  }
}
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';

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
  ) { }

  ngOnInit(): void {
  }

  onLoginSubmit(): void{
    this.auth.login(this.loginForm.value).subscribe({
      next: (response) => {
        console.log(response);
        switch(response.statusCode){
          case 200:
            this.auth.toggleLogin();
            this.loginForm.reset();
            this.navigateTo('userpanel');
            break;
          case 404:
            this.errorMessage = response.message;
            break;
        }
      },error: (err) => {throw err},
      complete: () => {
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

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
  loginForm = new FormGroup({
    user: new FormControl('', [checkWhitespace(), Validators.required, ]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  formTitle: string = 'getfit';

  constructor(
    private auth: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onLoginSubmit(): void{
    this.auth.login(this.loginForm.value).subscribe({
      next: (response) => {
        if(response.statusCode === 200){
          this.auth.toggleLogin();
          this.loginForm.reset();
          this.router.navigate(['userpanel'], {});
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

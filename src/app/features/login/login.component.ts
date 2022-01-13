//TODO: Create and add service containing login method to reach server
//TODO: Redirect to UserPanel if login is successfull
//FIXME: validator does not return error if whitespace is added
//TODO: Create and add Directive that typewrites title of form
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
    password: new FormControl('', [Validators.required, ]),
  });

  constructor() { }

  ngOnInit(): void {
  }

}

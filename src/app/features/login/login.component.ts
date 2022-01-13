//TODO: Create and add service containing login method to reach server
//TODO: Redirect to UserPanel if login is successfull
//TODO: Create Validator that disallows whitespaces
//TODO: Create and add Directive that typewrites title of form
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'getfit-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    user: new FormControl('', [Validators.required, ]),
    password: new FormControl('', [Validators.required, ]),
  });

  constructor() { }

  ngOnInit(): void {
  }

}

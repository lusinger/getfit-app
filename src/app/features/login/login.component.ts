//TODO: Create FromGroup and Control for loginForm
//TODO: Disable submit button while loginForm is not valid
//TODO: Create and add service containing login method to reach server
//TODO: Redirect to UserPanel if login is successfull
//TODO: Create Validator that disallows whitespaces
//TODO: Create and add Directive that typewrites title of form
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'getfit-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

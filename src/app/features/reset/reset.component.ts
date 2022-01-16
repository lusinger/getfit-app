import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { checkPassword } from 'src/app/validators/check-password';

@Component({
  selector: 'getfit-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.sass']
})
export class ResetComponent implements OnInit {
  resetForm = new FormGroup({
    mail: new FormControl('', [Validators.required, Validators.email]),
  });

  passwordForm = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    retype: new FormControl('', [Validators.required, Validators.minLength(8)]),
  }, [checkPassword('password', 'retype'), ]);

  formTitle: string = 'getfit';
  errorMessage: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  onTextChanged($event: string): void{
    this.formTitle = $event;
  }

  onMailSubmit(): void{
    this.resetForm.reset();
  }

  onPasswordSubmit(): void{
    this.passwordForm.reset();
  }
}

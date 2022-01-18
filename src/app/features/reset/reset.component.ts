import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

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

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
  }

  onTextChanged($event: string): void{
    this.formTitle = $event;
  }

  onMailSubmit(): void{
    this.auth.resetPassword(this.resetForm.value.mail).subscribe({
      next: (response) => {
        console.log(response);
      }
    });
    this.resetForm.reset();
  }

  onPasswordSubmit(): void{
    this.passwordForm.reset();
  }

  navigateTo(location: string): void{
    this.router.navigate([location]);
  }
}

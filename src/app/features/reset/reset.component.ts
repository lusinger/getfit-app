import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
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

  showResetForm: boolean = false;

  constructor(private router: Router, private auth: AuthService, private active: ActivatedRoute) { }

  ngOnInit(): void {
    setTimeout(() => {
      let query: any;
      this.active.queryParams.subscribe({
        next: (param) => {
          console.log(param['access']);
          query = param['access'];
        },
      });
      this.auth.resetPwRequest({access: query}).subscribe({
        next: (response) => {
          console.log(response)
          if(response.payload){
            this.showResetForm = response.payload.allowReset;
          }
        }
      });
    }, 100);
  }

  onTextChanged($event: string): void{
    this.formTitle = $event;
  }

  onMailSubmit(): void{
    this.auth.resetPwRequest({mail: this.resetForm.value.mail}).subscribe({
      next: (response) => {
        console.log(response)
        if(response.payload){
          this.showResetForm = response.payload.allowReset;
        }
      }
    });
    this.resetForm.reset();
  }

  onPasswordSubmit(): void{
    this.auth.resetPassword({newPassword: this.passwordForm.value.password}).subscribe({
      next: (response) => {

      }
    });
  }

  navigateTo(location: string): void{
    this.router.navigateByUrl(location);
  }
}

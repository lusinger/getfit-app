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
  resetState: 'mail' | 'password' | 'message' = 'mail';

  constructor(private router: Router, private auth: AuthService, private active: ActivatedRoute) { }

  ngOnInit(): void {
    setTimeout(() => {
      let query: any;
      this.active.queryParams.subscribe({
        next: (param) => {
          query = param['access'];
        },
      });
      this.auth.resetPassword({access: query}).subscribe({
        next: (response) => {
          if(response.payload.allowReset){
            this.resetState = 'password';
          }
        }
      });
    }, 100);
  }

  onTextChanged($event: string): void{
    this.formTitle = $event;
  }

  onMailSubmit(): void{
    this.auth.resetPassword({mail: this.resetForm.value.mail}).subscribe({
      next: (response) => {
        if(response.statusCode === 200){
          this.resetState = 'message';
          this.errorMessage = response.message;
        }
      }
    });
    this.resetForm.reset();
  }

  onPasswordSubmit(): void{
    this.auth.resetPassword({newPassword: this.passwordForm.value.password}).subscribe({
      next: (response) => {
        switch(response.statusCode){
          case 200:
            this.passwordForm.reset();
            this.navigateTo('login'); 
            break;
        }
      },
      error: (err) => {
        if(err.error.statusCode === 409){
          this.errorMessage = err.error.message;
        }
      }
    });
  }

  navigateTo(location: string): void{
    this.router.navigateByUrl(location);
  }
}

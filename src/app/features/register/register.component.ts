import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'getfit-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    userName: new FormControl('', [Validators.required, ]),
    mail: new FormControl('', [Validators.required, ]),
    password: new FormControl('', [Validators.required, ]),
    retype: new FormControl('', [Validators.required, ]),
    fullName: new FormControl('', [Validators.required, ]),
    age: new FormControl('', [Validators.required, ]),
    height: new FormControl('', [Validators.required, ]),
    currentWeight: new FormControl('', [Validators.required, ]),
    targetWeight: new FormControl('', [Validators.required, ]),
    changePerWeek: new FormControl('', [Validators.required, ]),
    gender: new FormControl('', [Validators.required, ]),
  });

  formTitle: string = 'getfit';

  constructor() { }

  ngOnInit(): void {
  }

  onTextChanged($event: string): void{
    this.formTitle = $event;
  }

  onRegisterSubmit(): void{
    
  }
}

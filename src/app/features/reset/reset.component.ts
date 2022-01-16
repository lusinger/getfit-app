import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'getfit-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.sass']
})
export class ResetComponent implements OnInit {
  formTitle: string = 'getfit';
  errorMessage: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  onTextChanged($event: string): void{
    this.formTitle = $event;
  }
}

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'svg-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.sass']
})
export class EditComponent implements OnInit {
  @Input() style: 'light' | 'dark' = 'light';

  constructor() { }

  ngOnInit(): void {
  }
}

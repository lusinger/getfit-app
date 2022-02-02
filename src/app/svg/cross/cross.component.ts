import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'svg-cross',
  templateUrl: './cross.component.html',
  styleUrls: ['./cross.component.sass']
})
export class CrossComponent implements OnInit {
  @Input() style: 'light' | 'dark' = 'light';

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'getfit-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.sass'],
  host: {"(click)": "onClicked($event)"}
})
export class AddItemComponent implements OnInit {
  @Output() openingSearch = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onClicked($event: any): void{
    this.openingSearch.emit();
  }
}

import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'getfit-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.sass'],
  host: {"(click)": "openSearch()"}
})
export class AddItemComponent implements OnInit {
  @Output() openingSearch = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  openSearch(): void{
    this.openingSearch.emit();
  }
}

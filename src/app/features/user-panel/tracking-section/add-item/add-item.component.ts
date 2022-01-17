import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'getfit-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.sass']
})
export class AddItemComponent implements OnInit {
  @Output() openSearchOverlay = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  openSearch(): void{
    this.openSearchOverlay.emit();
  }
}

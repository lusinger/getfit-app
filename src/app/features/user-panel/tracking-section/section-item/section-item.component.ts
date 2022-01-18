import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'getfit-section-item',
  templateUrl: './section-item.component.html',
  styleUrls: ['./section-item.component.sass']
})
export class SectionItemComponent implements OnInit {
  @Output() itemRemoved = new EventEmitter();

  remove: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  removeItem(): void{
    this.remove = true;
    setTimeout(() => {
      this.itemRemoved.emit()
    }, 600)
  }
}

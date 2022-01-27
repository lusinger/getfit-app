import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Entry } from 'src/app/interfaces/entry';

@Component({
  selector: 'getfit-section-item',
  templateUrl: './section-item.component.html',
  styleUrls: ['./section-item.component.sass']
})
export class SectionItemComponent implements OnInit {
  @Input() itemData: Entry = {} as Entry;
  @Output() removingItem = new EventEmitter<Entry>();
  
  remove: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  removeItem(): void{
    this.remove = true;
    //--wait till cross off animation is finished.
    setTimeout(() => {
      this.removingItem.emit(this.itemData)
    }, 600);
  }
}

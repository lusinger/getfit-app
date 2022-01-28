import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Entry } from 'src/app/interfaces/entry';
import { trigger, animate, style, transition } from '@angular/animations';

@Component({
  selector: 'getfit-section-item',
  templateUrl: './section-item.component.html',
  styleUrls: ['./section-item.component.sass'],
  animations: [
    trigger('onLoad', [
      transition(':enter', [
        style({opacity: 0, transform: 'scaleY(0)'}),
        animate(300, style({opacity: 1, transform: 'scaleY(1)'})),
      ]),
    ])
  ],
})
export class SectionItemComponent implements OnInit {
  @Input() itemData: Entry = {} as Entry;
  @Output() removingItem = new EventEmitter<Entry>();
  @Output() openingEdit = new EventEmitter<Entry>();
  
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

  onClicked($event: any): void{
    this.openingEdit.emit(this.itemData);
  }
}

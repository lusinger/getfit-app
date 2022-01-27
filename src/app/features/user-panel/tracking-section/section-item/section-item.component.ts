import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Entry } from 'src/app/interfaces/entry';

@Component({
  selector: 'getfit-section-item',
  templateUrl: './section-item.component.html',
  styleUrls: ['./section-item.component.sass']
})
export class SectionItemComponent implements OnInit {
  @Input() itemData: Entry = {} as Entry;
  @Output() itemRemoved = new EventEmitter<any>();

  remove: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  removeItem(): void{
    this.remove = true;
    setTimeout(() => {
      this.itemRemoved.emit(this.itemData)
    }, 600)
  }

  calculateCalories(): number{
    if(this.itemData.content && 'itemname' in this.itemData.content){
      switch(this.itemData.unit){
        case 'g':
          return this.itemData.amount * this.itemData.content.perg;
        case 'ml':
          return this.itemData.amount * this.itemData.content.perml;
        case 'EL':
          return this.itemData.amount * this.itemData.content.perel;
        default:
          return 0;
      };
    }else{
      return 0;
    }
  }
}

import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'getfit-section-item',
  templateUrl: './section-item.component.html',
  styleUrls: ['./section-item.component.sass']
})
export class SectionItemComponent implements OnInit {
  @Input() itemData: any;
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
    let calories = 0;
    switch(this.itemData.unit){
      case 'g':
        calories = this.itemData.amount * this.itemData.content.perg;
        break;
      case 'ml':
        calories = this.itemData.amount * this.itemData.content.perml;
        break;
      case 'EL':
        calories = this.itemData.amount * this.itemData.content.perel;
        break;
      default:
        calories = 0;
        break;
    };
    return calories;
  }
}

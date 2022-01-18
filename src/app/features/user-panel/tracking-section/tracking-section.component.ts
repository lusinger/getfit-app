import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'getfit-tracking-section',
  templateUrl: './tracking-section.component.html',
  styleUrls: ['./tracking-section.component.sass']
})
export class TrackingSectionComponent implements OnInit {
  @Input() section: string = 'default';

  @Output() openSearchOverlay = new EventEmitter();

  items: any[] = [1, 2, 3];

  constructor() { }

  ngOnInit(): void {
  }

  onItemRemoved($event: number): void{
    this.items = this.items.filter(item => {
      if(this.items.indexOf(item) === $event){
        return false;
      }else{
        return true;
      }
    })
  }

  onOpenSearchOverlay(): void{
    this.openSearchOverlay.emit();
  }
}

import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { Item } from 'src/app/interfaces/item';
import { Entry } from 'src/app/interfaces/entry';

import { DataService } from 'src/app/services/data.service';
import { Units } from 'src/app/types/units';

@Component({
  selector: 'getfit-search-overlay',
  templateUrl: './search-overlay.component.html',
  styleUrls: ['./search-overlay.component.sass'],
  animations: [
    trigger('addedItem', [
      transition(':enter', [
        style({opacity: 0, transform: 'translateX(-100%)'}),
        animate(300, style({opacity: 1, transform: 'translateX(0)'})),
      ]),
      transition(':leave', [
        style({opacity: 1, transform: 'translateX(0)'}),
        animate(300, style({opacity: 0, transform: 'translateX(-100%)'})),
      ]),
    ]),
    trigger('toggleOverlay', [
      transition(':enter', [
        style({transform: 'translateY(-100vh)'}),
        animate(300, style({transform: 'translateY(0vh)'})),
      ]),
      transition(':leave', [
        style({transform: 'translateY(0vh)'}),
        animate(300, style({transform: 'translateY(-100vh)'})),
      ]),
    ])
  ]
})
export class SearchOverlayComponent implements OnInit {
  searchForm = new FormGroup({
    search: new FormControl('', [Validators.required, ]),
  });

  detailForm = new FormGroup({
    amount: new FormControl('', [Validators.required]),
    unit: new FormControl('', [Validators.required]),
  });

  @Output() closeOverlay = new EventEmitter<'open' | 'closed'>();

  @Input() overlayState: 'open' | 'closed' = 'closed';

  addState: 'search' | 'details' = 'search';

  searchValue: string | ' ' = ' ';
  searchResults: Item[] | 'empty' = 'empty';
  addedItems: Entry[] = [];
  selectedItem: Item | null = null;
  units: Units = 'g';

  constructor(
    private data: DataService,
  ) { }

  ngOnInit(): void {
  }

  onInputChange($event: any): void{
    this.data.getItems($event.target.value, 0, 10).subscribe({
      next: (response) => {
        if(response === []){
          this.searchResults = 'empty';
        }else{
          this.searchResults = response;
        }
      }
    });
    this.searchValue = $event.target.value;
  }

  addDetails(item: Item): void{
    this.selectedItem = item;
    this.searchValue = item.itemname;
    this.addState = 'details';
  }

  addItem(): void{
    if(this.selectedItem){
      const newEntry: Entry = {createdon: new Date(), amount: 100, unit: 'EL', isrecipe: false, section: 'breakfast', content: this.selectedItem};
      this.addedItems.push(newEntry);
    }
  }

  removeItem(item: Entry): void{
    this.addedItems = this.addedItems.filter(entry => {
      return entry.createdon.toISOString() === item.createdon.toISOString() ? false : true; 
    })
  }

  closeSearch(): void{
    this.overlayState = 'closed';
    this.closeOverlay.emit('closed');
  }

  @HostListener('window:scroll')
  lockScrolling(): void{
    if(this.overlayState === 'open'){
      window.scrollTo(0, 0);
    }
  }
}

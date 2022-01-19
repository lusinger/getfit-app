import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { Item } from 'src/app/interfaces/item';
import { Entry } from 'src/app/interfaces/entry';

import { DataService } from 'src/app/services/data.service';

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
  })

  addState: 'search' | 'details' = 'search';

  searchValue: string | ' ' = ' ';
  searchResults: Item[] | 'empty' = 'empty';
  addedItems: Entry[] = [];
  selectedItem: Item | null = null;
  units: 'ml' | 'g' | 'El' | 'Pers' = 'g';

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
      const newEntry: Entry = {createdon: new Date(), itemname: this.selectedItem.itemname, amount: 100, unit: 'EL'};
      this.addedItems.push(newEntry);
    }
  }

  removeItem(item: Entry): void{
    this.addedItems = this.addedItems.filter(entry => {
      return entry.createdon.toISOString() === item.createdon.toISOString() ? false : true; 
    })
  }
}

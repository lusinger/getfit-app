import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { Item } from 'src/app/interfaces/item';
import { Entry } from 'src/app/interfaces/entry';

import { DataService } from 'src/app/services/data.service';
import { Units } from 'src/app/types/units';
import { Sections } from 'src/app/types/sections';

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
    unit: new FormControl('g', [Validators.required]),
  });

  @Output() closeOverlay = new EventEmitter<'open' | 'closed'>();
  @Input() overlaySection: Sections | null = null;
  @Input() overlayState: 'open' | 'closed' = 'closed';

  addState: 'search' | 'details' = 'search';

  searchValue: string | ' ' = ' ';
  searchResults: Item[] | 'empty' = 'empty';
  cachedResults: Item[] = [];
  selectedItem: Item | null = null;
  addedItems: Entry[] = [];
  units: Units[] = ['g', 'ml', 'EL', 'Pers'];
  selectedUnit: Units = 'g';

  optionsShown: boolean = false;

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

  addEntry(): void{
    if(this.selectedItem && this.overlaySection){
      const newEntry: Entry = {createdon: new Date(), amount: this.detailForm.value.amount, unit: this.selectedUnit, entryid: this.selectedItem.id, isrecipe: false, section: this.overlaySection};
      this.addedItems.push(newEntry);
      this.cachedResults.push(this.selectedItem);
      this.searchValue = '';
      this.searchForm.reset();
      this.addState = 'search';
      console.log(this.selectedItem);
      console.log(this.cachedResults);
      console.log(this.addedItems);
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

  toggleOptions(): void{
    this.optionsShown = !this.optionsShown;
  }

  selectUnit(unit: Units): void{
    this.selectedUnit = unit;
    this.optionsShown = false;
  }

  onAddToSection(): void{
  }

  getItemName(entry: Entry): string | null{
    if(this.cachedResults){
      const itemValue = this.cachedResults.filter((item) => {
        if(item.id === entry.entryid){
          return true;
        }else{
          return false;
        }
      });
      return itemValue[0].itemname;
    }else{
      return null;
    }
  }

  getItem(entry: Entry): Item{
    if(this.cachedResults){
      const itemValue = this.cachedResults.filter((item) => {
        if(item.id === entry.entryid){
          return true;
        }else{
          return false;
        }
      });
      return itemValue[0];
    }else{
      const defaultItem: Item = {itemname: 'default', protein: 0, fat: 0, carb: 0, perel: 0, perg: 0, perml: 0};
      return defaultItem;
    }
  }
}

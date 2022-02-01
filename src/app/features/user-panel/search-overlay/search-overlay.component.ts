import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Item } from 'src/app/interfaces/item';
import { Entry } from 'src/app/interfaces/entry';

import { DataService } from 'src/app/services/data.service';
import { Sections } from 'src/app/types/sections';
import { AuthService } from 'src/app/services/auth.service';
import { StateMachineService } from 'src/app/services/state-machine.service';
import { User } from 'src/app/interfaces/user';

import { topIn, leftIn } from 'src/app/animations/animations';

@Component({
  selector: 'getfit-search-overlay',
  templateUrl: './search-overlay.component.html',
  styleUrls: ['./search-overlay.component.sass'],
  animations: [leftIn, topIn,]
})
export class SearchOverlayComponent implements OnInit {
  entryToEdit: Entry = {} as Entry;

  editForm = new FormGroup({
    amount: new FormControl('', [Validators.required, ]),
    unit: new FormControl(this.entryToEdit.unit, [Validators.required, ]),
  });
  
  searchForm = new FormGroup({
    search: new FormControl('', [Validators.required, ]),
  });

  detailForm = new FormGroup({
    amount: new FormControl('', [Validators.required]),
    unit: new FormControl('g', [Validators.required]),
  });

  @Output() closeOverlay = new EventEmitter<'open' | 'closed'>();
  @Output() entriesAdded = new EventEmitter();
  @Input() overlayState: 'open' | 'closed' | 'edit' = 'closed';
  loadedUser: User = {} as User;
  selectedDate: Date = {} as Date;
  overlaySection: Sections = 'undefined';
  formState: 'search' | 'details' | 'edit' = 'search';

  searchValue: string | ' ' = ' ';
  searchResults: Item[] = [];
  cachedResults: Item[] = [];
  selectedItem: Item = {} as Item;
  addedEntries: Entry[] = [];
  selectedUnit: {[key: string]: number | string} = {} as {[key: string]: number | string};

  constructor(
    private data: DataService,
    private auth: AuthService,
    private state: StateMachineService,
  ) { }

  ngOnInit(): void {
    this.state.loadedUser.subscribe((user) =>{
      this.loadedUser = user;
    });
    this.state.selectedSection.subscribe((section) => {
      this.overlaySection = section;
    });
    this.state.selectedDate.subscribe((date) => {
      this.selectedDate = date;
    });
    this.state.entryToEdit.subscribe((entry) => {
      this.entryToEdit = entry;
    })
  }

  onInputChange($event: any): void{
    this.searchValue = $event.target.value;
    this.data.getItems(this.searchValue, 0, 10).subscribe({
      next: (response) => {
        this.searchResults = response;
      }
    });
  }

  addDetails(item: Item): void{
    this.selectedItem = item;
    this.searchValue = item.itemname;
    this.formState = 'details';
  }

  addEntry(): void{
    const entry: Entry = {createdon: this.selectedDate, userid: this.loadedUser.id, amount: this.detailForm.value.amount, unit: this.selectedUnit['value'] as string, entryid: this.selectedItem?.id, isrecipe: false, section: this.overlaySection, content: this.selectedItem};
    this.addedEntries.push(entry);
    this.selectedItem && this.cachedResults.push(this.selectedItem);
    this.searchValue = '';
    this.searchForm.reset();
    this.formState = 'search';
  }

  removeItem(item: Entry): void{
    this.addedEntries = this.addedEntries.filter(entry => {
      return entry.createdon.toISOString() === item.createdon.toISOString() ? false : true; 
    })
  }

  closeSearch(): void{
    this.overlayState = 'closed';
    this.searchValue = ' ';
    this.searchResults = [];
    this.cachedResults = [];
    this.selectedItem = {} as Item;
    this.addedEntries = [];
    this.closeOverlay.emit('closed');
  }

  onChangingOption($event: {[key: string]: number | string}): void{
    this.selectedUnit = $event;
  }

  onAddToSection(): void{
    this.data.addEntries(this.addedEntries).subscribe({
      next: (response) => {
        this.entriesAdded.emit();
        this.closeSearch();
      }
    });
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

  onEditSubmit(): void{
    /* this.data.updateEntry(this.entryToEdit).subscribe({
      next: (response) => {
        console.log(response);
      }
    }) */
  }

  onAmountChanged($event: any): void{
    if($event.target.value !== ''){
      this.entryToEdit.amount = parseFloat($event.target.value);
      this.state.setEntryToEdit(this.entryToEdit);
    }else{
      this.entryToEdit.amount = 1;
    }
  }
}

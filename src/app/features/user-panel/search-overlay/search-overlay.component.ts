import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Units, Sections } from 'src/app/types/types';
import { Entry, Item, User } from 'src/app/interfaces/interfaces';

import { DataService } from 'src/app/services/data.service';
import { StateMachineService } from 'src/app/services/state-machine.service';

import { topIn, leftIn } from 'src/app/animations/animations';

@Component({
  selector: 'getfit-search-overlay',
  templateUrl: './search-overlay.component.html',
  styleUrls: ['./search-overlay.component.sass'],
  animations: [leftIn, topIn,]
})
export class SearchOverlayComponent implements OnInit {
  entryToEdit: {prev: Entry, new: Entry} = {} as {prev: Entry, new: Entry};

  editForm = new FormGroup({
    amount: new FormControl('', [Validators.required, ]),
    unit: new FormControl('g', [Validators.required, ]),
  });
  
  searchForm = new FormGroup({
    search: new FormControl('', [Validators.required, ]),
  });

  detailForm = new FormGroup({
    amount: new FormControl('', [Validators.required]),
    unit: new FormControl('ml' as Units, [Validators.required]),
  });

  @Output() closeOverlay = new EventEmitter<'open' | 'closed'>();
  @Output() entriesAdded = new EventEmitter();
  @Input() overlayState: 'open' | 'closed' | 'edit' = 'closed';
  selectedUnit: Units = 'g';
  loadedUser: User = {} as User;
  selectedDate: Date = {} as Date;
  overlaySection: Sections = 'undefined';
  formState: 'search' | 'details' | 'edit' = 'search';
  errorMessage: string = '';

  searchString: string | ' ' = ' ';
  searchResults: Item[] = [];
  addedEntries: Entry[] = [];

  constructor(
    private data: DataService,
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
      this.detailForm.get('unit')?.setValue(entry.unit);
      this.entryToEdit.prev = this.entryToEdit.new;
      this.entryToEdit.new = entry;
    });
    this.detailForm.value.unit = this.selectedUnit;
  }

  onInputChange($event: Event): void{
    this.searchString = ($event.target as HTMLInputElement).value;
    this.data.getItems(this.searchString, 0, 10).subscribe({
      next: (response) => {
        if(response.statusCode === 200){
          this.searchResults = response.payload as Item[];
        }
      },
      error: (err) => {
        if(err.error.statusCode === 404){
          this.searchResults = [];
          this.errorMessage = err.error.message;
        }
      }
    });
  }

  addDetails(item: Item): void{
    this.searchResults = this.searchResults.filter((data) => {
      return data.id === item.id ? true : false;
    });
    this.searchString = item.itemname;
    this.formState = 'details';
  }

  addEntry(): void{
    const item: Item = this.searchResults[0];
    const entry: Entry = {id: this.addedEntries.length, createdon: this.selectedDate, 
      userid: this.loadedUser.id, amount: this.detailForm.value.amount, 
      unit: this.selectedUnit, entryid: item.id, 
      isrecipe: false, section: this.overlaySection, content: item};
    this.addedEntries.push(entry);
    this.searchString = '';
    this.searchForm.reset();
    this.formState = 'search';
  }

  removeItem(item: Entry): void{
    this.addedEntries = this.addedEntries.filter(entry => {
      return item.id === entry.id ? false : true;
    });
  }

  closeSearch(): void{
    this.overlayState = 'closed';
    this.formState = 'search';
    this.searchString = '';
    this.searchResults = [];
    this.addedEntries = [];
    this.closeOverlay.emit('closed');
  }

  onChangingOption($event: {[key: string]: number | string}): void{
    switch($event['value'] as Units){
      case 'g':
        this.detailForm.value.unit = 'g';
        this.selectedUnit = 'g';
        break;
      case 'ml':
        this.detailForm.value.unit = 'ml';
        this.selectedUnit = 'ml';
        break;
      case 'EL':
        this.detailForm.value.unit = 'EL';
        this.selectedUnit = 'EL';
        break;
    }
  }

  onAddToSection(): void{
    this.data.addEntries(this.addedEntries).subscribe({
      next: (response) => {
        this.entriesAdded.emit();
        this.closeSearch();
      }
    });
  }

  getItemName(entry: Entry): string{
    if(entry.content!){
      if('itemname' in entry?.content){
        return entry.content.itemname;
      }else{
        return entry.content.recipename;
      }
    }else{
      return '';
    }
  }

  onEditSubmit(): void{
    this.data.updateEntry(this.entryToEdit.new).subscribe({
      next: (response) => {
        this.entriesAdded.emit();
        this.closeSearch();
      }
    })
  }

  onEditChangeUnit($event: {[key: string]: number | string}){
    const newEntry: Entry = {...this.entryToEdit.new};
    newEntry.unit = $event['value'] as Units;
    this.state.setEntryToEdit(newEntry);
  }

  onAmountChanged($event: any): void{
    if(!isNaN(parseFloat($event.target.value))){
      const newEntry: Entry = {...this.entryToEdit.new};
      newEntry.amount = $event.target.value;
      this.state.setEntryToEdit(newEntry);
    }else{
      'invalid'
    }
  }
}

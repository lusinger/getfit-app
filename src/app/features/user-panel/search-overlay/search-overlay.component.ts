import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Item } from 'src/app/interfaces/item';
import { Entry } from 'src/app/interfaces/entry';
import { Units } from 'src/app/types/units';

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
    unit: new FormControl('g' as Units, [Validators.required]),
  });

  @Output() closeOverlay = new EventEmitter<'open' | 'closed'>();
  @Output() entriesAdded = new EventEmitter();
  @Input() overlayState: 'open' | 'closed' | 'edit' = 'closed';
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
      this.detailForm.get('unit')?.setValue(entry.unit);
      this.entryToEdit.prev = this.entryToEdit.new;
      this.entryToEdit.new = entry;
    })
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
          console.log('no entries found')
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
      unit: this.detailForm.value.unit, entryid: item.id, 
      isrecipe: false, section: this.overlaySection, content: item};
    console.log(entry);
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
    this.detailForm.value.unit = $event['value'] as Units;
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

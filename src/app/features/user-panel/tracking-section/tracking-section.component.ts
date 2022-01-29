import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Entry } from 'src/app/interfaces/entry';
import { DataService } from 'src/app/services/data.service';
import { Sections } from 'src/app/types/sections';

@Component({
  selector: 'getfit-tracking-section',
  templateUrl: './tracking-section.component.html',
  styleUrls: ['./tracking-section.component.sass']
})
export class TrackingSectionComponent implements OnInit{
  @Input() section: Sections = 'undefined';
  @Input() entries: Entry[] = [];

  @Output() openingSearch = new EventEmitter<Sections>();
  @Output() changeDetected = new EventEmitter();

  totalCalories: number = 0;
  initialLoad: boolean = false;

  sectionState: 'open' | 'closed' = 'closed'

  constructor(
    private data: DataService,){
  }

  ngOnInit(): void {
    this.data.dateChanged.subscribe({
      next: (date) => {
        this.totalCalories = 0;
      }
    });

    this.data.entryRemoved.subscribe({
      next: (entry) => {
        if(this.entries.length === 0){
          this.sectionState = 'closed';
        }
        if(entry.section === this.section){
          this.totalCalories = this.calculateCalories(this.entries);
        }
      }
    });
    this.data.entryAdded.subscribe({
      next: (entries) => {
        if(entries.length > 0){
          this.sectionState = 'open';
          let sectionEntries: Entry[] = [] as Entry[];
          sectionEntries = entries.filter((entry) => {
            if(entry.section === this.section){
              sectionEntries.push(entry);
            }
            this.totalCalories = this.calculateCalories(sectionEntries);
          });
          this.data.addCalories(this.section, this.totalCalories);
        }
      }
    });
  }

  // EventEmitter handlers

  onRemovingItem($event: Entry): void{
    this.entries = this.entries.filter(entry => {
      if(entry.id !== undefined && entry.id === $event.id){
        this.data.deleteEntry($event.id).subscribe({
          next: (response) => {
            this.data.entryToRemove($event);
          }
        });
        return false;
      }else{
        return true;
      }
    });
  }

  onOpeningSearch(): void{
    this.openingSearch.emit(this.section); 
  }

  calculateCalories(entries: Entry[]): number{
    let totalCalories: number = 0;
    for(const entry of entries){
      totalCalories += this.getCalories(entry);
    }
    return totalCalories;
  }

  getCalories(entry: Entry): number{
    let calorieCount = 0;
    switch(entry.unit){
      case 'g':
        if(entry.content !== undefined && 'itemname' in entry.content){
          calorieCount = entry.amount * entry.content.perg;
        }else{
        }
        break;
      case 'ml':
        if(entry.content !== undefined && 'itemname' in entry.content){
          calorieCount = entry.amount * entry.content.perml;
        }else{
        }
        break;
      case 'EL':
        if(entry.content !== undefined && 'itemname' in entry.content){
          calorieCount = entry.amount * entry.content.perel;
        }else{
        }
        break;
      case 'Pers':
        if(entry.content !== undefined && 'recipename' in entry.content){
          
        }else{
        }
        break;
    }
    return calorieCount;
  }

  toggleSection(): void{
    this.sectionState === 'closed' ? this.sectionState = 'open' : this.sectionState = 'closed';
  }
}

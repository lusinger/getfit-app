import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { AuthResponse } from 'src/app/interfaces/auth-response';
import { Entry } from 'src/app/interfaces/entry';
import { DataService } from 'src/app/services/data.service';
import { StateMachineService } from 'src/app/services/state-machine.service';
import { Sections } from 'src/app/types/sections';

@Component({
  selector: 'getfit-tracking-section',
  templateUrl: './tracking-section.component.html',
  styleUrls: ['./tracking-section.component.sass']
})
export class TrackingSectionComponent implements OnInit{
  @Input() section: Sections = 'undefined';
  entries: Entry[] = [];

  @Output() openingEdit = new EventEmitter<Entry>();
  @Output() openingSearch = new EventEmitter();

  totalCalories: number = 0;
  initialLoad: boolean = false;

  sectionState: 'open' | 'closed' = 'closed'

  constructor(
    private data: DataService,
    private state: StateMachineService){
  }

  ngOnInit(): void {
    this.state.entries.subscribe((entries) => {
      this.entries = this.loadEntries(entries);
    });
  }

  loadEntries(entries: Entry[]): Entry[]{
    if(entries.length > 0){
      let data = entries.filter((entry) => {
        return entry.section === this.section ? true : false;
      });
      data.length > 0 ? this.sectionState = 'open' : this.sectionState = 'closed';
      this.totalCalories = this.calculateCalories(data);
      return data;
    }else{
      this.totalCalories = 0;
      return [];
    }
  }

  onOpeningEdit($event: Entry): void{
    this.state.setSelectedSection(this.section);
    this.openingEdit.emit($event);
  }

  // EventEmitter handlers

  onRemovingItem($event: Entry): void{
    if($event.id !== undefined){
      this.data.deleteEntry($event.id).subscribe({
        next: (response) => {
          let newData = this.entries.filter((entry) => {
            return $event.id! === entry.id! ? false : true;
          });
          this.state.setEntries(newData);
        }
      });
    }
  }

  onOpeningSearch(): void{
    this.state.setSelectedSection(this.section);
    this.openingSearch.emit(); 
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
    }
    return calorieCount;
  }

  toggleSection(): void{
    this.sectionState === 'closed' ? this.sectionState = 'open' : this.sectionState = 'closed';
  }
}

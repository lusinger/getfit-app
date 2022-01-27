import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges} from '@angular/core';
import { Entry } from 'src/app/interfaces/entry';
import { DataService } from 'src/app/services/data.service';
import { Sections } from 'src/app/types/sections';

@Component({
  selector: 'getfit-tracking-section',
  templateUrl: './tracking-section.component.html',
  styleUrls: ['./tracking-section.component.sass']
})
export class TrackingSectionComponent implements OnInit, OnChanges{
  @Input() section: Sections = 'undefined';
  @Input() entries: Entry[] = [];
  @Input() entriesChanged: boolean = false;

  @Output() openSearchOverlay = new EventEmitter<Sections>();
  @Output() entryRemoved = new EventEmitter();
  @Output() changeDetected = new EventEmitter();

  totalCalories: number = 0;
  initialLoad: boolean = false;

  sectionState: 'open' | 'closed' = 'closed'

  constructor(
    private data: DataService,){
  }

  ngOnInit(): void {
    let timeout = setTimeout(() => {
      if(this.entries.length > 0){
        this.sectionState = 'open';
      }
    }, 100);
    this.data.state.subscribe((state) => {
      setTimeout(() => {
        console.log(state);
        if(state === true){
          this.totalCalories = this.calculateCalories(this.entries);
          this.data.updateState(false);
        }
      }, 50);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
      let change = changes['entriesChanged'];
      if(change !== undefined){
        let current = change.currentValue;
        if(current === true){
          this.totalCalories = this.calculateCalories(this.entries);
          this.changeDetected.emit();
        }
      }
  }

  onItemRemoved($event: any): void{
    this.entries = this.entries.filter(entry => {
      if(entry.id === $event.id){
        this.entryRemoved.emit();
        this.data.deleteEntry($event.id).subscribe({
          next: (response) => {
            console.log(response);
          }
        });
        return false;
      }else{
        return true;
      }
    });
  }

  onOpenSearchOverlay(): void{
    this.openSearchOverlay.emit(this.section); 
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
    if(this.sectionState === 'closed'){
      this.sectionState = 'open';
    }else{
      this.sectionState = 'closed';
    }
  }
}

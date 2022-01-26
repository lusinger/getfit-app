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

  @Output() openSearchOverlay = new EventEmitter<Sections>();

  totalCalories: number = 0;

  sectionState: 'open' | 'closed' = 'closed'

  constructor(
    private data: DataService,){
  }

  ngOnInit(): void {
  }

  onItemRemoved($event: any): void{
    this.entries = this.entries.filter(entry => {
      if(entry.id === $event.id){
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

  async calculateCalories(entries: Entry[]): Promise<number>{
    let totalCalories: number = 0;
    for(const entry of entries){
      /* totalCalories += await this.getCalories(entry); */
      totalCalories += 10;
    }
    return totalCalories;
  }

  async getCalories(entry: Entry): Promise<number>{
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

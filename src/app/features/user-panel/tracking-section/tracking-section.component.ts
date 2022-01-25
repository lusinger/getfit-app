import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Sections } from 'src/app/types/sections';

@Component({
  selector: 'getfit-tracking-section',
  templateUrl: './tracking-section.component.html',
  styleUrls: ['./tracking-section.component.sass']
})
export class TrackingSectionComponent implements OnInit {
  @Input() section: Sections = 'undefined';
  @Input() entries: any[] = [];

  @Output() openSearchOverlay = new EventEmitter<Sections>();

  constructor(private data: DataService) { }

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
}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'getfit-tracking-section',
  templateUrl: './tracking-section.component.html',
  styleUrls: ['./tracking-section.component.sass']
})
export class TrackingSectionComponent implements OnInit {
  @Input() section: string = 'default';
  @Input() entries: any[] = [];

  @Output() openSearchOverlay = new EventEmitter();

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
    this.openSearchOverlay.emit();
  }
}

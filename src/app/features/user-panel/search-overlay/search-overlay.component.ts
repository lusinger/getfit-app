import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Item } from 'src/app/interfaces/item';

@Component({
  selector: 'getfit-search-overlay',
  templateUrl: './search-overlay.component.html',
  styleUrls: ['./search-overlay.component.sass']
})
export class SearchOverlayComponent implements OnInit {
  searchForm = new FormGroup({
    search: new FormControl('', [Validators.required, ]),
  });

  searchValue: string | ' ' = ' ';
  searchResults: Item[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  onInputChange($event: any): void{
    this.searchValue = $event.target.value;
  }
}

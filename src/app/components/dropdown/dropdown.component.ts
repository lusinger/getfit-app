import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { State } from 'src/app/types/types';

@Component({
  selector: 'getfit-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.sass']
})
export class DropdownComponent implements OnInit {
  @Input() values: {[key: string]: number | string}[] = [];
  @Input() style: 'dark' | 'light' = 'light';
  @Input() selected: {[key: string]: number | string} = {key: 'default', value: 0};
  @Output() changingOption = new EventEmitter<{[key: string]: number | string}>();
  isOpen: State = 'closed';

  constructor() { }

  ngOnInit(): void {
    this.selected = this.values[0];
  }

  toggleDropdown(): void{
    this.isOpen === 'closed' ? this.isOpen = 'open' : this.isOpen = 'closed';
  }

  selectOption(option: {[key: string]: number | string}): void{
    this.selected = option;
    this.changingOption.emit(option);
    this.toggleDropdown();
  }
}

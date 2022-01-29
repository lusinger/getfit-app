import { Component, OnInit, HostListener, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'svg-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass']
})
export class SettingsComponent implements OnInit {
  @Output() openingSettings = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  @HostListener('click')
  openSettings(): void{
    this.openingSettings.emit();
  }
}

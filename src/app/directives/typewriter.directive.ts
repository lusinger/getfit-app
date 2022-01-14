import { Directive, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[getfitTypewriter]'
})
export class TypewriterDirective implements OnInit {
  @Input() initialText: string = '';
  @Input() targetText: string = '';

  @Output() textChanged = new EventEmitter<string>();

  timeouts: any[] = [];

  constructor() { }

  ngOnInit(): void {
    let timeout = setTimeout(() => {
      this.deleteText(this.initialText, this.initialText.length);
    }, 500);
  }

  writeText(currentText: string, length: number): void{
    this.timeouts.push(setTimeout(() => {
      if(length <= this.targetText.length){
        const newText = this.targetText.slice(0, length);
        this.textChanged.emit(newText);
        this.writeText(newText, length + 1);
      }else{
        this.timeouts = [];
      }
    }, Math.floor(Math.random() * 100) + 250));
  }
  deleteText(currentText: string, length: number): void{
    this.timeouts.push(setTimeout(() => {
      if(length >= 0){
        const newText = currentText.slice(0, length);
        this.textChanged.emit(newText);
        this.deleteText(newText, length - 1);
      }else{
        this.timeouts = [];
        this.writeText('', 0);
      }
    }, Math.floor(Math.random() * 100) + 250));
  }
}

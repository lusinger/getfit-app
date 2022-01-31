import { Directive, Input, Output, EventEmitter, HostListener, OnInit } from '@angular/core';

interface Options{
  min: number;
  max: number;
  fractional: number;
  step: 0.1 | 0.25 | 0.5;
  allowNegative: boolean;
}

@Directive({
  selector: '[appNumericFormatter]',
})
export class NumericFormatterDirective implements OnInit {
  @Input() options: Options = {} as Options;

  constructor() { }

  ngOnInit(): void {
    this.options.allowNegative ? undefined : this.options.min = 0;
  }


  @HostListener('blur', ['$event'])
  formatInput(event: any): void{
    let value = event.target.value as string;
    if(this.options.fractional > 0){
      value = this.setFractions(value);
      value = this.rounding(value);
    }
    value = this.minMax(value);
    event.target.value = value;
  }

  setFractions(value: string): string{
    let formatted = Number(value).toFixed(this.options.fractional);
    if(formatted.includes('.')){
      let split = formatted.split('.');
      if(split[1].length < 2){
        split[1] = split[1] + '0'.repeat(2 - split[1].length);
        formatted = split.join('.');
      }
    }else{
      formatted = formatted + '.00';
    }
    return formatted;
  }

  rounding(value: string): string{
    let rounded: number[] = [0, 0];
    let split = value.split('.');
    rounded[0] = parseInt(split[0]);
    const steps = 1 / this.options.step;
    for(let index = 1; index <= steps; index++){
      let parsed = parseInt(split[1]) / 100;
      if(parsed <= (index * this.options.step)){
        if(index > 1 && index < steps){
          if(parsed < (index * this.options.step) / 2 + ((index - 1) * this.options.step) / 2){
            rounded[1] = (index - 1) * this.options.step;
            break;
          }else{
            rounded[1] = index * this.options.step;
            break;
          }
        }else if(index === steps){
          if(parsed < (index * this.options.step) / 2 + ((index - 1) * this.options.step) / 2){
            rounded[1] = (index - 1) * this.options.step;
            break;
          }else{
            rounded[0] += 1;
            rounded[1] = 0;
            break;
          }
        }else{
          if(parsed < (index * this.options.step) / 2){
            rounded[1] = 0;
            break;
          }else{
            rounded[1] = index * this.options.step;
            break;
          }
        }
      }else{
        continue;
      }
    }
    split[1] = (rounded[1] * 100).toString();
    split[0] = rounded[0].toString();
    return split.join('.');
  }

  minMax(value: string){
    let split = value.split('.');
    if(this.options.fractional > 0){
      if((parseInt(split[0]) === 0 && parseInt(split[1]) === 0)){
        return '';
      }else if(parseInt(split.join('.')) > this.options.max){
        return this.setFractions(this.options.max.toString());
      }else if(parseInt(split.join('.')) < this.options.min){
        return this.setFractions(this.options.min.toString());
      }
      else{
        return this.setFractions(split.join('.'));
      }
    }else{
      if((parseInt(split[0]) === 0 && parseInt(split[1]) === 0)){
        return '';
      }else if(parseInt(split.join('.')) > this.options.max){
        return this.options.max.toString();
      }else if(parseInt(split.join('.')) < this.options.min){
        return this.options.min.toString();
      }
      else{
        return split[0];
      }
    }
  }
}

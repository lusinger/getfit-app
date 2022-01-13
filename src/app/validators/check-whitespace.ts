import { ValidatorFn, ValidationErrors, AbstractControl } from "@angular/forms";

export const checkWhitespace = (): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    if(control.value === '' || control.value === null){
      return new Error('EMPTY_STRING_NOT_ALLOWED');
    }else{
      const value = control.value as string;
      const length = value.length;
      if(value.indexOf(' ') === 0){
        return new Error('WHITESPACE_NOT_ALLOWED');
      }else if(value.indexOf(' ') === length - 1){
        return new Error('WHITESPACE_NOT_ALLOWED');
      }else{
        return null;
      }
    }
  }
}
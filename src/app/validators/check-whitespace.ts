import { ValidatorFn, ValidationErrors, AbstractControl } from "@angular/forms";

export const checkWhitespace = (): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    if(control.value === '' || control.value === null){
      return {error: new Error('EMPTY_STRING_NOT_ALLOWED')};
    }else{
      const regExp = /\s/;
      const value = control.value as string;
      return regExp.test(value) ? {error: new Error('WHITESPACE_NOT_ALLOWED')} : null;
    }
  }
}
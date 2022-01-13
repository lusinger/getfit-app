import { ValidatorFn, ValidationErrors, AbstractControl } from "@angular/forms";

export const checkWhitespace = (): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    return null;
  }
}
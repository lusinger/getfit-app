import { ValidatorFn, ValidationErrors, AbstractControl } from "@angular/forms";

export const checkPassword = (pwField: string, retypeField: string): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get(pwField);
    const retype = control.get(retypeField);
    if(password && retype){
      return password.value === retype.value ? null : {error: new Error('PASSWORDS_DONT_MATCH')};
    }else if(!(password instanceof AbstractControl || retype instanceof AbstractControl)){
      return {error: new Error('ONE_OR_MORE_FIELDS_DONT_EXIST')};
    }else{
      return null;
    }
  }
};

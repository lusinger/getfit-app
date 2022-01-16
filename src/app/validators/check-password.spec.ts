import { checkPassword } from './check-password';
import { FormGroup, FormControl } from '@angular/forms';

describe('checkPassword()', () => {
  const validate = checkPassword('password', 'retype');
  const testForm = new FormGroup({
    password: new FormControl('', []),
    retype: new FormControl('', []),
  });

  const password = testForm.get('password');
  const retype = testForm.get('retype');

  it('should return null if both password fields match', () => {
    password?.setValue('password');
    retype?.setValue('password');

    if(password && retype){
      expect(validate(testForm)).toBeNull();
    }
  });

  it('should return error: "PASSWORDS_DONT_MATCH" if password fields dont match', () => {
    password?.setValue('password');
    retype?.setValue('passwor');

    if(password && retype){
      expect(validate(testForm)).toEqual({error: new Error('PASSWORDS_DONT_MATCH')});
    }
  });

  it('should return error: "ONE_OR_MORE_FIELDS_DONT_EXIST"', () => {
    const testForm = new FormGroup({
      testField: new FormControl('', []),
    });
    expect(validate(testForm)).toEqual({error: new Error('ONE_OR_MORE_FIELDS_DONT_EXIST')});
  });
});

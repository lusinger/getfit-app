import { FormControl } from '@angular/forms';
import { checkWhitespace } from './check-whitespace';

describe('checkWhitespace()', () => {
  const validator = checkWhitespace();
  const formField = new FormControl('');

  it('should return null if no whitespace is detected at the beginning and end of field value', () => {
    formField.setValue('test value');
    expect(validator(formField)).toBeNull();
  });

  it('should return error "WHITESPACE_NOT_ALLOWED" if whitespaces is detected at the beggining and end of field value', () => {
    formField.setValue(' testValue');
    expect(validator(formField)).toEqual(new Error('WHITESPACE_NOT_ALLOWED'));
    formField.setValue('testValue ');
    expect(validator(formField)).toEqual(new Error('WHITESPACE_NOT_ALLOWED'));
    formField.setValue(' testValue ');
    expect(validator(formField)).toEqual(new Error('WHITESPACE_NOT_ALLOWED'));
  });
});
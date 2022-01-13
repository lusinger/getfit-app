import { FormControl } from '@angular/forms';
import { checkWhitespace } from './check-whitespace';

describe('checkWhitespace()', () => {
  const validator = checkWhitespace();
  const formField = new FormControl('');

  it('should return null if no whitespace is detected at the beginning and end of field value', () => {
    formField.setValue('testvalue');
    expect(validator(formField)).toBeNull();
  });

  it('should return error "WHITESPACE_NOT_ALLOWED" if whitespaces is detected', () => {
    formField.setValue('test Value');
    expect(validator(formField)).toEqual({error: new Error('WHITESPACE_NOT_ALLOWED')});
  });

  it('should return error "EMPTY_STRING_NOT_ALLOWED" if string is ""', () => {
    formField.reset();
    expect(validator(formField)).toEqual({error: new Error('EMPTY_STRING_NOT_ALLOWED')});
  })
});
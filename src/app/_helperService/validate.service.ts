/**
 * https://www.freecodecamp.org/news/how-to-validate-angular-reactive-forms/
 */
import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { hasLowerCaseCharacters, hasUpperCaseCharacters, hasNumericCharacters } from '@fireflysemantics/validatorts';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  constructor() {}

  passwordMinLowerCaseLettersValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return null;
      }
      const valid = hasLowerCaseCharacters(control.value, 1).value && hasUpperCaseCharacters(control.value, 1).value && hasNumericCharacters(control.value, 1).value;
      return valid ? null : { invalidPasswordMinLowerCaseLetters: true };
    };
  }

  passwordMatch(password: string, confirmPassword: string): ValidatorFn {
    return (formGroup: AbstractControl): { [key: string]: any } | null => {
      const passwordControl = formGroup.get(password);
      const confirmPasswordControl = formGroup.get(confirmPassword);

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (
        confirmPasswordControl.errors &&
        !confirmPasswordControl.errors.passwordMismatch
      ) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
        return { passwordMismatch: true };
      } else {
        confirmPasswordControl.setErrors(null);
        return null;
      }
    };
  }
}

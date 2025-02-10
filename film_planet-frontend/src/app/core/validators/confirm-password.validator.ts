import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export class ConfirmPasswordValidator {
  static match(pass1: string, pass2: string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const pass1Control = formGroup.get(pass1);
      const pass2Control = formGroup.get(pass2);

      if (!pass1Control || !pass2Control) {
        return null;
      }

      if (pass1Control.value !== pass2Control.value) {
        pass2Control.setErrors({ mustMatch: true });
        return { mustMatch: true };
      } else {
        pass2Control.setErrors(null);
        return null;
      }
    };
  }
}

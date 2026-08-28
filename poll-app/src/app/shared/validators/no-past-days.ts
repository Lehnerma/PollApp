import { AbstractControl, ValidationErrors } from '@angular/forms';

/**
 * checks if the date is not in the past
 */
export function noPastDays() {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;
    const today = new Date();
    return new Date(value) < today ? { pastDate: true } : null;
  };
}

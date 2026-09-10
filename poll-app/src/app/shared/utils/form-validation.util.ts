import { AbstractControl } from '@angular/forms';

/**
 * Checks whether the given control should be shown as invalid.
 *
 * @param {AbstractControl} control - The form control to check.
 * @returns {boolean} True if the control is invalid and was already touched or changed.
 */
export function isInvalid(control: AbstractControl): boolean {
  return control.invalid && (control.dirty || control.touched);
}

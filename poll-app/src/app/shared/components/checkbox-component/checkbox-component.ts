import { Component, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-checkbox-component',
  imports: [],
  templateUrl: './checkbox-component.html',
  styleUrl: './checkbox-component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
})
export class CheckboxComponent implements ControlValueAccessor {
  label = input<string>();
  id = input<string>();
  checked = signal(false);

  private onChange: (value: boolean) => void = () => {};
  private onTouched: () => void = () => {};

  /**
   * Writes the checkbox value from the form control.
   *
   * @param value - The checked state to apply to the component.
   */
  writeValue(value: boolean): void {
    this.checked.set(!!value);
  }

  /**
   * Registers the change callback for this control value accessor.
   *
   * @param fn - The callback invoked when the checkbox value changes.
   */
  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  /**
   * Registers the touched callback for this control value accessor.
   *
   * @param fn - The callback invoked when the checkbox is touched.
   */
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  /**
   * Toggles the checkbox value and emits the new state.
   */
  toggle(): void {
    this.checked.set(!this.checked());
    this.onChange(this.checked());
    this.onTouched();
  }
}

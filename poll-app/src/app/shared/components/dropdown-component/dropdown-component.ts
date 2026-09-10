import { TitleCasePipe } from '@angular/common';
import { Component, input, signal, forwardRef, computed, model } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-dropdown-component',
  imports: [TitleCasePipe],
  templateUrl: './dropdown-component.html',
  styleUrl: './dropdown-component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true,
    },
  ],
})
export class DropdownComponent implements ControlValueAccessor {
  private static nextId = 0;
  categories = input<string[]>([]);
  title = input<string>('');
  showAllOption = input(false);
  required = input(false);
  invalid = input(false);
  errorText = input<string>('');
  value = model<string | null>(null);
  isOpen = signal<boolean>(false);
  displayCategories = computed(() => (this.showAllOption() ? ['All Surveys', ...this.categories()] : this.categories()));
  displayValue = computed(() => (this.value() === 'All Surveys' ? '' : (this.value() ?? '')));
  listboxId = `dropdown-listbox-${DropdownComponent.nextId++}`;

  /**
   * Toggles the dropdown menu.
   * @returns {void}
   */
  toggleDropdown(): void {
    this.isOpen.update((currentValue) => !currentValue);
  }

  /**
   * Writes the new value for the form/element.
   * @param {string | null} value - String value we set.
   * @returns {void}
   */
  writeValue(value: string | null): void {
    this.value.set(value);
  }

  /**
   * Register a callback.
   * @param {(value: string | null) => void} fn - Callback function.
   * @returns {void}
   */
  registerOnChange(fn: (value: string | null) => void): void {
    this.onChange = fn;
  }

  /**
   * Register a callback to be invoked when the form control is touched.
   * @param {() => void} fn - Callback function.
   * @returns {void}
   */
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  /**
   * We set the new value (category) and close the dropdown.
   * @param {string} item - The category which is chosen in the dropdown.
   * @returns {void}
   */
  selectOption(item: string): void {
    this.value.set(item);
    this.onChange(item);
    this.isOpen.set(false);
  }

  private onChange: (value: string | null) => void = () => {};
  private onTouched: () => void = () => {};
}

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
   * Toggles the dropdown menu
   */
  toggleDropdown(): void {
    this.isOpen.update((currentValue) => !currentValue);
  }

  /**
   * Writes the new value for the form/element
   * @param value String value we set.
   */
  writeValue(value: string | null): void {
    this.value.set(value);
  }

  /**
   * Register a callback
   * @param fn callback function
   */
  registerOnChange(fn: (value: string | null) => void): void {
    this.onChange = fn;
  }

  /**
   * Register a callback to be invoked when the form control is touched
   * @param fn callback function
   */
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  /**
   * We set the new value(categorie) and close the dropdown
   * @param item - the categorie whitch is chosen in the dropdown
   */
  selectOption(item: string): void {
    this.value.set(item);
    this.onChange(item);
    this.isOpen.set(false);
  }

  private onChange: (value: string | null) => void = () => {};
  private onTouched: () => void = () => {};
}

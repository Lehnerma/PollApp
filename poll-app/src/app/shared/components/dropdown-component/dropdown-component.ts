import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-dropdown-component',
  imports: [],
  templateUrl: './dropdown-component.html',
  styleUrl: './dropdown-component.scss',
})
export class DropdownComponent {
  categories = input<string[]>([]);
  title = input<string>('Sort by categories');
  isOpen = signal(true); //todo change to false
  //* in der parent komponent werden title und categories gesetzt - im template dann als categories() und title() als signal

  /**
   * Toggles the dropdown menu
   */
  toggleDropdown(): void {
    this.isOpen.update((currentValue) => !currentValue);
  }
}

import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-checkbox-component',
  imports: [],
  templateUrl: './checkbox-component.html',
  styleUrl: './checkbox-component.scss',
})
export class CheckboxComponent{
  label = input<string>();
  id = input();
  checked = signal(false);


  /**
   * Toggles the checkbox value and emits the new state.
   */
  toggle(): void {
    this.checked.set(!this.checked());
  }
}

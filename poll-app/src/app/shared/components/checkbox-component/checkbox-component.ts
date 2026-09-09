import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-checkbox-component',
  imports: [],
  templateUrl: './checkbox-component.html',
  styleUrl: './checkbox-component.scss',
})
export class CheckboxComponent {
  type = input<'checkbox' | 'radio'>('checkbox');
  name = input<string>('');
  value = input<string>('');
  label = input<string>();
  prefix = input<string>('');
  id = input<string>('');
  checked = input(false);
  changed = output<string>();
  disabled = input(false);
}

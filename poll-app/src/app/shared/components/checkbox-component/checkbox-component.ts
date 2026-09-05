import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-checkbox-component',
  imports: [],
  templateUrl: './checkbox-component.html',
  styleUrl: './checkbox-component.scss',
})
export class CheckboxComponent {
  type = input<'checkbox' | 'radio'>('checkbox');
  name = input<string>(''); // Gruppenname – bei Radios pro Frage gleich
  value = input<string>(''); // option.id
  label = input<string>();
  prefix = input<string>(''); // optionales Präfix, z.B. der Aufzählungsbuchstabe
  id = input<string>(''); // aktuell untypisiert -> unknown
  checked = input(false); // State liegt beim Parent
  changed = output<string>();
}

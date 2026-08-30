import { Component } from '@angular/core';
import { SurveyCreateComponent } from '../../components/survey-create-component/survey-create-component';
import { DropdownComponent } from '../../components/dropdown-component/dropdown-component';

@Component({
  selector: 'app-dev',
  imports: [SurveyCreateComponent, DropdownComponent],
  templateUrl: './dev.html',
  styleUrl: './dev.scss',
})
export class Dev {
  categories = ['apple', 'banana', 'banana', 'banana', 'banana'];
}

import { Component } from '@angular/core';
import { DropdownComponent } from '../dropdown-component/dropdown-component';

@Component({
  selector: 'survey-detail-form',
  imports: [DropdownComponent],
  templateUrl: './survey-detail-form.html',
  styleUrl: './survey-detail-form.scss',
})
export class SurveyDetailForm {
  list = ['test', 'categories', 'hello welt'];
}

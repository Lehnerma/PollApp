import { Component, input } from '@angular/core';
import { DropdownComponent } from '../dropdown-component/dropdown-component';
import { FormGroup, ɵInternalFormsSharedModule } from '@angular/forms';

@Component({
  selector: 'survey-detail-form',
  imports: [DropdownComponent, ɵInternalFormsSharedModule],
  templateUrl: './survey-detail-form.html',
  styleUrl: './survey-detail-form.scss',
})
export class SurveyDetailForm {
  categories = input([]);
  detailForm = input.required<FormGroup>();
}

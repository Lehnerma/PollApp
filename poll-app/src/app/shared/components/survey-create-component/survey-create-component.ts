import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { DropdownComponent } from '../dropdown-component/dropdown-component';

@Component({
  selector: 'survey-create-component',
  imports: [ReactiveFormsModule, DropdownComponent],
  templateUrl: './survey-create-component.html',
  styleUrl: './survey-create-component.scss',
})
export class SurveyCreateComponent {
  fb = inject(FormBuilder);
  categories = ['Banana', 'apple', 'coconut', 'pear'];

  surveyForm = new FormGroup({
    details: this.createDetailsForm(),
    questions: this.fb.array([this.createQuestionForm()]),
    options: this.fb.array([this.createOptionForm(), this.createOptionForm()]),
  });

  /**
   * Creates the form group for the details of the servey
   */
  createDetailsForm(): FormGroup {
    return this.fb.nonNullable.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      endDate: [''],
      description: ['', Validators.maxLength(300)],
    });
  }

  /**
   * Creates the form group for a question
   */
  createQuestionForm(): FormGroup {
    return this.fb.nonNullable.group({
      name: ['', Validators.required],
      multiple_options: [false],
    });
  }

  /**
   * Creates the form group for a question option.
   */
  createOptionForm(): FormGroup {
    return this.fb.nonNullable.group({
      name: ['', Validators.required],
    });
  }
}

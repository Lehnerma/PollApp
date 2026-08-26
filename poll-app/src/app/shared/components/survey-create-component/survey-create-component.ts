import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup, FormArray } from '@angular/forms';
import { DropdownComponent } from '../dropdown-component/dropdown-component';

@Component({
  selector: 'survey-create-component',
  imports: [ReactiveFormsModule, DropdownComponent],
  templateUrl: './survey-create-component.html',
  styleUrl: './survey-create-component.scss',
})
export class SurveyCreateComponent {
  fb = inject(FormBuilder);
  categories = ['Banana', 'apple', 'coconut', 'pear']; //todo festlegen der Categories

  get questions(): FormGroup[] {
    return this.surveyForm.controls.questions.controls;
  }

  surveyForm = new FormGroup({
    details: this.createDetailsForm(),
    questions: this.fb.array([this.createQuestionForm()]),
  });

  /**
   * Creates the form group for the details of the servey
   */
  createDetailsForm(): FormGroup {
    return this.fb.nonNullable.group({
      surveyName: ['', Validators.required],
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
      questionName: ['', Validators.required],
      multipleOptions: [false],
      options: this.fb.array([this.createOptionForm(), this.createOptionForm()]),
    });
  }

  /**
   * Creates the form group for a question option.
   */
  createOptionForm(): FormGroup {
    return this.fb.nonNullable.group({
      text: ['', Validators.required],
    });
  }

  /**
   * Removes an answer option from the current question if more than two options exist.
   *
   * @param index The index of the option to remove.
   */
  // deleteOption(index: number): void {
  //   if (this.options.controls.length > 2) {
  //     this.options.removeAt(index);
  //   }
  // }

  /**
   * Returns the uppercase letter for the given option index.
   *
   * @param index The zero-based option index.
   * @returns The corresponding uppercase letter (A, B, C, ...).
   */
  getLetterFromIndex(index: number): string {
    return String.fromCharCode(65 + index);
  }
}

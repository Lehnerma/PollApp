import { Component, inject } from '@angular/core';
import { QuestionsListEditor } from '../questions-list-editor/questions-list-editor';
import { SurveyDetailForm } from '../survey-detail-form/survey-detail-form';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';

@Component({
  selector: 'survey-create-component',
  imports: [QuestionsListEditor, SurveyDetailForm, ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './survey-create-component.html',
  styleUrl: './survey-create-component.scss',
})
export class SurveyCreateComponent {
  //surveyDetail: name, category, endDate, describing
  //questions: name, multiplequestion, position, survey-id
  //options: array[option1,option2,...], question-id, vote-count

  fb = inject(FormBuilder);

  surveyForm = this.fb.group({
    details: this.createDetails(),
    questions: this.fb.array([this.createQuestion()]),
  });


  /**
   * Returns the FormGroup for the Details in the Survey-detail-form file
   * @returns FormGroup of the controlls.
   */
  createDetails(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      endDate: [''],
      description: [''],
    });
  }

  /**
   *Return the FormGroup for the questions
   * @returns FormGroup of question and options in an array. in these array we can push more options.
   */
  createQuestion(): FormGroup {
    return this.fb.group({
      question: ['', Validators.required],
      multipleOptions: ['false'],
      options: this.fb.array([
        this.createOption(), //
        this.createOption(),
      ]),
    });
  }

  /**
   * Creats a new option input for the question
   * @returns a new formgroup input element for a option
   */
  createOption(): FormGroup {
    return this.fb.group({
      text: ['', Validators.required],
    });
  }

}

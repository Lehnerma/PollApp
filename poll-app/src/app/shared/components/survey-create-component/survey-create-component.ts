import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup, FormArray } from '@angular/forms';
import { DropdownComponent } from '../dropdown-component/dropdown-component';
import { OptionForm, QuestionForm } from '../../interfaces/question-form';
import { DetailsForm } from '../../interfaces/details-form';

@Component({
  selector: 'survey-create-component',
  imports: [ReactiveFormsModule, DropdownComponent],
  templateUrl: './survey-create-component.html',
  styleUrl: './survey-create-component.scss',
})
export class SurveyCreateComponent {
  fb = inject(FormBuilder);
  //todo create the categories
  categories = ['Banana', 'apple', 'coconut', 'pear'];

  surveyForm = new FormGroup({
    details: this.createDetailsForm(),
    questions: this.fb.array([this.createQuestionForm()]),
  });

  /**
   * Returns the question form groups of the survey form.
   */
  get questions(): FormGroup<QuestionForm>[] {
    return this.surveyForm.controls.questions.controls;
  }

  /**
   * Returns the option form groups of the given question form group.
   *
   * @param question The question form group.
   */
  getOptions(question: FormGroup<QuestionForm>): FormArray<FormGroup<OptionForm>> {
    return question.controls.options;
  }

  /**
   * Creates the form group for the details of the survey
   */
  createDetailsForm(): FormGroup<DetailsForm> {
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
  createQuestionForm(): FormGroup<QuestionForm> {
    return this.fb.nonNullable.group({
      questionName: ['', Validators.required],
      multipleOptions: [false],
      options: this.fb.array([this.createOptionForm(), this.createOptionForm()]),
    });
  }

  /**
   * Creates the form group for a question option.
   */
  createOptionForm(): FormGroup<OptionForm> {
    return this.fb.nonNullable.group({
      text: ['', Validators.required],
    });
  }

  /**
   * add a new option to the question limit of 6
   * @param question The Question form group
   */
  addOption(question: FormGroup<QuestionForm>): void {
    const curOpt = this.getOptions(question);
    if (curOpt.length < 6) curOpt.push(this.createOptionForm());
  }

  /**
   * Adds a new question to the survey form.
   */
  addQuestion(): void {
    if (this.questions.length >= 6) return;
    this.questions.push(this.createQuestionForm());
  }

  /**
   * Removes an answer option from the current question if more than two options exist.
   *
   * @param question The question form group.
   * @param index The index of the option to remove.
   */
  deleteOption(question: FormGroup<QuestionForm>, index: number): void {
    const curOpt = this.getOptions(question);
    if (curOpt.length <= 2) return;
    curOpt.removeAt(index);
  }

  /**
   * Removes a question from the survey form, or resets it if it's the last question.
   *
   * @param index The index of the question to remove.
   */
  deleteQuestion(index: number): void {
    if (this.questions.length === 1) {
      this.surveyForm.controls.questions.reset();
    } else {
      this.surveyForm.controls.questions.removeAt(index);
    }
  }

  /**
   * Resets the hole form.
   */
  resetForm(): void {
    this.surveyForm.reset();
    this.surveyForm.controls.questions.reset();
  }

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

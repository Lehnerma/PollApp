import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup, FormArray } from '@angular/forms';
import { DropdownComponent } from '../dropdown-component/dropdown-component';
import { OptionForm, QuestionForm } from '../../interfaces/question-form';
import { DetailsForm } from '../../interfaces/details-form';
import { SupabaseService } from '../../services/supabase-service';
import { SurveyModel } from '../../models/survey-model';
import { QuestionModel } from '../../models/question-model';
import { OptionModel } from '../../models/options-model';
import { QuestionInterface } from '../../interfaces/question-interface';
import { QuestionFormValue } from '../../interfaces/question-form-value';

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
  today = new Date().toISOString().split('T')[0];
  supabase = inject(SupabaseService);
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
   * Returns the details form groups of the survey form.
   */
  get details(): FormGroup<DetailsForm> {
    return this.surveyForm.controls.details;
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
      survey_name: ['', Validators.required],
      category: ['', Validators.required],
      expires_at: [''],
      description: ['', Validators.maxLength(300)],
    });
  }

  /**
   * Creates the form group for a question
   */
  createQuestionForm(): FormGroup<QuestionForm> {
    return this.fb.nonNullable.group({
      question_name: ['', Validators.required],
      multiple_options: [false],
      options: this.fb.array([this.createOptionForm(), this.createOptionForm()]),
    });
  }

  /**
   * Creates the form group for a question option.
   */
  createOptionForm(): FormGroup<OptionForm> {
    return this.fb.nonNullable.group({
      option_name: ['', Validators.required],
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
    this.surveyForm.controls.questions.push(this.createQuestionForm());
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
    this.surveyForm = new FormGroup({
      details: this.createDetailsForm(),
      questions: this.fb.array([this.createQuestionForm()]),
    });
  }

  /**
   * Resets the survey description field.
   */
  resetDescription(): void {
    this.details.controls.description.reset();
  }

  /**
   * Returns the uppercase letter for the given option index.
   *
   * @param index The zero-based option index.
   * @returns The corresponding uppercase letter A, B ...
   */
  getLetterFromIndex(index: number): string {
    return String.fromCharCode(65 + index);
  }

  /**
   * Creates the form data for the tables in supabase
   */
  async onSubmit(): Promise<void> {
    const survey = new SurveyModel(this.surveyForm.controls.details.value);
    await this.supabase.addSurvey(survey);
    const questions_data = this.surveyForm.controls.questions.getRawValue();
    await this.pushQuestion(questions_data, survey.id);
    console.log('pushed submitted');
    //todo router navigation to home
  }

  /**
   * pushes the options to the supabase
   * @param question - is the question with the options array in it
   * @param surveyId - connection to the survey
   */
  private async pushQuestionsWithOptions(question: QuestionFormValue, surveyId: string | number): Promise<void> {
    const savedQuestion = await this.supabase.addQuestion(new QuestionModel(question), surveyId);
    await Promise.all(
      question.options.map((option) => {
        this.supabase.addOptions(new OptionModel(option), savedQuestion);
      }),
    );
  }

  /**
   * pushes the question to supabase
   * @param questions is the modul question with right values
   * @param surveyId is the connection to the survey
   */
  private async pushQuestion(questions: QuestionFormValue[], surveyId: string | number): Promise<void> {
    await Promise.all(questions.map((question) => this.pushQuestionsWithOptions(question, surveyId)));
  }
}

import { Component, inject } from '@angular/core';
import { QuestionEditor } from '../question-editor/question-editor';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-questions-list-editor',
  imports: [QuestionEditor],
  templateUrl: './questions-list-editor.html',
  styleUrl: './questions-list-editor.scss',
})
export class QuestionsListEditor {
  fb = inject(FormBuilder);
  questions = this.fb.array([this.createQuestion()]);

  /**
   *
   * @returns
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
   * add
   */
  addNewQuestion(): void {
    this.questions.push(this.createQuestion());
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

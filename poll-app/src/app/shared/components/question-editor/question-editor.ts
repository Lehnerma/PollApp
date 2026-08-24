import { Component, inject, input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-question-editor',
  imports: [ReactiveFormsModule],
  templateUrl: './question-editor.html',
  styleUrl: './question-editor.scss',
})
export class QuestionEditor {
  questionNumber = input<number>(1);
  fb = inject(FormBuilder);
  questionForm = input.required<FormGroup>();

  /**
   * Creates a new form group for a single answer option.
   *
   * @returns A new option form group with a required text control.
   */
  createOption(): FormGroup {
    return this.fb.group({
      text: ['', Validators.required],
    });
  }

  /**
   * Returns the FormArray containing all answer options for the current question.
   *
   * @returns The options form array.
   */
  get options(): FormArray {
    return this.questionForm().controls['options'] as FormArray;
  }

  /**
   * Adds a new answer option to the current question.
   *
   * The maximum number of options is limited to 6.
   */
  addNewOption(): void {
    if (this.options.controls.length <= 5) {
      this.options.push(this.createOption());
    }
  }

  /**
   * Removes an answer option from the current question if more than two options exist.
   *
   * @param index The index of the option to remove.
   */
  deleteOption(index: number): void {
    if (this.options.controls.length > 2) {
      this.options.removeAt(index);
    }
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

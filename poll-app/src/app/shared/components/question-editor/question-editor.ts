import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-question-editor',
  imports: [ReactiveFormsModule],
  templateUrl: './question-editor.html',
  styleUrl: './question-editor.scss',
})
export class QuestionEditor {
  fb = inject(FormBuilder);
  form = this.fb.group({
    question: ['', Validators.required],
    options: this.fb.array([
      //todo add function to create fb.group
      this.createOption(),
      this.createOption(),
    ]),
  });

  /**
   * Creats a new option input for the question
   * @returns a new formgroup input element for a option
   */
  createOption(): FormGroup {
    return this.fb.group({
      text: ['', Validators.required],
    });
  }

  /**
   * returns the Form control array for options
   */
  get options(): FormArray {
    return this.form.controls.options;
  }

  /**
   * Adds a new Option to the Questioin
   */
  addNewOption(): void {
    if (this.options.controls.length <= 5) {
      this.options.push(this.createOption())
    }
    console.log(this.options.controls);
  }

  /**
   * Returns the answer option letter for the specified index.
   *
   * @param index The zero-based option index.
   * @returns The corresponding uppercase letter.
   */
  getLetterFromIndex(index: number): string {
    return String.fromCharCode(65 + index);
  }

  /**
   * test
   */
  onSubmit():void{
    const values = this.form.value
    console.log(values);
  }
}

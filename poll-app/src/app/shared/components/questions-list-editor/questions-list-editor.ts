import { Component, input } from '@angular/core';
import { QuestionEditor } from '../question-editor/question-editor';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-questions-list-editor',
  imports: [QuestionEditor],
  templateUrl: './questions-list-editor.html',
  styleUrl: './questions-list-editor.scss',
})
export class QuestionsListEditor {
  questions = input.required<FormArray>();
}

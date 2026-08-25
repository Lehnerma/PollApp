import { Component, input } from '@angular/core';
import { QuestionEditor } from '../question-editor/question-editor';
import { QuestionForm } from '../../interfaces/question-form';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-questions-list-editor',
  imports: [QuestionEditor],
  templateUrl: './questions-list-editor.html',
  styleUrl: './questions-list-editor.scss',
})
export class QuestionsListEditor {
  questions = input.required<FormArray<FormGroup<QuestionForm>>>();
}

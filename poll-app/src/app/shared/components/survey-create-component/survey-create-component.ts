import { Component } from '@angular/core';
import { QuestionsListEditor } from '../questions-list-editor/questions-list-editor';
import { SurveyDetailForm } from '../survey-detail-form/survey-detail-form';

@Component({
  selector: 'survey-create-component',
  imports: [QuestionsListEditor, SurveyDetailForm],
  templateUrl: './survey-create-component.html',
  styleUrl: './survey-create-component.scss',
})
export class SurveyCreateComponent {}

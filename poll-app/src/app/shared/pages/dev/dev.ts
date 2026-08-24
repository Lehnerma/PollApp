import { Component } from '@angular/core';
import { QuestionsListEditor } from '../../components/questions-list-editor/questions-list-editor';
import { SurveyDetailForm } from '../../components/survey-detail-form/survey-detail-form';

@Component({
  selector: 'app-dev',
  imports: [QuestionsListEditor, SurveyDetailForm],
  templateUrl: './dev.html',
  styleUrl: './dev.scss',
})
export class Dev {}

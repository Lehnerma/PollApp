import { Component } from '@angular/core';
import { SurveyCreateComponent } from '../../components/survey-create-component/survey-create-component';
import { MainHeader } from '../../components/main-header/main-header';

@Component({
  selector: 'app-create-survey',
  imports: [MainHeader, SurveyCreateComponent],
  templateUrl: './create-survey.html',
  styleUrl: './create-survey.scss',
})
export class CreateSurvey {}

import { Component } from '@angular/core';
import { SurveyCreateComponent } from '../../components/survey-create-component/survey-create-component';

@Component({
  selector: 'app-dev',
  imports: [SurveyCreateComponent],
  templateUrl: './dev.html',
  styleUrl: './dev.scss',
})
export class Dev {}

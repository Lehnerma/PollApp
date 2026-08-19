import { Component } from '@angular/core';
import { SurveyCard } from '../../components/survey-card/survey-card';

@Component({
  selector: 'app-dev',
  imports: [SurveyCard],
  templateUrl: './dev.html',
  styleUrl: './dev.scss',
})
export class Dev {}

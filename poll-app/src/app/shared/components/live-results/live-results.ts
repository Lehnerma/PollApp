import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Progressbar } from '../progressbar/progressbar';
import { getLetterFromIndex } from '../../utils/opt-label.util';
import { SurveyResultsService } from '../../services/survey-results-service';

@Component({
  selector: 'app-live-results',
  imports: [Progressbar],
  templateUrl: './live-results.html',
  styleUrl: './live-results.scss',
  providers: [SurveyResultsService],
})
export class LiveResults {
  router = inject(Router);
  protected results = inject(SurveyResultsService);
  protected readonly getLetterFromIndex = getLetterFromIndex;
}

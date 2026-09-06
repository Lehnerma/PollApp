import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Progressbar } from '../progressbar/progressbar';
import { getLetterFromIndex } from '../../utils/opt-label.util';
import { SurveyResultsService } from '../../services/survey-results-service';

@Component({
  selector: 'app-live-results',
  imports: [Progressbar, RouterLink],
  templateUrl: './live-results.html',
  styleUrl: './live-results.scss',
  providers: [SurveyResultsService], // eigene Instanz pro Ansicht: Resource und Channel leben nur solange die View lebt
})
export class LiveResults {
  router = inject(Router);
  protected results = inject(SurveyResultsService);
  protected readonly getLetterFromIndex = getLetterFromIndex;
}

import { Component, inject } from '@angular/core';
import { Progressbar } from '../progressbar/progressbar';
import { getLetterFromIndex } from '../../utils/opt-label.util';
import { SurveyResultsService } from '../../services/survey-results-service';
@Component({
  selector: 'app-live-results',
  imports: [Progressbar],
  templateUrl: './live-results.html',
  styleUrl: './live-results.scss',
})
export class LiveResults {
  protected results = inject(SurveyResultsService);
  protected readonly getLetterFromIndex = getLetterFromIndex;
}

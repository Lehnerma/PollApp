import { Component, input } from '@angular/core';
import { SurveyInterface } from '../../interfaces/survey-interface';

@Component({
  selector: 'app-survey-card',
  imports: [],
  templateUrl: './survey-card.html',
  styleUrl: './survey-card.scss',
})
export class SurveyCard {
  surveyList = input<SurveyInterface[]>([]);
  listLayout = input('row');

  /**
   * Returns the remaining time until the survey expires, expressed in days.
   *
   * @param expireDate - A date-compatible value representing the expiration date.
   * @returns The number of remaining days as a formatted string, or `'n/a'` if the date is invalid.
   */
  getExpireDay(expireDate: string | number): string {
    const date = new Date(expireDate);
    if (isNaN(date.getTime())) return 'n/a';
    const days = Math.ceil((date.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    return days === 1 ? days + ' Day' : days + ' Days';
  }

  /**
   * Wir bekommen die classe zuruck die wir benotigen fur die verschiedneen grid layouts in unserer app fur die surveys
   * @returns the right stylin class for the grid layout for the surveylists
   */
  getGridLayout(): string {
    return this.listLayout() === 'row' ? 'up-next-row' : 'list-grid';
  }
}

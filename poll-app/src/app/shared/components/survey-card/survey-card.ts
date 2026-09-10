import { RouterLink } from '@angular/router';
import { Component, input } from '@angular/core';
import { SurveyInterface } from '../../interfaces/survey-interface';

@Component({
  selector: 'app-survey-card',
  imports: [RouterLink],
  templateUrl: './survey-card.html',
  styleUrl: './survey-card.scss',
})
export class SurveyCard {
  surveyList = input<SurveyInterface[]>([]);
  listLayout = input('row');
  MILLISECONDS_IN_A_DAY = 1000 * 60 * 60 * 24;

  /**
   * Returns the remaining time until the survey expires, expressed in days.
   *
   * @param {string | number} expireDate - A date-compatible value representing the expiration date.
   * @returns {string} The number of remaining days as a formatted string, or `'n/a'` if the date is invalid.
   */
  getExpireDay(expireDate: string | number): string {
    const date = new Date(expireDate);
    if (isNaN(date.getTime())) return 'n/a';
    const days = Math.ceil((date.getTime() - Date.now()) / this.MILLISECONDS_IN_A_DAY);
    return days === 1 ? days + ' Day' : days + ' Days';
  }

  /**
   * We get back the class we need for the various grid layouts in our app for the surveys.
   * @returns {string} The right styling class for the grid layout for the survey lists.
   */
  getGridLayout(): string {
    return this.listLayout() === 'row' ? 'up-next-row' : 'list-grid';
  }
}

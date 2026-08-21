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
   * Calculates the number of days remaining until a survey expires.
   *
   * @param expireDate - The survey expiration date as a date-compatible string.
   * @returns The number of days until expiration, or `0` if the date is invalid.
   */
  getExpireDay(expireDate: string | number): number {
    const date = new Date(expireDate);
    if (isNaN(date.getTime())) return 0;
    const days = Math.ceil((date.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    return days;
  }

  /**
   * Wir bekommen die classe zuruck die wir benotigen fur die verschiedneen grid layouts in unserer app fur die surveys
   * @returns the right stylin class for the grid layout for the surveylists
   */
  getGridLayout(): string {
    return this.listLayout() === 'row' ? 'up-next-row' : 'list-grid';
  }
}

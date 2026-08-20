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

  /**
   * Calculates the number of days remaining until a survey expires.
   *
   * @param expireDate - The survey expiration date as a date-compatible string.
   * @returns The number of days until expiration, or `0` if the date is invalid.
   */
  getExpireDay(expireDate: string|number): number {
    const date = new Date(expireDate);
    if (isNaN(date.getTime())) return 0;
    const days = Math.ceil((date.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    return days;
  }
}

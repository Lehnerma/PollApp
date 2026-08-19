import { Component, inject } from '@angular/core';
import { SupabaseService } from '../../services/supabase-service';
import { DropdownComponent } from '../dropdown-component/dropdown-component';
import { SurveyCard } from '../survey-card/survey-card';

@Component({
  selector: 'app-surveys-list',
  imports: [
    DropdownComponent,
    SurveyCard],
  templateUrl: './surveys-list.html',
  styleUrl: './surveys-list.scss',
})
export class SurveysList {
  supabaseService = inject(SupabaseService); //* der service wird injectziert in diese component
  list = this.supabaseService.surveyList;
  categories = this.supabaseService.surveyCategorieList;

  /**
   * Calculates the number of days remaining until a survey expires.
   *
   * @param expireDate - The survey expiration date as a date-compatible string.
   * @returns The number of days until expiration, or `0` if the date is invalid.
   */
  getExpireDay(expireDate: string): number {
    const date = new Date(expireDate);
    if (isNaN(date.getTime())) return 0;
    const days = Math.ceil((date.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    return days;
  }
}

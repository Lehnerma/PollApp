import { Component, inject } from '@angular/core';
import { SupabaseService } from '../../services/supabase-service';


@Component({
  selector: 'app-surveys-list',
  imports: [],
  templateUrl: './surveys-list.html',
  styleUrl: './surveys-list.scss',
})
export class SurveysList {
  supabaseService = inject(SupabaseService); //* der service wird injectziert in diese component
  list = this.supabaseService.surveyList


/**
 * todo writte comment
 * @param expireDate 
 */
  getExpireDay(expireDate: string):number{
  const date = new Date(expireDate);
  if (isNaN(date.getTime())) return 0;
  const days = Math.ceil((date.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  return days;
  }
}

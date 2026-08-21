import { Component, inject } from '@angular/core';
import { SupabaseService } from '../../services/supabase-service';
import { DropdownComponent } from '../dropdown-component/dropdown-component';
import { SurveyCard } from '../survey-card/survey-card';

@Component({
  selector: 'app-surveys-list',
  imports: [DropdownComponent, SurveyCard],
  templateUrl: './surveys-list.html',
  styleUrl: './surveys-list.scss',
})
export class SurveysList {
  supabaseService = inject(SupabaseService);
  list = this.supabaseService.surveyList;
  categories = this.supabaseService.surveyCategorieList;
}

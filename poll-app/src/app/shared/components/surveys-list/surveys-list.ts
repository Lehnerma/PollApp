import { Component, inject } from '@angular/core';
import { SupabaseService } from '../../services/supabase-service';
import { DropdownComponent } from '../dropdown-component/dropdown-component';
import { SurveyCard } from '../survey-card/survey-card';
import { SurveyService } from '../../services/survey-service';

@Component({
  selector: 'app-surveys-list',
  imports: [DropdownComponent, SurveyCard],
  templateUrl: './surveys-list.html',
  styleUrl: './surveys-list.scss',
})
export class SurveysList {
  supabase = inject(SupabaseService);
  surveyService = inject(SurveyService);
  list = this.surveyService.surveyList;
  categories = this.surveyService.surveyCategoryList;
}

import { Component, computed, inject, signal } from '@angular/core';
import { SupabaseService } from '../../services/supabase-service';
import { DropdownComponent } from '../dropdown-component/dropdown-component';
import { SurveyCard } from '../survey-card/survey-card';
import { SurveyService } from '../../services/survey-service';
import { SurveyInterface } from '../../interfaces/survey-interface';

@Component({
  selector: 'app-surveys-list',
  imports: [DropdownComponent, SurveyCard],
  templateUrl: './surveys-list.html',
  styleUrl: './surveys-list.scss',
})
export class SurveysList {
  supabase = inject(SupabaseService);
  surveyService = inject(SurveyService);

  categories = this.surveyService.surveyCategoryList;
  activSurveys = this.surveyService.activSurveyList;
  pastSurveys = this.surveyService.pastSurveyList;

  displayList = computed(() => (this.selectedTab() === 'active' ? this.activSurveys() : this.pastSurveys()));
  selectedTab = signal<'active' | 'past'>('active');

  /**
   * Switch the list of display.
   * @param list the list of items that will shown.
   */
  switchSurveyList(tab: 'active' | 'past'): void {
    this.selectedTab.set(tab);
  }
}

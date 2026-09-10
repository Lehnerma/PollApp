import { Component, computed, inject, signal } from '@angular/core';
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
  surveyService = inject(SurveyService);
  categories = this.surveyService.surveyCategoryList;
  selectedCategory = signal<string | null>(null);
  activeSurveys = this.surveyService.activeSurveyList;
  pastSurveys = this.surveyService.pastSurveyList;
  displayList = computed(() => this.filterSurveys());

  selectedTab = signal<'active' | 'past'>('active');

  /**
   * Switch the list of display.
   * @param {'active' | 'past'} tab - The tab that will be shown.
   * @returns {void}
   */
  switchSurveyList(tab: 'active' | 'past'): void {
    this.selectedTab.set(tab);
  }

  /**
   * Returns the surveys for the selected tab and category.
   * @returns {SurveyInterface[]} The filtered list of surveys.
   */
  filterSurveys(): SurveyInterface[] {
    const base = this.selectedTab() === 'active' ? this.activeSurveys() : this.pastSurveys();
    const cat = this.selectedCategory();
    return !cat || cat === 'All Surveys' ? base : base.filter((s) => s.category === cat);
  }
}

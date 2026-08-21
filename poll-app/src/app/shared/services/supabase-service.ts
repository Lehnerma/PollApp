import { Injectable, signal } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { SurveyInterface } from '../interfaces/survey-interface';
import { environment } from '../../../environments/environment';

/**
 * Service for loading and preparing survey data from Supabase.
 * It keeps the current survey list, available categories and the next expiring surveys in Angular signals.
 */
@Injectable({ providedIn: 'root' })
export class SupabaseService {
  supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  surveyList = signal<SurveyInterface[]>([]); //* survey list realtime
  surveyCategorieList = signal<string[]>([]); //* category list realtime
  nextEndingSurveys = signal<SurveyInterface[]>([]);

  /**
   * Initializes the service and loads all surveys from the backend.
   */
  constructor() {
    this.getAllSurveys();
  }

  //ngOnDestroy():Promise<void> {} //todo add the subscription do unsubscribe

  /**
   * Loads all surveys from the Supabase table and updates the related signals.
   */
  async getAllSurveys(): Promise<void> {
    const response = await this.supabase
      .from('surveys') //
      .select('*');
    this.surveyList.set((response.data ?? []) as SurveyInterface[]);
    this.setCategories();
    this.setNextEndingSurveys();
  }

  /**
   * Updates the category list with unique categories from the current survey data.
   */
  setCategories(): void {
    this.surveyCategorieList.set([...new Set(this.surveyList().map((item) => item.category))]);
  }

  /**
   * Determines the next upcoming surveys and stores the first three in the signal.
   */
  setNextEndingSurveys(): void {
    const allSurveys = this.surveyList();
    const filtered = this.filterUpcomingSurveys(allSurveys);
    const sorted = this.sortByDaySurveys(filtered);
    this.nextEndingSurveys.set(sorted.splice(0, 3));
  }

  /**
   * Filters out surveys whose expiration date is already in the past.
   * @param surveys - Survey list from Supabase.
   * @returns A list of surveys that are still upcoming or currently valid.
   */
  filterUpcomingSurveys(surveys: SurveyInterface[]): SurveyInterface[] {
    const now = Date.now();
    return surveys.filter((survey) => {
      const date = new Date(survey.expires_at).getTime();
      return date >= now;
    });
  }

  /**
   * Sorts the survey list by the nearest expiration date first.
   * @param survey - Survey array to sort.
   * @returns A sorted survey array ordered from earliest to latest expiration date.
   */
  sortByDaySurveys(survey: SurveyInterface[]): SurveyInterface[] {
    return survey.sort((first, second) => new Date(first.expires_at).getTime() - new Date(second.expires_at).getTime());
  }
}

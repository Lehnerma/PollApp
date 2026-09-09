import { SupabaseService } from './supabase-service';
import { computed, inject, Injectable, signal } from '@angular/core';
import { SurveyInterface } from '../interfaces/survey-interface';
import { SurveyModel } from '../models/survey-model';
import { RealtimeChannel } from '@supabase/supabase-js';

@Injectable({ providedIn: 'root' })
export class SurveyService {
  supabaseService = inject(SupabaseService);
  supabase = this.supabaseService.supabase;
  surveyList = signal<SurveyInterface[]>([]);
  surveyCategoryList = signal<string[]>([]);
  nextEndingSurveys = signal<SurveyInterface[]>([]);
  endingSoonSurveysCount = 3;

  surveyChannel: RealtimeChannel;

  pastSurveyList = computed(() => this.filterPastSurveys(this.surveyList()));
  activeSurveyList = computed(() => this.filterUpcomingSurveys(this.surveyList()));

  /**
   * Initializes the service and loads all surveys from the backend.
   */
  constructor() {
    this.getAllSurveys();
    this.surveyChannel = this.subscribeToSurveys();
  }

  /**
   * Loads all surveys from the Supabase table and updates the related signals.
   */
  async getAllSurveys(): Promise<void> {
    const response = await this.supabase.from('surveys').select('*');
    this.surveyList.set((response.data ?? []) as SurveyInterface[]);
    this.setCategories();
    this.setNextEndingSurveys();
  }

  /**
   * Updates the category list with unique categories from the current survey data.
   */
  setCategories(): void {
    this.surveyCategoryList.set([...new Set(this.surveyList().map((item) => item.category))]);
  }

  /**
   * Determines the next upcoming surveys and stores the first three in the signal.
   */
  setNextEndingSurveys(): void {
    const allSurveys = this.surveyList();
    const filtered = this.filterUpcomingSurveys(allSurveys);
    const sorted = this.sortByDaySurveys(filtered);
    this.nextEndingSurveys.set(sorted.splice(0, this.endingSoonSurveysCount));
  }

  /**
   * Filters out surveys whose expiration date is already in the past.
   * @param surveys - Survey list from Supabase.
   * @returns A list of surveys that are still upcoming or currently valid.
   */
  filterUpcomingSurveys(surveys: SurveyInterface[]): SurveyInterface[] {
    return surveys.filter((survey) => !this.isPastSurvey(survey));
  }

  /**
   * Filters out surveys whose expiration date is in the future.
   * @param surveys - Survey list from Supabase.
   * @returns A list of surveys that have already expired.
   */
  filterPastSurveys(surveys: SurveyInterface[]): SurveyInterface[] {
    return surveys.filter((survey) => this.isPastSurvey(survey));
  }

  /**
   * Sorts the survey list by the nearest expiration date first.
   * @param survey - Survey array to sort.
   * @returns A sorted survey array ordered from earliest to latest expiration date.
   */
  sortByDaySurveys(survey: SurveyInterface[]): SurveyInterface[] {
    return [...survey].sort((first, second) => new Date(first.expires_at).getTime() - new Date(second.expires_at).getTime());
  }

  /**
   * Pushes the survey to supabase
   * @param survey
   */
  async addSurvey(survey: SurveyModel): Promise<string | number> {
    const survey_data = survey.getCleanSurveyJson();
    const { error } = await this.supabase.from('surveys').insert([survey_data]).select();
    if (error) throw error;
    return survey_data.id;
  }

  /**
   * Subscribes to realtime changes in the surveys table.
   * @returns The realtime channel used for the subscription.
   */
  subscribeToSurveys(): RealtimeChannel {
    return this.supabase
      .channel(`surveys`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'surveys' }, () => {
        this.getAllSurveys();
      })
      .subscribe();
  }

  /**
   * Checks if the survey has already expired.
   * @param survey - The survey to check.
   * @returns True if the survey has expired, false otherwise.
   */
  isPastSurvey(survey: SurveyInterface): boolean {
    const now = Date.now();
    const date = new Date(survey.expires_at).getTime();
    return date < now;
  }
}

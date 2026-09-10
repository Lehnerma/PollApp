import { computed, inject, Injectable, signal } from '@angular/core';
import { SupabaseService } from './supabase-service';
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
   * @returns {Promise<void>} Resolves once the survey signals have been updated.
   */
  async getAllSurveys(): Promise<void> {
    const response = await this.supabase.from('surveys').select('*');
    this.surveyList.set((response.data ?? []) as SurveyInterface[]);
    this.setCategories();
    this.setNextEndingSurveys();
  }

  /**
   * Updates the category list with unique categories from the current survey data.
   * @returns {void}
   */
  setCategories(): void {
    this.surveyCategoryList.set([...new Set(this.surveyList().map((item) => item.category))]);
  }

  /**
   * Determines the next upcoming surveys and stores the first three in the signal.
   * @returns {void}
   */
  setNextEndingSurveys(): void {
    const allSurveys = this.surveyList();
    const filtered = this.filterUpcomingSurveys(allSurveys);
    const sorted = this.sortByDaySurveys(filtered);
    this.nextEndingSurveys.set(sorted.splice(0, this.endingSoonSurveysCount));
  }

  /**
   * Filters out surveys whose expiration date is already in the past.
   * @param {SurveyInterface[]} surveys - Survey list from Supabase.
   * @returns {SurveyInterface[]} A list of surveys that are still upcoming or currently valid.
   */
  filterUpcomingSurveys(surveys: SurveyInterface[]): SurveyInterface[] {
    return surveys.filter((survey) => !this.isPastSurvey(survey));
  }

  /**
   * Filters out surveys whose expiration date is in the future.
   * @param {SurveyInterface[]} surveys - Survey list from Supabase.
   * @returns {SurveyInterface[]} A list of surveys that have already expired.
   */
  filterPastSurveys(surveys: SurveyInterface[]): SurveyInterface[] {
    return surveys.filter((survey) => this.isPastSurvey(survey));
  }

  /**
   * Sorts the survey list by the nearest expiration date first.
   * @param {SurveyInterface[]} survey - Survey array to sort.
   * @returns {SurveyInterface[]} A sorted survey array ordered from earliest to latest expiration date.
   */
  sortByDaySurveys(survey: SurveyInterface[]): SurveyInterface[] {
    return [...survey].sort((first, second) => new Date(first.expires_at).getTime() - new Date(second.expires_at).getTime());
  }

  /**
   * Pushes the survey to supabase.
   * @param {SurveyModel} survey - The survey model to persist.
   * @returns {Promise<string | number>} The id of the newly inserted survey.
   */
  async addSurvey(survey: SurveyModel): Promise<string | number> {
    const survey_data = survey.getCleanSurveyJson();
    const { error } = await this.supabase.from('surveys').insert([survey_data]).select();
    if (error) throw error;
    return survey_data.id;
  }

  /**
   * Subscribes to realtime changes in the surveys table.
   * @returns {RealtimeChannel} The realtime channel used for the subscription.
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
   * @param {SurveyInterface} survey - The survey to check.
   * @returns {boolean} True if the survey has expired, false otherwise.
   */
  isPastSurvey(survey: SurveyInterface): boolean {
    const now = Date.now();
    const date = new Date(survey.expires_at).getTime();
    return date < now;
  }
}

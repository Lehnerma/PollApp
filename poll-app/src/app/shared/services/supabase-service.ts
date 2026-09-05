import { Injectable, signal } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { SurveyInterface } from '../interfaces/survey-interface';
import { environment } from '../../../environments/environment';
import { SurveyModel } from '../models/survey-model';
import { QuestionModel } from '../models/question-model';
import { OptionModel } from '../models/options-model';
import { SurveyWithQuestionsInterface } from '../interfaces/survey-with-questions-interface';

/**
 * Service for loading and preparing survey data from Supabase.
 * It keeps the current survey list, available categories and the next expiring surveys in Angular signals.
 */
@Injectable({ providedIn: 'root' })
export class SupabaseService {
  supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  surveyList = signal<SurveyInterface[]>([]); //* survey list realtime
  surveyCategoryList = signal<string[]>([]); //* category list realtime
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
    this.surveyCategoryList.set([...new Set(this.surveyList().map((item) => item.category))]);
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

  /**
   * Pushes the survey to supabase
   * @param survey
   */
  async addSurvey(survey: SurveyModel): Promise<string | number> {
    const survey_data = survey.getCleanSurveyJson();
    const { error } = await this.supabase
      .from('surveys')
      .insert([survey_data]) // die daten die gepusht werden soll.
      .select();
    if (error) throw error;
    return survey_data.id;
  }

  /**
   * pushes the question to supabase
   * @param question - is the model with default values
   * @param id - is the connection to the survey
   */
  async addQuestion(question: QuestionModel, id: string | number): Promise<string | number> {
    const question_data = question.getCleanQuestionJson(id);
    const { error } = await this.supabase
      .from('questions')
      .insert([question_data]) // diese daten werden gepusht
      .select();
    if (error) throw error;
    return question_data.id;
  }

  /**
   * pushes the options with the id of the question to connect them
   * @param option - is the model with the values we need
   * @param questionId - is the connection to the question in the superbase
   */
  async addOptions(option: OptionModel, questionId: string | number): Promise<void> {
    const options_data = option.getCleanQuestionJson(questionId);
    const { error } = await this.supabase
      .from('options')
      .insert([options_data]) // diese daten werden gepusht
      .select();
    if (error) throw error;
  }

  /**
   * Loads a single survey including its questions and their options.
   * @param surveyId - id of the survey to load
   * @returns The complete survey, or null if no survey matches the id
   */
  async getSurveyWithQuestions(surveyId: string | number): Promise<SurveyWithQuestionsInterface> {
    const { data, error } = await this.supabase
      .from('surveys')
      .select(
        `*,
    questions(
    *,
    options(*)
    )`,
      )
      .eq('id', surveyId)
      .single(); // wirft bei 0 treffen einen fehler und unser guard resource() zeigt dann die fehler meldung an.
    if (error) throw error;
    console.log(data);

    return data as SurveyWithQuestionsInterface;
  }
}

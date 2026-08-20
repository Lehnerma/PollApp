import { Injectable, signal } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { SurveyInterface } from '../interfaces/survey-interface';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  surveyList = signal<SurveyInterface[]>([]); //* survey list realtime
  surveyCategorieList = signal<string[]>([]); //* category list realtime
  nextEndingSurveys = signal<SurveyInterface[]>([]);

  /**
   * todo schreibe noch doku
   */
  constructor() {
    this.getAllSurveys();
  }

  //ngOnDestroy():Promise<void> {} //todo add the subscription do unsubscribe

  /**
   * get all surveys from the supabase backend
   */
  async getAllSurveys(): Promise<void> {
    const response = await this.supabase
      .from('surveys') // todo delet // only for better reading
      .select('*');
    this.surveyList.set((response.data ?? []) as SurveyInterface[]);
    this.setCategories();
    this.filterSurvey();
  }

  /**
   * Updates the category list with the unique categories from the current surveys.
   */
  setCategories(): void {
    this.surveyCategorieList.set([...new Set(this.surveyList().map((item) => item.category))]);
  }

  filterSurvey(): void {
    console.log(this.surveyList());
    const now = Date.now();
    const allSurveys = this.surveyList();
    const filtered = allSurveys.filter((survey) => {
      const date = new Date(survey.expires_at).getTime();
      console.log(date);
      
      return date >= now;
    });
    
    
    console.log(filtered);
  }
}

import { Injectable, signal } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { SurveyInterface } from '../interfaces/survey-interface';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  surveyCategorieList = signal<string[]>([]); //* category list realtime
  surveyList = signal<SurveyInterface[]>([]); //* survey list realtime
  
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
      .from('surveys') // todo delet - only for better reading
      .select('*');
    this.surveyList.set((response.data ?? []) as SurveyInterface[]);
    //*wenn die data nullish ist dann soll es leeres Array setn ansonst soll es die data als das interface das wir deklariert haben seten
    this.setCategories();
  }

  /**
   * Updates the category list with the unique categories from the current surveys.
   */
  setCategories(): void {
    this.surveyCategorieList.set([...new Set(this.surveyList().map((item) => item.category))]);
  }
}

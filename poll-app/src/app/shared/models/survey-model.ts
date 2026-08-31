import { SurveyInterface } from '../interfaces/survey-interface';

export class SurveyModel implements SurveyInterface {
  id: number | string;
  created_at: string;
  survey_name: string;
  category: string;
  description: string;
  expires_at: string | number;

  /**
   * Baut ein Grundgerüst mit nullish Fallbacks für unser Survey Interface.    * @param data
   */
  constructor(data: Partial<SurveyInterface> = {}) {
    this.id = data.id ?? crypto.randomUUID();
    this.created_at = data.created_at ?? new Date().toISOString();
    this.survey_name = data.survey_name ?? '';
    this.category = data.category ?? ''; //todo check the default value
    this.description = data.description ?? '';
    this.expires_at = data.expires_at ?? 0;
  }

  /**
   * Eine Funktion, die uns ein sauberes JSON-Objekt zurückgibt, mit dem wir dann unsere Values von CreateSurvey befüllen können    */
  getCleanSurveyJson(): SurveyInterface {
    return {
      id: this.id,
      survey_name: this.survey_name,
      created_at: this.created_at,
      category: this.category,
      description: this.description,
      expires_at: this.expires_at,
    };
  }
}

import { SurveyInterface } from '../interfaces/survey-interface';
const DEFAULT_EXPIRY_MONTHS = 6;
export class SurveyModel implements SurveyInterface {
  id: number | string;
  created_at: string;
  survey_name: string;
  category: string;
  description: string;
  expires_at: string | number;

  /**
   * Builds a basic skeleton with nullish fallbacks for our survey interface.
   * @param {Partial<SurveyInterface>} data - Partial survey data to initialize the model from.
   */
  constructor(data: Partial<SurveyInterface> = {}) {
    this.id = data.id ?? crypto.randomUUID();
    this.created_at = data.created_at ?? new Date().toISOString();
    this.survey_name = data.survey_name ?? '';
    this.category = data.category ? data.category : 'No Category';
    this.description = data.description ?? '';
    this.expires_at = data.expires_at ? data.expires_at : this.getDefaultExpiryDate();
  }

  /**
   * A function that returns a clean JSON object which we then use to populate our CreateSurvey values.
   * @returns {SurveyInterface} The plain survey object ready for persistence.
   */
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

  /**
   * It creats a default expire date in 6 month!
   * @returns {string} return da date in 6 months
   */
  getDefaultExpiryDate(): string {
    const today = new Date();
    today.setMonth(today.getMonth() + DEFAULT_EXPIRY_MONTHS);
    return today.toISOString();
  }
}

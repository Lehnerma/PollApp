export interface SurveyInterface {
  id: number | string;
  created_at: string;
  survey_name: string;
  category: string; //todo check if an array for more categories
  description: string;
  expires_at: string | number;
}

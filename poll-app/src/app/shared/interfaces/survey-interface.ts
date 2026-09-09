export interface SurveyInterface {
  id: number | string;
  created_at: string;
  survey_name: string;
  category: string;
  description: string;
  expires_at: string | number;
}

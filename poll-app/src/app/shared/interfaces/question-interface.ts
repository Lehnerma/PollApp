export interface QuestionInterface {
  id: number | string;
  created_at: string;
  name: string;
  survey_id: string; //* connection to the survey
}

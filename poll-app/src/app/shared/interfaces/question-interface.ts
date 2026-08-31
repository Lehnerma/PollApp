export interface QuestionInterface {
  id: number | string;
  created_at: string;
  question_name: string;
  survey_id: string | number; //* connection to the survey
  multiple_options: boolean;
}

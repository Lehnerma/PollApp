export interface OptionInterface {
  id: number | string;
  created_at: string;
  option_name: string;
  question_id: string | number;
  survey_id: string | number;
  votes: number;
}

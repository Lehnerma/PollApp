export interface QuestionFormValue {
  question_name: string;
  multiple_options: boolean;
  options: { option_name: string }[];
}

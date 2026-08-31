import { OptionInterface } from '../interfaces/option-interface';

export class OptionModel implements OptionInterface {
  id: number | string;
  created_at: string;
  option_name: string;
  question_id: string | number; //connection to the survey
  votes: number;

  /**
   * Creates a new question and checks if no value is null or any
   * @param data
   */
  constructor(data: Partial<OptionInterface> = {}) {
    this.id = data.id ?? crypto.randomUUID();
    this.created_at = data.created_at ?? new Date().toISOString();
    this.option_name = data.option_name ?? '';
    this.question_id = data.question_id ?? 0;
    this.votes = data.votes ?? 0;
  }

  /**
   * Creates the JSON for the option
   * @param questionId is the connection to the question
   */
  getCleanQuestionJson(questionId: string | number): OptionInterface {
    return {
      id: this.id,
      created_at: this.created_at,
      option_name: this.option_name,
      question_id: questionId,
      votes: this.votes,
    };
  }
}

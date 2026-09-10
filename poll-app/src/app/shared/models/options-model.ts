import { OptionInterface } from '../interfaces/option-interface';

export class OptionModel implements OptionInterface {
  id: number | string;
  created_at: string;
  option_name: string;
  question_id: string | number;
  survey_id: string | number;
  votes: number;

  /**
   * Creates a new option and fills in nullish fallbacks for any missing value.
   * @param {Partial<OptionInterface>} data - Partial option data to initialize the model from.
   */
  constructor(data: Partial<OptionInterface> = {}) {
    this.id = data.id ?? crypto.randomUUID();
    this.created_at = data.created_at ?? new Date().toISOString();
    this.option_name = data.option_name ?? '';
    this.question_id = data.question_id ?? 0;
    this.survey_id = data.survey_id ?? 0;
    this.votes = data.votes ?? 0;
  }

  /**
   * Creates the JSON for the option.
   * @param {string | number} surveyId - The connection to the survey.
   * @param {string | number} questionId - The connection to the question.
   * @returns {OptionInterface} The plain option object ready for persistence.
   */
  getCleanOptionJson(surveyId: string | number, questionId: string | number): OptionInterface {
    return {
      id: this.id,
      created_at: this.created_at,
      option_name: this.option_name,
      question_id: questionId,
      survey_id: surveyId,
      votes: this.votes,
    };
  }
}

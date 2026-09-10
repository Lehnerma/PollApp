import { QuestionInterface } from '../interfaces/question-interface';

export class QuestionModel implements QuestionInterface {
  id: number | string;
  created_at: string;
  question_name: string;
  survey_id: string | number;
  multiple_options: boolean;

  /**
   * Creates a new question and fills in nullish fallbacks for any missing value.
   * @param {Partial<QuestionInterface>} data - Partial question data to initialize the model from.
   */
  constructor(data: Partial<QuestionInterface> = {}) {
    this.id = data.id ?? crypto.randomUUID();
    this.question_name = data.question_name ?? '';
    this.created_at = data.created_at ?? new Date().toISOString();
    this.survey_id = data.survey_id ?? 0;
    this.multiple_options = data.multiple_options ?? false;
  }

  /**
   * Creates the JSON for the question.
   * @param {string | number} surveyId - The connection to the survey.
   * @returns {QuestionInterface} The plain question object ready for persistence.
   */
  getCleanQuestionJson(surveyId: string | number): QuestionInterface {
    return {
      id: this.id,
      created_at: this.created_at,
      question_name: this.question_name,
      survey_id: surveyId,
      multiple_options: this.multiple_options,
    };
  }
}

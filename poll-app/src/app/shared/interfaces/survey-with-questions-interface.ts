import { SurveyInterface } from './survey-interface';
import { QuestionWithOptionsInterface } from './question-with-options-interface';

export interface SurveyWithQuestionsInterface extends SurveyInterface {
  questions: QuestionWithOptionsInterface[];
}

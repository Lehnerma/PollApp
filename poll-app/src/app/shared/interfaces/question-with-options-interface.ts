import { QuestionInterface } from './question-interface';
import { OptionInterface } from './option-interface';

export interface QuestionWithOptionsInterface extends QuestionInterface {
  options: OptionInterface[];
}

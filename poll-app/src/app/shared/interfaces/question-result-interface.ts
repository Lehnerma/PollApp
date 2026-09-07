import { OptionResultInterface } from './option-result-interface';
import { QuestionWithOptionsInterface } from './question-with-options-interface';

export interface QuestionResultInterface extends QuestionWithOptionsInterface {
  options: OptionResultInterface[];
  totalVotes: number;
}

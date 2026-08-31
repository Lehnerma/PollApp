import { FormArray, FormControl, FormGroup } from '@angular/forms';

export interface QuestionForm {
  question_name: FormControl<string>;
  multiple_options: FormControl<boolean>;
  options: FormArray<FormGroup<OptionForm>>;
}

export interface OptionForm {
  option_name: FormControl<string>;
}

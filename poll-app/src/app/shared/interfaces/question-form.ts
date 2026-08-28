import { FormArray, FormControl, FormGroup } from '@angular/forms';

export interface QuestionForm {
  questionName: FormControl<string>;
  multipleOptions: FormControl<boolean>;
  options: FormArray<FormGroup<OptionForm>>;
}

export interface OptionForm {
  text: FormControl<string>;
}

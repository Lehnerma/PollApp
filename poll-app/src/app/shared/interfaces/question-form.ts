import { FormArray, FormControl, FormGroup } from '@angular/forms';

export interface QuestionForm {
  name: FormControl<string>;
  multipleOptions: FormControl<boolean>;
  options: FormArray<FormGroup<OptionForm>>;
}

export interface OptionForm {
  text: FormControl<string>;
}

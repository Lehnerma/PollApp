import { FormControl } from '@angular/forms';

export interface DetailsForm {
  surveyName: FormControl<string>;
  category: FormControl<string>;
  endDate: FormControl<string>;
  description: FormControl<string>;
}

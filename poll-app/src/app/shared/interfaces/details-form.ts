import { FormControl } from '@angular/forms';

export interface DetailsForm {
  surveyName: FormControl<string>;
  category: FormControl<string>;
  expires_at: FormControl<string>;
  description: FormControl<string>;
}

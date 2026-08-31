import { FormControl } from '@angular/forms';

export interface DetailsForm {
  survey_name: FormControl<string>;
  category: FormControl<string>;
  expires_at: FormControl<string>;
  description: FormControl<string>;
}

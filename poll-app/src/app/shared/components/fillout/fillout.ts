import { Component, inject, resource } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Status } from '../status/status';
import { DatePipe } from '@angular/common';
import { CheckboxComponent } from '../checkbox-component/checkbox-component';
import { SupabaseService } from '../../services/supabase-service';
@Component({
  selector: 'fill-out',
  imports: [Status, RouterLink, DatePipe, CheckboxComponent],
  templateUrl: './fillout.html',
  styleUrl: './fillout.scss',
})
export class FillOut {
  router = inject(Router);
  private route = inject(ActivatedRoute);
  currentId = this.route.snapshot.paramMap.get('id') ?? ''; // id of the survey
  supabase = inject(SupabaseService);

  /**
   * Loads the survey from the supabase.
   */
  surveyResource = resource({
    params: () => ({ id: this.currentId }),
    loader: ({ params }) => this.supabase.getSurveyWithQuestions(params.id),
  });

  /**
   * Returns the uppercase letter for the given option index.
   *
   * @param index The zero-based option index.
   * @returns The corresponding uppercase letter A, B ...
   */
  getLetterFromIndex(index: number): string {
    return String.fromCharCode(65 + index);
  }
}

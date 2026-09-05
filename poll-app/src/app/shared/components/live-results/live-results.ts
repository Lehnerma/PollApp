import { Component, inject, resource } from '@angular/core';
import { SupabaseService } from '../../services/supabase-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Progressbar } from '../progressbar/progressbar';
import { getLetterFromIndex } from '../../utils/opt-label.util';

@Component({
  selector: 'app-live-results',
  imports: [Progressbar],
  templateUrl: './live-results.html',
  styleUrl: './live-results.scss',
})
export class LiveResults {
  router = inject(Router);
  private route = inject(ActivatedRoute);
  currentId = this.route.snapshot.paramMap.get('id') ?? '';
  supabase = inject(SupabaseService);
  protected readonly getLetterFromIndex = getLetterFromIndex;

  /**
   * Loads the survey from the supabase.
   */
  surveyResource = resource({
    params: () => ({ id: this.currentId }),
    loader: ({ params }) => this.supabase.getSurveyWithQuestions(params.id),
  });

  /**
   *
   */
  constructor() {
    // this.supabase.subscribeToOptions();
  }
}

import { Component, inject, resource } from '@angular/core';
import { FillOut } from '../../components/fillout/fillout';
import { LiveResults } from '../../components/live-results/live-results';
import { ActivatedRoute } from '@angular/router';
import { SupabaseService } from '../../services/supabase-service';
import { MainHeader } from '../../components/main-header/main-header';

@Component({
  selector: 'app-single-view',
  imports: [FillOut, LiveResults, MainHeader],
  templateUrl: './single-view.html',
  styleUrl: './single-view.scss',
})
export class SingleView {
  private route = inject(ActivatedRoute);
  private supabase = inject(SupabaseService);
  currentId = this.route.snapshot.paramMap.get('id') ?? '';

  surveyResource = resource({
    params: () => ({ id: this.currentId }),
    loader: ({ params }) => this.supabase.getSurveyWithQuestions(params.id),
  });
}

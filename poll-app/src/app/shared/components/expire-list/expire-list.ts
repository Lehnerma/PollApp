import { Component, inject } from '@angular/core';
import { SurveyCard } from '../survey-card/survey-card';
import { SupabaseService } from '../../services/supabase-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expire-list',
  imports: [SurveyCard],
  templateUrl: './expire-list.html',
  styleUrl: './expire-list.scss',
})
export class ExpireList {
  supabaseService = inject(SupabaseService);
  router = inject(Router)
  nextEndingList = this.supabaseService.nextEndingSurveys;
}

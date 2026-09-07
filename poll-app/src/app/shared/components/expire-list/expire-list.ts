import { Component, inject } from '@angular/core';
import { SurveyCard } from '../survey-card/survey-card';
import { Router } from '@angular/router';
import { SurveyService } from '../../services/survey-service';

@Component({
  selector: 'app-expire-list',
  imports: [SurveyCard],
  templateUrl: './expire-list.html',
  styleUrl: './expire-list.scss',
})
export class ExpireList {
  supabase = inject(SurveyService);
  router = inject(Router);
  nextEndingList = this.supabase.nextEndingSurveys;
}

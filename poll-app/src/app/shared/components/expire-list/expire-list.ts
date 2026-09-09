import { Component, inject } from '@angular/core';
import { SurveyCard } from '../survey-card/survey-card';
import { SurveyService } from '../../services/survey-service';

@Component({
  selector: 'app-expire-list',
  imports: [SurveyCard],
  templateUrl: './expire-list.html',
  styleUrl: './expire-list.scss',
})
export class ExpireList {
  supabase = inject(SurveyService);
  nextEndingList = this.supabase.nextEndingSurveys;
}

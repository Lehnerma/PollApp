import { Component, inject } from '@angular/core';
import { FillOut } from '../../components/fillout/fillout';
import { LiveResults } from '../../components/live-results/live-results';
import { ActivatedRoute } from '@angular/router';
import { MainHeader } from '../../components/main-header/main-header';
import { App } from '../../../app';
import { SurveyResultsService } from '../../services/survey-results-service';

@Component({
  selector: 'app-single-view',
  imports: [FillOut, LiveResults, MainHeader],
  templateUrl: './single-view.html',
  styleUrl: './single-view.scss',
  providers: [SurveyResultsService],
})
export class SingleView {
  private route = inject(ActivatedRoute);
  app = inject(App);
  currentId = this.route.snapshot.paramMap.get('id') ?? '';
}

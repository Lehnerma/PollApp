import { Component, inject } from '@angular/core';
import { Collapsible } from '../../components/collapsible/collapsible';
import { FillOut } from '../../components/fillout/fillout';
import { LiveResults } from '../../components/live-results/live-results';
import { MainHeader } from '../../components/main-header/main-header';
import { App } from '../../../app';
import { SurveyResultsService } from '../../services/survey-results-service';

@Component({
  selector: 'app-single-view',
  imports: [Collapsible, FillOut, LiveResults, MainHeader],
  templateUrl: './single-view.html',
  styleUrl: './single-view.scss',
  providers: [SurveyResultsService],
})
export class SingleView {
  app = inject(App);
}

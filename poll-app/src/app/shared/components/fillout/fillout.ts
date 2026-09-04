import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Status } from '../status/status';
import { SurveyInterface } from '../../interfaces/survey-interface';
import { SurveyModel } from '../../models/survey-model';
import { DatePipe } from '@angular/common';
import { QuestionModel } from '../../models/question-model';
import { CheckboxComponent } from '../checkbox-component/checkbox-component';

@Component({
  selector: 'fill-out',
  imports: [Status, RouterLink, DatePipe, CheckboxComponent],
  templateUrl: './fillout.html',
  styleUrl: './fillout.scss',
})
export class FillOut {
  router = inject(Router);
  private route = inject(ActivatedRoute);
  //currentId = Number(this.route.snapshot.paramMap.get('id'));
  
  survey: SurveyInterface = new SurveyModel();
  questions = [new QuestionModel(), new QuestionModel];

  /**
   * Only for testing und styling
   */
  constructor() {
    this.survey.survey_name = 'Lass uns einen umfrage starten';
    this.survey.description = 'Das soll eine beschreibung sein um die Form besser zu stylen';
    
    this.questions[0].question_name = 'Lass uns die erste Frage stellen?'
    this.questions[0].multiple_options = true;

    this.questions[1].question_name = 'Lass uns die zweite Frage stellen?'
    this.questions[1].multiple_options = false;
  }
}

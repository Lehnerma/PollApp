import { Component, computed, inject, resource } from '@angular/core';
import { SupabaseService } from '../../services/supabase-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Progressbar } from '../progressbar/progressbar';
import { getLetterFromIndex } from '../../utils/opt-label.util';
import { QuestionResultInterface } from '../../interfaces/question-result-interface';
import { QuestionWithOptionsInterface } from '../../interfaces/question-with-options-interface';
import { OptionInterface } from '../../interfaces/option-interface';

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
  optionSubscribe;

  constructor() {
    this.optionSubscribe = this.supabase.subscribeToOptions(this.currentId); // subscription to get updates to the options for the surveyId
  }

  ngOnDestroy() {
    this.supabase.removeChannel(this.optionSubscribe);
  }

  /**
   * Loads the survey from the supabase.
   */
  surveyResource = resource({
    params: () => ({ id: this.currentId }),
    loader: ({ params }) => this.supabase.getSurveyWithQuestions(params.id),
  });

  /**
   * Bereitet die Fragen der Survey mit Prozentwerten für die Anzeige auf.
   */
  resultView = computed<QuestionResultInterface[]>(
    () => this.surveyResource.value()?.questions.map((question) => this.toQuestionResult(question)) ?? [],
  );

  /**
   * Reichert eine Frage um die Gesamtstimmen und Prozentwerte je Option an.
   * @param question - Frage samt Optionen aus Supabase.
   * @returns Frage mit totalVotes und percent pro Option.
   */
  private toQuestionResult(question: QuestionWithOptionsInterface): QuestionResultInterface {
    const totalVotes = question.options.reduce((sum, option) => sum + option.votes, 0);
    return {
      ...question, // enthallt alle bestandteile der question
      totalVotes, // wird zu der question hinzugefugt und zahlt alle stimmen.
      options: question.options.map((option) => ({
        ...option, // die option
        percent: totalVotes ? Math.round((option.votes / totalVotes) * 100) : 0, // die option werden mit dem percent erweitert und es wird gerundent.
      })),
    };
  }

  private applyOptionUpdate(changed: OptionInterface): void {
    this.surveyResource.update(
      (survey) =>
        survey && {
          ...survey,
          questions: survey.questions.map((q) => ({
            ...q,
            options: q.options.map((o) => (o.id === changed.id ? changed : o)),
          })),
        },
    );
  }

  logger() {
    console.log(this.surveyResource);
  }
}

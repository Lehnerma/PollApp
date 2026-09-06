import { computed, inject, Injectable, OnDestroy, resource } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RealtimeChannel } from '@supabase/supabase-js';
import { SupabaseService } from './supabase-service';
import { OptionInterface } from '../interfaces/option-interface';
import { QuestionResultInterface } from '../interfaces/question-result-interface';
import { QuestionWithOptionsInterface } from '../interfaces/question-with-options-interface';

/**
 * Haelt den Live-Zustand einer einzelnen Ergebnis-Ansicht.
 * Wird pro Component bereitgestellt, damit Resource und Realtime-Channel am Lebenszyklus der View haengen.
 */
@Injectable()
export class SurveyResultsService implements OnDestroy {
  private route = inject(ActivatedRoute);
  private supabase = inject(SupabaseService);
  currentId = this.route.snapshot.paramMap.get('id') ?? '';
  optionChannel: RealtimeChannel;

  /**
   * Oeffnet die Realtime-Subscription fuer die Optionen der aktuellen Survey.
   */
  constructor() {
    this.optionChannel = this.supabase.subscribeToOptions(this.currentId, (option) => this.applyOptionUpdate(option));
  }

  /**
   * Schliesst die Subscription, sobald die Ansicht zerstoert wird.
   */
  ngOnDestroy(): void {
    this.supabase.removeChannel(this.optionChannel);
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

  /**
   * Patcht eine geaenderte Option im geladenen Survey-Wert, ohne neu zu laden.
   * @param changed - die per Realtime gemeldete Option.
   */
  private applyOptionUpdate(changed: OptionInterface): void {
    this.surveyResource.update(
      (survey) =>
        survey && {
          ...survey,
          questions: survey.questions.map((question) => ({
            ...question,
            options: question.options.map((option) => (option.id === changed.id ? changed : option)),
          })),
        },
    );
  }
}

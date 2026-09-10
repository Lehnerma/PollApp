import { computed, inject, Injectable, resource, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SupabaseService } from './supabase-service';
import { QuestionResultInterface } from '../interfaces/question-result-interface';
import { QuestionWithOptionsInterface } from '../interfaces/question-with-options-interface';

/**
 * Keeps the live state of a single results view.
 * Provided per component so the resource and realtime channel follow the view lifecycle.
 */
@Injectable()
export class SurveyResultsService {
  private route = inject(ActivatedRoute);
  currentId = this.route.snapshot.paramMap.get('id') ?? '';
  private supabase = inject(SupabaseService);
  /**
   * Loads the survey from the supabase.
   */
  surveyResource = resource({
    params: () => ({ id: this.currentId }),
    loader: ({ params }) => this.supabase.getSurveyWithQuestions(params.id),
  });
  /**
   * Holds the current selection per question as long as it is not submitted yet.
   */
  answer = signal<Map<string, Set<string>>>(new Map());
  /**
   * Marks whether the current selection was already written to the database.
   */
  votesSubmitted = signal(false);
  /**
   * Flattens the current selection into a set of option ids.
   */
  private pendingVotes = computed(() => new Set([...this.answer().values()].flatMap((options) => [...options])));
  /**
   * Prepares the survey questions with percentage values for display.
   */
  resultView = computed<QuestionResultInterface[]>(
    () => this.surveyResource.value()?.questions.map((question) => this.toQuestionResult(question)) ?? [],
  );

  /**
   * Enriches a question with total votes and percentage values per option.
   * The not yet submitted selection is counted optimistically, so the results react to every click.
   * @param question - Question with options from Supabase.
   * @returns Question with totalVotes and percent for each option.
   */
  private toQuestionResult(question: QuestionWithOptionsInterface): QuestionResultInterface {
    const options = question.options.map((option) => ({ ...option, votes: option.votes + this.pendingVoteFor(option.id) }));
    const totalVotes = options.reduce((sum, option) => sum + option.votes, 0);
    return {
      ...question,
      totalVotes,
      options: options.map((option) => ({
        ...option,
        percent: totalVotes ? Math.round((option.votes / totalVotes) * 100) : 0,
      })),
    };
  }

  /**
   * Returns the optimistic vote of an option taken from the current selection.
   * @param optionId - id of the option to check.
   * @returns 1 while the option is selected and not submitted yet, otherwise 0.
   */
  private pendingVoteFor(optionId: string | number): number {
    if (this.votesSubmitted()) return 0;
    return this.pendingVotes().has(String(optionId)) ? 1 : 0;
  }
}

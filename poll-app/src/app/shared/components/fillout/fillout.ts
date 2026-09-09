import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Status } from '../status/status';
import { CheckboxComponent } from '../checkbox-component/checkbox-component';
import { QuestionInterface } from '../../interfaces/question-interface';
import { getLetterFromIndex } from '../../utils/opt-label.util';
import { ensureQuestionMark } from '../../utils/question-mark-util';
import { SurveyService } from '../../services/survey-service';
import { SupabaseService } from '../../services/supabase-service';
import { SurveyResultsService } from '../../services/survey-results-service';

@Component({
  selector: 'fill-out',
  imports: [Status, RouterLink, DatePipe, CheckboxComponent, FormsModule],
  templateUrl: './fillout.html',
  styleUrl: './fillout.scss',
})
export class FillOut {
  router = inject(Router);
  supabase = inject(SupabaseService);
  surveyService = inject(SurveyService);
  protected results = inject(SurveyResultsService);
  protected readonly getLetterFromIndex = getLetterFromIndex;
  protected readonly ensureQuestionMark = ensureQuestionMark;
  answer = signal<Map<string, Set<string>>>(new Map());
  isPast = computed(() => {
    const survey = this.results.surveyResource.value();
    return survey ? this.surveyService.isPastSurvey(survey) : false;
  });

  /**
   * Checks whether an option has already been selected for a specific question.
   *
   * @param questionId The ID of the question.
   * @param optionId The ID of the option.
   * @returns true if the option is selected, otherwise false.
   */
  isSelected(questionId: string, optionId: string): boolean {
    return this.answer().get(String(questionId))?.has(String(optionId)) ?? false;
  }

  /**
   * Updates the selection of a question with a new option.
   *
   * @param question The question whose selection should be changed.
   * @param optionId The ID of the option that should be selected or deselected.
   */
  select(question: QuestionInterface, optionId: string): void {
    const next = new Map(this.answer());
    const current = next.get(String(question.id)) ?? new Set<string>();
    const deltas = this.voteDeltas(question, optionId, current);
    next.set(String(question.id), this.nextSelection(question, optionId, current));
    this.answer.set(next);
    deltas.forEach(([id, delta]) => this.supabase.changeVote(id, delta));
  }

  /**
   * Calculates the new selection for a question based on the current selection.
   *
   * @param question The question for which the selection is calculated.
   * @param optionId The ID of the option to be adjusted.
   * @param next The current set of already selected options.
   * @returns The new set with the updated selection.
   */
  nextSelection(question: QuestionInterface, optionId: string, next: Set<string>): Set<string> {
    if (!question.multiple_options) return new Set([optionId]);
    if (next.has(optionId)) next.delete(optionId);
    else next.add(optionId);
    return next;
  }

  /**
   * Determines which options have to be up- or downvoted for a click.
   * Must be called before nextSelection() because that mutates the current set.
   *
   * @param question The question the clicked option belongs to.
   * @param optionId The ID of the clicked option.
   * @param current The set of selected options before the click.
   * @returns Pairs of option ID and vote delta, e.g. [['abc', -1], ['def', 1]].
   */
  voteDeltas(question: QuestionInterface, optionId: string, current: Set<string>): [string, number][] {
    if (question.multiple_options) return [[optionId, current.has(optionId) ? -1 : 1]];
    const previous = [...current][0];
    if (!previous) return [[optionId, 1]];
    if (previous === optionId) return [];
    return [
      [previous, -1],
      [optionId, 1],
    ];
  }

  /**
   * Navigates to the home page
   */
  onSubmit(): void {
    this.router.navigate(['']);
  }
}

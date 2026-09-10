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
import { ParticipationService } from '../../services/participation-service';
import { isInvalid } from '../../utils/form-validation.util';

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
  participationService = inject(ParticipationService);
  isSubmitted = signal(false);
  allAnswered = computed(() => this.checkEveryQuestionAnswered());
  protected results = inject(SurveyResultsService);
  answer = this.results.answer;
  allreadyFilled = signal(this.participationService.hasParticipated(this.results.currentId));
  isPast = computed(() => {
    const survey = this.results.surveyResource.value();
    return survey ? this.surveyService.isPastSurvey(survey) : false;
  });
  protected readonly getLetterFromIndex = getLetterFromIndex;
  protected readonly ensureQuestionMark = ensureQuestionMark;
  protected readonly isInvalid = isInvalid;

  /**
   * Checks whether an option has already been selected for a specific question.
   *
   * @param {string} questionId - The ID of the question.
   * @param {string} optionId - The ID of the option.
   * @returns {boolean} true if the option is selected, otherwise false.
   */
  isSelected(questionId: string, optionId: string): boolean {
    return this.answer().get(String(questionId))?.has(String(optionId)) ?? false;
  }

  /**
   * Updates the selection of a question with a new option.
   *
   * @param {QuestionInterface} question - The question whose selection should be changed.
   * @param {string} optionId - The ID of the option that should be selected or deselected.
   * @returns {void}
   */
  select(question: QuestionInterface, optionId: string): void {
    const next = new Map(this.answer());
    const current = next.get(String(question.id)) ?? new Set<string>();
    next.set(String(question.id), this.nextSelection(question, optionId, current));
    this.answer.set(next);
  }

  /**
   * Calculates the new selection for a question based on the current selection.
   *
   * @param {QuestionInterface} question - The question for which the selection is calculated.
   * @param {string} optionId - The ID of the option to be adjusted.
   * @param {Set<string>} next - The current set of already selected options.
   * @returns {Set<string>} The new set with the updated selection.
   */
  nextSelection(question: QuestionInterface, optionId: string, next: Set<string>): Set<string> {
    if (!question.multiple_options) return new Set([optionId]);
    if (next.has(optionId)) next.delete(optionId);
    else next.add(optionId);
    return next;
  }

  /**
   * Navigates to the home page.
   * @returns {Promise<void>} Resolves once the vote has been submitted and navigation was triggered.
   */
  async onSubmit(): Promise<void> {
    if (!this.allAnswered() || this.isSubmitted()) return;
    this.isSubmitted.set(true);
    try {
      const ids = this.collectSelectedOptionIds();
      await Promise.all(ids.map((id) => this.supabase.changeVote(id, 1)));
      this.results.votesSubmitted.set(true);
      this.participationService.markParticipated(this.results.currentId);
      this.results.surveyResource.reload();
      this.allreadyFilled.set(true);
    } finally {
      this.isSubmitted.set(false);
    }
    this.router.navigate(['']);
  }

  /**
   * Collects the IDs of all selected options.
   *
   * @returns {string[]} A list of selected options id.
   */
  collectSelectedOptionIds(): string[] {
    return [...this.answer().values()].flatMap((option) => [...option]);
  }
  /**
   * Checks whether every question of the loaded survey has at least one selected option.
   *
   * @returns {boolean} true if all questions are answered, otherwise false.
   */
  checkEveryQuestionAnswered(): boolean {
    const survey = this.results.surveyResource.value();
    if (!survey) return false;
    const answers = this.answer();
    return survey.questions.every((question) => (answers.get(String(question.id))?.size ?? 0) > 0);
  }
}

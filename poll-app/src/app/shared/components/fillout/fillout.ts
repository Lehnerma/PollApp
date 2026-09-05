import { Component, inject, resource, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Status } from '../status/status';
import { DatePipe } from '@angular/common';
import { CheckboxComponent } from '../checkbox-component/checkbox-component';
import { SupabaseService } from '../../services/supabase-service';
import { QuestionInterface } from '../../interfaces/question-interface';
@Component({
  selector: 'fill-out',
  imports: [Status, RouterLink, DatePipe, CheckboxComponent],
  templateUrl: './fillout.html',
  styleUrl: './fillout.scss',
})
export class FillOut {
  router = inject(Router);
  private route = inject(ActivatedRoute);
  currentId = this.route.snapshot.paramMap.get('id') ?? ''; // id of the survey
  supabase = inject(SupabaseService);

  answer = signal<Map<string, Set<string>>>(new Map());

  /**
   * Loads the survey from the supabase.
   */
  surveyResource = resource({
    params: () => ({ id: this.currentId }),
    loader: ({ params }) => this.supabase.getSurveyWithQuestions(params.id),
  });

  /**
   * Returns the uppercase letter for the given option index.
   *
   * @param index The zero-based option index.
   * @returns The corresponding uppercase letter A, B ...
   */
  getLetterFromIndex(index: number): string {
    return String.fromCharCode(65 + index);
  }

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
    const next = new Map(this.answer()); // copy the map
    const current = next.get(String(question.id)) ?? new Set<string>(); // get the existing set or create a new one
    next.set(String(question.id), this.nextSelection(question, optionId, current)); // set the new set
    this.answer.set(next);
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
    if (!question.multiple_options) return new Set([optionId]); // replace or ->
    if (next.has(optionId)) next.delete(optionId);
    else next.add(optionId);
    return next;
  }
}

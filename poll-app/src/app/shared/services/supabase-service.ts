import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';
import { QuestionModel } from '../models/question-model';
import { OptionModel } from '../models/options-model';
import { SurveyWithQuestionsInterface } from '../interfaces/survey-with-questions-interface';

/**
 * Service for loading and preparing survey data from Supabase.
 * It keeps the current survey list, available categories and the next expiring surveys in Angular signals.
 */
@Injectable({ providedIn: 'root' })
export class SupabaseService {
  supabase = createClient(environment.supabaseUrl, environment.supabaseKey);

  /**
   * Pushes the question to supabase.
   * @param {QuestionModel} question - Is the model with default values.
   * @param {string | number} surveyId - Is the connection to the survey.
   * @returns {Promise<string | number>} The id of the newly inserted question.
   */
  async addQuestion(question: QuestionModel, surveyId: string | number): Promise<string | number> {
    const question_data = question.getCleanQuestionJson(surveyId);
    const { error } = await this.supabase.from('questions').insert([question_data]).select();
    if (error) throw error;
    return question_data.id;
  }

  /**
   * Pushes the options with the id of the question to connect them.
   * @param {OptionModel} option - Is the model with the values we need.
   * @param {string | number} surveyId - Is the connection to the survey in the supabase.
   * @param {string | number} questionId - Is the connection to the question in the supabase.
   * @returns {Promise<void>} Resolves once the options have been inserted.
   */
  async addOptions(option: OptionModel, surveyId: string | number, questionId: string | number): Promise<void> {
    const options_data = option.getCleanOptionJson(surveyId, questionId);
    const { error } = await this.supabase.from('options').insert([options_data]).select();
    if (error) throw error;
  }

  /**
   * Loads a single survey including its questions and their options.
   * @param {string | number} surveyId - Id of the survey to load.
   * @returns {Promise<SurveyWithQuestionsInterface>} The complete survey, or null if no survey matches the id.
   */
  async getSurveyWithQuestions(surveyId: string | number): Promise<SurveyWithQuestionsInterface> {
    const { data, error } = await this.supabase
      .from('surveys')
      .select(
        `*,
    questions(
    *,
    options(*)
    )`,
      )
      .eq('id', surveyId)
      .single();
    if (error) throw error;
    return data as SurveyWithQuestionsInterface;
  }

  /**
   * Changes the vote count for an option.
   * @param {string} optionId - The ID of the option to update.
   * @param {number} delta - The amount to add to the current vote count.
   * @returns {Promise<void>} Resolves once the vote count has been updated.
   */
  async changeVote(optionId: string, delta: number): Promise<void> {
    const { data, error: selectError } = await this.supabase.from('options').select('votes').eq('id', optionId).single();
    if (selectError) throw selectError;
    const { error: updateError } = await this.supabase
      .from('options')
      .update({ votes: (data.votes ?? 0) + delta })
      .eq('id', optionId);
    if (updateError) throw updateError;
  }
}

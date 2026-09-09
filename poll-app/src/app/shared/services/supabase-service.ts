import { Injectable } from '@angular/core';
import { createClient, RealtimeChannel } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';
import { QuestionModel } from '../models/question-model';
import { OptionModel } from '../models/options-model';
import { SurveyWithQuestionsInterface } from '../interfaces/survey-with-questions-interface';
import { OptionInterface } from '../interfaces/option-interface';

/**
 * Service for loading and preparing survey data from Supabase.
 * It keeps the current survey list, available categories and the next expiring surveys in Angular signals.
 */
@Injectable({ providedIn: 'root' })
export class SupabaseService {
  supabase = createClient(environment.supabaseUrl, environment.supabaseKey);

  /**
   * pushes the question to supabase
   * @param question - is the model with default values
   * @param surveyId - is the connection to the survey
   */
  async addQuestion(question: QuestionModel, surveyId: string | number): Promise<string | number> {
    const question_data = question.getCleanQuestionJson(surveyId);
    const { error } = await this.supabase.from('questions').insert([question_data]).select();
    if (error) throw error;
    return question_data.id;
  }

  /**
   * pushes the options with the id of the question to connect them
   * @param option - is the model with the values we need
   * @param surveyId - is the connection to the survey in the supabase
   * @param questionId - is the connection to the question in the supabase
   */
  async addOptions(option: OptionModel, surveyId: string | number, questionId: string | number): Promise<void> {
    const options_data = option.getCleanOptionJson(surveyId, questionId);
    const { error } = await this.supabase.from('options').insert([options_data]).select();
    if (error) throw error;
  }

  /**
   * Loads a single survey including its questions and their options.
   * @param surveyId - id of the survey to load
   * @returns The complete survey, or null if no survey matches the id
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
   * @param optionId - The ID of the option to update.
   * @param delta - The amount to add to the current vote count.
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

  /**
   * Subscribs for the options for updates - with the surveyId
   * @param surveyId - is the uuid for the right survey.
   * @param onUpdate - callback that receives every changed option.
   * @returns RealtimeChannel for the subscription
   */
  subscribeToOptions(surveyId: string, onUpdate: (option: OptionInterface) => void): RealtimeChannel {
    return this.supabase
      .channel(`options:${surveyId}`)
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'options', filter: `survey_id=eq.${surveyId}` },
        (payload) => {
          const cur = new OptionModel(payload.new);
          onUpdate(cur);
        },
      )
      .subscribe();
  }

  /**
   * Removes a realtime channel so the subscription is closed.
   * @param channel - the channel returned by a subscribe method.
   */
  async removeChannel(channel: RealtimeChannel): Promise<void> {
    await this.supabase.removeChannel(channel);
  }
}

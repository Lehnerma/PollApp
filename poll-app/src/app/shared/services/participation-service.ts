import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ParticipationService {
  /**
   * Marks that the survey is filled out for this browser
   * @param surveyId - the ID of the survey
   */
  markParticipated(surveyId: string): void {
    if (!surveyId) return;
    localStorage.setItem(this.key(surveyId), new Date().toISOString());
  }

  /**
   * Checks if the survey has filled out from this browser
   * @param surveyId - the ID of the survey
   * @returns boolean - of the survey has filled out or not
   */
  hasParticipated(surveyId: string): boolean {
    if (!surveyId) return false;
    return localStorage.getItem(this.key(surveyId)) !== null;
  }

  /**
   * Create the local storage key for the survey
   * @param surveyId - the unique id of the survey
   * @return
   */
  private key(surveyId: string): string {
    return `survey:${surveyId}`;
  }
}

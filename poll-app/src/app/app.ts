import { Component, ElementRef, effect, signal, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SurveyCreateComponent } from './shared/components/survey-create-component/survey-create-component';
import { MainHeader } from './shared/components/main-header/main-header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SurveyCreateComponent, MainHeader],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  isCreateSurveyOpen = signal(false);
  private createSurveyDialog = viewChild<ElementRef<HTMLDialogElement>>('createSurveyDialog');

  /**
   * Opens or closes the native create-survey dialog whenever isCreateSurveyOpen changes,
   * and locks page scroll while it is open.
   */
  constructor() {
    effect(() => {
      const dialog = this.createSurveyDialog()?.nativeElement;
      if (!dialog) return;
      const shouldBeOpen = this.isCreateSurveyOpen();
      if (shouldBeOpen && !dialog.open) dialog.showModal();
      if (!shouldBeOpen && dialog.open) dialog.close();
      document.body.style.overflow = shouldBeOpen ? 'hidden' : '';
    });
  }

  /**
   * Opens the create-survey dialog.
   * @returns {void}
   */
  openCreateSurveyDialog(): void {
    this.isCreateSurveyOpen.set(true);
  }

  /**
   * Closes the create-survey dialog.
   * @returns {void}
   */
  closeCreateSurveyDialog(): void {
    this.isCreateSurveyOpen.set(false);
  }
}

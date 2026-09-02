import { Component, DestroyRef, effect, inject, model } from '@angular/core';
import { Router } from '@angular/router';

const AUTO_CLOSE_DELAY_MS = 3000;

/**
 * Toast notification shown on survey publish, with auto-close and slide-in animation.
 */
@Component({
  selector: 'toast-msg',
  imports: [],
  templateUrl: './toast-msg.html',
  styleUrl: './toast-msg.scss',
})
export class ToastMsg {
  visible = model<boolean>(false);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private autoCloseTimeout?: ReturnType<typeof setTimeout>;

  /**
   * Watches the visibility signal and starts or clears the auto-close timer accordingly.
   */
  constructor() {
    effect(() => {
      if (this.visible()) {
        this.startAutoClose();
      } else {
        this.clearAutoClose();
      }
    });
    this.destroyRef.onDestroy(() => this.clearAutoClose());
  }

  /**
   * Starts the auto-close timer that hides the toast and navigates back to the home page.
   */
  private startAutoClose(): void {
    this.clearAutoClose();
    this.autoCloseTimeout = setTimeout(() => {
      this.visible.set(false);
      this.router.navigate(['/']);
    }, AUTO_CLOSE_DELAY_MS);
  }

  /**
   * Clears a pending auto-close timer, if any.
   */
  private clearAutoClose(): void {
    clearTimeout(this.autoCloseTimeout);
  }

  /**
   * Closes the toast manually, e.g. via the close button.
   */
  close(): void {
    this.visible.set(false);
  }
}

import { Component, DestroyRef, computed, inject, input, signal } from '@angular/core';

const NARROW_MEDIA_QUERY = '(max-width: 799.98px)';

@Component({
  selector: 'app-collapsible',
  imports: [],
  templateUrl: './collapsible.html',
  styleUrl: './collapsible.scss',
})
export class Collapsible {
  private static nextId = 0;
  labelOpend = input<string>('Close results');
  labelClosed = input<string>('See results');
  isOpen = signal<boolean>(false);
  isNarrow = signal<boolean>(this.readIsNarrow());
  contentVisible = computed(() => !this.isNarrow() || this.isOpen());
  panelId = `collapsible-panel-${Collapsible.nextId++}`;
  private destroyRef = inject(DestroyRef);

  /**
   * Registers the media query listener that keeps the narrow-view signal in sync.
   */
  constructor() {
    const mediaQueryList = this.getMediaQueryList();
    if (!mediaQueryList) {
      return;
    }
    const onChange = (event: MediaQueryListEvent): void => this.isNarrow.set(event.matches);
    mediaQueryList.addEventListener('change', onChange);
    this.destroyRef.onDestroy(() => mediaQueryList.removeEventListener('change', onChange));
  }

  /**
   * Toggles the open/closed state of the collapsible panel.
   * @returns {void}
   */
  toggle(): void {
    this.isOpen.update((currentValue) => !currentValue);
  }

  /**
   * Reads the initial narrow-view state via matchMedia, defensively.
   * @returns {boolean} True if the viewport currently matches the narrow media query.
   */
  private readIsNarrow(): boolean {
    return this.getMediaQueryList()?.matches ?? false;
  }

  /**
   * Resolves the MediaQueryList for the narrow-view breakpoint, if available.
   * @returns {MediaQueryList | null} The media query list, or null when unsupported (e.g. SSR).
   */
  private getMediaQueryList(): MediaQueryList | null {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return null;
    }
    return window.matchMedia(NARROW_MEDIA_QUERY);
  }
}

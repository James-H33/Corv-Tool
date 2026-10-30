import { isPlatformBrowser } from '@angular/common';
import {
  DestroyRef,
  Injectable,
  PLATFORM_ID,
  Signal,
  computed,
  inject,
  signal,
} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StylesService {
  private readonly destroyRef = inject(DestroyRef);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly _windowWidth = signal<number>(0);

  public readonly windowWidth: Signal<number> = this._windowWidth.asReadonly();
  public readonly isMobile = computed(() => this._windowWidth() <= 768);

  public constructor() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.updateWindowWidth();
    window.addEventListener('resize', this.updateWindowWidth);

    this.destroyRef.onDestroy(() => {
      window.removeEventListener('resize', this.updateWindowWidth);
    });
  }

  private readonly updateWindowWidth = (): void => {
    this._windowWidth.set(window.innerWidth);
  };
}

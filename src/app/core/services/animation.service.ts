import {
  DestroyRef,
  Injectable,
  Injector,
  afterNextRender,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Injectable({ providedIn: 'root' })
export class AnimationService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly injector = inject(Injector);
  private registered = false;

  readonly destroyed = new Set<(() => void)[]>();

  registerScrollTrigger(): void {
    if (!isPlatformBrowser(this.platformId) || this.registered) return;

    afterNextRender(
      () => {
        gsap.registerPlugin(ScrollTrigger);
        this.registered = true;
      },
      { injector: this.injector },
    );
  }

  registerCleanup(destroyRef: DestroyRef, callbacks: (() => void)[]): void {
    this.destroyed.add(callbacks);
    destroyRef.onDestroy(() => {
      callbacks.forEach((cb) => cb());
      this.destroyed.delete(callbacks);
    });
  }

  refreshScrollTrigger(): void {
    if (this.registered) {
      ScrollTrigger.refresh();
    }
  }
}

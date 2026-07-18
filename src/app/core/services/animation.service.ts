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

  setupMagneticHover(elementSelectorOrList: string | NodeListOf<Element>, strength = 0.35): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const elements =
      typeof elementSelectorOrList === 'string'
        ? document.querySelectorAll(elementSelectorOrList)
        : elementSelectorOrList;

    elements.forEach((el) => {
      const htmlEl = el as HTMLElement;

      const onMouseMove = (e: MouseEvent) => {
        const rect = htmlEl.getBoundingClientRect();
        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);

        gsap.to(htmlEl, {
          x: x * strength,
          y: y * strength,
          duration: 0.3,
          ease: 'power2.out',
        });
      };

      const onMouseLeave = () => {
        gsap.to(htmlEl, {
          x: 0,
          y: 0,
          duration: 0.8,
          ease: 'elastic.out(1.1, 0.4)',
        });
      };

      htmlEl.addEventListener('mousemove', onMouseMove);
      htmlEl.addEventListener('mouseleave', onMouseLeave);
    });
  }
}

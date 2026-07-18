import { DestroyRef, Injectable, afterNextRender, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Injectable({ providedIn: 'root' })
export class ScrollService {
  private readonly platformId = inject(PLATFORM_ID);
  private lenis: Lenis | null = null;
  private initialized = false;

  init(destroyRef: DestroyRef): void {
    if (!isPlatformBrowser(this.platformId) || this.initialized) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    afterNextRender(() => {
      this.lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      this.lenis.on('scroll', ScrollTrigger.update);

      gsap.ticker.add((time: number) => {
        this.lenis?.raf(time * 1000);
      });

      gsap.ticker.lagSmoothing(0);
      this.initialized = true;
    });

    destroyRef.onDestroy(() => this.destroy());
  }

  scrollTo(target: string | number, options?: { offset?: number }): void {
    if (this.lenis) {
      this.lenis.scrollTo(target, { offset: options?.offset ?? 0 });
    } else {
      const el = typeof target === 'string' ? document.querySelector(target) : null;
      const top = el ? el.getBoundingClientRect().top + window.scrollY : (target as number);
      window.scrollTo({ top, behavior: 'instant' });
    }
  }

  stop(): void {
    this.lenis?.stop();
  }

  start(): void {
    this.lenis?.start();
  }

  private destroy(): void {
    if (!this.lenis) return;

    gsap.ticker.remove((time: number) => {
      this.lenis?.raf(time * 1000);
    });

    this.lenis.destroy();
    this.lenis = null;
    this.initialized = false;
  }
}

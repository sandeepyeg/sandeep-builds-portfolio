import {
  ChangeDetectionStrategy,
  Component,
  afterNextRender,
  inject,
  DestroyRef,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { AnimatedHeading } from '../../../shared/components/animated-heading/animated-heading';
import { ButtonLink } from '../../../shared/components/button-link/button-link';
import { HERO, SITE_PROFILE, HAS_RESUME_PDF } from '../../../core/data/portfolio.data';
import gsap from 'gsap';

@Component({
  selector: 'app-hero',
  imports: [AnimatedHeading, ButtonLink, RouterLink],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero {
  protected readonly hero = HERO;
  protected readonly profile = SITE_PROFILE;
  protected readonly hasResume = HAS_RESUME_PDF;

  private readonly destroyRef = inject(DestroyRef);
  private ctx?: ReturnType<typeof gsap.context>;

  constructor() {
    afterNextRender(() => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) return;

      this.ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.0 } });

        // 1. Reveal name lines
        tl.to('.clip', {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.1,
          stagger: 0.15,
        });
        tl.from(
          '.clip__inner',
          {
            y: '100%',
            duration: 1.1,
            stagger: 0.15,
          },
          '<',
        );

        // 2. Fade in eyebrow, headline, supporting text, actions, availability
        tl.from('.hero__eyebrow', { opacity: 0, y: 15, duration: 0.8 }, '-=0.8');
        tl.from('.hero__headline', { opacity: 0, y: 20, duration: 0.8 }, '-=0.7');
        tl.from('.hero__supporting', { opacity: 0, y: 20, duration: 0.8 }, '-=0.6');
        tl.from('.hero__actions > *', { opacity: 0, y: 20, duration: 0.8, stagger: 0.1 }, '-=0.5');
        tl.from('.hero__availability', { opacity: 0, y: 15, duration: 0.8 }, '-=0.4');

        // 3. Stagger nodes SVG reveal
        tl.from(
          '.hero__nodes rect',
          { opacity: 0, scale: 0.8, transformOrigin: '50% 50%', stagger: 0.08, duration: 0.8 },
          '-=0.8',
        );
        tl.from('.hero__links path', { opacity: 0, stagger: 0.05, duration: 0.8 }, '-=0.6');
        tl.from('.hero__labels text', { opacity: 0, y: 10, stagger: 0.05, duration: 0.6 }, '-=0.5');
        tl.from(
          '.hero__visual circle',
          { scale: 0, stagger: 0.1, duration: 0.6, ease: 'back.out(2)' },
          '-=0.4',
        );
      });

      this.destroyRef.onDestroy(() => {
        if (this.ctx) {
          this.ctx.revert();
        }
      });
    });
  }
}

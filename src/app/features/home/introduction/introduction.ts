import {
  ChangeDetectionStrategy,
  Component,
  afterNextRender,
  inject,
  DestroyRef,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { INTRODUCTION } from '../../../core/data/portfolio.data';
import gsap from 'gsap';

@Component({
  selector: 'app-introduction',
  template: `
    <section class="section introduction" id="about" data-theme="paper">
      <div class="container introduction__inner">
        <div class="introduction__left">
          <p class="eyebrow reveal">About</p>
          <h2 class="introduction__heading" [innerHTML]="getSplitText(introduction.heading)"></h2>
        </div>

        <div class="introduction__right">
          <div class="introduction__body">
            @for (paragraph of introduction.paragraphs; track $index) {
              <p [innerHTML]="getSplitText(paragraph)"></p>
            }
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrl: './introduction.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Introduction {
  protected readonly introduction = INTRODUCTION;
  private readonly sanitizer = inject(DomSanitizer);
  private readonly destroyRef = inject(DestroyRef);
  private ctx?: ReturnType<typeof gsap.context>;

  protected getSplitText(text: string): SafeHtml {
    const html = text
      .split(' ')
      .map((word) => `<span class="word-mask"><span class="word-inner">${word}</span></span>`)
      .join(' ');
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  constructor() {
    afterNextRender(() => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) return;

      this.ctx = gsap.context(() => {
        // Animate reveal elements (like the eyebrow)
        gsap.fromTo(
          '.reveal',
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '.introduction',
              start: 'top 85%',
            },
          },
        );

        // Animate title words
        gsap.to('.introduction__heading .word-inner', {
          y: '0%',
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.03,
          scrollTrigger: {
            trigger: '.introduction__heading',
            start: 'top 85%',
          },
        });

        // Animate body paragraphs words
        document.querySelectorAll('.introduction__body p').forEach((p) => {
          gsap.to(p.querySelectorAll('.word-inner'), {
            y: '0%',
            duration: 0.7,
            ease: 'power3.out',
            stagger: 0.015,
            scrollTrigger: {
              trigger: p,
              start: 'top 85%',
            },
          });
        });
      });

      this.destroyRef.onDestroy(() => {
        if (this.ctx) {
          this.ctx.revert();
        }
      });
    });
  }
}

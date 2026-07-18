import {
  ChangeDetectionStrategy,
  Component,
  afterNextRender,
  inject,
  DestroyRef,
} from '@angular/core';
import { SectionHeading } from '../../../shared/components/section-heading/section-heading';
import { EDUCATION, EXPERIENCE, EXPERIENCE_HEADING } from '../../../core/data/portfolio.data';
import gsap from 'gsap';

@Component({
  selector: 'app-experience',
  imports: [SectionHeading],
  template: `
    <section class="section experience" id="experience" data-theme="ink">
      <div class="container">
        <app-section-heading eyebrow="Career" [heading]="heading" />

        <div class="timeline-container">
          <div class="timeline__line" aria-hidden="true">
            <div class="timeline__line-progress"></div>
          </div>
          <ol role="list" class="timeline">
            @for (job of experience; track job.role) {
              <li class="timeline__item reveal" [class.timeline__item--current]="job.current">
                <div class="timeline__marker" aria-hidden="true">
                  <span class="timeline__dot"></span>
                </div>
                <div class="timeline__content">
                  <p class="timeline__period">{{ job.period }}</p>
                  <h3 class="timeline__role">{{ job.role }}</h3>
                  <p class="timeline__company">{{ job.company }} · {{ job.location }}</p>
                  <p class="timeline__desc">{{ job.description }}</p>
                </div>
              </li>
            }
          </ol>
        </div>

        <div class="education">
          <p class="eyebrow">Education</p>
          <ul role="list" class="education__list">
            @for (edu of education; track edu.qualification) {
              <li class="education__item">
                <span class="education__qual">{{ edu.qualification }}</span>
                <span class="education__inst">{{ edu.institution }}</span>
              </li>
            }
          </ul>
        </div>
      </div>
    </section>
  `,
  styleUrl: './experience.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Experience {
  protected readonly heading = EXPERIENCE_HEADING;
  protected readonly experience = EXPERIENCE;
  protected readonly education = EDUCATION;

  private readonly destroyRef = inject(DestroyRef);
  private ctx?: ReturnType<typeof gsap.context>;

  constructor() {
    afterNextRender(() => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) return;

      this.ctx = gsap.context(() => {
        // Draw progress line
        gsap.fromTo(
          '.timeline__line-progress',
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: '.timeline',
              start: 'top 60%',
              end: 'bottom 60%',
              scrub: true,
            },
          },
        );

        // Activate dots and items on scroll cross
        const items = document.querySelectorAll('.timeline__item');
        items.forEach((item) => {
          const dot = item.querySelector('.timeline__dot');
          const content = item.querySelector('.timeline__content');

          gsap.to(content, { opacity: 0.8, x: 0 }); // Base state

          ScrollTrigger.create({
            trigger: item,
            start: 'top 60%',
            onEnter: () => {
              const isCurrent = item.classList.contains('timeline__item--current');
              gsap.to(dot, {
                backgroundColor: isCurrent ? 'var(--color-lime)' : 'var(--accent-2)',
                borderColor: isCurrent ? 'var(--color-lime)' : 'var(--accent-2)',
                scale: 1.2,
                duration: 0.4,
              });
              gsap.to(content, {
                opacity: 1,
                x: 10,
                duration: 0.4,
              });
            },
            onLeaveBack: () => {
              const isCurrent = item.classList.contains('timeline__item--current');
              gsap.to(dot, {
                backgroundColor: isCurrent ? 'var(--color-lime)' : 'var(--color-ink-soft)',
                borderColor: isCurrent ? 'var(--color-lime)' : 'var(--fg-muted)',
                scale: 1.0,
                duration: 0.4,
              });
              gsap.to(content, {
                opacity: 0.7,
                x: 0,
                duration: 0.4,
              });
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

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
      });

      this.destroyRef.onDestroy(() => {
        if (this.ctx) {
          this.ctx.revert();
        }
      });
    });
  }
}

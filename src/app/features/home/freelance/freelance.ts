import {
  ChangeDetectionStrategy,
  Component,
  afterNextRender,
  inject,
  DestroyRef,
  ElementRef,
} from '@angular/core';
import { SectionHeading } from '../../../shared/components/section-heading/section-heading';
import {
  FREELANCE_PROJECTS,
  FREELANCE_HEADING,
  FREELANCE_INTRO,
} from '../../../core/data/portfolio.data';
import { FreelanceProject } from '../../../core/models/portfolio.models';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-freelance',
  imports: [SectionHeading],
  template: `
    <section class="section freelance" id="freelance" data-theme="paper">
      <div class="container">
        <app-section-heading eyebrow="Freelance" [heading]="heading" />
        <p class="freelance__intro lead">{{ intro }}</p>

        <div class="freelance__grid">
          @for (project of projects; track project.slug) {
            <article class="fl-card" [class.fl-card--no-link]="!project.url">
              <!-- Industry tag -->
              <div class="fl-card__top">
                <span class="fl-card__industry">{{ project.industry }}</span>
                @if (project.url) {
                  <a
                    [href]="project.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="fl-card__visit"
                    [attr.aria-label]="'Visit ' + project.client + ' website'"
                  >
                    Visit site
                    <svg viewBox="0 0 24 24" width="11" height="11" aria-hidden="true">
                      <path
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M7 17 17 7M9 7h8v8"
                      />
                    </svg>
                  </a>
                }
              </div>

              <!-- Client name -->
              <h3 class="fl-card__client">{{ project.client }}</h3>

              @if (project.highlight) {
                <p class="fl-card__highlight">{{ project.highlight }}</p>
              }

              <p class="fl-card__description">{{ project.description }}</p>

              <!-- Deliverables -->
              <ul class="fl-card__deliverables" role="list">
                @for (item of project.deliverables; track item) {
                  <li>
                    <svg
                      viewBox="0 0 24 24"
                      width="12"
                      height="12"
                      aria-hidden="true"
                      class="fl-card__check"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {{ item }}
                  </li>
                }
              </ul>

              <!-- Tech tags -->
              <ul class="fl-card__tech" role="list">
                @for (tech of project.technologies; track tech) {
                  <li>{{ tech }}</li>
                }
              </ul>
            </article>
          }
        </div>
      </div>
    </section>
  `,
  styleUrl: './freelance.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Freelance {
  protected readonly heading = FREELANCE_HEADING;
  protected readonly intro = FREELANCE_INTRO;
  protected readonly projects: readonly FreelanceProject[] = FREELANCE_PROJECTS;

  private readonly destroyRef = inject(DestroyRef);
  private readonly elementRef = inject(ElementRef);
  private ctx?: ReturnType<typeof gsap.context>;

  constructor() {
    afterNextRender(() => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) return;

      this.ctx = gsap.context(() => {
        const cards = this.elementRef.nativeElement.querySelectorAll('.fl-card');
        gsap.fromTo(
          cards,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '.freelance__grid',
              start: 'top 85%',
              toggleActions: 'play none none reverse',
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

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
  PERSONAL_PROJECTS,
  PERSONAL_PROJECTS_HEADING,
  PERSONAL_PROJECTS_INTRO,
} from '../../../core/data/portfolio.data';
import { PersonalProject } from '../../../core/models/portfolio.models';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-personal-projects',
  imports: [SectionHeading],
  template: `
    <section class="section personal-projects" id="projects" data-theme="dark">
      <div class="container">
        <app-section-heading eyebrow="Projects" [heading]="heading" />
        <p class="personal-projects__intro lead">{{ intro }}</p>

        <div class="personal-projects__grid">
          @for (project of projects; track project.slug) {
            <article class="pp-card" [class.pp-card--private]="project.isPrivate">
              <!-- Header row -->
              <div class="pp-card__head">
                <span
                  class="pp-card__lang-dot pp-card__lang-dot--{{ getLangKey(project.language) }}"
                ></span>
                <span class="pp-card__lang">{{ project.language }}</span>
                @if (project.isPrivate) {
                  <span class="pp-card__badge pp-card__badge--private">
                    <svg viewBox="0 0 24 24" width="11" height="11" aria-hidden="true">
                      <path
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        d="M12 17v-5M8 10V8a4 4 0 0 1 8 0v2M5 10h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1z"
                      />
                    </svg>
                    Private
                  </span>
                } @else {
                  <a
                    [href]="project.githubUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="pp-card__badge pp-card__badge--github"
                    aria-label="View {{ project.title }} on GitHub"
                  >
                    <svg viewBox="0 0 24 24" width="12" height="12" aria-hidden="true">
                      <path
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M7 17 17 7M9 7h8v8"
                      />
                    </svg>
                    GitHub
                  </a>
                }
              </div>

              <!-- Content -->
              <h3 class="pp-card__title">{{ project.title }}</h3>

              @if (project.highlight) {
                <p class="pp-card__highlight">{{ project.highlight }}</p>
              }

              <p class="pp-card__description">{{ project.description }}</p>

              <!-- Tech tags -->
              <ul class="pp-card__tech" role="list">
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
  styleUrl: './personal-projects.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalProjects {
  protected readonly heading = PERSONAL_PROJECTS_HEADING;
  protected readonly intro = PERSONAL_PROJECTS_INTRO;
  protected readonly projects: readonly PersonalProject[] = PERSONAL_PROJECTS;

  private readonly destroyRef = inject(DestroyRef);
  private readonly elementRef = inject(ElementRef);
  private ctx?: ReturnType<typeof gsap.context>;

  protected getLangKey(lang: string): string {
    const map: Record<string, string> = {
      'C#': 'csharp',
      TypeScript: 'typescript',
      Python: 'python',
      Kotlin: 'kotlin',
      JavaScript: 'javascript',
    };
    return map[lang] ?? 'default';
  }

  constructor() {
    afterNextRender(() => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) return;

      this.ctx = gsap.context(() => {
        const cards = this.elementRef.nativeElement.querySelectorAll('.pp-card');
        gsap.fromTo(
          cards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '.personal-projects__grid',
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

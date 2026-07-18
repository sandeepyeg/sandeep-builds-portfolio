import {
  ChangeDetectionStrategy,
  Component,
  afterNextRender,
  inject,
  DestroyRef,
  ElementRef,
  HostListener,
  ViewChild,
  computed,
  signal,
} from '@angular/core';
import { SectionHeading } from '../../../shared/components/section-heading/section-heading';
import {
  PERSONAL_PROJECTS,
  PERSONAL_PROJECTS_HEADING,
  PERSONAL_PROJECTS_INTRO,
} from '../../../core/data/portfolio.data';
import { PersonalProject } from '../../../core/models/portfolio.models';
import { ScrollService } from '../../../core/services/scroll.service';
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

              <button
                type="button"
                class="pp-card__button"
                (click)="openProject(project)"
                aria-haspopup="dialog"
              >
                View Details
                <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
                  <path
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M5 12h14M13 6l6 6-6 6"
                  />
                </svg>
              </button>
            </article>
          }
        </div>
      </div>

      @if (activeProject(); as project) {
        <div
          class="project-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          tabindex="-1"
          (click)="closeProject()"
          (keydown.escape)="closeProject()"
          (wheel)="onProjectWheel($event)"
          (touchstart)="onProjectTouchStart($event)"
          (touchmove)="onProjectTouchMove($event)"
        >
          <div
            class="project-modal__panel"
            tabindex="-1"
            (click)="$event.stopPropagation()"
            (keydown.escape)="closeProject()"
          >
            <header class="project-modal__header">
              <div>
                <p class="eyebrow project-modal__eyebrow">{{ project.highlight }}</p>
                <h3 id="project-modal-title" class="project-modal__title">{{ project.title }}</h3>
              </div>
              <button
                type="button"
                class="project-modal__close"
                aria-label="Close project details"
                (click)="closeProject()"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                  <path
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    d="M6 6l12 12M18 6L6 18"
                  />
                </svg>
              </button>
            </header>

            <div #projectModalBody class="project-modal__body">
              <div class="project-modal__hero">
                <div>
                  <p class="project-modal__summary">{{ project.description }}</p>
                  @if (project.role) {
                    <p class="project-modal__role">{{ project.role }}</p>
                  }
                </div>
                <aside class="project-modal__snapshot" aria-label="Project snapshot">
                  <div>
                    <span>Stack</span>
                    <strong>{{ project.language }}</strong>
                  </div>
                  <div>
                    <span>Scope</span>
                    <strong>{{ project.isPrivate ? 'Private' : 'Open source' }}</strong>
                  </div>
                  <div>
                    <span>Focus</span>
                    <strong>{{ project.highlight }}</strong>
                  </div>
                </aside>
              </div>

              @if (project.flow?.length) {
                <section class="project-modal__section project-modal__section--feature">
                  <div class="project-modal__section-head">
                    <span>01</span>
                    <h4>Conceptual Flow</h4>
                  </div>
                  <div class="project-flow" aria-label="Conceptual project flow">
                    <svg
                      viewBox="0 0 760 240"
                      class="project-flow__svg"
                      preserveAspectRatio="xMidYMid meet"
                      role="img"
                    >
                      <defs>
                        <linearGradient id="projectFlowFill" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stop-color="currentColor" stop-opacity="0.16" />
                          <stop offset="100%" stop-color="currentColor" stop-opacity="0.03" />
                        </linearGradient>
                      </defs>
                      <g fill="none" stroke="currentColor" stroke-width="1.7">
                        @for (node of project.flow; track node; let i = $index) {
                          <rect
                            [attr.x]="28 + i * 120"
                            [attr.y]="i % 2 === 0 ? 62 : 126"
                            width="96"
                            height="58"
                            rx="10"
                            class="project-flow__node"
                          />
                        }
                      </g>
                      <g
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-dasharray="5 5"
                      >
                        @for (node of project.flow; track node; let i = $index) {
                          @if (!$last) {
                            <path [attr.d]="flowPath(i)" class="project-flow__path" />
                          }
                        }
                      </g>
                      <g font-family="Inter, sans-serif" font-size="11" font-weight="700">
                        @for (node of project.flow; track node; let i = $index) {
                          <text
                            [attr.x]="76 + i * 120"
                            [attr.y]="i % 2 === 0 ? 88 : 152"
                            text-anchor="middle"
                            class="project-flow__label"
                          >
                            @for (word of splitNode(node); track word; let line = $index) {
                              <tspan [attr.x]="76 + i * 120" [attr.dy]="line === 0 ? 0 : 13">
                                {{ word }}
                              </tspan>
                            }
                          </text>
                        }
                      </g>
                    </svg>
                  </div>
                  <p class="project-modal__note">
                    Conceptual diagram only. Private implementation details are intentionally
                    omitted where applicable.
                  </p>
                </section>
              }

              @if (project.architecture?.length) {
                <section class="project-modal__section">
                  <div class="project-modal__section-head">
                    <span>02</span>
                    <h4>Architecture Notes</h4>
                  </div>
                  <div class="project-modal__architecture">
                    @for (item of project.architecture; track item; let i = $index) {
                      <article>
                        <span>{{ i + 1 }}</span>
                        <p>{{ item }}</p>
                      </article>
                    }
                  </div>
                </section>
              }

              <section class="project-modal__section project-modal__section--story">
                <div class="project-modal__section-head">
                  <span>03</span>
                  <h4>Project Story</h4>
                </div>
                <div class="project-modal__content">
                  @for (detail of project.details ?? [project.description]; track detail) {
                    <p>{{ detail }}</p>
                  }
                </div>
              </section>

              @if (project.keyPoints?.length) {
                <section class="project-modal__section">
                  <div class="project-modal__section-head">
                    <span>04</span>
                    <h4>What It Demonstrates</h4>
                  </div>
                  <ul role="list" class="project-modal__points">
                    @for (point of project.keyPoints; track point) {
                      <li>{{ point }}</li>
                    }
                  </ul>
                </section>
              }

              <section class="project-modal__split">
                @if (project.demoValue?.length) {
                  <div class="project-modal__section">
                    <div class="project-modal__section-head">
                      <span>05</span>
                      <h4>Portfolio Value</h4>
                    </div>
                    <ul role="list" class="project-modal__points project-modal__points--single">
                      @for (item of project.demoValue; track item) {
                        <li>{{ item }}</li>
                      }
                    </ul>
                  </div>
                }

                @if (project.nextSteps?.length) {
                  <div class="project-modal__section">
                    <div class="project-modal__section-head">
                      <span>06</span>
                      <h4>Next Improvements</h4>
                    </div>
                    <ul role="list" class="project-modal__points project-modal__points--single">
                      @for (item of project.nextSteps; track item) {
                        <li>{{ item }}</li>
                      }
                    </ul>
                  </div>
                }
              </section>

              <section class="project-modal__section project-modal__section--tech">
                <div class="project-modal__section-head">
                  <span>07</span>
                  <h4>Technology</h4>
                </div>
                <div class="project-modal__tech-layout">
                  <ul role="list" class="project-modal__tags">
                    @for (tech of project.technologies; track tech) {
                      <li>{{ tech }}</li>
                    }
                  </ul>
                  <p>
                    The stack is presented as a signal of the project's engineering direction:
                    backend contracts, frontend workflows, persistence, integrations, deployment, or
                    AI capabilities depending on the project.
                  </p>
                </div>
              </section>
            </div>

            <footer class="project-modal__footer">
              @if (project.githubUrl) {
                <a
                  class="btn btn--ghost"
                  [href]="project.githubUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                  <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
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
              } @else {
                <p class="project-modal__footer-note">Private or sanitized project</p>
              }
              <button type="button" class="btn btn--primary" (click)="closeProject()">Done</button>
            </footer>
          </div>
        </div>
      }
    </section>
  `,
  styleUrl: './personal-projects.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalProjects {
  protected readonly heading = PERSONAL_PROJECTS_HEADING;
  protected readonly intro = PERSONAL_PROJECTS_INTRO;
  protected readonly projects: readonly PersonalProject[] = PERSONAL_PROJECTS;
  protected readonly activeSlug = signal<string | null>(null);
  protected readonly activeProject = computed<PersonalProject | null>(() => {
    const slug = this.activeSlug();
    return this.projects.find((project) => project.slug === slug) ?? null;
  });

  private readonly destroyRef = inject(DestroyRef);
  private readonly elementRef = inject(ElementRef);
  private readonly scrollService = inject(ScrollService);
  private touchStartY = 0;
  private ctx?: ReturnType<typeof gsap.context>;

  @ViewChild('projectModalBody') private projectModalBody?: ElementRef<HTMLElement>;

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

  protected openProject(project: PersonalProject): void {
    this.activeSlug.set(project.slug);
    this.scrollService.stop();
    this.lockPageScroll();
  }

  protected closeProject(): void {
    this.activeSlug.set(null);
    this.scrollService.start();
    this.unlockPageScroll();
  }

  protected onProjectWheel(event: WheelEvent): void {
    this.scrollModalBody(event.deltaY);
    event.preventDefault();
    event.stopPropagation();
  }

  protected onProjectTouchStart(event: TouchEvent): void {
    this.touchStartY = event.touches[0]?.clientY ?? 0;
  }

  protected onProjectTouchMove(event: TouchEvent): void {
    const currentY = event.touches[0]?.clientY ?? this.touchStartY;
    this.scrollModalBody(this.touchStartY - currentY);
    this.touchStartY = currentY;
    event.preventDefault();
    event.stopPropagation();
  }

  protected splitNode(node: string): readonly string[] {
    if (node.length <= 12) return [node];

    const words = node.split(' ');
    if (words.length === 1) return [node];

    const midpoint = Math.ceil(words.length / 2);
    return [words.slice(0, midpoint).join(' '), words.slice(midpoint).join(' ')];
  }

  protected flowPath(index: number): string {
    const startX = 124 + index * 120;
    const endX = 148 + index * 120;
    const startY = index % 2 === 0 ? 91 : 155;
    const endY = (index + 1) % 2 === 0 ? 91 : 155;
    const midX = startX + 12;

    return `M${startX} ${startY} C${midX} ${startY}, ${midX} ${endY}, ${endX} ${endY}`;
  }

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    if (this.activeProject()) {
      this.closeProject();
    }
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

    this.destroyRef.onDestroy(() => {
      this.unlockPageScroll();
      this.scrollService.start();
    });
  }

  private scrollModalBody(deltaY: number): void {
    const body = this.projectModalBody?.nativeElement;
    if (!body) return;

    body.scrollTop += deltaY;
  }

  private lockPageScroll(): void {
    if (typeof document === 'undefined') return;

    document.documentElement.classList.add('modal-open');
    document.body.classList.add('modal-open');
  }

  private unlockPageScroll(): void {
    if (typeof document === 'undefined') return;

    document.documentElement.classList.remove('modal-open');
    document.body.classList.remove('modal-open');
  }
}

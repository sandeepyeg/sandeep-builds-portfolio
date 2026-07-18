import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  HostListener,
  ViewChild,
  computed,
  inject,
  signal,
} from '@angular/core';
import { SectionHeading } from '../../../shared/components/section-heading/section-heading';
import { BLOG_HEADING, BLOG_INTRO, BLOG_TOPICS } from '../../../core/data/portfolio.data';
import { BlogTopic } from '../../../core/models/portfolio.models';
import { ScrollService } from '../../../core/services/scroll.service';

@Component({
  selector: 'app-blog',
  imports: [SectionHeading],
  template: `
    <section class="section blog" id="blog" data-theme="ink">
      <div class="container">
        <app-section-heading eyebrow="Blog" [heading]="heading" />
        <p class="blog__intro lead">{{ intro }}</p>

        <div class="blog__grid">
          @for (topic of topics; track topic.slug) {
            <article class="blog-card">
              <div class="blog-card__top">
                <span class="blog-card__number">{{ topic.number }}</span>
                <span class="blog-card__category">{{ topic.category }}</span>
              </div>

              <h3 class="blog-card__title">{{ topic.title }}</h3>
              <p class="blog-card__summary">{{ topic.summary }}</p>

              <ul role="list" class="blog-card__points">
                @for (point of topic.points; track point) {
                  <li>{{ point }}</li>
                }
              </ul>

              <button
                type="button"
                class="blog-card__button"
                (click)="openTopic(topic)"
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

      @if (activeTopic(); as topic) {
        <div
          class="blog-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="blog-modal-title"
          tabindex="-1"
          (click)="closeTopic()"
          (keydown.escape)="closeTopic()"
          (wheel)="onTopicWheel($event)"
          (touchstart)="onTopicTouchStart($event)"
          (touchmove)="onTopicTouchMove($event)"
        >
          <div
            class="blog-modal__panel"
            tabindex="-1"
            (click)="$event.stopPropagation()"
            (keydown.escape)="closeTopic()"
          >
            <header class="blog-modal__header">
              <div>
                <p class="eyebrow blog-modal__eyebrow">{{ topic.category }}</p>
                <h3 id="blog-modal-title" class="blog-modal__title">{{ topic.title }}</h3>
              </div>
              <button
                type="button"
                class="blog-modal__close"
                aria-label="Close blog details"
                (click)="closeTopic()"
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

            <div #blogModalBody class="blog-modal__body">
              <p class="blog-modal__summary">{{ topic.summary }}</p>

              <ul role="list" class="blog-modal__points">
                @for (point of topic.points; track point) {
                  <li>{{ point }}</li>
                }
              </ul>

              <div class="blog-modal__content">
                @for (detail of topic.details; track detail) {
                  <p>{{ detail }}</p>
                }
              </div>

              <p class="blog-modal__takeaway">{{ topic.takeaway }}</p>
            </div>

            <footer class="blog-modal__footer">
              <p>{{ topic.number }} · Portfolio technology writing topic</p>
              <button type="button" class="btn btn--primary" (click)="closeTopic()">Done</button>
            </footer>
          </div>
        </div>
      }
    </section>
  `,
  styleUrl: './blog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Blog {
  protected readonly heading = BLOG_HEADING;
  protected readonly intro = BLOG_INTRO;
  protected readonly topics = BLOG_TOPICS;
  protected readonly activeSlug = signal<string | null>(null);
  protected readonly activeTopic = computed<BlogTopic | null>(() => {
    const slug = this.activeSlug();
    return this.topics.find((topic) => topic.slug === slug) ?? null;
  });

  private readonly destroyRef = inject(DestroyRef);
  private readonly scrollService = inject(ScrollService);
  private touchStartY = 0;

  @ViewChild('blogModalBody') private blogModalBody?: ElementRef<HTMLElement>;

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.unlockPageScroll();
      this.scrollService.start();
    });
  }

  protected openTopic(topic: BlogTopic): void {
    this.activeSlug.set(topic.slug);
    this.scrollService.stop();
    this.lockPageScroll();
  }

  protected closeTopic(): void {
    this.activeSlug.set(null);
    this.scrollService.start();
    this.unlockPageScroll();
  }

  protected onTopicWheel(event: WheelEvent): void {
    this.scrollModalBody(event.deltaY);
    event.preventDefault();
    event.stopPropagation();
  }

  protected onTopicTouchStart(event: TouchEvent): void {
    this.touchStartY = event.touches[0]?.clientY ?? 0;
  }

  protected onTopicTouchMove(event: TouchEvent): void {
    const currentY = event.touches[0]?.clientY ?? this.touchStartY;
    this.scrollModalBody(this.touchStartY - currentY);
    this.touchStartY = currentY;
    event.preventDefault();
    event.stopPropagation();
  }

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    if (this.activeTopic()) {
      this.closeTopic();
    }
  }

  private scrollModalBody(deltaY: number): void {
    const body = this.blogModalBody?.nativeElement;
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

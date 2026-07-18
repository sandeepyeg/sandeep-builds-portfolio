import {
  ChangeDetectionStrategy,
  Component,
  afterNextRender,
  inject,
  DestroyRef,
  ElementRef,
} from '@angular/core';
import { SectionHeading } from '../../../shared/components/section-heading/section-heading';
import { TechnologyList } from '../../../shared/components/technology-list/technology-list';
import { CAPABILITIES, CAPABILITIES_HEADING } from '../../../core/data/portfolio.data';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-capabilities',
  imports: [SectionHeading, TechnologyList],
  template: `
    <section class="section capabilities" id="capabilities" data-theme="paper">
      <div class="container">
        <app-section-heading eyebrow="What I do" [heading]="heading" />

        <div class="capabilities__grid">
          @for (cap of capabilities; track cap.id; let i = $index) {
            <article class="capability reveal" [class.capability--reverse]="i % 2 === 1">
              <div class="capability__index">
                <span class="capability__num">{{ pad(i + 1) }}</span>
              </div>
              <div class="capability__body">
                <h3 class="capability__title">{{ cap.title }}</h3>
                <p class="capability__desc">{{ cap.description }}</p>
                <app-technology-list [technologies]="cap.technologies" />
              </div>
            </article>
          }
        </div>
      </div>
    </section>
  `,
  styleUrl: './capabilities.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Capabilities {
  protected readonly heading = CAPABILITIES_HEADING;
  protected readonly capabilities = CAPABILITIES;

  private readonly destroyRef = inject(DestroyRef);
  private readonly elementRef = inject(ElementRef);
  private ctx?: ReturnType<typeof gsap.context>;

  constructor() {
    afterNextRender(() => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) return;

      this.ctx = gsap.context(() => {
        const rows = this.elementRef.nativeElement.querySelectorAll('.capability');
        rows.forEach((row: HTMLElement) => {
          gsap.fromTo(
            row,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: row,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            },
          );
        });
      });

      this.destroyRef.onDestroy(() => {
        if (this.ctx) {
          this.ctx.revert();
        }
      });
    });
  }

  protected pad(n: number): string {
    return n.toString().padStart(2, '0');
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';
import { SiteHeader } from '../site-header/site-header';
import { SiteFooter } from '../site-footer/site-footer';
import { CodeCursor } from '../code-cursor/code-cursor';
import { AnimationService } from '../../core/services/animation.service';
import { ScrollService } from '../../core/services/scroll.service';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-page-shell',
  imports: [SiteHeader, SiteFooter, CodeCursor],
  template: `
    <div class="page-shell" [attr.data-theme]="currentTheme()">
      <a class="skip-link" href="#main">Skip to content</a>
      <app-code-cursor />
      <app-site-header />
      <main id="main" class="page-shell__main">
        <ng-content />
      </main>
      <app-site-footer />
    </div>
  `,
  styleUrl: './page-shell.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageShell {
  private readonly animation = inject(AnimationService);
  private readonly scroll = inject(ScrollService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly currentTheme = signal<string>('ink');
  private ctx?: ReturnType<typeof gsap.context>;

  constructor() {
    this.animation.registerScrollTrigger();
    this.scroll.init(this.destroyRef);

    afterNextRender(() => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) return;

      this.ctx = gsap.context(() => {
        this.setupThemeTransitions();
      });

      this.destroyRef.onDestroy(() => {
        if (this.ctx) {
          this.ctx.revert();
        }
      });
    });
  }

  private setupThemeTransitions(): void {
    const sections = Array.from(document.querySelectorAll('section[data-theme]'));
    sections.forEach((section, index) => {
      const theme = section.getAttribute('data-theme');
      if (!theme) return;

      ScrollTrigger.create({
        trigger: section,
        start: 'top 50%',
        onEnter: () => this.currentTheme.set(theme),
        onLeaveBack: () => {
          if (index > 0) {
            const prevTheme = sections[index - 1].getAttribute('data-theme');
            if (prevTheme) {
              this.currentTheme.set(prevTheme);
            }
          }
        },
      });
    });
  }
}

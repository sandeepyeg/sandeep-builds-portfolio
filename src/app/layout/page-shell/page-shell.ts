import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  afterNextRender,
  inject,
} from '@angular/core';
import { SiteHeader } from '../site-header/site-header';
import { SiteFooter } from '../site-footer/site-footer';
import { AnimationService } from '../../core/services/animation.service';
import { ScrollService } from '../../core/services/scroll.service';

@Component({
  selector: 'app-page-shell',
  imports: [SiteHeader, SiteFooter],
  template: `
    <a class="skip-link" href="#main">Skip to content</a>
    <app-site-header />
    <main id="main" class="page-shell__main">
      <ng-content />
    </main>
    <app-site-footer />
  `,
  styleUrl: './page-shell.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageShell {
  private readonly animation = inject(AnimationService);
  private readonly scroll = inject(ScrollService);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    this.animation.registerScrollTrigger();
    this.scroll.init(this.destroyRef);

    afterNextRender(() => {
      this.setupRevealObserver();
    });
  }

  private setupRevealObserver(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    );

    document.querySelectorAll('.reveal, .clip-reveal').forEach((el) => observer.observe(el));

    this.destroyRef.onDestroy(() => observer.disconnect());
  }
}

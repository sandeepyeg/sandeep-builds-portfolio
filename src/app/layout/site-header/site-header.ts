import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  HostListener,
  afterNextRender,
  computed,
  inject,
  signal,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { filter } from 'rxjs';
import { NAV_ITEMS, SITE_PROFILE, HAS_RESUME_PDF } from '../../core/data/portfolio.data';
import { AnimationService } from '../../core/services/animation.service';

@Component({
  selector: 'app-site-header',
  imports: [RouterLink],
  templateUrl: './site-header.html',
  styleUrl: './site-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteHeader {
  private readonly destroyRef = inject(DestroyRef);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly animationService = inject(AnimationService);
  private readonly router = inject(Router);

  protected readonly profile = SITE_PROFILE;
  protected readonly navItems = NAV_ITEMS;
  protected readonly hasResume = HAS_RESUME_PDF;
  protected readonly scrolled = signal(false);
  protected readonly menuOpen = signal(false);
  protected readonly activeSection = signal<string>('');
  protected readonly menuId = 'mobile-menu';
  private observer: IntersectionObserver | null = null;

  protected readonly headerClass = computed(() => ({
    'is-scrolled': this.scrolled(),
    'is-open': this.menuOpen(),
  }));

  constructor() {
    afterNextRender(() => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!prefersReduced) {
        this.animationService.setupMagneticHover('.site-header__nav-link', 0.2);
      }
    });

    if (isPlatformBrowser(this.platformId)) {
      // Re-initialize scroll spy when navigating between pages
      this.router.events
        .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
        .subscribe(() => {
          setTimeout(() => this.setupScrollSpy(), 100);
        });
    }

    this.destroyRef.onDestroy(() => {
      if (isPlatformBrowser(this.platformId)) {
        this.unlockScroll();
      }
    });
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 24);
  }

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
    if (this.menuOpen()) {
      this.lockScroll();
    } else {
      this.unlockScroll();
    }
  }

  closeMenu(): void {
    if (!this.menuOpen()) return;
    this.menuOpen.set(false);
    this.unlockScroll();
  }

  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.menuOpen()) {
      this.closeMenu();
    }
  }

  onNavClick(): void {
    this.closeMenu();
  }

  private setupScrollSpy(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }

    const sections = this.navItems
      .map((item) => document.getElementById(item.fragment))
      .filter((el): el is HTMLElement => el !== null);

    if (!sections.length) {
      this.activeSection.set('');
      return;
    }

    if (!('IntersectionObserver' in window)) return;

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.activeSection.set(entry.target.id);
          }
        }
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    );

    sections.forEach((section) => this.observer?.observe(section));
    this.destroyRef.onDestroy(() => {
      this.observer?.disconnect();
    });
  }

  private lockScroll(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    document.body.style.overflow = 'hidden';
  }

  private unlockScroll(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    document.body.style.overflow = '';
  }
}

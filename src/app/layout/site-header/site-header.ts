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
import { RouterLink } from '@angular/router';
import { NAV_ITEMS, SITE_PROFILE } from '../../core/data/portfolio.data';
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

  protected readonly profile = SITE_PROFILE;
  protected readonly navItems = NAV_ITEMS;
  protected readonly scrolled = signal(false);
  protected readonly menuOpen = signal(false);
  protected readonly activeSection = signal<string>('');
  protected readonly menuId = 'mobile-menu';

  protected readonly headerClass = computed(() => ({
    'is-scrolled': this.scrolled(),
    'is-open': this.menuOpen(),
  }));

  constructor() {
    afterNextRender(() => {
      this.setupScrollSpy();
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!prefersReduced) {
        this.animationService.setupMagneticHover('.site-header__nav-link', 0.2);
      }
    });

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
    const sections = this.navItems
      .map((item) => document.getElementById(item.fragment))
      .filter((el): el is HTMLElement => el !== null);

    if (!sections.length || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.activeSection.set(entry.target.id);
          }
        }
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    this.destroyRef.onDestroy(() => observer.disconnect());
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

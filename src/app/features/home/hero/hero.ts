import {
  ChangeDetectionStrategy,
  Component,
  afterNextRender,
  inject,
  DestroyRef,
  signal,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AnimatedHeading } from '../../../shared/components/animated-heading/animated-heading';
import { ButtonLink } from '../../../shared/components/button-link/button-link';
import { HERO, SITE_PROFILE, HAS_RESUME_PDF } from '../../../core/data/portfolio.data';
import { AnimationService } from '../../../core/services/animation.service';
import gsap from 'gsap';

interface GitCommit {
  message: string;
  repo: string;
  time: string;
  url: string;
}

interface GithubEvent {
  type: string;
  repo: { name: string };
  payload?: {
    commits?: {
      sha: string;
      message: string;
    }[];
  };
  created_at: string;
}

@Component({
  selector: 'app-hero',
  imports: [AnimatedHeading, ButtonLink, RouterLink],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero {
  protected readonly hero = HERO;
  protected readonly profile = SITE_PROFILE;
  protected readonly hasResume = HAS_RESUME_PDF;
  protected readonly latestCommit = signal<GitCommit | null>(null);

  private readonly destroyRef = inject(DestroyRef);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly animationService = inject(AnimationService);
  private ctx?: ReturnType<typeof gsap.context>;

  constructor() {
    afterNextRender(() => {
      if (isPlatformBrowser(this.platformId)) {
        this.fetchGithubActivity();
      }

      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) return;

      this.ctx = gsap.context(() => {
        // Prime the clip elements: make them start clipped only once JS is ready,
        // so the name is never permanently hidden if GSAP is slow.
        document.querySelectorAll('.clip').forEach((el) => el.classList.add('clip--js-ready'));

        const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.0 } });

        // 1. Reveal name lines
        tl.to('.clip', {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.1,
          stagger: 0.15,
        });
        tl.from(
          '.clip__inner',
          {
            y: '100%',
            duration: 1.1,
            stagger: 0.15,
          },
          '<',
        );

        // 2. Fade in eyebrow, headline, supporting text, actions, availability
        tl.from('.hero__eyebrow', { opacity: 0, y: 15, duration: 0.8 }, '-=0.8');
        tl.from('.hero__headline', { opacity: 0, y: 20, duration: 0.8 }, '-=0.7');
        tl.from('.hero__supporting', { opacity: 0, y: 20, duration: 0.8 }, '-=0.6');
        tl.from('.hero__actions > *', { opacity: 0, y: 20, duration: 0.8, stagger: 0.1 }, '-=0.5');
        tl.from('.hero__availability', { opacity: 0, y: 15, duration: 0.8 }, '-=0.4');

        // 3. Reveal image visual
        tl.from(
          '.hero__image-wrapper',
          { opacity: 0, scale: 0.95, y: 15, duration: 1.0, ease: 'power3.out' },
          '-=0.8',
        );

        // 4. Float image gently
        gsap.to('.hero__image-float-wrapper', {
          y: '+=8',
          duration: 3.5,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
        });

        // 5. Setup magnetic pointer effects for actions
        this.animationService.setupMagneticHover(
          '.hero__actions a, .hero__actions app-button-link',
          0.2,
        );
      });

      this.destroyRef.onDestroy(() => {
        if (this.ctx) {
          this.ctx.revert();
        }
      });
    });
  }

  private fetchGithubActivity(): void {
    fetch('https://api.github.com/users/sandeepyeg/events')
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json() as Promise<GithubEvent[]>;
      })
      .then((events) => {
        const pushEvent = events.find((e) => e.type === 'PushEvent');
        if (
          !pushEvent ||
          !pushEvent.payload ||
          !pushEvent.payload.commits ||
          !pushEvent.payload.commits.length
        ) {
          return;
        }

        const commit = pushEvent.payload.commits[0];
        const rawMsg = commit.message || 'Update';
        const message = rawMsg.length > 45 ? rawMsg.substring(0, 45) + '...' : rawMsg;
        const repo = pushEvent.repo.name.replace(/^sandeepyeg\//, '');
        const time = this.getRelativeTime(pushEvent.created_at);
        const url = `https://github.com/${pushEvent.repo.name}/commit/${commit.sha}`;

        this.latestCommit.set({ message, repo, time, url });
      })
      .catch(() => {
        // Fail silently so layout never breaks
      });
  }

  private getRelativeTime(dateString: string): string {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  }
}

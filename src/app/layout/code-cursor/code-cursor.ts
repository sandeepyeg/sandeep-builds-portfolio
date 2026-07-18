import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  PLATFORM_ID,
  ViewChild,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-code-cursor',
  template: `
    <div #cursor class="code-cursor" aria-hidden="true">
      <span class="code-cursor__ring"></span>
      <span class="code-cursor__core"></span>
      @for (trail of trails; track trail; let i = $index) {
        <span class="code-cursor__trail" [style.--i]="i"></span>
      }
      @for (token of tokens(); track $index; let i = $index) {
        <span class="code-cursor__token" [style.--i]="i">{{ token }}</span>
      }
    </div>
  `,
  styleUrl: './code-cursor.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeCursor {
  protected readonly tokens = signal(['{ }', '</>', 'C#', 'fn']);
  protected readonly trails = [0, 1, 2, 3, 4, 5];

  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);
  private readonly tokenBank = [
    '{ }',
    '</>',
    'C#',
    'API',
    'fn',
    'SQL',
    '.NET',
    'AWS',
    'SQS',
    'RxJS',
    'TS',
    'AI',
    'JSON',
    'GET',
    'POST',
    'async',
    'Redis',
    '=>',
  ];
  private raf = 0;
  private tokenTimer = 0;
  private tokenSwapTimer = 0;
  private tokenSettleTimer = 0;
  private tokenTransitioning = false;
  private targetX = 0;
  private targetY = 0;
  private currentX = 0;
  private currentY = 0;
  private visible = false;
  private readonly quietSelectors = [
    'a',
    'button',
    'input',
    'textarea',
    'select',
    'summary',
    '[role="button"]',
    '[role="link"]',
    '[tabindex]:not([tabindex="-1"])',
    '.pp-card',
    '.blog-card',
    '.freelance-card',
    '.project-card',
    '.capability-card',
    '.case-card',
  ].join(',');

  @ViewChild('cursor') private cursor?: ElementRef<HTMLElement>;

  constructor() {
    afterNextRender(() => {
      if (!isPlatformBrowser(this.platformId)) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

      const onPointerMove = (event: PointerEvent) => {
        this.targetX = event.clientX;
        this.targetY = event.clientY;
        this.visible = true;

        const cursor = this.cursor?.nativeElement;
        if (!cursor) return;

        cursor.classList.add('is-visible');
        cursor.classList.toggle('is-quiet', this.isOverInteractiveElement(event.target));
      };

      const onPointerLeave = () => {
        this.visible = false;
        this.cursor?.nativeElement.classList.remove('is-visible', 'is-quiet');
      };

      window.addEventListener('pointermove', onPointerMove, { passive: true });
      window.addEventListener('pointerleave', onPointerLeave, { passive: true });
      this.tokenTimer = window.setInterval(() => this.shuffleTokens(), 900);
      this.animate();

      this.destroyRef.onDestroy(() => {
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerleave', onPointerLeave);
        window.clearInterval(this.tokenTimer);
        window.clearTimeout(this.tokenSwapTimer);
        window.clearTimeout(this.tokenSettleTimer);
        cancelAnimationFrame(this.raf);
      });
    });
  }

  private shuffleTokens(): void {
    if (this.tokenTransitioning) return;

    const el = this.cursor?.nativeElement;
    if (!el) return;

    const shuffled = [...this.tokenBank].sort(() => Math.random() - 0.5);
    const next = shuffled.slice(0, 4);

    this.tokenTransitioning = true;
    el.classList.remove('is-settling');
    el.classList.add('is-shuffling');

    this.tokenSwapTimer = window.setTimeout(() => {
      this.tokens.set(next);
      el.classList.remove('is-shuffling');
      el.classList.add('is-settling');

      this.tokenSettleTimer = window.setTimeout(() => {
        el.classList.remove('is-settling');
        this.tokenTransitioning = false;
      }, 260);
    }, 170);
  }

  private isOverInteractiveElement(target: EventTarget | null): boolean {
    return target instanceof Element && target.closest(this.quietSelectors) !== null;
  }

  private animate(): void {
    const el = this.cursor?.nativeElement;
    if (el && this.visible) {
      this.currentX += (this.targetX - this.currentX) * 0.18;
      this.currentY += (this.targetY - this.currentY) * 0.18;
      el.style.setProperty('--cursor-x', `${this.currentX}px`);
      el.style.setProperty('--cursor-y', `${this.currentY}px`);
      el.style.setProperty('--cursor-spin', `${performance.now() * 0.00018}turn`);
    }

    this.raf = requestAnimationFrame(() => this.animate());
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  afterNextRender,
  inject,
  DestroyRef,
  HostListener,
  signal,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { SectionHeading } from '../../../shared/components/section-heading/section-heading';
import { TechnologyList } from '../../../shared/components/technology-list/technology-list';
import {
  ENTERPRISE_PAYMENTS_CASE_STUDY,
  FEATURED_WORK_HEADING,
  PROJECTS,
} from '../../../core/data/portfolio.data';
import { PortfolioProject } from '../../../core/models/portfolio.models';
import { ScrollService } from '../../../core/services/scroll.service';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-featured-work',
  imports: [SectionHeading, TechnologyList],
  templateUrl: './featured-work.html',
  styleUrl: './featured-work.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturedWork {
  protected readonly heading = FEATURED_WORK_HEADING;
  private readonly projects = PROJECTS;
  protected readonly project = computed<PortfolioProject>(
    () => this.projects.find((p) => p.status === 'published') ?? this.projects[0],
  );
  protected readonly flow = ['Client', 'API', 'Queue', 'Worker', 'Platform', 'Callback'];
  protected readonly stepDescriptions = [
    'Client initiates the workflow by sending a secure HTTPS POST payload.',
    'Ingestion REST API processes, validates schema, and authorizes the client.',
    'Message is enqueued on high-throughput Azure Service Bus for decoupling.',
    'Asynchronous Background Worker consumes the queue and processes transactions.',
    'Payments platform executes payment settlements and routes to core banking engines.',
    'Client receives automated callback/webhook payload indicating final completion.',
  ];
  protected readonly caseStudyHighlights = [
    {
      heading: 'Project Overview',
      copy: 'A secure, production-grade payment integration platform for public-sector applications. It connects client systems with payment-processing services through REST APIs, asynchronous workers, wallet workflows, automated callbacks and resilient cloud infrastructure.',
    },
    {
      heading: 'System Flow',
      copy: 'Client applications initiate authenticated HTTPS payment requests. The API validates, authorizes, maps identifiers and creates transaction records before queueing non-blocking work for downstream processing and callback delivery.',
    },
    {
      heading: 'Reliability Work',
      copy: 'Background workers process queued callback messages concurrently with timeouts, retry delays, visibility handling and structured logs so slow or unavailable client endpoints do not interrupt the core transaction workflow.',
    },
    {
      heading: 'Wallet Workflows',
      copy: 'Supported secure stored-payment workflows including tokenized payment methods, duplicate detection, expiring-card lookups and consistent handling for card and electronic-check data without storing sensitive payment values directly.',
    },
  ];
  protected readonly caseStudyOutcomes = [
    'Designed and implemented ASP.NET Core REST APIs for transaction, status, reversal, wallet and point-of-sale workflows.',
    'Built Angular payment and wallet UI flows with validation messaging, loading states, duplicate-payment warnings and responsive dialogs.',
    'Improved callback reliability through retry handling, sanitized public payloads and transaction-status recovery APIs.',
    'Used DynamoDB access patterns and indexes for transaction lookup, wallet records, callback payloads and duplicate detection.',
  ];
  protected readonly isCaseStudyOpen = signal(false);
  protected readonly fullCaseStudy = ENTERPRISE_PAYMENTS_CASE_STUDY;

  private readonly destroyRef = inject(DestroyRef);
  private readonly scrollService = inject(ScrollService);
  private touchStartY = 0;
  private ctx?: ReturnType<typeof gsap.context>;

  @ViewChild('caseModalBody') private caseModalBody?: ElementRef<HTMLElement>;

  constructor() {
    this.destroyRef.onDestroy(() => {
      if (typeof document !== 'undefined') {
        document.documentElement.classList.remove('modal-open');
        document.body.classList.remove('modal-open');
      }
      this.scrollService.start();
    });

    afterNextRender(() => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) return;

      const isMobile = window.matchMedia('(max-width: 900px)').matches;

      this.ctx = gsap.context(() => {
        // Draw diagram flow paths on scroll (runs on desktop & mobile)
        gsap.fromTo(
          '.flow-path',
          { strokeDashoffset: 12, strokeDasharray: '4 4' },
          {
            strokeDashoffset: 0,
            duration: 1.5,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '.featured__visual',
              start: 'top 85%',
            },
          },
        );

        if (isMobile) {
          // Parallel visual float
          gsap.fromTo(
            '.featured__visual',
            { y: -15 },
            {
              y: 15,
              ease: 'none',
              scrollTrigger: {
                trigger: '.featured-work',
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            },
          );

          // Card entrance reveals
          const cards = document.querySelectorAll('.featured__step-card');
          cards.forEach((card) => {
            gsap.fromTo(
              card,
              { opacity: 0.35, y: 15 },
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: card,
                  start: 'top 85%',
                  end: 'bottom 25%',
                  toggleActions: 'play none none reverse',
                },
              },
            );

            // Toggle active focus state as cards scroll through viewport center
            ScrollTrigger.create({
              trigger: card,
              start: 'top 65%',
              end: 'bottom 45%',
              toggleClass: 'is-active',
            });
          });
          return;
        }

        // Desktop: Scroll-linked step card triggers
        const cards = document.querySelectorAll('.featured__step-card');
        cards.forEach((card, i) => {
          const rect = `.flow-rect[data-index="${i}"]`;
          const label = `.flow-label[data-index="${i}"]`;
          const path = `.flow-path[data-index="${i}"]`;

          ScrollTrigger.create({
            trigger: card,
            start: 'top 60%',
            end: 'bottom 40%',
            onEnter: () => {
              card.classList.add('is-active');
              gsap.to(rect, {
                fill: 'var(--accent)',
                stroke: 'var(--accent)',
                scale: 1.05,
                transformOrigin: '50% 50%',
                duration: 0.3,
              });
              gsap.to(label, { fill: 'var(--on-accent)', duration: 0.3 });
              if (i < this.flow.length - 1) {
                gsap.to(path, { stroke: 'var(--accent)', duration: 0.3 });
              }
            },
            onLeave: () => {
              card.classList.remove('is-active');
              gsap.to(rect, {
                fill: 'rgba(255, 255, 255, 0.05)',
                stroke: 'var(--border-subtle)',
                scale: 1.0,
                duration: 0.3,
              });
              gsap.to(label, { fill: 'var(--fg-muted)', duration: 0.3 });
              if (i < this.flow.length - 1) {
                gsap.to(path, { stroke: 'var(--border-subtle)', duration: 0.3 });
              }
            },
            onEnterBack: () => {
              card.classList.add('is-active');
              gsap.to(rect, {
                fill: 'var(--accent)',
                stroke: 'var(--accent)',
                scale: 1.05,
                transformOrigin: '50% 50%',
                duration: 0.3,
              });
              gsap.to(label, { fill: 'var(--on-accent)', duration: 0.3 });
              if (i < this.flow.length - 1) {
                gsap.to(path, { stroke: 'var(--accent)', duration: 0.3 });
              }
            },
            onLeaveBack: () => {
              card.classList.remove('is-active');
              gsap.to(rect, {
                fill: 'rgba(255, 255, 255, 0.05)',
                stroke: 'var(--border-subtle)',
                scale: 1.0,
                duration: 0.3,
              });
              gsap.to(label, { fill: 'var(--fg-muted)', duration: 0.3 });
              if (i < this.flow.length - 1) {
                gsap.to(path, { stroke: 'var(--border-subtle)', duration: 0.3 });
              }
            },
          });
        });
      });

      this.destroyRef.onDestroy(() => {
        if (this.ctx) {
          this.ctx.revert();
        }
      });
    });
  }

  protected openCaseStudy(): void {
    this.isCaseStudyOpen.set(true);
    this.scrollService.stop();
    if (typeof document !== 'undefined') {
      document.documentElement.classList.add('modal-open');
      document.body.classList.add('modal-open');
    }
  }

  protected closeCaseStudy(): void {
    this.isCaseStudyOpen.set(false);
    this.scrollService.start();
    if (typeof document !== 'undefined') {
      document.documentElement.classList.remove('modal-open');
      document.body.classList.remove('modal-open');
    }
  }

  protected onCaseStudyWheel(event: WheelEvent): void {
    this.scrollModalBody(event.deltaY);
    event.preventDefault();
    event.stopPropagation();
  }

  protected onCaseStudyTouchStart(event: TouchEvent): void {
    this.touchStartY = event.touches[0]?.clientY ?? 0;
  }

  protected onCaseStudyTouchMove(event: TouchEvent): void {
    const currentY = event.touches[0]?.clientY ?? this.touchStartY;
    this.scrollModalBody(this.touchStartY - currentY);
    this.touchStartY = currentY;
    event.preventDefault();
    event.stopPropagation();
  }

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    if (this.isCaseStudyOpen()) {
      this.closeCaseStudy();
    }
  }

  private scrollModalBody(deltaY: number): void {
    const body = this.caseModalBody?.nativeElement;
    if (!body) return;

    body.scrollTop += deltaY;
  }
}

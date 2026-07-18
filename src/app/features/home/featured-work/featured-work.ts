import {
  ChangeDetectionStrategy,
  Component,
  computed,
  afterNextRender,
  inject,
  DestroyRef,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { SectionHeading } from '../../../shared/components/section-heading/section-heading';
import { TechnologyList } from '../../../shared/components/technology-list/technology-list';
import { FEATURED_WORK_HEADING, PROJECTS } from '../../../core/data/portfolio.data';
import { PortfolioProject } from '../../../core/models/portfolio.models';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-featured-work',
  imports: [RouterLink, SectionHeading, TechnologyList],
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

  private readonly destroyRef = inject(DestroyRef);
  private ctx?: ReturnType<typeof gsap.context>;

  constructor() {
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
}

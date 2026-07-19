import {
  ChangeDetectionStrategy,
  Component,
  computed,
  afterNextRender,
  inject,
  DestroyRef,
  ElementRef,
} from '@angular/core';
import { SectionHeading } from '../../../shared/components/section-heading/section-heading';
import { ProjectCard } from '../../../shared/components/project-card/project-card';
import {
  ENGINEERING_LAB_HEADING,
  ENGINEERING_LAB_INTRO,
  PROJECTS,
} from '../../../core/data/portfolio.data';
import { PortfolioProject } from '../../../core/models/portfolio.models';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-engineering-lab',
  imports: [SectionHeading, ProjectCard],
  template: `
    <section class="section lab" id="lab" data-theme="cobalt">
      <div class="container">
        <app-section-heading eyebrow="Engineering Lab" [heading]="heading" />
        <p class="lab__intro lead">{{ intro }}</p>

        <div class="lab__grid">
          @for (project of labProjects(); track project.slug) {
            <app-project-card [project]="project" stackLabel="Planned Stack" />
          }
        </div>

        <p class="lab__note">
          These projects are shared as works in progress. Repository and demo links will appear here
          once each project has a functioning implementation.
        </p>
      </div>
    </section>
  `,
  styleUrl: './engineering-lab.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EngineeringLab {
  protected readonly heading = ENGINEERING_LAB_HEADING;
  protected readonly intro = ENGINEERING_LAB_INTRO;
  private readonly projects = PROJECTS;
  protected readonly labProjects = computed<readonly PortfolioProject[]>(() =>
    this.projects.filter((p) => p.status !== 'published'),
  );

  private readonly destroyRef = inject(DestroyRef);
  private readonly elementRef = inject(ElementRef);
  private ctx?: ReturnType<typeof gsap.context>;

  constructor() {
    afterNextRender(() => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) return;

      this.ctx = gsap.context(() => {
        const cards = this.elementRef.nativeElement.querySelectorAll('app-project-card');
        gsap.fromTo(
          cards,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '.lab__grid',
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          },
        );
      });

      this.destroyRef.onDestroy(() => {
        if (this.ctx) {
          this.ctx.revert();
        }
      });
    });
  }
}

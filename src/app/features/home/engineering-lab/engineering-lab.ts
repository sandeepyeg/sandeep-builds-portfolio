import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { SectionHeading } from '../../../shared/components/section-heading/section-heading';
import { ProjectCard } from '../../../shared/components/project-card/project-card';
import {
  ENGINEERING_LAB_HEADING,
  ENGINEERING_LAB_INTRO,
  PROJECTS,
} from '../../../core/data/portfolio.data';
import { PortfolioProject } from '../../../core/models/portfolio.models';

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
}

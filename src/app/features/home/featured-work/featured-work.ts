import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SectionHeading } from '../../../shared/components/section-heading/section-heading';
import { TechnologyList } from '../../../shared/components/technology-list/technology-list';
import { FEATURED_WORK_HEADING, PROJECTS } from '../../../core/data/portfolio.data';
import { PortfolioProject } from '../../../core/models/portfolio.models';

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
}

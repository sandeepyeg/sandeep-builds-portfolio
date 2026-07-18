import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { StatusBadge } from '../status-badge/status-badge';
import { TechnologyList } from '../technology-list/technology-list';
import { PortfolioProject } from '../../../core/models/portfolio.models';

@Component({
  selector: 'app-project-card',
  imports: [StatusBadge, TechnologyList],
  template: `
    <article class="project-card" [class.project-card--planned]="project().status === 'planned'">
      <div class="project-card__head">
        <span class="project-card__number">{{ project().number }}</span>
        <app-status-badge [status]="project().status" />
      </div>

      <div class="project-card__visual" aria-hidden="true">
        <svg viewBox="0 0 320 160" preserveAspectRatio="xMidYMid meet">
          <defs>
            <pattern
              [attr.id]="'grid-' + project().slug"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 20 0 L 0 0 0 20"
                fill="none"
                stroke="currentColor"
                stroke-width="0.5"
                opacity="0.25"
              />
            </pattern>
          </defs>
          <rect width="320" height="160" [attr.fill]="'url(#grid-' + project().slug + ')'" />
          <g fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.85">
            <rect x="24" y="56" width="64" height="48" rx="6" />
            <rect x="128" y="32" width="64" height="40" rx="6" />
            <rect x="128" y="88" width="64" height="40" rx="6" />
            <rect x="232" y="56" width="64" height="48" rx="6" />
            <path d="M88 80 L128 52" stroke-dasharray="4 4" />
            <path d="M88 80 L128 108" stroke-dasharray="4 4" />
            <path d="M192 52 L232 80" stroke-dasharray="4 4" />
            <path d="M192 108 L232 80" stroke-dasharray="4 4" />
          </g>
        </svg>
      </div>

      <p class="eyebrow">{{ project().label }}</p>
      <h3 class="project-card__title">{{ project().title }}</h3>
      <p class="project-card__summary">{{ project().summary }}</p>

      <div class="project-card__stack">
        <p class="project-card__stack-label">{{ stackLabel() }}</p>
        <app-technology-list [technologies]="project().technologies" />
      </div>
    </article>
  `,
  styleUrl: './project-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCard {
  readonly project = input.required<PortfolioProject>();
  readonly stackLabel = input<string>('Technology');
}

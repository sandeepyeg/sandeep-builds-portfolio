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
        <!-- AI Agent Orchestrator: hub-and-spoke agent dispatch topology -->
        @if (project().slug === 'ai-agent-orchestrator') {
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
                  opacity="0.2"
                />
              </pattern>
            </defs>
            <rect width="320" height="160" [attr.fill]="'url(#grid-' + project().slug + ')'" />
            <g fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.9">
              <!-- Central orchestrator hub (hexagon) -->
              <polygon points="160,44 178,54 178,74 160,84 142,74 142,54" />
              <!-- Worker agents (circles) -->
              <circle cx="64" cy="120" r="18" />
              <circle cx="128" cy="130" r="18" />
              <circle cx="192" cy="130" r="18" />
              <circle cx="256" cy="120" r="18" />
              <!-- Queue node between hub and workers -->
              <rect x="136" y="98" width="48" height="22" rx="11" />
              <!-- Hub → queue -->
              <path d="M160 84 L160 98" stroke-dasharray="3 3" />
              <!-- Queue → agents -->
              <path d="M136 109 L82 120" stroke-dasharray="4 3" />
              <path d="M148 120 L128 120" stroke-dasharray="4 3" />
              <path d="M172 120 L192 120" stroke-dasharray="4 3" />
              <path d="M184 109 L238 120" stroke-dasharray="4 3" />
              <!-- Retry arc on far right agent -->
              <path d="M256 102 C278 102 278 138 256 138" stroke-dasharray="3 2" />
              <polyline points="256,138 250,132 256,138 262,132" />
            </g>
          </svg>
        }

        <!-- RAG Document Intelligence: vertical pipeline retrieval chain -->
        @if (project().slug === 'rag-document-intelligence') {
          <svg viewBox="0 0 320 160" preserveAspectRatio="xMidYMid meet">
            <defs>
              <pattern
                [attr.id]="'grid-' + project().slug"
                width="16"
                height="16"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="0" cy="0" r="0.8" fill="currentColor" opacity="0.18" />
                <circle cx="16" cy="0" r="0.8" fill="currentColor" opacity="0.18" />
                <circle cx="0" cy="16" r="0.8" fill="currentColor" opacity="0.18" />
                <circle cx="16" cy="16" r="0.8" fill="currentColor" opacity="0.18" />
              </pattern>
            </defs>
            <rect width="320" height="160" [attr.fill]="'url(#grid-' + project().slug + ')'" />
            <g fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.9">
              <!-- Pipeline stages (pill shapes, left-to-right) -->
              <rect x="12" y="66" width="56" height="28" rx="14" />
              <rect x="88" y="66" width="56" height="28" rx="14" />
              <rect x="164" y="66" width="56" height="28" rx="14" />
              <rect x="240" y="66" width="68" height="28" rx="14" />
              <!-- Stage connectors -->
              <path d="M68 80 L88 80" stroke-dasharray="4 3" />
              <path d="M144 80 L164 80" stroke-dasharray="4 3" />
              <path d="M220 80 L240 80" stroke-dasharray="4 3" />
              <!-- Vector store bubble above retrieve stage -->
              <ellipse cx="192" cy="38" rx="28" ry="16" stroke-dasharray="3 2" />
              <path d="M192 54 L192 66" stroke-dasharray="3 2" />
              <!-- Grounded answer highlight arc below generate stage -->
              <path d="M244 94 C240 118 308 118 308 94" stroke-dasharray="3 2" opacity="0.6" />
              <!-- Source citation tick -->
              <path d="M264 118 L272 126 L284 110" stroke-width="1.8" />
            </g>
          </svg>
        }
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

import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { PROJECT_STATUS_LABEL, ProjectStatus } from '../../../core/models/portfolio.models';

@Component({
  selector: 'app-status-badge',
  template: `
    <span class="status status--{{ status() }}">
      <span class="status__dot" aria-hidden="true"></span>
      {{ label() }}
    </span>
  `,
  styleUrl: './status-badge.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusBadge {
  readonly status = input.required<ProjectStatus>();
  protected readonly label = computed(() => PROJECT_STATUS_LABEL[this.status()]);
}

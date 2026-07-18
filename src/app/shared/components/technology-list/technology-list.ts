import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-technology-list',
  template: `
    <ul class="tech-list" role="list">
      @for (tech of technologies(); track tech) {
        <li class="tag">{{ tech }}</li>
      }
    </ul>
  `,
  styleUrl: './technology-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechnologyList {
  readonly technologies = input.required<readonly string[]>();
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MARQUEE_TECH } from '../../../core/data/portfolio.data';

@Component({
  selector: 'app-marquee',
  template: `
    <div class="marquee" aria-hidden="true">
      <div class="marquee__track">
        @for (tech of doubled(); track $index) {
          <span class="marquee__item">{{ tech }}</span>
        }
      </div>
    </div>
  `,
  styleUrl: './marquee.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Marquee {
  protected readonly doubled = (): readonly string[] => [...MARQUEE_TECH, ...MARQUEE_TECH];
}

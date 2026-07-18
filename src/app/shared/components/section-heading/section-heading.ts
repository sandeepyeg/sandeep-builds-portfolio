import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-section-heading',
  template: `
    <div class="section-heading" [class.section-heading--center]="center()">
      @if (eyebrow()) {
        <p class="eyebrow">{{ eyebrow() }}</p>
      }
      <h2 class="section-heading__title">{{ heading() }}</h2>
    </div>
  `,
  styleUrl: './section-heading.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionHeading {
  readonly eyebrow = input<string | undefined>(undefined);
  readonly heading = input.required<string>();
  readonly center = input<boolean>(false);
}

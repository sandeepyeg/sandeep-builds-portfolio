import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-animated-heading',
  template: `
    <span class="clip" [class.clip--display]="display()">
      <span class="clip__inner">{{ text() }}</span>
    </span>
  `,
  styleUrl: './animated-heading.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimatedHeading {
  readonly text = input.required<string>();
  readonly display = input<boolean>(false);
}

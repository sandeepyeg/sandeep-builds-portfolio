import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-button-link',
  imports: [RouterLink],
  template: `
    @if (href()) {
      <a
        class="btn btn--{{ variant() }}"
        [href]="href()"
        [target]="external() ? '_blank' : null"
        [rel]="external() ? 'noopener noreferrer' : null"
      >
        <span>{{ label() }}</span>
        @if (external()) {
          <svg class="btn__icon" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
            <path
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M7 17 17 7M9 7h8v8"
            />
          </svg>
        }
      </a>
    } @else if (route()) {
      <a class="btn btn--{{ variant() }}" [routerLink]="route()">
        <span>{{ label() }}</span>
      </a>
    } @else {
      <a class="btn btn--{{ variant() }}" [routerLink]="[]" [fragment]="fragment()">
        <span>{{ label() }}</span>
      </a>
    }
  `,
  styleUrl: './button-link.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonLink {
  readonly label = input.required<string>();
  readonly variant = input<'primary' | 'ghost'>('primary');
  readonly href = input<string | undefined>(undefined);
  readonly route = input<string | undefined>(undefined);
  readonly fragment = input<string | undefined>(undefined);
  readonly external = input<boolean>(false);
}

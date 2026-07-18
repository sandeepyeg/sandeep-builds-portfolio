import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonLink } from '../../../shared/components/button-link/button-link';
import { CONTACT, CONTACT_LINKS } from '../../../core/data/portfolio.data';

@Component({
  selector: 'app-contact',
  imports: [ButtonLink],
  template: `
    <section class="section contact" id="contact" data-theme="paper">
      <div class="container container-narrow contact__inner">
        <p class="eyebrow reveal">Contact</p>
        <h2 class="contact__heading reveal">{{ contact.heading }}</h2>
        <p class="contact__copy lead reveal">{{ contact.copy }}</p>

        <div class="contact__actions reveal">
          @for (link of links; track link.label) {
            <app-button-link
              [label]="link.label"
              [href]="link.href"
              [external]="link.kind !== 'email'"
              [variant]="link.kind === 'email' ? 'primary' : 'ghost'"
            />
          }
        </div>
      </div>
    </section>
  `,
  styleUrl: './contact.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact {
  protected readonly contact = CONTACT;
  protected readonly links = CONTACT_LINKS;
}

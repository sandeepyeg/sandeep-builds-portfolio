import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SectionHeading } from '../../../shared/components/section-heading/section-heading';
import { TechnologyList } from '../../../shared/components/technology-list/technology-list';
import { CAPABILITIES, CAPABILITIES_HEADING } from '../../../core/data/portfolio.data';

@Component({
  selector: 'app-capabilities',
  imports: [SectionHeading, TechnologyList],
  template: `
    <section class="section capabilities" id="capabilities" data-theme="paper">
      <div class="container">
        <app-section-heading eyebrow="What I do" [heading]="heading" />

        <div class="capabilities__grid">
          @for (cap of capabilities; track cap.id; let i = $index) {
            <article class="capability reveal" [class.capability--reverse]="i % 2 === 1">
              <div class="capability__index">
                <span class="capability__num">{{ pad(i + 1) }}</span>
              </div>
              <div class="capability__body">
                <h3 class="capability__title">{{ cap.title }}</h3>
                <p class="capability__desc">{{ cap.description }}</p>
                <app-technology-list [technologies]="cap.technologies" />
              </div>
            </article>
          }
        </div>
      </div>
    </section>
  `,
  styleUrl: './capabilities.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Capabilities {
  protected readonly heading = CAPABILITIES_HEADING;
  protected readonly capabilities = CAPABILITIES;

  protected pad(n: number): string {
    return n.toString().padStart(2, '0');
  }
}

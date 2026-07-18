import { ChangeDetectionStrategy, Component } from '@angular/core';
import { INTRODUCTION } from '../../../core/data/portfolio.data';

@Component({
  selector: 'app-introduction',
  template: `
    <section class="section introduction" id="about" data-theme="paper">
      <div class="container container-narrow introduction__inner">
        <p class="eyebrow reveal">About</p>
        <h2 class="introduction__heading reveal">{{ introduction.heading }}</h2>
        <div class="introduction__body">
          @for (paragraph of introduction.paragraphs; track $index) {
            <p class="reveal">{{ paragraph }}</p>
          }
        </div>
      </div>
    </section>
  `,
  styleUrl: './introduction.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Introduction {
  protected readonly introduction = INTRODUCTION;
}

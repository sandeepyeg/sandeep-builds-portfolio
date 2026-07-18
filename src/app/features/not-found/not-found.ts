import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MetadataService } from '../../core/services/metadata.service';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `
    <section class="not-found" data-theme="ink">
      <div class="container not-found__inner">
        <p class="eyebrow">404</p>
        <h1 class="not-found__title">This page drifted off the stack.</h1>
        <p class="not-found__copy lead">
          The route you followed doesn't resolve to anything published yet.
        </p>
        <a routerLink="/" class="btn btn--primary">
          <span>Back to home</span>
        </a>
      </div>
    </section>
  `,
  styleUrl: './not-found.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFound {
  private readonly metadata = inject(MetadataService);

  constructor() {
    this.metadata.setMetadata({
      title: 'Page not found | Sandeep Johal',
      description: 'The page you requested could not be found.',
      path: '/404',
    });
  }
}

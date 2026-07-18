import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PageShell } from './layout/page-shell/page-shell';
import { MetadataService } from './core/services/metadata.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PageShell],
  template: `
    <app-page-shell>
      <router-outlet />
    </app-page-shell>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private readonly metadata = inject(MetadataService);

  constructor() {
    this.metadata.setDefaultMetadata();
  }
}

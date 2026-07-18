import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SITE_PROFILE } from '../../core/data/portfolio.data';
import { ScrollService } from '../../core/services/scroll.service';

@Component({
  selector: 'app-site-footer',
  templateUrl: './site-footer.html',
  styleUrl: './site-footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteFooter {
  private readonly scroll = inject(ScrollService);

  protected readonly profile = SITE_PROFILE;
  protected readonly year = new Date().getFullYear();

  scrollToTop(): void {
    this.scroll.scrollTo(0);
  }
}

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TechnologyList } from '../../../shared/components/technology-list/technology-list';
import { MetadataService } from '../../../core/services/metadata.service';
import { ENTERPRISE_PAYMENTS_CASE_STUDY } from '../../../core/data/portfolio.data';

@Component({
  selector: 'app-work-detail-page',
  imports: [RouterLink, TechnologyList],
  templateUrl: './work-detail-page.html',
  styleUrl: './work-detail-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkDetailPage {
  protected readonly caseStudy = ENTERPRISE_PAYMENTS_CASE_STUDY;
  protected readonly flow = [
    'External Client',
    'Wrapper REST API',
    'Payment Platform',
    'Event / Queue',
    'Background Worker',
    'Client Callback',
  ];

  private readonly metadata = inject(MetadataService);

  constructor() {
    this.metadata.setCaseStudyMetadata(
      this.caseStudy.title,
      this.caseStudy.overview,
      `/work/${this.caseStudy.slug}`,
    );
  }
}

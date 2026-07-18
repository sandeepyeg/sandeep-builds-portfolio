import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AnimatedHeading } from '../../../shared/components/animated-heading/animated-heading';
import { ButtonLink } from '../../../shared/components/button-link/button-link';
import { HERO, SITE_PROFILE, HAS_RESUME_PDF } from '../../../core/data/portfolio.data';

@Component({
  selector: 'app-hero',
  imports: [AnimatedHeading, ButtonLink, RouterLink],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero {
  protected readonly hero = HERO;
  protected readonly profile = SITE_PROFILE;
  protected readonly hasResume = HAS_RESUME_PDF;
}

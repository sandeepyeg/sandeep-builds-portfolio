import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Hero } from './hero/hero';
import { Marquee } from './marquee/marquee';
import { Introduction } from './introduction/introduction';
import { FeaturedWork } from './featured-work/featured-work';
import { Capabilities } from './capabilities/capabilities';
import { Experience } from './experience/experience';
import { EngineeringLab } from './engineering-lab/engineering-lab';
import { Contact } from './contact/contact';

@Component({
  selector: 'app-home',
  imports: [
    Hero,
    Marquee,
    Introduction,
    FeaturedWork,
    Capabilities,
    Experience,
    EngineeringLab,
    Contact,
  ],
  template: `
    <app-hero />
    <app-marquee />
    <app-introduction />
    <app-featured-work />
    <app-capabilities />
    <app-experience />
    <app-engineering-lab />
    <app-contact />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {}

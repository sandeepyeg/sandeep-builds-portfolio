import {
  ChangeDetectionStrategy,
  Component,
  afterNextRender,
  inject,
  DestroyRef,
  ElementRef,
} from '@angular/core';
import { ButtonLink } from '../../../shared/components/button-link/button-link';
import { CONTACT, CONTACT_LINKS } from '../../../core/data/portfolio.data';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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

  private readonly destroyRef = inject(DestroyRef);
  private readonly elementRef = inject(ElementRef);
  private ctx?: ReturnType<typeof gsap.context>;

  constructor() {
    afterNextRender(() => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) return;

      this.ctx = gsap.context(() => {
        const reveals = this.elementRef.nativeElement.querySelectorAll('.reveal');
        gsap.fromTo(
          reveals,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: this.elementRef.nativeElement,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          },
        );
      });

      this.destroyRef.onDestroy(() => {
        if (this.ctx) {
          this.ctx.revert();
        }
      });
    });
  }
}

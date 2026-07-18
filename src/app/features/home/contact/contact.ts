import {
  ChangeDetectionStrategy,
  Component,
  afterNextRender,
  inject,
  DestroyRef,
  ElementRef,
  viewChild,
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
      <div class="container contact__inner">
        <div class="contact__content reveal">
          <p class="eyebrow">Contact</p>
          <h2 class="contact__heading">{{ contact.heading }}</h2>
          <p class="contact__copy lead">{{ contact.copy }}</p>

          <div class="contact__actions">
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

        <div class="contact__visual reveal">
          <div class="contact__video-wrapper">
            <video
              #contactVideo
              loop
              [muted]="true"
              playsinline
              preload="metadata"
              class="contact__video"
            >
              <source src="/images/main_video.mp4" type="video/mp4" />
            </video>
          </div>
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
  private readonly videoRef = viewChild<ElementRef<HTMLVideoElement>>('contactVideo');
  private ctx?: ReturnType<typeof gsap.context>;
  private videoObserver?: IntersectionObserver;

  constructor() {
    afterNextRender(() => {
      // ── Scroll-aware video play/pause ─────────────────────────────────────
      // Plays when the video enters the viewport, pauses when it leaves.
      // This bypasses browser autoplay restrictions (which block autoplay on
      // videos that aren't triggered by user interaction) and ensures the
      // video restarts every time the user scrolls back down to the section.
      const videoEl = this.videoRef()?.nativeElement;
      if (videoEl) {
        videoEl.muted = true; // ensure muted before any play attempt
        this.videoObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                videoEl.play().catch(() => {
                  // Autoplay still blocked — silently ignore
                });
              } else {
                videoEl.pause();
              }
            });
          },
          { threshold: 0.25 }, // play once 25% of the video is visible
        );
        this.videoObserver.observe(videoEl);
      }

      // ── Section reveal animations ─────────────────────────────────────────
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!prefersReduced) {
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
      }

      this.destroyRef.onDestroy(() => {
        this.videoObserver?.disconnect();
        if (this.ctx) {
          this.ctx.revert();
        }
      });
    });
  }
}

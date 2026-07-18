import { DOCUMENT } from '@angular/common';
import { Injectable, RendererFactory2, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SITE_PROFILE } from '../data/portfolio.data';

export interface PageMetadata {
  readonly title: string;
  readonly description: string;
  readonly path: string;
  readonly ogImage?: string;
  readonly type?: string;
}

const SITE_ORIGIN = `https://${SITE_PROFILE.domain}`;
const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/og/sandeep-builds-og.svg`;
const TWITTER_HANDLE = '@sandeepyeg';

@Injectable({ providedIn: 'root' })
export class MetadataService {
  private readonly document = inject(DOCUMENT);
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);
  private readonly renderer = inject(RendererFactory2).createRenderer(null, null);

  setMetadata(page: PageMetadata): void {
    const fullTitle = page.title;
    const canonical = `${SITE_ORIGIN}${page.path}`;
    const ogImage = page.ogImage ?? DEFAULT_OG_IMAGE;
    const ogType = page.type ?? 'website';

    this.title.setTitle(fullTitle);

    this.meta.updateTag({ name: 'description', content: page.description });
    this.meta.updateTag({ name: 'theme-color', content: '#0b0d10' });

    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: page.description });
    this.meta.updateTag({ property: 'og:type', content: ogType });
    this.meta.updateTag({ property: 'og:url', content: canonical });
    this.meta.updateTag({ property: 'og:image', content: ogImage });
    this.meta.updateTag({ property: 'og:site_name', content: 'Sandeep Builds' });

    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
    this.meta.updateTag({ name: 'twitter:description', content: page.description });
    this.meta.updateTag({ name: 'twitter:image', content: ogImage });
    this.meta.updateTag({ name: 'twitter:site', content: TWITTER_HANDLE });

    this.setCanonical(canonical);
    this.setJsonLd();
  }

  setDefaultMetadata(): void {
    this.setMetadata({
      title: 'Sandeep Johal | Full-Stack, Cloud and AI Developer',
      description:
        'Edmonton-based full-stack developer building enterprise applications, cloud integrations and AI systems with .NET, Angular, Azure and AWS.',
      path: '/',
    });
  }

  setCaseStudyMetadata(title: string, description: string, path: string): void {
    this.setMetadata({
      title: `${title} | Sandeep Johal`,
      description,
      path,
      type: 'article',
    });
  }

  private setCanonical(href: string): void {
    const existing = this.document.querySelector('link[rel="canonical"]');
    if (existing) {
      this.renderer.setAttribute(existing, 'href', href);
      return;
    }
    const link = this.renderer.createElement('link');
    this.renderer.setAttribute(link, 'rel', 'canonical');
    this.renderer.setAttribute(link, 'href', href);
    this.document.head.appendChild(link);
  }

  private setJsonLd(): void {
    const existing = this.document.getElementById('person-jsonld');
    if (existing) {
      return;
    }
    const script = this.renderer.createElement('script');
    this.renderer.setAttribute(script, 'type', 'application/ld+json');
    this.renderer.setAttribute(script, 'id', 'person-jsonld');
    const data = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: SITE_PROFILE.name,
      jobTitle: 'Software Developer',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Edmonton',
        addressRegion: 'Alberta',
        addressCountry: 'Canada',
      },
      url: SITE_ORIGIN,
      sameAs: [SITE_PROFILE.linkedinUrl, SITE_PROFILE.githubUrl],
      knowsAbout: [
        'C#',
        '.NET',
        'Angular',
        'TypeScript',
        'Microsoft Azure',
        'AWS',
        'Docker',
        'CI/CD',
        'REST APIs',
        'Event-Driven Architecture',
        'AI Agents',
        'Retrieval-Augmented Generation',
      ],
    };
    script.textContent = JSON.stringify(data);
    this.document.head.appendChild(script);
  }
}

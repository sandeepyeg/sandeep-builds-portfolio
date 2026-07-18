import { describe, it, expect } from 'vitest';
import { PROJECTS, HAS_RESUME_PDF, CONTACT_LINKS } from './portfolio.data';
import { PortfolioProject } from '../models/portfolio.models';

describe('Portfolio Data', () => {
  describe('PROJECTS', () => {
    it('contains at least one published project', () => {
      const published = PROJECTS.filter((p: PortfolioProject) => p.status === 'published');
      expect(published.length).toBeGreaterThanOrEqual(1);
    });

    it('published projects have a route configured', () => {
      const published = PROJECTS.filter((p: PortfolioProject) => p.status === 'published');
      published.forEach((p: PortfolioProject) => {
        expect(p.route).toBeTruthy();
      });
    });

    it('projects in development or planned do not have repository URLs', () => {
      const unpublished = PROJECTS.filter((p: PortfolioProject) => p.status !== 'published');
      unpublished.forEach((p: PortfolioProject) => {
        expect(p.repositoryUrl).toBeUndefined();
      });
    });

    it('all project slugs are unique', () => {
      const slugs = PROJECTS.map((p: PortfolioProject) => p.slug);
      expect(new Set(slugs).size).toBe(slugs.length);
    });

    it('each project has a number string', () => {
      PROJECTS.forEach((p: PortfolioProject) => {
        expect(p.number).toBeTruthy();
        expect(typeof p.number).toBe('string');
      });
    });

    it('each project has technologies array with items', () => {
      PROJECTS.forEach((p: PortfolioProject) => {
        expect(p.technologies.length).toBeGreaterThan(0);
      });
    });
  });

  describe('CONTACT_LINKS', () => {
    it('has an email link', () => {
      const email = CONTACT_LINKS.find((l) => l.kind === 'email');
      expect(email).toBeDefined();
      expect(email!.href).toBe('mailto:johalsandeep64@gmail.com');
    });

    it('has a LinkedIn link', () => {
      const linkedin = CONTACT_LINKS.find((l) => l.kind === 'linkedin');
      expect(linkedin).toBeDefined();
      expect(linkedin!.href).toContain('linkedin.com');
    });

    it('has a GitHub link', () => {
      const github = CONTACT_LINKS.find((l) => l.kind === 'github');
      expect(github).toBeDefined();
      expect(github!.href).toContain('github.com');
    });
  });

  describe('HAS_RESUME_PDF', () => {
    it('is a boolean', () => {
      expect(typeof HAS_RESUME_PDF).toBe('boolean');
    });
  });
});

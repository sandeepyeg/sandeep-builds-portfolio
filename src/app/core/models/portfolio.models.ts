export type ProjectStatus = 'published' | 'in-development' | 'planned';

export interface PortfolioProject {
  readonly slug: string;
  readonly number: string;
  readonly title: string;
  readonly label: string;
  readonly status: ProjectStatus;
  readonly summary: string;
  readonly technologies: readonly string[];
  readonly capabilities: readonly string[];
  readonly route?: string;
  readonly repositoryUrl?: string;
  readonly liveUrl?: string;
  readonly professionalCaseStudy?: boolean;
}

export interface CaseStudySection {
  readonly id: string;
  readonly heading: string;
  readonly paragraphs: readonly string[];
  readonly bullets?: readonly string[];
}

export interface CaseStudy {
  readonly slug: string;
  readonly title: string;
  readonly label: string;
  readonly sanitizationNote: string;
  readonly overview: string;
  readonly sections: readonly CaseStudySection[];
  readonly technology: readonly string[];
  readonly lessons: readonly string[];
}

export interface ExperienceEntry {
  readonly role: string;
  readonly company: string;
  readonly period: string;
  readonly location: string;
  readonly description: string;
  readonly current?: boolean;
}

export interface EducationEntry {
  readonly qualification: string;
  readonly institution: string;
}

export interface Capability {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly technologies: readonly string[];
}

export interface ContactLink {
  readonly label: string;
  readonly href: string;
  readonly kind: 'email' | 'linkedin' | 'github' | 'external';
}

export interface SiteProfile {
  readonly name: string;
  readonly monogram: string;
  readonly location: string;
  readonly role: string;
  readonly email: string;
  readonly linkedinUrl: string;
  readonly linkedinHandle: string;
  readonly githubUrl: string;
  readonly githubHandle: string;
  readonly domain: string;
  readonly resumePath: string;
}

export interface NavItem {
  readonly label: string;
  readonly fragment: string;
}

export const PROJECT_STATUS_LABEL: Readonly<Record<ProjectStatus, string>> = {
  published: 'Published',
  'in-development': 'In Development',
  planned: 'Planned',
};

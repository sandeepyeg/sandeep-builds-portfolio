import {
  Capability,
  CaseStudy,
  ContactLink,
  EducationEntry,
  ExperienceEntry,
  NavItem,
  PortfolioProject,
  SiteProfile,
} from '../models/portfolio.models';

export const SITE_PROFILE: SiteProfile = {
  name: 'Sandeep Johal',
  monogram: 'SB',
  location: 'Edmonton, Alberta, Canada',
  role: 'Software Developer II · Edmonton, Alberta',
  email: 'johalsandeep64@gmail.com',
  linkedinUrl: 'https://linkedin.com/in/johalsandeep',
  linkedinHandle: 'linkedin.com/in/johalsandeep',
  githubUrl: 'https://github.com/sandeepyeg',
  githubHandle: 'github.com/sandeepyeg',
  domain: 'sandeepbuilds.com',
  resumePath: '/documents/SANDEEP JOHAL RESUME.pdf',
};

export const NAV_ITEMS: readonly NavItem[] = [
  { label: 'About', fragment: 'about' },
  { label: 'Work', fragment: 'work' },
  { label: 'Experience', fragment: 'experience' },
  { label: 'Contact', fragment: 'contact' },
];

export const HERO = {
  nameLines: ['SANDEEP', 'SINGH'],
  headline: 'Full-stack engineer building reliable cloud and AI systems.',
  supporting:
    'I design, deploy and support enterprise applications using .NET, Angular, Azure, AWS and event-driven architecture.',
  statusLine: 'Software Developer II · Edmonton, Alberta',
  availability: 'Open to intermediate full-stack and cloud engineering opportunities in Canada.',
  primaryActions: [
    { label: 'View Selected Work', fragment: 'work' },
    { label: 'GitHub', href: SITE_PROFILE.githubUrl, external: true },
    { label: 'LinkedIn', href: SITE_PROFILE.linkedinUrl, external: true },
  ] as const,
} as const;

export const MARQUEE_TECH: readonly string[] = [
  '.NET',
  'Angular',
  'TypeScript',
  'Azure',
  'AWS',
  'Docker',
  'SQL',
  'REST APIs',
  'Event-Driven Systems',
  'AI',
];

export const INTRODUCTION = {
  heading: 'Engineering systems that remain reliable after deployment.',
  paragraphs: [
    "I'm a full-stack developer with more than three years of combined professional and project experience, including over two years building enterprise software for public-sector clients. My work spans secure APIs, Angular applications, cloud integrations, background processing, automated testing, production troubleshooting and CI/CD delivery.",
    'I enjoy turning complicated business workflows into maintainable software and using AI-assisted development responsibly to accelerate research, debugging, testing and documentation.',
  ] as const,
} as const;

export const CAPABILITIES: readonly Capability[] = [
  {
    id: 'backend',
    title: 'Backend Engineering',
    description:
      'C#, .NET, ASP.NET Core APIs, worker services, Entity Framework Core and secure third-party integrations.',
    technologies: ['C#', '.NET', 'ASP.NET Core', 'EF Core', 'Worker Services', 'SQL'],
  },
  {
    id: 'frontend',
    title: 'Frontend Engineering',
    description:
      'Angular, TypeScript and responsive interfaces designed around real business workflows.',
    technologies: ['Angular', 'TypeScript', 'RxJS', 'SCSS', 'Accessibility'],
  },
  {
    id: 'cloud',
    title: 'Cloud and Delivery',
    description:
      'Azure, AWS, Docker, GitHub Actions, Azure DevOps, CI/CD pipelines, deployment and monitoring.',
    technologies: ['Azure', 'AWS', 'Docker', 'GitHub Actions', 'Azure DevOps', 'CI/CD'],
  },
  {
    id: 'ai',
    title: 'AI Engineering',
    description:
      'LLM APIs, retrieval-augmented generation, embeddings, vector search, AI agents and AI-assisted software development.',
    technologies: ['LLM APIs', 'RAG', 'Embeddings', 'Vector Search', 'AI Agents'],
  },
];

export const EXPERIENCE: readonly ExperienceEntry[] = [
  {
    role: 'Software Developer II',
    company: 'Catalis Technologies Canada Ltd',
    period: 'August 2025 – Present',
    location: 'Edmonton, Alberta',
    current: true,
    description:
      'Developing and supporting enterprise applications and integrations for public-sector clients using .NET, Angular, cloud services, APIs, asynchronous workflows, automated testing and CI/CD.',
  },
  {
    role: 'Software Developer I',
    company: 'Catalis Technologies Canada Ltd',
    period: 'May 2024 – August 2025',
    location: 'Edmonton, Alberta',
    description:
      'Delivered full-stack features, secure REST APIs, responsive Angular interfaces and production troubleshooting across enterprise payment workflows.',
  },
];

export const EDUCATION: readonly EducationEntry[] = [
  {
    qualification: 'Post-Graduate Diploma, Full Stack Web Development',
    institution: 'MacEwan University',
  },
  {
    qualification: 'Post-Graduate Diploma, Mobile Applications Development',
    institution: 'Georgian College',
  },
  {
    qualification: 'Bachelor of Computer Applications',
    institution: 'Guru Nanak Dev University',
  },
];

export const PROJECTS: readonly PortfolioProject[] = [
  {
    slug: 'enterprise-payments',
    number: '01',
    title: 'Enterprise Payments Integration Platform',
    label: 'Professional Experience Case Study',
    status: 'published',
    summary:
      'Secure full-stack payment and integration workflows built for public-sector applications, with reliable APIs, asynchronous processing, callback delivery and production support.',
    technologies: [
      'C#',
      '.NET',
      'Angular',
      'TypeScript',
      'REST APIs',
      'AWS SQS',
      'EventBridge',
      'DynamoDB',
      'Redis',
      'Docker',
      'Azure DevOps',
      'xUnit',
      'Moq',
    ],
    capabilities: [
      'API design',
      'Background workers',
      'Message processing',
      'Retry handling',
      'Callback workflows',
      'Structured logging',
      'Automated testing',
      'Production troubleshooting',
    ],
    route: '/work/enterprise-payments',
    professionalCaseStudy: true,
  },
  {
    slug: 'ai-agent-orchestrator',
    number: '02',
    title: 'AI Agent Task Orchestrator',
    label: 'Engineering Lab',
    status: 'in-development',
    summary:
      'A distributed task-processing system exploring AI task decomposition, background workers, queues, retries, execution history and observable agent workflows.',
    technologies: ['.NET', 'Angular', 'PostgreSQL', 'AWS SQS', 'Docker', 'Gemini or Groq API'],
    capabilities: [
      'Task decomposition',
      'Background workers',
      'Queues and retries',
      'Execution history',
      'Observable workflows',
    ],
  },
  {
    slug: 'rag-document-intelligence',
    number: '03',
    title: 'RAG Document Intelligence Platform',
    label: 'Engineering Lab',
    status: 'planned',
    summary:
      'A document intelligence application for ingestion, semantic retrieval, grounded answers and source citation using embeddings and vector search.',
    technologies: ['.NET', 'Python', 'FastAPI', 'Angular', 'PostgreSQL', 'pgvector', 'LLM APIs'],
    capabilities: [
      'Document ingestion',
      'Semantic retrieval',
      'Grounded answers',
      'Source citation',
      'Vector search',
    ],
  },
];

export const ENTERPRISE_PAYMENTS_CASE_STUDY: CaseStudy = {
  slug: 'enterprise-payments',
  title: 'Enterprise Payments Integration Platform',
  label: 'Professional Experience Case Study',
  sanitizationNote: 'Implementation details sanitized',
  overview:
    'A secure integration layer supporting payment, wallet, transaction-status and callback workflows for enterprise and public-sector applications.',
  sections: [
    {
      id: 'challenge',
      heading: 'The Engineering Challenge',
      paragraphs: [
        'External systems needed consistent APIs to interact with the platform, while internal workflows mixed synchronous requests with long-running asynchronous processing.',
      ],
      bullets: [
        'External systems needed consistent APIs',
        'Workflows involved synchronous and asynchronous operations',
        'Callback delivery needed reliability',
        'Application support required useful diagnostics',
        'Sensitive implementation details cannot be disclosed',
      ],
    },
    {
      id: 'contributions',
      heading: 'Contributions',
      paragraphs: [
        'My work spanned the full stack, from .NET APIs to Angular workflow tooling and the background services that kept transactions moving.',
      ],
      bullets: [
        'Developing .NET REST APIs',
        'Building Angular workflow enhancements',
        'Implementing background services',
        'Processing queued messages',
        'Implementing retries and timeout handling',
        'Improving structured logs',
        'Supporting wallet and payment workflows',
        'Writing unit and integration tests',
        'Troubleshooting API, database and cloud issues',
        'Collaborating with product, QA and business stakeholders',
      ],
    },
    {
      id: 'reliability',
      heading: 'Reliability Approach',
      paragraphs: [
        'Reliability was designed in rather than retrofitted, with validation, retry policies and observability treated as first-class concerns.',
      ],
      bullets: [
        'Validation',
        'Idempotency considerations',
        'Retry policies',
        'Timeouts',
        'Message visibility',
        'Failure handling',
        'Structured logging',
        'Automated testing',
        'Controlled deployments',
      ],
    },
  ],
  technology: [
    'C#',
    '.NET',
    'ASP.NET Core',
    'Angular',
    'TypeScript',
    'REST APIs',
    'AWS SQS',
    'EventBridge',
    'DynamoDB',
    'Redis',
    'Docker',
    'Azure DevOps',
    'xUnit',
    'Moq',
  ],
  lessons: [
    'Designing for failure is cheaper than debugging it in production.',
    'Observability — structured logs and traceable workflows — is a feature, not an afterthought.',
    'Clear API contracts reduce integration friction across teams and systems.',
    'Testing asynchronous behaviour requires explicit attention to timing, retries and idempotency.',
    'Communicating risks and dependencies early keeps stakeholders aligned and releases predictable.',
  ],
};

export const CONTACT_LINKS: readonly ContactLink[] = [
  {
    label: 'Email Sandeep',
    href: `mailto:${SITE_PROFILE.email}`,
    kind: 'email',
  },
  {
    label: 'LinkedIn',
    href: SITE_PROFILE.linkedinUrl,
    kind: 'linkedin',
  },
  {
    label: 'GitHub',
    href: SITE_PROFILE.githubUrl,
    kind: 'github',
  },
];

export const CONTACT = {
  heading: "Let's build something reliable.",
  copy: 'I\u2019m interested in full-stack, cloud and platform engineering opportunities where I can contribute to real products and continue growing as an engineer.',
};

// Toggle to true once a real resume PDF exists at public/documents/SANDEEP JOHAL RESUME.pdf.
export const HAS_RESUME_PDF = false;

export const FEATURED_WORK_HEADING = 'Selected Engineering Work';
export const CAPABILITIES_HEADING = 'What I Build';
export const EXPERIENCE_HEADING = 'Experience';
export const ENGINEERING_LAB_HEADING = 'Currently Building';
export const ENGINEERING_LAB_INTRO =
  'Independent projects focused on distributed systems and practical AI engineering.';

import {
  Capability,
  BlogTopic,
  CaseStudy,
  ContactLink,
  EducationEntry,
  ExperienceEntry,
  FreelanceProject,
  NavItem,
  PersonalProject,
  PortfolioProject,
  SiteProfile,
} from '../models/portfolio.models';

export const SITE_PROFILE: SiteProfile = {
  name: 'Sandeep Johal',
  monogram: 'SJ',
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
  { label: 'Projects', fragment: 'projects' },
  { label: 'Freelance', fragment: 'freelance' },
  { label: 'Blog', fragment: 'blog' },
  { label: 'Contact', fragment: 'contact' },
];

export const HERO = {
  nameLines: ['SANDEEP', 'JOHAL'],
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
export const HAS_RESUME_PDF = true;

export const FEATURED_WORK_HEADING = 'Selected Engineering Work';
export const CAPABILITIES_HEADING = 'What I Build';
export const EXPERIENCE_HEADING = 'Experience';
export const ENGINEERING_LAB_HEADING = 'Currently Building';
export const ENGINEERING_LAB_INTRO =
  'Independent projects focused on distributed systems and practical AI engineering.';

export const PERSONAL_PROJECTS_HEADING = 'Personal Projects';
export const PERSONAL_PROJECTS_INTRO =
  'A selection of personal and open-source projects spanning full-stack web applications, backend infrastructure, developer tooling and AI experiments.';

export const PERSONAL_PROJECTS: readonly PersonalProject[] = [
  {
    slug: 'project-jupiter',
    title: 'Project Jupiter',
    description:
      "Contributed to Canada's leading AI-native immigration platform, building secure backend APIs, workflow automation and Angular dashboard features used by thousands of applicants navigating complex immigration processes.",
    technologies: ['.NET', 'Angular', 'PostgreSQL', 'Azure', 'AI/ML APIs'],
    language: 'C#',
    isPrivate: true,
    highlight: "Canada's #1 AI immigration platform",
  },
  {
    slug: 'saas-factory',
    title: 'SaaS Factory — core-platform',
    description:
      'Designed and built a multi-tenant SaaS bootstrapping platform providing shared authentication, billing, feature-flag management and tenant isolation as reusable infrastructure for rapidly launching new product lines.',
    technologies: ['.NET', 'Angular', 'PostgreSQL', 'Stripe', 'Docker', 'Azure'],
    language: 'C#',
    isPrivate: true,
    highlight: 'Multi-tenant SaaS platform',
  },
  {
    slug: 'lite-queue-net',
    title: 'LiteQueue.NET',
    description:
      'A lightweight, Redis-powered message queue system built with .NET 8 Web API. Supports queue creation, delayed messages, retries, dead-letter queues, pub/sub and scheduled jobs using clean architecture and background services. Designed as a self-hosted SQS alternative.',
    technologies: ['.NET 8', 'Redis', 'Docker', 'REST API'],
    language: 'C#',
    githubUrl: 'https://github.com/sandeepyeg/LiteQueue.NET',
    highlight: 'Open source · Self-hosted SQS alternative',
  },
  {
    slug: 'members-platform',
    title: 'Members Management Platform',
    description:
      'A full-stack members management application consisting of a .NET REST API backend and an Angular SPA frontend. Covers authentication, member profiles, role management and CRUD workflows with a clean separation of concerns across the stack.',
    technologies: ['.NET', 'Angular', 'TypeScript', 'PostgreSQL'],
    language: 'TypeScript',
    githubUrl: 'https://github.com/sandeepyeg/members-backend',
    highlight: 'Full-stack · API + SPA',
  },
  {
    slug: 'budgetbot',
    title: 'BudgetBot',
    description:
      'An AI-powered personal finance bot that categorises transactions, tracks spending patterns and surfaces budget insights through a conversational interface. Built with Python using LLM APIs for natural language understanding.',
    technologies: ['Python', 'LLM APIs', 'FastAPI'],
    language: 'Python',
    githubUrl: 'https://github.com/sandeepyeg/budgetbot',
    highlight: 'AI-powered · Personal finance',
  },
];

export const FREELANCE_HEADING = 'Freelance & Client Work';
export const FREELANCE_INTRO =
  'Web design and development for small businesses and professional services — delivering fast, modern and SEO-friendly websites alongside custom internal tools and admin dashboards.';

export const FREELANCE_PROJECTS: readonly FreelanceProject[] = [
  {
    slug: 'saffron-chefs',
    client: 'Saffron Indian Cuisine',
    industry: 'Food & Hospitality',
    url: 'https://saffronchefs.ca',
    description:
      "Full marketing website for one of Edmonton's top-rated Indian restaurants. Features an interactive menu modal, reservation call-to-action, social integrations, and a responsive layout optimised for mobile dining discovery.",
    deliverables: [
      'Responsive website',
      'Menu modal',
      'SEO optimisation',
      'Social media integration',
    ],
    technologies: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
    highlight: 'Top-rated Edmonton Indian restaurant',
  },
  {
    slug: 'express-appraisals',
    client: 'Express Appraisals',
    industry: 'Real Estate & Appraisal',
    url: 'https://expressappraisals.ca',
    description:
      'Professional website for a certified real estate appraisal firm offering commercial and residential valuation services. Built with a clean service-page architecture, contact forms and a conversion-focused layout targeting property owners and legal professionals.',
    deliverables: ['Multi-page website', 'Service pages', 'Contact forms', 'Mobile responsive'],
    technologies: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
    highlight: 'Commercial & residential appraisals',
  },
  {
    slug: 'canada-wide-appraisals',
    client: 'Canada Wide Appraisals',
    industry: 'Real Estate & Appraisal',
    url: 'https://canadawideappraisals.com',
    description:
      'Marketing website for a property valuation firm with over 15 years of expertise serving Alberta and Ontario. Includes full OG/meta SEO setup, structured service sections, and a trust-building design targeting mortgage lenders and legal clients.',
    deliverables: [
      'Full website',
      'SEO & meta setup',
      'Service architecture',
      'Performance tuning',
    ],
    technologies: ['HTML', 'CSS', 'JavaScript'],
    highlight: '15+ years of appraisal expertise',
  },
  {
    slug: 'smart-accounting',
    client: 'Smart Accounting & Tax Consultancy',
    industry: 'Finance & Accounting',
    url: 'https://www.smartaccounting.org/ui/index.php',
    description:
      'Full-featured accounting and tax consultancy website for an Edmonton-based firm. Includes animated UI with Slick carousels, service showcases for tax filing, bookkeeping and advisory, and a PHP-backed backend for dynamic content management.',
    deliverables: ['Animated marketing site', 'PHP backend', 'Service pages', 'CMS integration'],
    technologies: ['PHP', 'HTML', 'CSS', 'Bootstrap', 'JavaScript'],
    highlight: 'Edmonton tax & accounting firm',
  },
  {
    slug: 'legacy-custom-home',
    client: 'Legacy Custom Homes',
    industry: 'Construction & Real Estate',
    url: 'https://www.legacycustomhome.ca',
    description:
      'Showcase website for a luxury custom home builder based in Edmonton, Alberta. Features a full-screen image gallery, project portfolio carousel, animated page transitions and a responsive layout designed to attract high-intent homebuying clients.',
    deliverables: ['Portfolio website', 'Image gallery', 'Project carousel', 'Responsive design'],
    technologies: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'Slick Carousel'],
    highlight: 'Edmonton luxury home builder',
  },
  {
    slug: 'river-city-grading',
    client: 'River City Grading',
    industry: 'Landscape Construction',
    url: 'https://rivercitygrading.ca/',
    description:
      'Modern website for an Edmonton landscape construction company serving residential, commercial and multifamily projects across Alberta. Highlights grading, site surveying, sod and planting, retaining walls, irrigation, lighting and sustainable outdoor construction services.',
    deliverables: [
      'Service website',
      'Quote call-to-action',
      'Project-focused content',
      'Mobile responsive',
    ],
    technologies: ['WordPress', 'HTML', 'CSS', 'JavaScript'],
    highlight: '15+ years serving Alberta',
  },
  {
    slug: 'total-delivery-solution',
    client: 'Total Delivery Solution',
    industry: 'Transportation & Logistics',
    url: 'https://totaldeliverysolution.ca/',
    description:
      'Business website for an Alberta transportation provider offering skid delivery, dock-to-dock shipments, moving services, hotshot and long-haul delivery, junk removal, and appliance delivery with installation. Built around service discovery and quote conversion.',
    deliverables: [
      'Marketing website',
      'Service sections',
      'Quote call-to-action',
      'Responsive layout',
    ],
    technologies: ['WordPress', 'HTML', 'CSS', 'JavaScript'],
    highlight: 'Alberta delivery & trucking services',
  },
  {
    slug: 'internal-tools',
    client: 'Various Clients',
    industry: 'Internal Tools & Automation',
    url: '',
    description:
      'Custom internal web applications, admin dashboards, and automation tools built for small and medium businesses — including inventory managers, booking systems, client portals and data export tools tailored to specific business workflows.',
    deliverables: ['Admin dashboards', 'Booking systems', 'Client portals', 'Automation scripts'],
    technologies: ['Angular', '.NET', 'PHP', 'PostgreSQL', 'Python'],
    highlight: 'Custom apps & internal tooling',
  },
];

export const BLOG_HEADING = 'Technology Blog';
export const BLOG_INTRO =
  'Practical writing topics shaped by production API work, Angular applications, background workers, AWS messaging, retries, callback systems, testing and troubleshooting.';

export const BLOG_TOPICS: readonly BlogTopic[] = [
  {
    slug: 'reliable-callback-webhook-workflows',
    number: '01',
    title: 'How I Design Reliable Callback and Webhook Workflows',
    category: 'Distributed Systems',
    summary:
      'Callbacks look simple until the receiver is slow, unavailable, duplicated or misconfigured. This topic explains why webhook delivery should be treated as a separate workflow.',
    points: ['Durable queues', 'Idempotency', 'Timeouts', 'Recovery APIs'],
    details: [
      'In my experience, callbacks and webhooks become serious engineering work as soon as they leave the happy path. The idea sounds simple: finish an operation, send an HTTP request, and notify another system. In production, the receiver may be slow, offline, misconfigured, returning temporary errors, or accepting the request while the response gets lost somewhere in the network.',
      'That is why I prefer treating callback delivery as a separate distributed workflow instead of a small HTTP call at the end of a transaction. The original API request should not stay open while waiting for another system to respond, especially when the main operation has already reached a completed or final state.',
      'A durable queue is the first important boundary. By placing callback work into SQS, the API can return a response while a background worker handles delivery independently. This protects the transaction workflow from client endpoint outages, deployments, traffic spikes, and temporary downstream failures.',
      'The worker still needs careful behaviour. It should use request timeouts, retry temporary failures, add progressive delays with jitter, and avoid retrying errors that are clearly permanent. Invalid URLs, rejected requests, and authentication problems usually need investigation more than repeated attempts.',
      'Duplicate delivery also has to be expected. Message systems commonly provide at-least-once delivery, which means the same callback work may be processed more than once. Stable identifiers, idempotent client behaviour, and clear attempt logging make this easier to reason about.',
      'Another lesson I value is payload design. Internal transaction objects should not be sent directly to clients. A callback should use an approved public model that excludes sensitive payment values, internal identifiers, provider-specific details, and anything the client does not need.',
      'Callbacks should also not be the only recovery path. A transaction-status API gives clients a safe way to retrieve the final result if a webhook is missed, delayed, or blocked by their own infrastructure.',
      'The best callback systems are observable. Logs should show when the callback was queued, which transaction or workflow produced it, how many attempts happened, what endpoint was called, what response came back, and why processing failed, without exposing sensitive data.',
    ],
    takeaway:
      'Reliability comes from queueing, idempotency, safe payload design, observability and recovery paths, not from adding retries alone.',
  },
  {
    slug: 'production-troubleshooting-distributed-systems',
    number: '02',
    title: 'What Production Troubleshooting Taught Me About Distributed Systems',
    category: 'Production Support',
    summary:
      'Production issues are often hidden across APIs, queues, workers, persistence, provider responses and client endpoints.',
    points: ['Correlation IDs', 'Structured logs', 'Workflow tracing', 'Evidence-first debugging'],
    details: [
      'Production troubleshooting taught me that distributed-system failures rarely stay in one obvious place. A user might report that a payment failed, but the real issue could be request validation, identifier mapping, provider communication, persistence, queue processing, callback delivery, or the client endpoint.',
      'The visible error is often not the original error. A callback failure does not automatically mean the transaction failed. A frontend error does not always mean the API is broken. A missing record might come from a mapping issue instead of a database issue.',
      'When a workflow crosses several components, correlation identifiers become extremely valuable. A stable transaction, request, shopping-cart, or workflow identifier allows engineers to follow the same operation across logs, queues, database records, workers, and external calls.',
      'Structured logs are much more useful than random text messages. Logs should include fields such as operation name, transaction identifier, client identifier, status, attempt count, duration, HTTP result, and worker context. Those fields make searching and comparing events much easier.',
      'Good logs should also explain decisions. A log that only says processing failed is weak. A useful log explains whether the failure came from validation, missing data, timeout, provider response, duplicate detection, mapping, or callback delivery.',
      'Eventual consistency is another important part of troubleshooting. A client may check a status before asynchronous work has finished. Systems need clear states such as pending, processing, completed, failed, or retrying so people do not misread normal delay as failure.',
      'I have learned to reproduce the exact path when possible: same input shape, same environment, same configuration, same sequence, and same downstream assumptions. Guessing is tempting, but connected evidence is better.',
      'Production support changes how I build new features. I now think earlier about traceability, null data, duplicate requests, retries, timeouts, and recovery paths because I know how painful those gaps become later.',
    ],
    takeaway:
      'Good troubleshooting is not guessing which service failed. It is proving where the workflow changed from the expected path.',
  },
  {
    slug: 'correct-retry-logic',
    number: '03',
    title: 'Retry Logic Is Easy. Correct Retry Logic Is Not',
    category: 'Reliability',
    summary:
      'A retry loop is simple to write, but careless retries can duplicate work, overload dependencies and hide permanent failures.',
    points: ['Transient vs permanent failures', 'Backoff', 'Jitter', 'Message visibility'],
    details: [
      'Retry logic is one of those engineering topics that looks easy until real state is involved. Writing a loop around an operation is simple. Deciding whether that operation should run again is the difficult part.',
      'The first question I ask is whether the operation is safe to repeat. Read operations are usually safer. Operations that create payments, send messages, update records, or trigger callbacks need more care because a retry can create duplicate effects.',
      'State-changing workflows need protection. That protection might be an idempotency key, duplicate detection, a stable transaction identifier, a provider-side safeguard, or a clear record that an operation has already been attempted.',
      'Not every failure deserves a retry. Network interruptions, timeouts, temporary service unavailability, selected HTTP 5xx responses, and rate limiting may be transient. Invalid request data, failed authorization, unsupported operations, invalid callback URLs, and business-rule rejections are usually permanent until something changes.',
      'Retries should also slow down. Immediate repeated attempts can increase pressure on a dependency that is already struggling. Exponential backoff gives the dependency time to recover, and jitter prevents many workers from retrying at the same instant.',
      'Retry attempts need a limit. If an operation fails repeatedly, it should move into a failed, recoverable, dead-lettered, or reviewable state. Retrying forever usually hides the problem and makes support harder.',
      'Queue workers add another detail: visibility timeout. If a worker receives an SQS message and needs time to process it, the visibility period must be long enough to prevent another worker from picking up the same message while the first attempt is still running.',
      'Every retry should be logged with context: attempt number, reason, delay, operation identifier, and final outcome. Without that, retry systems become noisy black boxes.',
      'Retries are useful, but they cannot fix invalid contracts, broken configuration, missing authorization, consistently slow dependencies, or poor workflow design. They are a reliability tool, not a substitute for correctness.',
    ],
    takeaway:
      'Correct retry logic begins with one question: what happens if this operation runs twice?',
  },
  {
    slug: 'sqs-vs-direct-api-calls',
    number: '04',
    title: 'AWS SQS vs Direct API Calls: When Async Processing Wins',
    category: 'Cloud Architecture',
    summary:
      'Direct calls are useful, but queues are better when work can happen after the response and systems need failure isolation.',
    points: ['Decoupling', 'Traffic smoothing', 'Independent scaling', 'Dead-letter handling'],
    details: [
      'Direct API calls are easy to understand and often the right choice. If the caller needs an immediate answer and the result is required to continue, a direct request keeps the workflow simple.',
      'The trade-off is timing dependency. If Service A calls Service B directly, Service A is now affected by Service B’s response time, availability, deployment state, rate limits, and failure behaviour.',
      'SQS becomes useful when the work does not need to finish before the original request returns. Callback delivery is a good example. If a transaction completes successfully, the client’s callback endpoint should not decide whether the transaction API can respond.',
      'A queue decouples the producer from the consumer. The API only needs to publish a valid message. The worker can process it later, retry temporary failures, and scale independently based on queue depth.',
      'Queues also smooth traffic. If a burst of work arrives, the queue absorbs it and workers can process messages at a controlled rate instead of forcing every downstream dependency to handle the spike immediately.',
      'Failure isolation is another reason I like asynchronous processing. A failing callback endpoint, slow integration, or temporary worker issue does not need to block the main API path if the business process allows delayed completion.',
      'SQS is not magic. It introduces at-least-once delivery, which means consumers must expect duplicates. Visibility timeout must match realistic processing time. Dead-letter handling should exist for messages that repeatedly fail.',
      'Async processing also changes the user and support experience. The system needs clear statuses, monitoring, message schema discipline, and logs that explain what happened after the original API returned.',
      'My practical rule is simple: I do not choose SQS because it sounds more advanced. I choose it when durability, decoupling, controlled retries, and independent processing genuinely help the workflow.',
    ],
    takeaway:
      'I choose SQS when the process benefits from durability, controlled retries and independent processing, not just because it is cloud-native.',
  },
  {
    slug: 'ai-coding-agents',
    number: '05',
    title: 'AI Coding Agents: Useful Tool or Dangerous Shortcut?',
    category: 'AI Engineering',
    summary:
      'AI agents can speed up implementation, testing and exploration, but they become risky when developers stop reviewing the system.',
    points: ['Codebase exploration', 'Test ideas', 'Diff review', 'Human judgment'],
    details: [
      'AI coding agents are useful, but I do not treat them as a replacement for understanding the system. They are strongest when the developer provides context, boundaries, and review.',
      'I use AI to move faster through tasks that benefit from exploration or repetition: understanding an unfamiliar codebase, creating an implementation plan, generating boilerplate, suggesting test scenarios, comparing approaches, drafting documentation, and reviewing edge cases.',
      'Where AI helps most is momentum. It can search through code, connect scattered context, explain framework behaviour, and produce a first version of something that I can then inspect and improve.',
      'The risk is accepting output too quickly. AI can invent APIs, ignore project conventions, duplicate existing functionality, add unnecessary abstractions, miss security concerns, assume database behaviour, or change more files than the task requires.',
      'I also watch tests carefully. AI can write tests that only confirm its own implementation rather than proving the behaviour users actually need. Good tests should cover meaningful cases, failure paths, and project-specific rules.',
      'My rules are practical: give the agent clear boundaries, ask for a plan before larger changes, make it inspect existing patterns, run tests, and review the final diff like any other code change.',
      'Sensitive work needs extra care. Authentication, payments, data migrations, concurrency, retries, public contracts, and infrastructure changes all require human review because small mistakes can have large consequences.',
      'When AI generates code I do not fully understand, I ask it to explain the assumptions, flow, failure cases, and alternatives. If I still cannot own the change, it should not ship.',
      'AI coding agents are force multipliers. They are dangerous shortcuts only when developers stop thinking and let the tool become the decision-maker.',
    ],
    takeaway:
      'AI coding agents are force multipliers for developers who provide context, recognize mistakes and take responsibility for the final system.',
  },
  {
    slug: 'ai-does-not-replace-architecture',
    number: '06',
    title: 'Why AI Does Not Replace Software Architecture',
    category: 'Architecture',
    summary:
      'AI can generate code quickly, but architecture still requires business context, operational ownership and trade-off decisions.',
    points: ['Trade-offs', 'Business rules', 'Operational risk', 'System context'],
    details: [
      'AI can generate controllers, services, models, tests, and infrastructure files quickly. That speed is useful, but it does not answer the larger question: what should the system become?',
      'Architecture depends on business priorities, team skills, operational risk, security boundaries, data ownership, future change, and acceptable complexity. Those decisions cannot be made correctly from syntax alone.',
      'AI optimizes for the prompt it receives. If the prompt is incomplete, the result may look technically reasonable while being wrong for the business, the team, or the operational environment.',
      'Most architecture decisions are trade-offs. Monolith versus microservices, SQL versus NoSQL, direct calls versus messaging, strong consistency versus eventual consistency, reusable abstraction versus straightforward duplication. There is rarely one perfect answer.',
      'Context matters. A design that makes sense for a large platform may be unnecessary for a small business application. A lightweight design that works for a prototype may not be enough for a regulated or payment-related workflow.',
      'Business rules are more important than patterns. Clean Architecture, CQRS, messaging, and domain-driven design are tools. They should support the business, not become the reason the application exists.',
      'Operational ownership is part of architecture. Someone must understand how the system is deployed, how failures are detected, how data is recovered, how schemas evolve, how costs are controlled, and how incidents are investigated.',
      'In my own work, the hard part is rarely just writing the endpoint. The hard part is deciding which operations should be asynchronous, how duplicates are prevented, what belongs in DynamoDB, which fields are safe for callbacks, and how logs allow production tracing.',
      'AI can accelerate implementation, but it cannot own the consequences when data is exposed, payments are duplicated, or deployments fail. Architecture still needs human responsibility.',
    ],
    takeaway:
      'AI can accelerate implementation, but architecture still requires human responsibility and deliberate trade-offs.',
  },
  {
    slug: 'clean-architecture-practical-view',
    number: '07',
    title: 'Clean Architecture: Helpful Discipline or Unnecessary Complexity?',
    category: 'Backend Design',
    summary:
      'Clean Architecture can improve maintainability, but too many layers can become ceremony when the project does not need them.',
    points: ['Thin controllers', 'Clear business logic', 'Earned abstractions', 'Behaviour-focused tests'],
    details: [
      'Clean Architecture can be a helpful discipline, but I do not believe every project needs the same number of layers, interfaces, repositories, commands, handlers, and mappings.',
      'The goal should be clear responsibility and testable business logic. If the codebase becomes harder to understand because the pattern was applied mechanically, the architecture is not helping.',
      'Clean boundaries are valuable in large applications, long-lived systems, projects with several developers, applications that integrate with external systems, and domains where business rules must remain independent from infrastructure.',
      'Controllers should remain thin. They should handle HTTP concerns such as routing, request binding, response codes, and authorization boundaries, not contain the entire business workflow.',
      'Business logic should have a clear home. Rules scattered across controllers, Angular components, database queries, and background workers become difficult to test and easy to break.',
      'Infrastructure boundaries matter where replacement or isolation is realistic. External providers, messaging systems, persistence, and HTTP clients often benefit from interfaces or adapters because they are operationally different from business rules.',
      'Where Clean Architecture goes wrong is ceremony. Small CRUD applications and early prototypes can become exhausting when every simple operation needs multiple nearly identical models, handlers, interfaces, and mappings.',
      'Abstractions should earn their place. An abstraction is useful when it isolates change, improves testing, reduces meaningful duplication, or represents a real business concept.',
      'I prefer starting with the simplest structure that keeps responsibilities clear. As the system grows, boundaries can become stronger. The diagram should serve the application, not the other way around.',
    ],
    takeaway:
      'Clean Architecture is valuable when it clarifies dependencies and responsibilities; it becomes harmful when the diagram matters more than the application.',
  },
  {
    slug: 'production-ready-portfolio-projects',
    number: '08',
    title: 'What Makes a Portfolio Project Feel Production-Ready',
    category: 'Portfolio Engineering',
    summary:
      'A strong portfolio project should show what happens after the happy path: validation, security, testing, deployment, observability and maintainability.',
    points: ['Real problem', 'Validation', 'Tests', 'Deployment docs'],
    details: [
      'A portfolio project does not need millions of users to show production thinking. It needs to show that the developer considered what happens after the happy-path demo.',
      'The project should solve a clear real-world problem. A hiring manager or developer should be able to understand why the application exists, what workflow it supports, and what trade-offs were made.',
      'A thoughtful README matters. It should explain the main components, request flow, data storage, external integrations, important design decisions, setup instructions, environment variables, API overview, test commands, known limitations, and future improvements.',
      'Validation is one of the first production signals I look for. The system should reject invalid input consistently and return useful errors rather than assuming every request is perfect.',
      'Authentication and authorization should be real. Protected features should not rely only on hidden frontend buttons. The backend needs to enforce access rules.',
      'Error handling should cover missing data, service failures, invalid states, and unexpected responses. A production-minded project does not collapse as soon as something outside the happy path happens.',
      'Observability matters even in portfolio work. Important operations should produce useful logs, and those logs should avoid secrets or sensitive data.',
      'Automated tests should cover meaningful behaviour: business rules, edge cases, failure paths, and important workflows. A few basic success-response tests are better than nothing, but they do not prove much by themselves.',
      'For suitable projects, async workflows can demonstrate deeper engineering skill: queues, background workers, retries, idempotency, dead-letter handling, and recovery paths.',
      'Deployment and documentation finish the story. Docker, CI/CD, setup instructions, and honest scope make the project easier to evaluate and more professional.',
      'A production-ready portfolio project is not the one with the most features. It is the one that demonstrates careful decisions and can be understood by someone other than its creator.',
    ],
    takeaway:
      'A production-ready portfolio project is not the one with the most features. It is the one that demonstrates careful decisions and honest scope.',
  },
];

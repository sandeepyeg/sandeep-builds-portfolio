# Content Guide

## Editing Biography Text

Open `src/app/core/data/portfolio.data.ts` and modify the `INTRODUCTION` object:

```typescript
export const INTRODUCTION = {
  heading: 'Your new heading',
  paragraphs: ['First paragraph text.', 'Second paragraph text.'],
};
```

## Adding Skills / Technologies

Update the `MARQUEE_TECH` array for the scrolling tech strip:

```typescript
export const MARQUEE_TECH: readonly string[] = [/* add here */];
```

Update capability technologies in the `CAPABILITIES` array.

## Adding Experience

Add entries to the `EXPERIENCE` array:

```typescript
export const EXPERIENCE: readonly ExperienceEntry[] = [
  {
    role: 'Title',
    company: 'Company',
    period: 'Jan 2024 – Present',
    location: 'City',
    description: '...',
    current: true,
  },
];
```

## Adding Education

Add entries to the `EDUCATION` array:

```typescript
export const EDUCATION: readonly EducationEntry[] = [
  { qualification: 'Diploma Name', institution: 'School Name' },
];
```

## Adding a Published Project

1. Build the real project with a working repository
2. Update the project in the `PROJECTS` array:
   ```typescript
   { slug: 'my-project', number: '04', title: 'My Project', status: 'published', /* ... */ }
   ```
3. Add a case study route in `app.routes.ts`
4. Update `sitemap.xml` with the new URL
5. Add metadata in the component's constructor via `MetadataService`

## Labeling Planned Projects

Use the `status` field:

- `'published'` — shows GitHub/demo links, appears in Featured Work
- `'in-development'` — appears only in Engineering Lab with "In Development" badge
- `'planned'` — appears only in Engineering Lab with "Planned" badge

## Replacing the Resume PDF

1. Save your resume as `SANDEEP JOHAL RESUME.pdf`
2. Place it in `public/documents/`
3. Set `HAS_RESUME_PDF = true` in `portfolio.data.ts`

The Download Resume button will appear automatically in the hero section.

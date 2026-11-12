# Joshua Madulid — IT Portfolio

Next.js portfolio with Home, About Me, Education, Technical Skills, Projects, Certifications, Experience & Accomplishments, and Contact.

The runnable application is this directory, my-portfolio/ within the Git repository. The repository-level app/, components/, and lib/ folders are legacy scaffold files and are not used by this Next.js build.

## Run locally

From this directory:

```powershell
npm ci
npm run dev
```

Open the Local URL printed by Next.js.

## Production checks

```powershell
npx tsc --noEmit
npm run build
npm run start
```

Vercel should continue to use my-portfolio as its Root Directory within the Git repository.

## Content and screenshots

- lib/data.ts: projects, skill groups, experience timeline, certificate records, and LinkedIn URL.
- components/About.tsx: introduction and career objective.
- components/Education.tsx: NEUST degree, specialization, and years/status.
- components/Timeline.tsx: work immersion, programming journey, and accomplishments.
- app/projects/[slug]/page.tsx: project detail pages and screenshot captions.
- public/images/projects/: project covers and two real screenshots per project (including Figma exports for ATOM AI).
- app/certifications/page.tsx: all existing certificates.

Read [PORTFOLIO_REVIEW.md](PORTFOLIO_REVIEW.md) for the complete TODO checklist, link findings, security scope, validation results, and changed files.

No dependency or deployment-account changes were required.

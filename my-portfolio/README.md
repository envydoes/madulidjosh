# Joshua Madulid — IT Portfolio

Next.js portfolio with Home, About Me, Technical Skills, Projects, Certifications, Experience & Accomplishments, and Contact.

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

- lib/data.ts: projects, skill groups, education timeline, certificate records, and LinkedIn URL.
- components/About.tsx: introduction, objective, and education.
- components/Timeline.tsx: accomplishments.
- app/projects/[slug]/page.tsx: project detail pages and screenshot captions.
- public/images/projects/: project covers and the two numbered screenshot slots per project.
- app/certifications/page.tsx: all existing certificates.

Read [PORTFOLIO_REVIEW.md](PORTFOLIO_REVIEW.md) for the complete TODO checklist, link findings, security scope, validation results, and changed files.

No dependency or deployment-account changes were required.

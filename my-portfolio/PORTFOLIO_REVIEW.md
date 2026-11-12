# Portfolio review — November 13, 2026

The initial portfolio update was committed to envydoes/madulidjosh as 2799a4e. This follow-up separates Education, adds resume experience, simplifies the role title, and completes the screenshot galleries. The selected workspace contained only incomplete Git metadata, so the current repository was cloned into its my-portfolio subdirectory. The runnable Next.js application is the nested my-portfolio folder. This report records the implementation and local validation.

## Implemented

- Navigation: Home, About Me, Education, Technical Skills, Projects, Certifications, Experience & Accomplishments, Contact.
- About Me: professional introduction and career objective. Education is now a separate section with NEUST, degree, Web Systems Technology specialization, and 2023–present / Graduating status.
- The hero, page title, and footer now use Web Developer.
- Education and Experience & Accomplishments use open layouts without card containers.
- All 16 existing toolkit entries retained and grouped into the five requested categories.
- Four project pages with descriptions, objectives, technologies, source/demo controls, and two real screenshots each. SumEste and Aurora contributions are filled from the supplied resume; Unbounded and ATOM contributions remain TODO until confirmed. Screenshot links open the original at full size; ATOM uses a portrait layout.
- Education and the original programming entry retained. Work Immersion at the Business Permits and Licensing Office (2023), including the three responsibilities in the resume, added to Experience. Dean’s Lister semesters retained.
- Three home-page certificates retained; /certifications now lists all eight records already in the repository.
- Certificate dialogs have a close control, Escape handling, modal focus containment, and focus restoration.
- Email and GitHub remain prominent. LinkedIn is a non-clickable TODO until its actual URL is provided. Facebook and Instagram are in the footer.
- Page metadata, alt text, skip link, reduced-motion support, and responsive navigation updated.
- Production builds now validate TypeScript. Existing typing problems in Hero, SmoothScrollProvider, and ScrollShowcase were fixed.
- Fonts, light palette, rounded cards/pills, outline name treatment, and entrance animations retained.

## Every remaining content TODO

Edit profile/project fields in lib/data.ts.

- [ ] Add your LinkedIn profile URL to profile.linkedin.
- [ ] Unbounded: write your individual role and contribution.
- [ ] ATOM AI: write your contribution to screens, user flows, and design decisions.
- [ ] Restore SumEste hosting or provide another working demo URL; then remove liveUnavailable.
- [ ] Correct Aurora’s GitHub URL or restore public repository access; then remove sourceUnavailable.
- [ ] Add Aurora’s live site or recorded demo URL.
- [ ] Add ATOM AI’s GitHub URL, or confirm it is design-only and replace the source TODO with that explanation.
- [ ] Add other completed accomplishments, seminars, or contests with dates and your role in components/Timeline.tsx.

Screenshot captions are maintained in app/projects/[slug]/page.tsx. All eight screenshot slots now contain real captures or direct Figma screen exports with descriptive alt text; no screenshot placeholders remain.

## Broken links found and handling

| Existing destination | Observed result | Change |
| --- | --- | --- |
| https://sum-este-portal.digital | HTTP 530 | Preserved URL in project data; disabled offline demo control with a restore/demo TODO. Cards now open working local detail pages. |
| https://sum-este-portal.digital/uploads/site/sitelogo_8ba5ce5e050ec6c3.png | HTTP 530 | Replaced remote image with the real local SumEste hero capture. |
| https://github.com/envydoes/aurora | HTTP 404 | Preserved URL in project data; disabled source control with a correction/access TODO. |
| https://raw.githubusercontent.com/envydoes/aurora/main/images/logo.png | HTTP 404 | Replaced with a local capture of Aurora’s original landing hero. |

Unbounded’s live site and repository, the SumEste repository, the GitHub profile, ATOM’s Figma URL, Facebook, Instagram, and both existing credential URLs responded HTTP 200. HTTP success does not independently verify login-gated content, credential authenticity, or Figma sharing permissions.

The old “View all certifications” control was an in-page toggle, not a broken URL. It is now a real /certifications page. Missing LinkedIn, Aurora demo, and ATOM source URLs are explicit TODOs, not dummy links.

## Updated project covers

public/images/projects/sumeste-portal-1.png now captures the third carousel photo (the Sumacab Este barangay hall). This is slide 4 overall because the green introduction is slide 1. The three original uploaded hero photographs were restored in the local preview. Their order was recovered read-only from local carousel metadata, matching the source’s sort_order-then-id ordering: hero_85907524f8ee9ba6.jpg, hero_324815d81d6c2272.jpg, hero_9ea1dfe949809fd6.jpg.

The SumEste capture uses the original landing.php at commit 891875d, the original photo assets, default site settings, and compiled Tailwind CSS. public/images/projects/sumeste-portal-2.png preserves the previous green introduction capture as the second actual screenshot.

public/images/projects/aurora-1.png is a capture of the original Aurora index.php header and hero at commit 78d8d51, with its original CSS, logo, and Dingalan coastal photograph. Aurora’s source was accessible through the existing Git connection; its public GitHub URL still returned HTTP 404, so the public-access TODO remains.

Both covers are applied to the home-page project cards and detail pages, with updated alt text and captions. Only screenshot assets were added to the portfolio. No resident records, booking data, credentials, or verification uploads were copied. The isolated Aurora preview renders the original static landing content through the Rooms section; it does not connect to the booking backend. The SumEste resident count remains unavailable rather than invented. The upstream SumEste and Aurora repositories were not modified.

## Latest content and screenshot sources

- Work Immersion and SumEste/Aurora contributions were transcribed from the supplied Joshua_Madulid_Resume.pdf. The resume itself, home address, and phone number were not copied into the portfolio. The education status follows the user’s explicit 2023–present / Graduating wording.
- Unbounded: live hero and product collection captured from the existing demo URL, which redirects to https://unboundedclo.vercel.app/. The original demo URL remains valid and unchanged.
- Aurora: second screenshot now shows the original Rooms section rendered locally with its original styles and public image assets. No bookings or credentials were accessed for the capture.
- ATOM AI: screenshots exported directly from Figma file W3NBVeRn7wP39e3Y5dC1jh, Login node 0:304 and chat node 1308:2274. The user’s Figma prototype remains the working demo link. Its login controls are part of the interface design, not evidence of a deployed authentication backend.
- Providing the Figma link does not identify an ATOM GitHub repository or personal contribution, so those TODOs remain explicit.

## Verification

Latest follow-up checks:

- Production build and TypeScript validation passed.
- npm run lint passed without warnings or errors.
- Homepage and all four project pages checked at 375px, 768px, and 1280px: no horizontal overflow or missing image alt text; each project has two screenshots.
- Mobile navigation opens and closes after selecting Education or Experience; both sections remain separate from About Me.
- Desktop Education and Experience use open layouts; portrait ATOM screenshots retain their proportions and open at full size.

Earlier full rubric verification (before this follow-up):

- npm run build: passed, including TypeScript validation and static generation of all project pages.
- npx tsc --noEmit: passed.
- git diff --check: passed.
- Browser measurements: all six pages at 375px, 768px, and 1280px; no horizontal overflow and no missing image alt text.
- Visually reviewed desktop hero and project cards, mobile hero/About/skills/project detail, tablet education/certification dialog, and contact/footer.
- Mobile navigation opens and closes on selection; links from project pages reach the correct home sections.
- Certificate dialog: opened, Escape closes it, focus returns to the selected certificate.
- All six local routes return HTTP 200; unknown project route returns HTTP 404.
- Twenty local image/CV resources return HTTP 200. No empty links or missing local anchor targets found.
- Portfolio browser console: no application errors observed. The isolated SumEste preview has an existing map initialization error below the captured hero; the screenshot is unaffected.
- Browser verification used the device’s existing reduced-motion preference.

## Security scope and outstanding repository review

No API keys, passwords, private-key files, environment files, or database dumps were detected by the portfolio working-tree checks. The existing public CV and professional certification assets were preserved. This is a source/static-file check, not a guarantee about all remote repositories or Git history.

- [ ] Review the 112 files tracked under uploads/id_verification in the separate SumEste repository before sharing its source link. Their contents were not opened; the directory could contain private identity documents. If private, remove them from public access and address repository history. No such files were copied into this portfolio.
- [ ] Complete that separate repository privacy review before treating the overall “no private data anywhere” requirement as verified.

## Files changed in this follow-up

Paths below are relative to the recovered Git repository.

- components/Hero.jsx
- lib/data.ts
- my-portfolio/README.md
- my-portfolio/PORTFOLIO_REVIEW.md
- my-portfolio/app/layout.tsx
- my-portfolio/app/page.tsx
- my-portfolio/app/projects/[slug]/page.tsx
- my-portfolio/components/About.tsx
- my-portfolio/components/Education.tsx (new)
- my-portfolio/components/Footer.tsx
- my-portfolio/components/Hero.tsx
- my-portfolio/components/Nav.tsx
- my-portfolio/components/Timeline.tsx
- my-portfolio/lib/data.ts
- my-portfolio/public/images/projects/unbounded-1.png
- my-portfolio/public/images/projects/unbounded-2.png
- my-portfolio/public/images/projects/aurora-2.png
- my-portfolio/public/images/projects/atom-ai-design-1.png
- my-portfolio/public/images/projects/atom-ai-design-2.png

## Cumulative files changed for the rubric task

The following paths are relative to the recovered Git repository (one level above this report). The runnable app is my-portfolio/.


- components/Hero.jsx
- lib/data.ts
- my-portfolio/PORTFOLIO_REVIEW.md
- my-portfolio/README.md
- my-portfolio/app/certifications/page.tsx
- my-portfolio/app/globals.css
- my-portfolio/app/layout.tsx
- my-portfolio/app/page.tsx
- my-portfolio/app/projects/[slug]/page.tsx
- my-portfolio/components/About.tsx
- my-portfolio/components/Certifications.tsx
- my-portfolio/components/Education.tsx
- my-portfolio/components/Contact.tsx
- my-portfolio/components/Footer.tsx
- my-portfolio/components/Hero.tsx
- my-portfolio/components/Nav.tsx
- my-portfolio/components/ProjectGrid.tsx
- my-portfolio/components/ProjectImage.tsx
- my-portfolio/components/ProjectLinks.tsx
- my-portfolio/components/ScrollShowcase.tsx
- my-portfolio/components/TechMatrix.tsx
- my-portfolio/components/Timeline.tsx
- my-portfolio/lib/SmoothScrollProvider.tsx
- my-portfolio/lib/data.ts
- my-portfolio/next.config.ts
- my-portfolio/public/images/projects/atom-ai-design-1.png
- my-portfolio/public/images/projects/atom-ai-design-2.png
- my-portfolio/public/images/projects/aurora-1.png
- my-portfolio/public/images/projects/aurora-2.png
- my-portfolio/public/images/projects/sumeste-portal-1.png
- my-portfolio/public/images/projects/sumeste-portal-2.png
- my-portfolio/public/images/projects/unbounded-1.png
- my-portfolio/public/images/projects/unbounded-2.png
- my-portfolio/public/images/projects/unbounded-cover.webp

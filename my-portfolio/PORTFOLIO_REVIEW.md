# Portfolio review — November 13, 2026

The portfolio was updated locally from envydoes/madulidjosh at commit 66e3f0c. The selected workspace contained only incomplete Git metadata, so the current repository was cloned into its my-portfolio subdirectory. The runnable Next.js application is the nested my-portfolio folder. This report records the implementation and local validation.

## Implemented

- Navigation: Home, About Me, Technical Skills, Projects, Certifications, Experience & Accomplishments, Contact.
- About Me: professional introduction, career objective, NEUST education, graduating status, and Web Systems Technology wording.
- All 16 existing toolkit entries retained and grouped into the five requested categories.
- Four project pages with descriptions, objectives, technologies, contribution TODOs, source/demo controls, and two screenshot slots each.
- Original education and programming entries retained; supplied Dean’s Lister entries added.
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
- [ ] SumEste: write your capstone role, implemented modules, and individual contribution within the team.
- [ ] Aurora: write your role and the features you designed or developed.
- [ ] ATOM AI: write your contribution to screens, user flows, and design decisions.
- [ ] Restore SumEste hosting or provide another working demo URL; then remove liveUnavailable.
- [ ] Correct Aurora’s GitHub URL or restore public repository access; then remove sourceUnavailable.
- [ ] Add Aurora’s live site or recorded demo URL.
- [ ] Add ATOM AI’s GitHub URL, or confirm it is design-only and replace the source TODO with that explanation.
- [ ] Add other completed accomplishments, seminars, contests, or internship/OJT entries with dates and your role in components/Timeline.tsx.
- [ ] Replace public/images/projects/unbounded-1.png and update its screenshot alt text/caption.
- [ ] Replace public/images/projects/unbounded-2.png and update its screenshot alt text/caption.
- [ ] Replace public/images/projects/aurora-2.png and update its screenshot alt text/caption.
- [ ] Replace public/images/projects/atom-ai-design-1.png and update its screenshot alt text/caption.
- [ ] Replace public/images/projects/atom-ai-design-2.png and update its screenshot alt text/caption.

Screenshot captions are currently generated in app/projects/[slug]/page.tsx. Remove the relevant TODO wording when replacing each placeholder. Both SumEste screenshots and Aurora’s first screenshot are now real local captures, with accurate captions. Five screenshot placeholders remain.

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

Both covers are applied to the home-page project cards and detail pages, with updated alt text and captions. Only screenshot assets were added to the portfolio. No resident records, booking data, credentials, or verification uploads were copied. The separate Aurora preview serves only the original header and hero; it does not restore the booking backend. The SumEste resident count remains unavailable rather than invented. The upstream SumEste and Aurora repositories were not modified.

## Verification

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

## Changed files

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

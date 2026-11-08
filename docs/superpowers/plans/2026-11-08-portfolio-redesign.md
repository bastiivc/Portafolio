# Portfolio redesign implementation plan

**Goal:** Apply the visual direction approved in chat to the existing portfolio.
**Architecture:** A server-rendered page with native anchor navigation and small client islands for theme, repository search, credential filters and the existing contact form. Preserve existing data and API contracts.
**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, CSS.
**Spec:** User-approved proposal in this chat: dark identity, terminal details, natural scrolling, visual projects, labeled navigation, concise introduction, responsive layout and reduced motion.

## Constraints and decisions
- Work in the requested C:/Code/Portafolio checkout; no deployment or dependency changes.
- No CV asset is available: use contact as secondary CTA rather than a broken download.
- Use clearly labeled conceptual project diagrams where screenshots are unavailable; do not invent results or statistics.
- Keep every experience, education and credential accessible through progressive disclosure.
- Reuse the existing contact delivery flow; do not send test messages.

## Tasks
- [x] Replace window/dock page composition with server-rendered sections and labeled sticky navigation; implement light theme, focus states and reduced-motion styling.
- [x] Build three curated project presentations with problem/contribution detail; retain searchable GitHub catalog with loading, empty and error states.
- [x] Present technical experience first, compact skills and filterable credentials; preserve older content in disclosures.
- [x] Integrate existing contact form, associate its labels and retain delivery behavior.
- [x] Run TypeScript, production build and browser checks at desktop/mobile: anchors, disclosures, filters, keyboard, theme and overflow. Review changed TSX with React best-practice guidance.

## Review focus
- Narrow screens: no horizontal overflow or nested page scrolling.
- Keyboard: navigation, disclosures and form fields have visible focus and names.
- External API failure: static featured projects remain usable.
- Reduced motion: content visible without entrance-animation dependency.
- No real messages sent during verification.


## Verification results
- Production build: passed with Next.js 16.2.11; all six static pages generated.
- TypeScript: `npx tsc --noEmit` passed.
- `git diff --check`: passed; Git emitted only CRLF conversion notices.
- Browser: anchors, project disclosures, repository search (MARC), Cloud/DevOps credential filter (2 results), credential details and light/dark theme passed.
- Final layout widths: viewport/scrollWidth 1265/1265 desktop, 375/375 at 390px and 305/305 at 320px (scrollbar accounts for 15px).
- Four contact fields have associated labels; no messages submitted.
- Reduced-motion CSS disables animations/transitions and smooth scrolling; manually reviewed, not emulated in the browser.
- Development preview hit an environment-specific Turbopack child-process error; production preview serves successfully at http://localhost:3002.
- No deployment, push, dependency edits or CV download added.

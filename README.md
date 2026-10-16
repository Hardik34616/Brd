# Bhasha BRD

A responsive, animation-rich landing page based on `../reference.jpeg`, with original interactions inspired by Wispr Flow.

## Run locally

Requires Node.js 20.9 or newer.

```sh
npm install
npm run dev
```

On Windows PowerShell, use `npm.cmd` if your execution policy blocks `npm.ps1`. Open http://localhost:3000.

## Checks

```sh
npm run typecheck
npm run lint
npm run build
npm run test:e2e
```

Browser tests expect the local server at port 3000 and use installed Microsoft Edge. Change `channel` in `playwright.config.ts` to use another installed browser. Screenshots are written to the ignored `artifacts/` directory.

## Design and implementation

- Next.js App Router, TypeScript, Tailwind CSS, and self-hosted Instrument Serif / Manrope fonts.
- GSAP ScrollTrigger owns desktop scroll choreography. Motion handles state-driven demo transitions. CSS owns ambient waveform and floating motion. Each system acts on separate elements.
- Lenis integrates with the GSAP ticker and is cleaned up on unmount. All scroll effects use scoped contexts and media-query cleanup.
- Mobile and reduced-motion visitors receive a sequential transformation story. Essential content is server rendered.
- Input examples, six language samples, clarification answers, readiness scoring, use-case selection, and the native comparison slider use local React state. No microphone, upload, authentication, or AI service is connected.
- Readiness is explicitly illustrative: base 50%, plus 25% for a selected clarification and 25% for example acceptance criteria.
- Start buttons open an accessible native dialog with a downloadable Markdown sample. Set `NEXT_PUBLIC_APP_URL` before building to route them to a real application later.
- Next.js static export is written to `out/`. The Sites manifest declares that directory for hosting.

## Organization

`components/landing/` contains section components and shared primitives. `components/animations/MotionProvider.tsx` owns global scroll integration. `app/globals.css` defines design tokens, responsive compositions, ambient motion, and accessibility fallbacks. `public/sample-brd.md` is the downloadable example.

The original repository files and reference image are preserved. No fabricated testimonials, customer logos, or product performance claims are included.

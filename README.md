# Shivansh Gupta — Portfolio

A playful "manila folder" themed portfolio for **Shivansh Gupta** — founder, AI & full-stack engineer with a cloud/DevOps streak. Built with Next.js 16, React 19 and Tailwind CSS v4.

## Run it

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

- `app/page.tsx` — the folder shell, tabs, footer and the "scotched" photo
- `app/components/sections/` — the four tab panels:
  - `AboutSection` — bio, work experience, leadership
  - `SkillsSection` — skills + education
  - `ProjectsSection` — projects grouped by category (Machine Learning Core · Applied AI & Agentic Products · Systems & Open Source)
  - `ContactSection` — socials + EmailJS contact form
- `app/components/` — shared UI (`Card`, `Timeline`, `CategoryDivider`, `Avatar`, `Monogram`, …)

## Swapping the profile photo

The headshot lives at `public/profile.jpg` and is used by both `Avatar` (About tab) and the
scotched photo on the folder front (`app/page.tsx`). To change it, just replace that file. To go
back to the initials placeholder, set `HAS_PHOTO = false` in `app/components/Avatar.tsx`.

## Contact form (EmailJS)

`ContactForm` uses [EmailJS](https://www.emailjs.com/). Set these env vars in `.env.local`:

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=...
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=...
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=...
```

## Deploy

Deploys cleanly to [Vercel](https://vercel.com/new) (`npm run build`).

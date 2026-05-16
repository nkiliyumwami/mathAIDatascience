# Applied AI Prep Study App

A production-ready React + Vite + Tailwind single-page app for beginners preparing for an Applied AI & Data Science program.

The app focuses on the practical bridge between math, probability, descriptive statistics, Python, and machine learning. It is built for learners who are new to the subject and need a guided sequence instead of a static notes page.

## Features

- Home and overview section
- Module navigation with five structured learning modules
- Per-module learning flow:
  - The Story
  - The Idea
  - Concrete Example
  - Python Lab
  - Check Yourself prompts with show/hide answers
  - Mini-Project
- Interactive progress tracking with `localStorage`
- Interactive Bayes Rule calculator
- Study schedule with trackable weekly tasks
- Final practice quiz
- Responsive layout for desktop and mobile
- Cloudflare Pages compatible build output

## Tech stack

- React
- Vite
- TypeScript
- Tailwind CSS

## Local setup

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

## Local preview of production build

Build the app:

```bash
npm run build
```

Preview the built app locally:

```bash
npm run preview
```

The production files are generated in `dist/`.

## Cloudflare Pages deployment

Use these settings in Cloudflare Pages:

- Framework preset: `Vite`
- Build command: `npm run build`
- Build output directory: `dist`

## Notes

- Progress and study checklist state are stored in the browser with `localStorage`.
- The project uses no backend, no paid APIs, and no external database.

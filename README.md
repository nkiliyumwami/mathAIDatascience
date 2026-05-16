# Maths & Stats Behind Data Science and AI

A React + Vite + Tailwind single-page study app based on `REFERENCE_APP.jsx`, preserving the math-heavy course modules, formulas, Bayes calculator, Python labs, quiz, notes, and progress tracking.

## Setup

```bash
npm install
```

## Local development

Standard Vite dev server:

```bash
npm run dev
```

For GitHub Codespaces or any remote environment:

```bash
npm run dev -- --host 0.0.0.0
```

## Codespaces note

This project expects a modern Node runtime. If Codespaces starts Vite with an older Node version, you may see an error like:

```bash
TypeError: crypto.getRandomValues is not a function
```

Check your Node version first:

```bash
node -v
```

If it is older than Node 20, switch to a newer version before running the app:

```bash
nvm install 22
nvm use 22
npm install
npm run dev -- --host 0.0.0.0
```

## Production build

```bash
npm run build
```

The build output is written to `dist/`.

## Cloudflare Pages

Use these settings:

- Build command: `npm run build`
- Output directory: `dist`
- Framework preset: `Vite`

## Features

- Math-heavy course modules with story, idea, example, Python lab, checks, and mini-projects
- Bayes Rule calculator with correct posterior probability calculation
- LocalStorage-backed progress tracking
- LocalStorage-backed notes
- Revealable final quiz answers
- Polished study schedule layout
- Responsive React + Tailwind UI

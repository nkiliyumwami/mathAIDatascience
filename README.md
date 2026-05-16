# AI Primer: The Must-Know Mathematics & Statistics Behind AI

A polished React + TypeScript + Tailwind learning app for complete beginners. The course teaches probability, descriptive statistics, and matrices through interactive simulations, editable datasets, matrix exercises, refugee-resettlement-inspired fictional scenarios, and a 30+ exercise practice system.

## Stack

- React
- TypeScript
- Tailwind CSS
- shadcn/ui-style local component system
- Recharts
- Framer Motion
- Lucide icons

## Local setup

```bash
npm install
```

## Development

Run locally:

```bash
npm run dev
```

Run in GitHub Codespaces or another remote container:

```bash
npm run dev -- --host 0.0.0.0
```

## Codespaces runtime note

This project needs a modern Node runtime. If you see:

```bash
TypeError: crypto.getRandomValues is not a function
```

switch to Node 22 first:

```bash
node -v
nvm install 22
nvm use 22
npm install
npm run dev -- --host 0.0.0.0
```

## Production build

```bash
npm run build
```

The production build outputs to `dist/`.

## Cloudflare Pages

Use these settings:

- Framework preset: `Vite`
- Build command: `npm run build`
- Output directory: `dist`

## What the app includes

- Welcome onboarding with learner-profile selection
- Foundations Before the Math
- Probability module with simulator, scenario explorer, sorting exercises, and guided checks
- Descriptive Statistics module with editable datasets, live calculations, outlier toggle, and charts
- Matrices module with row/column highlighting, conversion demos, and matrix builder
- Applied AI Connections section
- Refugee-resettlement-focused fictional use cases
- Practice Zone with 30+ exercises total across the app
- Q&A / misconceptions accordion
- Next Steps roadmap
- Progress tracking and learner notebook saved in localStorage

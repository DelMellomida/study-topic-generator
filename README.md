# Study Topic Generator

A focused study dashboard for drawing one learning prompt at a time. The app builds a shuffled pool from the full local topic bank, lets you draw or skip prompts, tracks progress through the current pool, and includes a one-hour deep work timer.

## Features

- Random topic drawing from the full local subject pool
- Animated "choosing" state before each draw
- Skip flow that returns the current topic to the pool
- Progress stats for remaining, studied, and total topics
- One-hour timer with start, pause, and reset controls
- Light and dark workspace themes
- Local session persistence through `localStorage`

## Tech Stack

- [Next.js](https://nextjs.org/) 16
- [React](https://react.dev/) 19
- TypeScript
- Tailwind CSS 4
- ESLint

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

```bash
npm run dev
```

Runs the local Next.js development server.

```bash
npm run build
```

Creates a production build.

```bash
npm run start
```

Starts the production server after a build.

```bash
npm run lint
```

Runs ESLint.

## Project Structure

```text
app/
  page.tsx          Main study dashboard
  globals.css       App styling and responsive layout
components/
  PoolStats.tsx     Topic pool progress panel
  Timer.tsx         Focus timer panel
  TopicCard.tsx     Current topic and draw controls
data/
  topics.json       Local subject/topic bank
hooks/
  useLocalStorage.ts
  useTimer.ts
lib/
  sampling.ts       Pool creation, draw, skip, and shuffle helpers
types/
  index.ts          Shared TypeScript types
tickets/
  STUDY-001-build-study-topic-generator-ui.md
```

## Topic Data

Topics live in `data/topics.json` as a map of subject names to topic lists. The initial pool includes every topic in the bank, then shuffles the combined result. With the current data, that gives you 408 prompts, enough for at least one topic per day for a full year.

To add or update topics, edit `data/topics.json` and keep the same shape:

```json
{
  "Subject": [
    "Topic one",
    "Topic two"
  ]
}
```

## State Model

The app stores study progress in browser `localStorage` under the `study-topic-state-v2` key. Resetting the topic pool rebuilds a fresh shuffled pool from the current topic data and clears the session count.

---
id: STUDY-001
title: Build study topic generator UI
status: in-review
type: feature
labels: [ui, study]
priority: p1
assignee: claude
created: 2026-09-27
updated: 2026-09-27
---

## Description

Build the client-facing study topic generator experience on top of the existing topic data, sampling helpers, local-storage hook, and timer hook. The scope is the UI layer: topic drawing, topic cards, session timer, pool statistics, responsive styling, and accessible controls.

Out of scope: backend persistence, authentication, new topic content, and changes to the data model.

## Acceptance Criteria

- [ ] The home page presents a responsive study topic generator dashboard.
- [ ] Users can draw a topic, skip the current topic, and reset the pool.
- [ ] The timer supports start, pause, and reset controls.
- [ ] Pool statistics show remaining, studied, and total topics.
- [ ] Study state persists through the existing local-storage hook.
- [ ] The UI passes the project lint and build checks.

## Plan

1. Add focused TopicCard, Timer, and PoolStats components.
2. Assemble the client dashboard in `app/page.tsx` using the existing data and helpers.
3. Establish the visual system and responsive layout in `app/globals.css`.
4. Run lint and production build checks.

## Progress Log

- 2026-09-27 - Ticket created and approved before implementation. UI work started.
- 2026-09-27 - Dashboard, reusable UI components, local persistence, timer controls, responsive styling, lint, and production build completed. Ready for review.
- 2026-09-27 - Added a requested animated topic-picking phase before each draw.
- 2026-09-27 - Added an explicit light/dark theme toggle to the study workspace.
- 2026-09-27 - Fixed dark-mode contrast for panel text, secondary copy, and primary controls. Lint and production build pass.

## Notes

- The repository had no ticket-kit setup; this ticket establishes the `STUDY` prefix and index.
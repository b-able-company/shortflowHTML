# Shortflow AI Studio — concept mockup

Static React mockup with a precompiled production bundle.

## Build and deploy

```sh
npm ci
npm run build
npm test
```

Deploy **the contents of `dist/`** to a static web host. Keep `index.html`, `assets/`, `css/` and `public/` together. Do not deploy `node_modules/`. For a local preview, serve this folder or `dist/` with an HTTP server.

React 18, ReactDOM and BorderBeam are bundled locally; JSX is compiled before deployment. Lucide icons are local too. Optional web fonts still use a CDN, with system-font fallback and `font-display: swap`.

After editing JS, run `npm run build` again. The build also refreshes the root preview and adds a bundle version to avoid a stale JS cache. Configure the host to revalidate `index.html` and CSS (Cache-Control: no-cache); enable gzip/Brotli. Deploy the folder atomically where supported.

`npm test` runs DOM smoke tests against the production bundle: project routes, production tabs, episode selections, the new-project flow, repeated navigation, blocked/corrupt storage, recovery UI and media paths. It does not measure GPU frame rate or real-device performance.

This is still a **concept mockup**: project creation and production progress are in memory and reset on reload. There is no backend video generation or durable project storage. Only the route is stored locally.

## Structure
```
shortflow-ai-studio/
├── index.html                 entry — loads CSS, data, components, screens, app (in that order)
├── css/
│   ├── variables.css          ALL design tokens (--color-*, --type-*, --space-*, --radius-*, shadows, motion)
│   ├── base.css               fonts, resets, page layout, shared text classes, keyframes
│   ├── components.css         buttons, tabs, inputs, dialog, tag, status badge, progress, media frame, poster…
│   ├── sidebar.css            sidebar, project switcher, credit balance
│   ├── home.css               Studio Home (+ opportunity/project tiles reused elsewhere)
│   ├── project.css            Project Overview
│   ├── production.css         Upload → Preparing → Production workspace → cost checkpoint
│   ├── episodes.css           Episodes: progress, player, scene remake
│   ├── opportunities.css      Opportunities list/detail, Projects list
│   ├── distribution.css       Distribution (studio + per project)
│   └── dialogs.css            New project / Submit dialogs
├── js/
│   ├── mock-data.js           every piece of content (projects, episodes, scenes, characters, credits, prices)
│   ├── components.js          reusable UI (window.UI)
│   ├── sidebar.js             Sidebar + Page / Kicker / SectionHead helpers
│   ├── dialogs.js             NewProjectDialog, SubmitDialog
│   ├── app.js                 routing, state, simulated production, canvas scaling
│   └── screens/
│       ├── home.js
│       ├── project-overview.js
│       ├── production-start.js   Upload script + AI preparing
│       ├── production.js         Characters · Scene plan/previews · Look & mood · checkpoint (+ scene & character modals)
│       ├── episodes.js
│       ├── opportunities.js      Opportunities, Opportunity detail, Projects
│       └── distribution.js
└── assets/images/             drop real images here
```

## Editing tips
- Change a color/size everywhere → `css/variables.css`.
- Change copy or numbers → `js/mock-data.js` (or the screen file for UI labels).
- Find a screen's markup → `js/screens/<screen>.js`; its styles → `css/<screen>.css` (class names match, BEM-style: `.episode-card__title`).
- Inline `style` is used only for runtime values passed as CSS custom properties (generated placeholder art, progress %, icon size, project hue, canvas zoom).
- JSX is compiled by esbuild with `npm run build`. Source files remain IIFEs and expose shared components on `window`.
- Credit prices: `SF.pricing` (scene preview per scene, scene remake) and `SF.prod.summary.credits` (final videos).

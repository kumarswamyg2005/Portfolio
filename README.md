# kumaraswamy.dev

Personal portfolio — one page, dressed as an arcade game. The game layer is
the frame, never the content: every fact is plain HTML in reading order, so a
recruiter skimming for ten seconds never has to "play" anything.

## Stack

React 18 · Vite 5 · plain CSS · react-icons · three.js (hero only, lazy-loaded).

The hero's arcade cabinet ([`src/three/cabinet.js`](src/three/cabinet.js)) is
built from primitives — no model files — rendered at low resolution and passed
through one ordered-dither shader for the pixel look. Its screen plays a demo of
Perimeter counting to 213/213. The chunk loads after first paint, the render
loop stops when the cabinet is off-screen or the tab is hidden, reduced motion
gets a still frame, and browsers without WebGL get `public/cabinet.png`.

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run preview
```

## Where the content lives

Everything is colocated with the component that renders it — no data layer.

| What | File |
|------|------|
| Name, pitch, hero links, hi-scores | [`src/components/Intro.jsx`](src/components/Intro.jsx) |
| The 3D cabinet (wrapper / scene) | [`Cabinet.jsx`](src/components/Cabinet.jsx) / [`src/three/cabinet.js`](src/three/cabinet.js) |
| Internships ("save slots") | [`src/components/Experience.jsx`](src/components/Experience.jsx) |
| Featured projects + side quests | [`src/components/Projects.jsx`](src/components/Projects.jsx) |
| Perimeter benchmark ("boss fight") | [`src/components/Benchmark.jsx`](src/components/Benchmark.jsx) |
| Perimeter / DesignDen diagrams | [`src/components/Diagrams.jsx`](src/components/Diagrams.jsx) |
| Stack inventory, About, character sheet | [`src/components/About.jsx`](src/components/About.jsx) |
| Contact ("Continue?"), email, GitHub, LinkedIn, résumé | [`src/components/Footer.jsx`](src/components/Footer.jsx) — `LINKS` |

The four hi-score numbers repeat figures from the projects; if a project number
changes, change it in `SCORES` too (and in the console note in `App.jsx`).

## Design system

Tokens are at the top of [`src/index.css`](src/index.css). Night is the
default, so `:root` *is* the dark palette and `:root[data-theme="light"]`
(the "game manual") overrides it; `T` toggles. One accent, coin gold; green
and red are status colours only.

- **Type:** Jersey 10 for display (never below ~26px), Geist for reading,
  Geist Mono for labels and data.
- **Frames:** `.frame` draws the notched 8-bit border with four box-shadows,
  so focus outlines are never clipped.
- **Contrast:** every text token clears WCAG AA (4.5:1) on every surface it
  sits on, in both themes. Re-check if you change a colour.

## Adding a project screenshot

Drop the image in `public/work/` and reference it from the project's `shots`
array in `Projects.jsx`, alongside a `caption` for the figure as a whole:

```js
shots: [
  { src: '/work/my-project.png', w: 1600, h: 900, alt: 'What the screen shows.' },
],
caption: 'One line on what the reader is looking at.',
```

`w`/`h` are the file's real pixel dimensions (`sips -g pixelWidth -g pixelHeight
file.png`) so the page doesn't reflow as images load. Keep images ≤1600px wide.

## Résumé and share image

`public/resume.pdf` — replace the file to update the link. `public/og.png` is
the 1200×630 link preview, a capture of the hero.

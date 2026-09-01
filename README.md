# kumaraswamy.dev

Personal portfolio — one page, project-first.

## Stack

React 18 · Vite 5 · plain CSS · react-icons. No CSS framework, no animation
library: the only motion is a fade-in driven by one `IntersectionObserver` in
[`src/App.jsx`](src/App.jsx), and the theme is CSS custom properties on
`:root[data-theme]`.

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
| Headline, bio, links | [`src/components/Intro.jsx`](src/components/Intro.jsx) |
| Internships | [`src/components/Experience.jsx`](src/components/Experience.jsx) |
| Featured projects + "Also built" list | [`src/components/Projects.jsx`](src/components/Projects.jsx) |
| Perimeter / DesignDen diagrams | [`src/components/Diagrams.jsx`](src/components/Diagrams.jsx) |
| About copy, stack table | [`src/components/About.jsx`](src/components/About.jsx) |
| Email, GitHub, LinkedIn, résumé | [`src/components/Footer.jsx`](src/components/Footer.jsx) — `LINKS` |

Colors, type scale and spacing are tokens at the top of
[`src/index.css`](src/index.css). Two tones: black is the ground, one electric
lime carries every accent. Dark is the default, so `:root` *is* the black
palette and `:root[data-theme="light"]` overrides it — the page is still black
if the pre-paint script in [`index.html`](index.html) never runs. That script
only honours an explicit choice the visitor saved; it deliberately does not
follow `prefers-color-scheme`.

Every text token clears WCAG AA (4.5:1) against both `--bg` and `--bg-raised`
in both themes. If you change an accent, re-check it — the tightest pair is
`--text-faint` on `--bg-raised` in light.

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
file.png`) — they set the aspect ratio so the page doesn't reflow as images
load. `alt` is read by screen readers and should describe the screen; `caption`
is visible to everyone and shouldn't just repeat it.

Keep images ≤1600px wide (`sips -Z 1600 file.png`). A project with neither
`shots` nor `diagram` falls back to a single-column layout automatically.

## Résumé

`public/resume.pdf` — replace the file to update the link.

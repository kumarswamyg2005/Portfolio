# G.N. Kumaraswamy — Portfolio

A state-of-the-art personal portfolio built with **React + Vite + Tailwind CSS + Framer Motion**.

## Tech Stack

| Tool            | Purpose                          |
|-----------------|----------------------------------|
| React 18        | UI framework                     |
| Vite 5          | Build tool & dev server          |
| Tailwind CSS 3  | Utility-first styling            |
| Framer Motion   | Scroll animations, transitions   |
| React Icons     | Icon library (SI, HI2, FI sets)  |

---

## Local Development

### Prerequisites
- Node.js 18+ (check: `node -v`)
- npm 9+ (check: `npm -v`)

### Setup

```bash
# 1. Navigate into the project folder
cd Portfolio

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production

```bash
npm run build      # outputs to /dist
npm run preview    # preview the production build locally
```

---

## Deployment on Vercel

### Option A — Vercel CLI (fastest)

```bash
npm i -g vercel    # install CLI once
vercel             # deploy from project root
```

Follow the prompts. Vercel auto-detects Vite. Use these settings if asked:
- **Framework:** Vite
- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Install command:** `npm install`

### Option B — GitHub + Vercel Dashboard

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) → Import your repo.
3. Vercel auto-detects the Vite config. Click **Deploy**.
4. Every `git push` to `main` triggers a re-deploy automatically.

---

## Customisation Guide

### Add your profile photo

1. Drop your photo (e.g. `profile.jpg`) into `/public/`.
2. In `src/components/About.jsx`, replace the placeholder `<div>` with:
   ```jsx
   <img src="/profile.jpg" alt="G.N. Kumaraswamy" className="w-full h-full object-cover" />
   ```

### Update project links

Open `src/data/projects.js`. For each project, set `demoUrl` to the live URL when deployed:
```js
demoUrl: 'https://your-app.vercel.app',
```
The card will automatically switch from "Coming Soon" to a live "Live Demo" button.

Also update each `github` URL to the specific repository page.

### Add / edit projects

Edit `src/data/projects.js` — add a new object to the array following the existing schema.

### Add / edit skills

Edit `src/data/skills.js` — add items to any category, or add a new category object.

Icon names must be from [react-icons/si](https://react-icons.github.io/react-icons/icons/si/) (e.g. `SiPython`).

### Add LinkedIn / other socials

In `src/components/Contact.jsx`, the LinkedIn entry has a `TODO` comment — paste your profile URL there.

In `src/components/Footer.jsx`, add more social icons following the existing GitHub pattern.

### Change accent colour

Open `tailwind.config.js` and change:
```js
accent: '#00d4ff',  // ← change to any hex colour
```
This propagates everywhere via Tailwind utilities.

### Change fonts

Update the Google Fonts `<link>` in `index.html` and the `fontFamily` in `tailwind.config.js`.

---

## Project Structure

```
Portfolio/
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── src/
    ├── App.jsx
    ├── main.jsx
    ├── index.css
    ├── hooks/
    │   ├── useTypewriter.js       # Typewriter cycling hook
    │   └── useActiveSection.js    # IntersectionObserver nav hook
    ├── data/
    │   ├── projects.js            # All project data — edit here
    │   └── skills.js              # All skills data — edit here
    └── components/
        ├── CustomCursor.jsx       # Animated dual-ring cursor
        ├── Navbar.jsx             # Sticky nav with active highlight
        ├── Hero.jsx               # Animated hero + particle canvas
        ├── About.jsx              # About me + education
        ├── Skills.jsx             # Tech stack badge grid
        ├── Projects.jsx           # Project cards grid
        ├── Contact.jsx            # Contact cards with links
        └── Footer.jsx             # Footer
```

---

## License

MIT — free to use and modify for personal use.
# Portfolio

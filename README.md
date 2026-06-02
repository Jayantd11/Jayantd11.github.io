<div align="center">

# jayantd11.github.io

**Jayant Dulani — Personal Portfolio**

A cinematic, animation-driven portfolio built from scratch with React, Vite & Tailwind.

[![Live Site](https://img.shields.io/badge/Live-jayantd11.github.io-D174D2?style=flat&logo=githubpages&logoColor=white)](https://jayantd11.github.io)
[![React](https://img.shields.io/badge/React-18-58A6FF?style=flat&logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38BDF8?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

</div>

---

## ✦ Overview

A single-page portfolio designed to feel like an *experience* rather than a template — inspired by award-winning sites like [lando-norris.com](https://lando-norris.com). Everything visual is generated in code (no stock imagery): animated topographic contour waves, cursor-reactive ink splashes, and thematic per-project art.

## ✦ Features

- 🌊 **Generative hero** — animated topographic contour waves (canvas + marching squares) layered with cursor-reactive, color-shifting ink splashes.
- 💧 **Water-fill intro loader** — an SVG "JD" monogram that fills like rippling liquid on load.
- 🖱️ **Custom cursor + magnetic buttons** — a reactive cursor that grows over interactive elements, with buttons that pull toward the pointer.
- 🎴 **Thematic project cards** — a cursor "torch" reveals project-specific art on hover (an NVIDIA wash for the GPU pipeline, a Google-Maps-style route finder for the spatial index, a live server/event network, a typing terminal).
- 🧲 **Smooth scroll & parallax** — momentum scrolling via [Lenis](https://github.com/darkroomengineering/lenis), scroll-velocity skew, and layered parallax.
- ✍️ **Editorial motion** — mask/line reveals, looping marquees, animated stat counters, ghost section numbers, and vertical labels.
- 📄 **Résumé modal** — view the résumé in-site (embedded PDF) or download it.
- ⚡ **Performance-aware** — heavy effects are gated/lightened on mobile; everything respects `prefers-reduced-motion`.
- 🔎 **SEO-ready** — Open Graph + Twitter cards, generated share image, and an SVG favicon.

## ✦ Tech Stack

| Area | Tools |
|------|-------|
| Framework | React 18 + Vite 6 |
| Styling | Tailwind CSS 3, custom CSS |
| Motion | Lenis smooth scroll, Canvas 2D, SVG/SMIL, CSS keyframes |
| Deploy | GitHub Pages (`gh-pages`) |

## ✦ Getting Started

```bash
# install dependencies
npm install

# start the dev server (http://localhost:5173)
npm run dev

# create a production build in /dist
npm run build

# preview the production build locally
npm run preview
```

## ✦ Project Structure

```
src/
├── App.jsx                 # composition + section order
├── index.css               # Tailwind layers, utilities, keyframes
├── data/content.js         # single source of truth (bio, projects, skills…)
├── hooks/
│   ├── useLenis.js          # smooth scroll + parallax + scroll-skew
│   └── useReveal.js         # scroll-reveal observer
└── components/
    ├── Hero, Waves, Splash  # generative hero background
    ├── Cursor, Magnetic     # pointer interactions
    ├── Loader               # water-fill intro
    ├── Projects, ProjectArt # cards + thematic hover art
    ├── Experience, Education, Skills, About, Contact, Footer
    └── ResumeModal, Marquee, Stats, GhostNumber, SectionMeta…
```

## ✦ Deployment

The site deploys to **GitHub Pages** from a `gh-pages` branch:

```bash
npm run deploy   # builds, then publishes /dist to the gh-pages branch
```

Then in **Settings → Pages**, set the source to the **`gh-pages`** branch (`/root`). Source code lives on `main`; the compiled site lives on `gh-pages`.

To update the résumé, replace `public/resume.pdf` and redeploy.

## ✦ Contact

- **Portfolio** — [jayantd11.github.io](https://jayantd11.github.io)
- **GitHub** — [@Jayantd11](https://github.com/Jayantd11)
- **LinkedIn** — [jayantdulani](https://linkedin.com/in/jayantdulani)
- **Email** — jayantd11@vt.edu

---

<div align="center">

*Designed & built by Jayant Dulani.*

</div>

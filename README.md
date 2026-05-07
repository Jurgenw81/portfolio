# Wolf Jürgen — Portfolio

A latent-space portfolio site. Pure static HTML/CSS/JS — no build step.

## Local preview

Just open `index.html` in a browser, or serve the folder:

```
python3 -m http.server 8000
```

…then visit `http://localhost:8000`.

## Deploy

### GitHub Pages
1. Push this folder to a repo (e.g. `Jurgenw81/portfolio`).
2. Repo → Settings → Pages → Source: `main` branch, root.
3. Done — your site lives at `https://jurgenw81.github.io/portfolio/`.

### Netlify / Vercel / Cloudflare Pages
Drag the folder onto the dashboard, or connect the GitHub repo. No build command needed.

## Add a project

Edit `data/projects.js` — append to `PROJECTS`:

```js
{
  id: "my-project",
  name: "My Project",
  kind: "Web App",
  year: 2025,
  blurb: "One-liner about what it does.",
  tags: ["web", "ai"],
  url: "https://example.com",
  coords: [0.4, -0.2], // x, y in -1..1
}
```

Tags drive the connection graph automatically.

## Update bio / CV / contact

Edit `PROFILE` at the top of `data/projects.js`. Replace the CV at `assets/Wolf-Juergen-CV.pdf`.

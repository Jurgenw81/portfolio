// ============================================================================
//  PORTFOLIO DATA  —  single source of truth.
//  To add a new project: append to PROJECTS. Tags drive node clustering & color.
//  To update bio / now / contact: edit PROFILE.
// ============================================================================

window.PROFILE = {
  name: "Wolf Jürgen",
  handle: "jurgenw81",
  role: "Software Engineer · AI Student",
  location: "Kematen, Austria",
  email: "jurgenwo81@gmail.com",
  github: "https://github.com/Jurgenw81",
  cv: "assets/Wolf-Juergen-CV.pdf",
  tagline:
    "Building agents and interfaces at the edge of language models, the web, and physical computing.",
  bio: [
    "Software engineer with 5+ years shipping production systems — strong background in web3, smart contracts, and full-stack web work.",
    "Hands-on with Raspberry Pi, Arduino, and embedded tinkering — I like when software touches the physical world.",
    "Currently studying Artificial Intelligence at JKU Linz: building with Python, multi-agent systems, and the Anthropic MCP (Model Context Protocol) ecosystem.",
  ],
  now: [
    { label: "studying", value: "Artificial Intelligence" },
    { label: "stack", value: "Python · Agents · MCP" },
    { label: "exploring", value: "Tool-using LLMs, retrieval, evals" },
    { label: "building", value: "Browser extensions & dashboards" },
  ],
};

// Each project gets:
//   id, name, kind, year, blurb (one-liner), tags (drive clustering), url,
//   coords [x,y] in latent space (-1..1), accent (optional override)
window.PROJECTS = [
  {
    id: "goldfinder",
    name: "Goldfinder",
    kind: "Firefox Extension",
    year: 2024,
    blurb:
      "Tracks gold prices and surfaces deals across precious-metal retailers, in-browser.",
    tags: ["browser-extension", "scraping", "finance", "web"],
    url: "https://addons.mozilla.org/en-US/firefox/addon/goldfinder/",
    coords: [-0.55, -0.35],
  },
  {
    id: "willhabenplus",
    name: "WillhabenPlus",
    kind: "Firefox Extension",
    year: 2024,
    blurb:
      "Power-user upgrades for Austria's largest classifieds site — better filters, alerts, ergonomics.",
    tags: ["browser-extension", "automation", "ux", "web"],
    url: "https://addons.mozilla.org/addon/willhabenplus/",
    coords: [-0.35, -0.6],
  },
  {
    id: "screendrawer",
    name: "ScreenDrawer",
    kind: "Firefox Extension",
    year: 2024,
    blurb:
      "Annotate, draw on, and capture any web page — a pen and a camera for the browser.",
    tags: ["browser-extension", "canvas", "tooling", "web"],
    url: "https://addons.mozilla.org/en-US/firefox/addon/page-pen-capture-pro/",
    coords: [-0.7, -0.05],
  },
  {
    id: "marketdashboard",
    name: "Market Dashboard",
    kind: "Web App",
    year: 2024,
    blurb:
      "Live market telemetry — charts, signals, and a single pane for the data I actually watch.",
    tags: ["web3", "finance", "dashboard", "real-time"],
    url: "https://marketdashboard.live/",
    coords: [0.45, -0.4],
  },
  {
    id: "mapautist",
    name: "Mapautist",
    kind: "Web App",
    year: 2024,
    blurb:
      "Map-based exploration tool — a personal mapping playground built on top of geospatial APIs.",
    tags: ["maps", "geo", "web", "visualization"],
    url: "https://mapautist.com/",
    coords: [0.6, 0.15],
  },
  {
    id: "github",
    name: "Open Source",
    kind: "Code & Experiments",
    year: "ongoing",
    blurb:
      "Hardware sketches, AI experiments, and assorted code — the workshop where it all starts.",
    tags: ["hardware", "ai", "raspberry-pi", "arduino", "python"],
    url: "https://github.com/Jurgenw81",
    coords: [0.05, 0.6],
  },
  {
    id: "viechn",
    name: "Viechn",
    kind: "Brand & Site",
    year: 2024,
    blurb:
      "Identity and web presence for an Austrian gym brand — apparel, attitude, and a place to land.",
    tags: ["web", "brand", "ecommerce", "ux"],
    url: "https://viechn.at",
    coords: [0.35, 0.55],
  },
];

// Tag -> color hue (degrees, oklch). Drives node halo.
window.TAG_HUES = {
  "browser-extension": 200,
  web3: 280,
  finance: 50,
  maps: 150,
  hardware: 20,
  ai: 320,
  python: 320,
  "raspberry-pi": 20,
  arduino: 20,
  dashboard: 50,
  "real-time": 200,
  scraping: 200,
  automation: 200,
  ux: 280,
  canvas: 280,
  tooling: 200,
  web: 200,
  geo: 150,
  visualization: 280,
  brand: 50,
  ecommerce: 50,
};

// Edges between projects sharing tags are drawn automatically.

// ============================================================================
//  PORTFOLIO DATA  —  single source of truth.
//  To add a new project: append to PROJECTS. Tags drive node clustering & color.
//  To update bio / now / contact: edit PROFILE.
//
//  Each project carries a `summary` field — a pre-written paragraph that's
//  shown when the user clicks "generate" in the panel. No API key needed.
// ============================================================================

window.PROFILE = {
  name: "Wolf Jürgen",
  handle: "jurgenw81",
  role: "Software Engineer · AI Student",
  location: "Linz, Austria",
  email: "jurgenwo81@gmail.com",
  github: "https://github.com/Jurgenw81",
  cv: "assets/Wolf-Juergen-CV.pdf",
  tagline:
    "Building agents and interfaces at the edge of language models, the web, and physical computing.",
  bio: [
    "Software engineer with 5+ years shipping production systems — strong background in web3, smart contracts, and full-stack web work.",
    "Hands-on with embedded computing — Raspberry Pi, Arduino, ESP32, and Jetson Nano. I like when software reaches into the physical world.",
    "Currently studying Artificial Intelligence at JKU Linz: PyTorch, multi-agent systems, retrieval, evals, and the Anthropic MCP (Model Context Protocol) ecosystem.",
  ],
  now: [
    { label: "studying", value: "AI · JKU Linz" },
    { label: "stack", value: "Python · PyTorch · MCP" },
    { label: "exploring", value: "Agents · tool use · evals" },
    { label: "building", value: "Extensions · dashboards · tutorials" },
  ],
  // Skill clusters rendered in the sidebar.
  skills: [
    {
      group: "languages",
      items: ["Python", "JavaScript", "HTML/CSS"],
    },
    {
      group: "ai · data",
      items: ["PyTorch", "MCP", "AI Agents", "LLMs", "vibecoder"],
    },
    {
      group: "hardware",
      items: ["Raspberry Pi", "Arduino", "ESP32", "Jetson Nano"],
    },
    {
      group: "web",
      items: ["Web3", "Smart Contracts", "Browser Extensions"],
    },
  ],
};

// Each project gets:
//   id, name, kind, year, blurb (one-liner), summary (long paragraph for AI panel),
//   tags (drive clustering), url, coords [x,y] in latent space (-1..1)
window.PROJECTS = [
  {
    id: "goldfinder",
    name: "Goldfinder",
    kind: "Firefox Extension",
    year: 2024,
    blurb:
      "Tracks gold prices and surfaces deals across precious-metal retailers, in-browser.",
    summary:
      "A quiet companion that lives in the toolbar and watches the gold market for you. Goldfinder normalizes prices across precious-metal retailers, surfaces real spreads against the spot rate, and pings you when a deal crosses your threshold — turning a tab full of dealer sites into a single, decision-ready feed.",
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
    summary:
      "Austria's biggest marketplace, redesigned from the listing up. WillhabenPlus injects sharper filters, saved-search alerts, and small ergonomic fixes that compound — so the people who actually live in the search bar can move faster than everyone else still scrolling.",
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
    summary:
      "Turns any web page into a whiteboard. ScreenDrawer drops a pen tool over the live DOM so you can mark up a layout, circle the bug, and capture the result in one motion — useful for design reviews, bug reports, and the kind of quick visual notes that screenshots alone never quite carry.",
    tags: ["browser-extension", "canvas", "tooling", "web"],
    url: "https://addons.mozilla.org/en-US/firefox/addon/page-pen-capture-pro/",
    coords: [-0.7, -0.05],
  },
  {
    id: "scamradar",
    name: "ScamRadar",
    kind: "Firefox Extension",
    year: 2025,
    blurb:
      "Claude-powered email threat detector — scans every inbox for scams and spam beyond what providers catch.",
    summary:
      "A second pair of eyes on every email. ScamRadar reads the messages your provider's filters wave through and asks Claude whether they smell right — flagging social-engineering, payment-fraud, and credential-phishing patterns in plain language. Works on any webmail, requires your own Claude subscription, and keeps the verdict visible right where you read.",
    tags: ["browser-extension", "ai", "security", "web"],
    url: "https://addons.mozilla.org/en-US/firefox/addon/scamradar-emailthreatdetector/",
    coords: [-0.2, -0.25],
  },
  {
    id: "marketdashboard",
    name: "Market Dashboard",
    kind: "Web App",
    year: 2024,
    blurb:
      "Live market telemetry — charts, signals, and a single pane for the data I actually watch.",
    summary:
      "A personal trading-floor view, distilled. Market Dashboard streams live price feeds and signals into a single pane, replacing a dozen open tabs with one calm, opinionated layout — the data I actually watch, surfaced the way I actually look at it.",
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
    summary:
      "A playground for the obsessively map-curious. Mapautist sits on top of public geospatial APIs and lets you build, layer, and explore custom views — part research tool, part map for the sake of maps, all driven by the conviction that there's always one more interesting thing hiding in coordinates.",
    tags: ["maps", "geo", "web", "visualization"],
    url: "https://mapautist.com/",
    coords: [0.6, 0.15],
  },
  {
    id: "neuralnet-tut",
    name: "Neural Nets, Explained",
    kind: "Tutorial Site",
    year: 2025,
    blurb:
      "Walks through the moving parts of a neural network — weights, activations, gradients, the whole stack.",
    summary:
      "A learn-by-pictures companion to the math. The site unpacks neural networks from neuron to network: how weights and activations conspire, how a loss function bends them, and where backpropagation does its quiet work. Built while studying AI, written for the version of me that wished someone would just show it.",
    tags: ["ai", "education", "visualization", "web"],
    url: "https://jurgenw81.github.io/NeuralNet-tut/",
    coords: [0.0, -0.15],
  },
  {
    id: "github",
    name: "Open Source",
    kind: "Code & Experiments",
    year: "ongoing",
    blurb:
      "Hardware sketches, AI experiments, and assorted code — the workshop where it all starts.",
    summary:
      "The public workshop. A scrapyard of half-finished agents, hardware experiments on Pi and ESP32, PyTorch notebooks, and the small command-line tools I write to scratch a specific itch — kept open in case any of it is useful to anyone else heading the same direction.",
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
    summary:
      "An Austrian gym brand with a point of view. Viechn is identity, apparel, and a web home that carries the attitude — a small, end-to-end brand exercise covering visual system, copy, and storefront, where every surface had to read the same way.",
    tags: ["web", "brand", "ecommerce", "ux"],
    url: "https://viechn.at",
    coords: [0.55, 0.5],
  },
  {
    id: "llmvisualizer",
    name: "LLM Visualizer",
    kind: "Interactive Visualization",
    year: 2026,
    blurb:
      "Watches an LLM learn — an interactive view into training dynamics, live in the browser.",
    summary:
      "A window into the black box while it's still forming. LLM Visualizer renders how a language model's internals shift over training — weights, losses, the shape of the gradient — as an interactive Hugging Face Space anyone can poke at, no local setup required.",
    tags: ["ai", "education", "visualization", "python"],
    url: "https://huggingface.co/spaces/CodeWithJoe/LLMVisualizer",
    coords: [-0.1, 0.4],
  },
  {
    id: "rag",
    name: "rag.py",
    kind: "Research Tool",
    year: 2026,
    blurb:
      "A minimal, one-file local RAG pipeline built to find out exactly where retrieval-augmented generation helps — and where it quietly fails.",
    summary:
      "No vector database, no framework — just Ollama for embeddings and generation and a normalized numpy matrix for search, because cosine similarity over an array that fits in memory is one line of code. Built to strip RAG down to its mechanism, with the findings on where the pattern earns its complexity written up in the README itself.",
    tags: ["ai", "python", "education"],
    url: "https://github.com/Jurgenw81/RAG",
    coords: [0.3, 0.65],
  },
  {
    id: "whywrong",
    name: "WhyWrong",
    kind: "Web App",
    year: 2026,
    blurb:
      "An AI learning debugger — diagnoses the misconception behind a wrong answer instead of just marking it wrong.",
    summary:
      "Don't just correct mistakes, understand them. WhyWrong classifies a student's free-text answer against a library of known misconceptions, keeps a live probability distribution over competing hypotheses, asks the one question that separates them, and only then teaches the specific gap it found — demoed across a twelve-topic path from 'what is a neural network' to overfitting.",
    tags: ["ai", "education", "web"],
    url: "https://whywrong.onrender.com/",
    coords: [-0.15, -0.05],
  },
  {
    id: "asimov-dynamics-lab",
    name: "Asimov Dynamics Lab",
    kind: "Robotics Simulator",
    year: 2026,
    blurb:
      "A browser-based MuJoCo workbench for the open-source Asimov biped — no Python, no backend, just physics in a tab.",
    summary:
      "The Asimov v0 biped from Menlo Research, fully simulated in-browser through MuJoCo WebAssembly. Command all 12 powered leg joints with live sliders, inspect any of the 15 robot bodies, fire directional force pulses and watch delivered impulse, and change ground friction from ice to high-grip — a physical-computing sandbox that needs nothing installed to run.",
    tags: ["hardware", "ai", "visualization", "web"],
    url: "https://jurgenw81.github.io/asimov-dynamics-lab/",
    coords: [0.65, -0.3],
  },
  {
    id: "kitespot-atlas",
    name: "Kitespot Atlas",
    kind: "Web App",
    year: 2026,
    blurb:
      "A live world map of 211 kitesurfing spots, scored to your body weight and kite quiver — and operable by an AI agent alongside you.",
    summary:
      "Every spot is scored in real time against your rider profile, but the real experiment is underneath: the same scoring engine, map camera, trip planner, and session log are exposed to an agent through WebMCP, so an AI can drive the page itself — set your weight and kite sizes, re-rank all 211 spots, and find you wind — rather than describing the site back to you.",
    tags: ["maps", "geo", "web", "ai"],
    url: "https://jurgenw81.github.io/kitespot-atlas/",
    coords: [0.4, 0.35],
  },
  {
    id: "bullsvsbears",
    name: "BullsVsBears",
    kind: "Web App",
    year: 2026,
    blurb:
      "Visualizes BTC, ETH, and SOL price action as a running contest between bulls and bears.",
    summary:
      "Strips a candlestick chart down to the one question everyone actually wants answered: right now, who's winning? BullsVsBears turns BTC-USD, ETH-USD, and SOL-USD price data into a live bulls-vs-bears read, trading chart-reading skill for an instant, visceral sense of momentum.",
    tags: ["finance", "dashboard", "real-time", "visualization", "web"],
    url: "https://jurgenw81.github.io/bullsvsbears/",
    coords: [0.25, -0.55],
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
  education: 320,
  security: 20,
};

// Edges between projects sharing tags are drawn automatically.

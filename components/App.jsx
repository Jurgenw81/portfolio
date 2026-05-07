/* global React, ReactDOM */
// ============================================================================
//  App — root component. Wires the latent field, sidebar, list, and panel.
// ============================================================================

const { useState, useEffect } = React;

function App() {
  const [hovered, setHovered] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [bootDone, setBootDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setBootDone(true), 1400);
    return () => clearTimeout(t);
  }, []);

  // Esc closes panel
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setSelectedId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const selected = window.PROJECTS.find((p) => p.id === selectedId) || null;

  return (
    <div className={`app ${bootDone ? "booted" : "booting"}`}>
      <BootOverlay done={bootDone} />

      <window.Sidebar profile={window.PROFILE} />

      <main className="stage">
        <div className="stage-head">
          <div className="sb-tag">// latent_space · projects.embed()</div>
          <div className="stage-hint">
            hover a node · click to inspect · esc to close
          </div>
        </div>
        <window.LatentField
          projects={window.PROJECTS}
          hovered={hovered}
          setHovered={setHovered}
          selected={selectedId}
          setSelected={setSelectedId}
        />
        <window.ProjectList
          projects={window.PROJECTS}
          hovered={hovered}
          setHovered={setHovered}
          selected={selectedId}
          setSelected={setSelectedId}
        />
      </main>

      <div className={`panel-wrap ${selected ? "open" : ""}`}>
        {selected && (
          <window.ProjectPanel
            project={selected}
            onClose={() => setSelectedId(null)}
          />
        )}
      </div>
    </div>
  );
}

function BootOverlay({ done }) {
  const [lines, setLines] = useState([]);
  useEffect(() => {
    const seq = [
      "> initializing latent space…",
      "> loading embeddings (6 projects)",
      "> computing similarity graph",
      "> warming attention map",
      "> ready.",
    ];
    let i = 0;
    const id = setInterval(() => {
      setLines((l) => [...l, seq[i]]);
      i++;
      if (i >= seq.length) clearInterval(id);
    }, 220);
    return () => clearInterval(id);
  }, []);
  return (
    <div className={`boot ${done ? "gone" : ""}`}>
      <div className="boot-inner">
        {lines.map((l, i) => (
          <div key={i} className="boot-line">
            {l}
          </div>
        ))}
        <div className="boot-cursor">▍</div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

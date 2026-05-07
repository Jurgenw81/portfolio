/* global React */
// ============================================================================
//  ProjectPanel — slides in from the right when a node is selected.
//  "generate" reveals the pre-written summary with a typing animation.
//  No external API call required — everything ships in the static bundle.
// ============================================================================

const { useState: usePState, useEffect: usePEffect, useRef: usePRef } = React;

function ProjectPanel({ project, onClose }) {
  const [aiState, setAiState] = usePState({
    loading: false,
    text: "",
    revealed: false,
  });
  const cancelRef = usePRef(null);

  // Reset whenever the user opens a different project
  usePEffect(() => {
    if (cancelRef.current) cancelRef.current();
    setAiState({ loading: false, text: "", revealed: false });
  }, [project?.id]);

  if (!project) return null;

  const reveal = () => {
    if (cancelRef.current) cancelRef.current();
    setAiState({ loading: true, text: "", revealed: false });

    const full = project.summary || project.blurb;
    let i = 0;
    let cancelled = false;
    cancelRef.current = () => {
      cancelled = true;
    };

    // tiny "thinking" pause, then a typewriter reveal
    const start = setTimeout(() => {
      if (cancelled) return;
      const tick = () => {
        if (cancelled) return;
        i += 2 + Math.floor(Math.random() * 3);
        const slice = full.slice(0, i);
        setAiState({
          loading: i < full.length,
          text: slice,
          revealed: true,
        });
        if (i < full.length) setTimeout(tick, 14);
      };
      tick();
    }, 380);

    cancelRef.current = () => {
      cancelled = true;
      clearTimeout(start);
    };
  };

  const showFull = () => {
    if (cancelRef.current) cancelRef.current();
    setAiState({
      loading: false,
      text: project.summary || project.blurb,
      revealed: true,
    });
  };

  return (
    <div className="panel">
      <div className="panel-head">
        <div className="panel-meta">
          <div className="panel-tag">// project · {project.year}</div>
          <h2 className="panel-name">{project.name}</h2>
          <div className="panel-kind">{project.kind}</div>
        </div>
        <button className="panel-close" onClick={onClose} aria-label="close">
          ✕
        </button>
      </div>

      <p className="panel-blurb">{project.blurb}</p>

      <div className="panel-tags">
        {project.tags.map((t) => (
          <span key={t} className="chip">
            {t}
          </span>
        ))}
      </div>

      <div className="panel-ai">
        <div className="panel-ai-head">
          <span className="sb-tag">// summary</span>
          <div className="ai-actions">
            {aiState.loading && (
              <button className="ai-btn ghost" onClick={showFull}>
                skip
              </button>
            )}
            <button
              className="ai-btn"
              onClick={reveal}
              disabled={aiState.loading}
            >
              {aiState.loading
                ? "typing…"
                : aiState.revealed
                ? "replay"
                : "generate"}
            </button>
          </div>
        </div>
        <div className="panel-ai-body">
          {!aiState.revealed && (
            <span className="ai-hint">
              click generate for a deeper take on this project.
            </span>
          )}
          {aiState.revealed && (
            <p>
              {aiState.text}
              {aiState.loading && <span className="caret">▍</span>}
            </p>
          )}
        </div>
      </div>

      <a
        className="panel-link"
        href={project.url}
        target="_blank"
        rel="noreferrer"
      >
        <span>visit project</span>
        <span className="arrow">→</span>
      </a>
    </div>
  );
}

window.ProjectPanel = ProjectPanel;

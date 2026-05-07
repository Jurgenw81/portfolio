/* global React */
// ============================================================================
//  ProjectPanel — slides in from the right when a node is selected.
//  Has a "summarize with AI" action that pings window.claude.complete.
// ============================================================================

const { useState: usePState, useEffect: usePEffect } = React;

function ProjectPanel({ project, onClose }) {
  const [aiState, setAiState] = usePState({
    loading: false,
    text: "",
    error: null,
  });

  // Reset when project changes
  usePEffect(() => {
    setAiState({ loading: false, text: "", error: null });
  }, [project?.id]);

  if (!project) return null;

  const askAI = async () => {
    setAiState({ loading: true, text: "", error: null });
    try {
      const prompt = `You are writing a single, short, evocative paragraph (3-4 sentences max) about a software project for a portfolio site. Keep it concrete, technical, and a little poetic. No marketing fluff. No emoji. Do not start with "This is" or "A". Project name: ${project.name}. Kind: ${project.kind}. One-liner: ${project.blurb}. Tags: ${project.tags.join(", ")}.`;
      const text = await window.claude.complete(prompt);
      setAiState({ loading: false, text: text.trim(), error: null });
    } catch (e) {
      setAiState({
        loading: false,
        text: "",
        error: "couldn't reach the model. try again?",
      });
    }
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
          <span className="sb-tag">// ai_summary</span>
          <button
            className="ai-btn"
            onClick={askAI}
            disabled={aiState.loading}
          >
            {aiState.loading ? "thinking…" : aiState.text ? "regenerate" : "generate"}
          </button>
        </div>
        <div className="panel-ai-body">
          {aiState.loading && <TypingDots />}
          {aiState.error && <span className="ai-err">{aiState.error}</span>}
          {aiState.text && <p>{aiState.text}</p>}
          {!aiState.loading && !aiState.text && !aiState.error && (
            <span className="ai-hint">
              ask the model for a fresh take on this project.
            </span>
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

function TypingDots() {
  return (
    <span className="dots">
      <span />
      <span />
      <span />
    </span>
  );
}

window.ProjectPanel = ProjectPanel;

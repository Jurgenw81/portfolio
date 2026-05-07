/* global React */
// ============================================================================
//  Sidebar — "agent context window" styling.
//  Shows profile + system prompt + now block on the left rail.
// ============================================================================

function Sidebar({ profile }) {
  return (
    <aside className="sidebar">
      <div className="sb-block">
        <div className="sb-tag">// identity</div>
        <h1 className="sb-name">{profile.name}</h1>
        <div className="sb-role">{profile.role}</div>
        <div className="sb-meta">
          <span>📍 {profile.location}</span>
        </div>
        <div className="sb-meta">
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </div>
        <div className="sb-meta">
          <a href={profile.github} target="_blank" rel="noreferrer">
            github.com/{profile.handle}
          </a>
        </div>
        {profile.cv && (
          <a className="sb-cv" href={profile.cv} target="_blank" rel="noreferrer" download>
            <span className="sb-cv-icon">↓</span>
            <span className="sb-cv-label">download_cv.pdf</span>
          </a>
        )}
      </div>

      <div className="sb-block sb-prompt">
        <div className="sb-tag">// system_prompt</div>
        <p className="sb-tagline">{profile.tagline}</p>
        {profile.bio.map((line, i) => (
          <p key={i} className="sb-bio">
            {line}
          </p>
        ))}
      </div>

      <div className="sb-block">
        <div className="sb-tag">// now</div>
        <ul className="sb-now">
          {profile.now.map((n, i) => (
            <li key={i}>
              <span className="sb-now-label">{n.label}</span>
              <span className="sb-now-value">{n.value}</span>
            </li>
          ))}
        </ul>
      </div>

      {profile.skills && (
        <div className="sb-block">
          <div className="sb-tag">// skills</div>
          <div className="sb-skills">
            {profile.skills.map((s, i) => (
              <div key={i} className="sb-skillgroup">
                <div className="sb-skillgroup-label">{s.group}</div>
                <div className="sb-chips">
                  {s.items.map((it) => (
                    <span key={it} className="chip chip-sm">
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="sb-block sb-foot">
        <div className="sb-tag">// status</div>
        <div className="sb-status">
          <span className="sb-pulse" />
          <span>open to opportunities · agentic systems</span>
        </div>
      </div>
    </aside>
  );
}

window.Sidebar = Sidebar;

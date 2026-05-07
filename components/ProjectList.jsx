/* global React */
// ============================================================================
//  ProjectList — compact list shown bottom-left, mirrors the latent field.
//  Hovering a list item highlights its node, clicking selects it.
// ============================================================================

function ProjectList({ projects, hovered, setHovered, selected, setSelected }) {
  return (
    <div className="plist">
      <div className="sb-tag">// projects ({projects.length})</div>
      <ul>
        {projects.map((p) => {
          const active = hovered === p.id || selected === p.id;
          return (
            <li
              key={p.id}
              className={active ? "active" : ""}
              onMouseEnter={() => setHovered(p.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setSelected(p.id)}
            >
              <span className="plist-dot" />
              <span className="plist-name">{p.name}</span>
              <span className="plist-kind">{p.kind}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

window.ProjectList = ProjectList;

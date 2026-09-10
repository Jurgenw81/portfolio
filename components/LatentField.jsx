/* global React */
// ============================================================================
//  LatentField — full-bleed canvas of project "embeddings".
//  Nodes drift in 2D latent space; edges connect projects sharing tags.
//  Background is a faint flow-field hinting at attention / activations.
// ============================================================================

const { useEffect, useRef, useState, useMemo, useCallback } = React;

function LatentField({ projects, hovered, setHovered, selected, setSelected, avoidRef }) {
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);
  const rafRef = useRef(null);
  const tRef = useRef(0);
  const [size, setSize] = useState({ w: 800, h: 600 });
  const [exclRect, setExclRect] = useState(null);

  // Resize observer
  useEffect(() => {
    if (!wrapRef.current) return;
    const ro = new ResizeObserver(() => {
      const r = wrapRef.current.getBoundingClientRect();
      setSize({ w: Math.max(320, r.width), h: Math.max(320, r.height) });
    });
    ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, []);

  // Track the bounding box of any UI overlay (e.g. the project list) that
  // floats on top of the canvas, so node layout can steer clear of it.
  // The list's own CSS caps its height (see .plist max-height), so this
  // box stays a small corner of the canvas rather than the whole edge —
  // that's what keeps the per-node nudge below from bunching nodes up.
  useEffect(() => {
    if (!avoidRef || !avoidRef.current || !wrapRef.current) return;
    const update = () => {
      if (!avoidRef.current || !wrapRef.current) return;
      const er = avoidRef.current.getBoundingClientRect();
      const wr = wrapRef.current.getBoundingClientRect();
      setExclRect({
        left: er.left - wr.left,
        right: er.right - wr.left,
        top: er.top - wr.top,
        bottom: er.bottom - wr.top,
      });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(avoidRef.current);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [avoidRef, size]);

  // Project layout in pixel space
  const layout = useMemo(() => {
    const pad = 80;
    const w = size.w - pad * 2;
    const h = size.h - pad * 2;
    const cx = size.w / 2;
    const cy = size.h / 2;
    const r = 26;
    // Keep clear of the halo (~r*3.2) plus label text below the node.
    const rectMargin = r * 3.2 + 20;
    const nodes = projects.map((p) => ({
      ...p,
      x: cx + (p.coords[0] * w) / 2,
      y: cy + (p.coords[1] * h) / 2,
      r,
    }));

    const pushOutOfRect = (n) => {
      if (!exclRect) return;
      const left = exclRect.left - rectMargin;
      const right = exclRect.right + rectMargin;
      const top = exclRect.top - rectMargin;
      const bottom = exclRect.bottom + rectMargin;
      if (n.x > left && n.x < right && n.y > top && n.y < bottom) {
        // Push out toward whichever edge of the excluded zone is closer.
        const distToRight = right - n.x;
        const distToTop = n.y - top;
        if (distToRight < distToTop) n.x = right;
        else n.y = top;
      }
    };

    // A few rounds of pairwise repulsion (keeping clear of the excluded
    // zone each round) so nodes forced out from behind the list — or any
    // pair that simply started close together — settle apart instead of
    // stacking on the same spot or edge.
    const minDist = r * 2 + 70; // clearance for circle + label
    nodes.forEach(pushOutOfRect);
    for (let iter = 0; iter < 8; iter++) {
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          let dx = b.x - a.x;
          let dy = b.y - a.y;
          let dist = Math.hypot(dx, dy);
          if (dist >= minDist) continue;
          if (dist < 0.001) {
            const angle = (i * 137.5 + j) % 360; // deterministic, avoids Math.random jitter
            dx = Math.cos(angle);
            dy = Math.sin(angle);
            dist = 1;
          }
          const move = (minDist - dist) / 2;
          const ux = dx / dist;
          const uy = dy / dist;
          a.x -= ux * move;
          a.y -= uy * move;
          b.x += ux * move;
          b.y += uy * move;
        }
      }
      nodes.forEach(pushOutOfRect);
    }

    return nodes;
  }, [projects, size, exclRect]);

  // Edges: any pair sharing a tag
  const edges = useMemo(() => {
    const out = [];
    for (let i = 0; i < layout.length; i++) {
      for (let j = i + 1; j < layout.length; j++) {
        const shared = layout[i].tags.filter((t) =>
          layout[j].tags.includes(t)
        );
        if (shared.length) {
          out.push({ a: i, b: j, weight: shared.length, shared });
        }
      }
    }
    return out;
  }, [layout]);

  // Animation loop
  useEffect(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    cvs.width = size.w * dpr;
    cvs.height = size.h * dpr;
    cvs.style.width = size.w + "px";
    cvs.style.height = size.h + "px";
    ctx.scale(dpr, dpr);

    const draw = () => {
      tRef.current += 0.006;
      const t = tRef.current;
      ctx.clearRect(0, 0, size.w, size.h);

      // ---- background flow field (very faint dotted attention map) ----
      const step = 28;
      ctx.save();
      for (let x = 0; x < size.w; x += step) {
        for (let y = 0; y < size.h; y += step) {
          const n =
            Math.sin(x * 0.011 + t * 1.2) +
            Math.cos(y * 0.013 - t * 0.9) +
            Math.sin((x + y) * 0.007 + t);
          const a = 0.04 + 0.05 * (0.5 + 0.5 * Math.sin(n + t));
          const r = 0.6 + 0.9 * (0.5 + 0.5 * Math.cos(n));
          ctx.fillStyle = `rgba(170, 200, 255, ${a})`;
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();

      // ---- edges ----
      ctx.save();
      ctx.lineCap = "round";
      edges.forEach((e) => {
        const a = layout[e.a];
        const b = layout[e.b];
        const ax = a.x + Math.sin(t + a.x * 0.01) * 6;
        const ay = a.y + Math.cos(t + a.y * 0.01) * 6;
        const bx = b.x + Math.sin(t * 0.9 + b.x * 0.01) * 6;
        const by = b.y + Math.cos(t * 0.9 + b.y * 0.01) * 6;

        const isActive =
          hovered === a.id ||
          hovered === b.id ||
          selected === a.id ||
          selected === b.id;
        const baseAlpha = 0.08 + e.weight * 0.04;
        const alpha = isActive ? 0.55 : baseAlpha;

        const grad = ctx.createLinearGradient(ax, ay, bx, by);
        grad.addColorStop(0, `rgba(140, 220, 255, ${alpha})`);
        grad.addColorStop(1, `rgba(200, 160, 255, ${alpha})`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = isActive ? 1.6 : 0.8;

        // gentle curve
        const mx = (ax + bx) / 2 + Math.sin(t + a.x * 0.02) * 18;
        const my = (ay + by) / 2 + Math.cos(t + b.y * 0.02) * 18;
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.quadraticCurveTo(mx, my, bx, by);
        ctx.stroke();

        // pulse along the edge when active
        if (isActive) {
          const k = (Math.sin(t * 4) + 1) / 2;
          const px = ax + (bx - ax) * k + (mx - (ax + bx) / 2) * 4 * k * (1 - k);
          const py = ay + (by - ay) * k + (my - (ay + by) / 2) * 4 * k * (1 - k);
          ctx.fillStyle = "rgba(180, 230, 255, 0.9)";
          ctx.beginPath();
          ctx.arc(px, py, 2.2, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      ctx.restore();

      // ---- nodes ----
      layout.forEach((p) => {
        const wob = {
          x: p.x + Math.sin(t + p.x * 0.01) * 6,
          y: p.y + Math.cos(t + p.y * 0.01) * 6,
        };
        const isHover = hovered === p.id;
        const isSel = selected === p.id;
        const r = p.r + (isHover || isSel ? 6 : 0);

        // halo
        const haloR = r * 3.2;
        const halo = ctx.createRadialGradient(
          wob.x,
          wob.y,
          r * 0.5,
          wob.x,
          wob.y,
          haloR
        );
        halo.addColorStop(0, "rgba(140, 220, 255, 0.35)");
        halo.addColorStop(0.5, "rgba(180, 160, 255, 0.12)");
        halo.addColorStop(1, "rgba(180, 160, 255, 0)");
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(wob.x, wob.y, haloR, 0, Math.PI * 2);
        ctx.fill();

        // outer ring
        ctx.strokeStyle = isSel
          ? "rgba(180, 230, 255, 1)"
          : isHover
          ? "rgba(180, 230, 255, 0.85)"
          : "rgba(180, 200, 230, 0.45)";
        ctx.lineWidth = isSel ? 2 : 1.2;
        ctx.beginPath();
        ctx.arc(wob.x, wob.y, r, 0, Math.PI * 2);
        ctx.stroke();

        // inner core
        const core = ctx.createRadialGradient(
          wob.x - r * 0.3,
          wob.y - r * 0.3,
          1,
          wob.x,
          wob.y,
          r
        );
        core.addColorStop(0, "rgba(220, 240, 255, 0.95)");
        core.addColorStop(0.6, "rgba(120, 180, 240, 0.55)");
        core.addColorStop(1, "rgba(80, 100, 180, 0.25)");
        ctx.fillStyle = core;
        ctx.beginPath();
        ctx.arc(wob.x, wob.y, r * 0.55, 0, Math.PI * 2);
        ctx.fill();

        // label
        ctx.font =
          "500 12px ui-monospace, 'JetBrains Mono', 'SF Mono', Menlo, monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.fillStyle =
          isHover || isSel
            ? "rgba(230, 240, 255, 1)"
            : "rgba(190, 200, 220, 0.7)";
        ctx.fillText(p.name, wob.x, wob.y + r + 10);
        ctx.font =
          "10px ui-monospace, 'JetBrains Mono', 'SF Mono', Menlo, monospace";
        ctx.fillStyle = "rgba(150, 170, 200, 0.55)";
        ctx.fillText(p.kind.toLowerCase(), wob.x, wob.y + r + 26);

        // store wobbled position for hit-testing
        p._wx = wob.x;
        p._wy = wob.y;
        p._wr = r;
      });

      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, [size, layout, edges, hovered, selected]);

  // Hit-testing
  const hit = useCallback(
    (clientX, clientY) => {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      for (const p of layout) {
        const dx = x - (p._wx ?? p.x);
        const dy = y - (p._wy ?? p.y);
        if (Math.hypot(dx, dy) < (p._wr ?? p.r) + 6) return p.id;
      }
      return null;
    },
    [layout]
  );

  const onMove = (e) => {
    const id = hit(e.clientX, e.clientY);
    setHovered(id);
    canvasRef.current.style.cursor = id ? "pointer" : "default";
  };
  const onClick = (e) => {
    const id = hit(e.clientX, e.clientY);
    if (id) setSelected(id);
  };
  const onLeave = () => setHovered(null);

  return (
    <div ref={wrapRef} className="latent-wrap">
      <canvas
        ref={canvasRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        onClick={onClick}
      />
      <div className="latent-axes">
        <span className="ax ax-x">← web ········· hardware →</span>
        <span className="ax ax-y">↑ tooling ········· data ↓</span>
      </div>
    </div>
  );
}

window.LatentField = LatentField;

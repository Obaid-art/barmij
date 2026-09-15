/* Barmij figure engine (B57) — the founder's manuscript language, generated:
   role-colored token boxes, arrows, effects. Four generators, one style, every world.
   Roles: k = Python's word (blue, solid) · n = name you invent (lavender, dotted)
          v = value (amber, dashed) · i = plain ink (no box) · e = effect (rose, double) */
"use strict";

const BF = (() => {
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const ROLE = {
    k: { f: "#d9e8f5", s: "#0072B2", t: "#005E94", dash: "" },
    n: { f: "#f4e1ec", s: "#CC79A7", t: "#8E4A72", dash: "3 3" },
    v: { f: "#f9ecd2", s: "#E69F00", t: "#8F6400", dash: "6 3" },
    e: { f: "#f8e0d2", s: "#D55E00", t: "#A84300", dash: "" },
  };
  const CW = 9.9;                     /* mono char width at 16.5px */
  const STYLE = `<style>.bfm{font:700 16.5px "JetBrains Mono",Consolas,monospace}
    .bfs{font:600 12.5px Nunito,sans-serif;fill:#5d6a78}.bfb{font:800 13px Nunito,sans-serif}</style>`;
  const ARROW = (id) => `<defs><marker id="${id}" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
    <path d="M0,0 L8,4.5 L0,9 z" fill="#8b97a5"/></marker></defs>`;

  function tokenBox(x, y, tok, small) {
    const fs = small ? 14.5 : 16.5, cw = small ? 8.7 : CW, h = small ? 28 : 34;
    const w = tok.c.length * cw + (tok.r === "i" ? 0 : 18);
    let svg = "";
    if (tok.r !== "i") {
      const R = ROLE[tok.r];
      svg += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="${R.f}" stroke="${R.s}" stroke-width="1.6"${R.dash ? ` stroke-dasharray="${R.dash}"` : ""}${tok.r === "e" ? ` stroke-width="1.6"` : ""}/>`;
      if (tok.r === "e") svg += `<rect x="${x + 3}" y="${y + 3}" width="${w - 6}" height="${h - 6}" rx="6" fill="none" stroke="${R.s}" stroke-width="1.2"/>`;
      svg += `<text x="${x + 9}" y="${y + h / 2 + 5.5}" class="bfm" font-size="${fs}" fill="${R.t}">${esc(tok.c)}</text>`;
    } else {
      svg += `<text x="${x}" y="${y + h / 2 + 5.5}" class="bfm" font-size="${fs}" fill="#2e3a46">${esc(tok.c)}</text>`;
    }
    return { svg, w };
  }

  /* 1 ── ANATOMY: one line of code, each part boxed by role, labels beneath, arrow → effect */
  function anat(o) {
    const y = 26;
    let x = 14, boxes = [], svg = "";
    for (const tok of o.p) {
      const b = tokenBox(x, y, tok);
      boxes.push({ x, w: b.w, tok });
      svg += b.svg;
      x += b.w + (tok.r === "i" ? 4 : 7);
    }
    let effEnd = x;
    if (o.eff) {
      const ax = x + 8;
      svg += `<line x1="${ax}" y1="${y + 17}" x2="${ax + 44}" y2="${y + 17}" stroke="#8b97a5" stroke-width="2.5" marker-end="url(#bfa)"/>`;
      const b = tokenBox(ax + 54, y, { c: o.eff, r: "e" });
      svg += b.svg;
      effEnd = ax + 54 + b.w;
      if (o.effl) svg += `<text x="${ax + 54}" y="${y + 58}" class="bfs">${esc(o.effl)}</text>`;
    }
    /* labels: staggered on two shelves so they never collide */
    let shelf = 0, lastEnd = -999, maxShelf = 0;
    for (const b of boxes) {
      if (!b.tok.l) continue;
      const cx = b.x + b.w / 2;
      const lw = b.tok.l.length * 6.4;
      shelf = (cx - lw / 2 < lastEnd + 12) ? 1 - shelf : 0;
      maxShelf = Math.max(maxShelf, shelf);
      const ly = y + 58 + shelf * 20;
      svg += `<line x1="${cx}" y1="${y + 36}" x2="${cx}" y2="${ly - 11}" stroke="#c9d1dc" stroke-width="1.5"/>`;
      svg += `<text x="${cx}" y="${ly}" class="bfs" text-anchor="middle">${esc(b.tok.l)}</text>`;
      lastEnd = cx + lw / 2;
    }
    const W = Math.max(effEnd + 14, 300), H = y + 72 + maxShelf * 20;
    return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img">${STYLE}${ARROW("bfa")}${svg}</svg>`;
  }

  /* 2 ── SLOTS: a box of treasures — name tag, value slots, index numbers under each */
  function slots(o) {
    let svg = "", x = 14;
    const y = 22;
    if (o.name) {
      const b = tokenBox(x, y, { c: o.name, r: "n" });
      svg += b.svg; x += b.w + 6;
      const eq = tokenBox(x, y, { c: "=", r: "i" });
      svg += eq.svg; x += eq.w + 8;
    }
    o.items.forEach((it, i) => {
      const b = tokenBox(x, y, { c: it, r: "v" });
      svg += b.svg;
      if (o.idx !== false) {
        svg += `<line x1="${x + b.w / 2}" y1="${y + 36}" x2="${x + b.w / 2}" y2="${y + 46}" stroke="#c9d1dc" stroke-width="1.5"/>`;
        svg += `<text x="${x + b.w / 2}" y="${y + 62}" class="bfb" text-anchor="middle" fill="#005E94">${i}</text>`;
        svg += `<text x="${x + b.w / 2}" y="${y + 76}" class="bfs" text-anchor="middle" font-size="10.5">slot</text>`;
      }
      x += b.w + 8;
    });
    if (o.note) svg += `<text x="14" y="${y + 98}" class="bfs">${esc(o.note)}</text>`;
    const W = Math.max(x + 8, 300), H = o.note ? y + 108 : y + 86;
    return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img">${STYLE}${svg}</svg>`;
  }

  /* 3 ── CYCLE: steps around a loop with curved arrows — heartbeats, while-promises, repeats */
  function cycle(o) {
    const n = o.steps.length, r = 66;
    const W = Math.max(420, (o.note || "").length * 6.4 + 28);
    const cx = W / 2, cy = 96;
    let svg = "";
    if (o.title) svg += `<text x="${cx}" y="${cy + 5}" class="bfb" text-anchor="middle" fill="#8E4A72">${esc(o.title)}</text>`;
    const pos = o.steps.map((s, i) => {
      const ang = -Math.PI / 2 + (i * 2 * Math.PI) / n;
      return { x: cx + Math.cos(ang) * (r + 44), y: cy + Math.sin(ang) * (r - 10), s };
    });
    pos.forEach((p, i) => {
      const w = p.s.length * 7.3 + 18;
      svg += `<rect x="${p.x - w / 2}" y="${p.y - 14}" width="${w}" height="28" rx="9" fill="#d9e8f5" stroke="#0072B2" stroke-width="1.5"/>`;
      svg += `<text x="${p.x}" y="${p.y + 5}" class="bfs" text-anchor="middle" fill="#005E94" font-weight="800">${esc(p.s)}</text>`;
    });
    pos.forEach((p, i) => {
      const q = pos[(i + 1) % n];
      const mx = (p.x + q.x) / 2 + (cx - (p.x + q.x) / 2) * -0.55;
      const my = (p.y + q.y) / 2 + (cy - (p.y + q.y) / 2) * -0.55;
      svg += `<path d="M ${p.x} ${p.y + (p.y < cy ? 16 : -16)} Q ${mx} ${my} ${q.x} ${q.y + (q.y < cy ? 16 : -16)}" fill="none" stroke="#9c86cf" stroke-width="2" marker-end="url(#bfc)"/>`;
    });
    if (o.note) svg += `<text x="${cx}" y="196" class="bfs" text-anchor="middle">${esc(o.note)}</text>`;
    return `<svg viewBox="0 0 ${W} ${o.note ? 206 : 190}" xmlns="http://www.w3.org/2000/svg" role="img">${STYLE}${ARROW("bfc")}${svg}</svg>`;
  }

  /* 4 ── ROWS: little pipelines — [label] code → result, stacked. The workhorse. */
  function rows(o) {
    let svg = "", maxW = 300;
    const labW = Math.max(0, ...o.rows.map(r => (r.lab || "").length)) * 6.6 + (o.rows.some(r => r.lab) ? 16 : 0);
    o.rows.forEach((row, i) => {
      const y = 14 + i * 46;
      let x = 14;
      if (row.lab) {
        svg += `<text x="${x}" y="${y + 19}" class="bfs" font-weight="800">${esc(row.lab)}</text>`;
      }
      x = 14 + labW;
      for (const tok of (row.code || [])) {
        const b = tokenBox(x, y, tok, true);
        svg += b.svg;
        x += b.w + (tok.r === "i" ? 3 : 6);
      }
      if (row.res !== undefined) {
        svg += `<line x1="${x + 6}" y1="${y + 14}" x2="${x + 40}" y2="${y + 14}" stroke="#8b97a5" stroke-width="2.2" marker-end="url(#bfr)"/>`;
        const b = tokenBox(x + 48, y, { c: row.res, r: row.plain ? "i" : "e" }, true);
        svg += b.svg;
        x = x + 48 + b.w;
      }
      maxW = Math.max(maxW, x + 14);
    });
    let H = 14 + o.rows.length * 46;
    if (o.note) { svg += `<text x="14" y="${H + 8}" class="bfs">${esc(o.note)}</text>`; H += 20; }
    return `<svg viewBox="0 0 ${maxW} ${H + 4}" xmlns="http://www.w3.org/2000/svg" role="img">${STYLE}${ARROW("bfr")}${svg}</svg>`;
  }

  return (o) => {
    try {
      if (o.k === "anat") return anat(o);
      if (o.k === "slots") return slots(o);
      if (o.k === "cycle") return cycle(o);
      if (o.k === "rows") return rows(o);
    } catch (e) { console.error("figure engine", e); }
    return "";
  };
})();

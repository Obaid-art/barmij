/* Barmij figure engine (B57, animated B58) — the founder's manuscript language, generated
   AND staged: every figure builds itself piece by piece, fair-paced, so children SEE the
   mechanism happen. Reduced-motion users get everything instantly (global charter rule).
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
  const CW = 9.9;
  const STYLE = `<style>.bfm{font:700 16.5px "JetBrains Mono",Consolas,monospace}
    .bfs{font:600 12.5px Nunito,sans-serif;fill:#5d6a78}.bfb{font:800 13px Nunito,sans-serif}
    .bfin{opacity:0;animation:bfmv .5s ease forwards}
    @keyframes bfmv{from{opacity:0;transform:translateY(7px)}to{opacity:1;transform:translateY(0)}}</style>`;
  const ARROW = (id) => `<defs><marker id="${id}" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
    <path d="M0,0 L8,4.5 L0,9 z" fill="#8b97a5"/></marker></defs>`;
  /* one staged group: appears after d seconds */
  const G = (d, inner) => `<g class="bfin" style="animation-delay:${d.toFixed(2)}s">${inner}</g>`;

  function tokenBox(x, y, tok, small) {
    const fs = small ? 14.5 : 16.5, cw = small ? 8.7 : CW, h = small ? 28 : 34;
    const w = tok.c.length * cw + (tok.r === "i" ? 0 : 18);
    let svg = "";
    if (tok.r !== "i") {
      const R = ROLE[tok.r];
      svg += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="${R.f}" stroke="${R.s}" stroke-width="1.6"${R.dash ? ` stroke-dasharray="${R.dash}"` : ""}/>`;
      if (tok.r === "e") svg += `<rect x="${x + 3}" y="${y + 3}" width="${w - 6}" height="${h - 6}" rx="6" fill="none" stroke="${R.s}" stroke-width="1.2"/>`;
      svg += `<text x="${x + 9}" y="${y + h / 2 + 5.5}" class="bfm" font-size="${fs}" fill="${R.t}">${esc(tok.c)}</text>`;
    } else {
      svg += `<text x="${x}" y="${y + h / 2 + 5.5}" class="bfm" font-size="${fs}" fill="#2e3a46">${esc(tok.c)}</text>`;
    }
    return { svg, w };
  }

  /* 1 ── ANATOMY: parts appear one by one (label with its part), then the arrow, then what happens */
  function anat(o) {
    const y = 26;
    let x = 14, svg = "", d = 0;
    let shelf = 0, lastEnd = -999, maxShelf = 0;
    for (const tok of o.p) {
      const b = tokenBox(x, y, tok);
      let piece = b.svg;
      if (tok.l) {
        const cx = x + b.w / 2, lw = tok.l.length * 6.4;
        shelf = (cx - lw / 2 < lastEnd + 12) ? 1 - shelf : 0;
        maxShelf = Math.max(maxShelf, shelf);
        const ly = y + 58 + shelf * 20;
        piece += `<line x1="${cx}" y1="${y + 36}" x2="${cx}" y2="${ly - 11}" stroke="#c9d1dc" stroke-width="1.5"/>`;
        piece += `<text x="${cx}" y="${ly}" class="bfs" text-anchor="middle">${esc(tok.l)}</text>`;
        lastEnd = cx + lw / 2;
      }
      svg += G(d, piece);
      if (tok.r !== "i") d += 0.55;
      x += b.w + (tok.r === "i" ? 4 : 7);
    }
    let effEnd = x;
    if (o.eff) {
      const ax = x + 8;
      svg += G(d + 0.15, `<line x1="${ax}" y1="${y + 17}" x2="${ax + 44}" y2="${y + 17}" stroke="#8b97a5" stroke-width="2.5" marker-end="url(#bfa)"/>`);
      const b = tokenBox(ax + 54, y, { c: o.eff, r: "e" });
      let piece = b.svg;
      if (o.effl) piece += `<text x="${ax + 54}" y="${y + 58}" class="bfs">${esc(o.effl)}</text>`;
      svg += G(d + 0.65, piece);
      effEnd = ax + 54 + b.w;
    }
    const W = Math.max(effEnd + 14, 300), H = y + 72 + maxShelf * 20;
    return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img">${STYLE}${ARROW("bfa")}${svg}</svg>`;
  }

  /* 2 ── SLOTS: the box fills treasure by treasure, numbers arrive with each slot */
  function slots(o) {
    let svg = "", x = 14, d = 0;
    const y = 22;
    if (o.name) {
      const b = tokenBox(x, y, { c: o.name, r: "n" });
      const eq = tokenBox(x + b.w + 6, y, { c: "=", r: "i" });
      svg += G(0, b.svg + eq.svg);
      x += b.w + 6 + eq.w + 8;
      d = 0.35;
    }
    o.items.forEach((it, i) => {
      const b = tokenBox(x, y, { c: it, r: "v" });
      let piece = b.svg;
      if (o.idx !== false) {
        piece += `<line x1="${x + b.w / 2}" y1="${y + 36}" x2="${x + b.w / 2}" y2="${y + 46}" stroke="#c9d1dc" stroke-width="1.5"/>`;
        piece += `<text x="${x + b.w / 2}" y="${y + 62}" class="bfb" text-anchor="middle" fill="#005E94">${i}</text>`;
        piece += `<text x="${x + b.w / 2}" y="${y + 76}" class="bfs" text-anchor="middle" font-size="10.5">slot</text>`;
      }
      svg += G(d + i * 0.4, piece);
      x += b.w + 8;
    });
    if (o.note) svg += G(d + o.items.length * 0.4 + 0.3, `<text x="14" y="${y + 98}" class="bfs">${esc(o.note)}</text>`);
    const W = Math.max(x + 8, 300), H = o.note ? y + 108 : y + 86;
    return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img">${STYLE}${svg}</svg>`;
  }

  /* 3 ── CYCLE: steps land around the circle, then the arrows connect them — the loop turns */
  function cycle(o) {
    const n = o.steps.length, r = 66;
    const W = Math.max(420, (o.note || "").length * 6.4 + 28);
    const cx = W / 2, cy = 96;
    let svg = "";
    if (o.title) svg += G(0, `<text x="${cx}" y="${cy + 5}" class="bfb" text-anchor="middle" fill="#8E4A72">${esc(o.title)}</text>`);
    const pos = o.steps.map((s, i) => {
      const ang = -Math.PI / 2 + (i * 2 * Math.PI) / n;
      return { x: cx + Math.cos(ang) * (r + 44), y: cy + Math.sin(ang) * (r - 10), s };
    });
    pos.forEach((p, i) => {
      const w = p.s.length * 7.3 + 18;
      svg += G(0.3 + i * 0.55,
        `<rect x="${p.x - w / 2}" y="${p.y - 14}" width="${w}" height="28" rx="9" fill="#d9e8f5" stroke="#0072B2" stroke-width="1.5"/>` +
        `<text x="${p.x}" y="${p.y + 5}" class="bfs" text-anchor="middle" fill="#005E94" font-weight="800">${esc(p.s)}</text>`);
    });
    const arrD = 0.3 + n * 0.55 + 0.25;
    pos.forEach((p, i) => {
      const q = pos[(i + 1) % n];
      const mx = (p.x + q.x) / 2 + (cx - (p.x + q.x) / 2) * -0.55;
      const my = (p.y + q.y) / 2 + (cy - (p.y + q.y) / 2) * -0.55;
      svg += G(arrD + i * 0.2, `<path d="M ${p.x} ${p.y + (p.y < cy ? 16 : -16)} Q ${mx} ${my} ${q.x} ${q.y + (q.y < cy ? 16 : -16)}" fill="none" stroke="#9c86cf" stroke-width="2" marker-end="url(#bfc)"/>`);
    });
    if (o.note) svg += G(arrD + n * 0.2 + 0.3, `<text x="${cx}" y="196" class="bfs" text-anchor="middle">${esc(o.note)}</text>`);
    return `<svg viewBox="0 0 ${W} ${o.note ? 206 : 190}" xmlns="http://www.w3.org/2000/svg" role="img">${STYLE}${ARROW("bfc")}${svg}</svg>`;
  }

  /* 4 ── ROWS: each row's code lands first, THEN its arrow and result — cause before effect */
  function rows(o) {
    let svg = "", maxW = 300;
    const labW = Math.max(0, ...o.rows.map(r => (r.lab || "").length)) * 6.6 + (o.rows.some(r => r.lab) ? 16 : 0);
    o.rows.forEach((row, i) => {
      const y = 14 + i * 46;
      const dRow = i * 0.85, dRes = dRow + 0.5;
      let x = 14, codePiece = "";
      if (row.lab) codePiece += `<text x="${x}" y="${y + 19}" class="bfs" font-weight="800">${esc(row.lab)}</text>`;
      x = 14 + labW;
      for (const tok of (row.code || [])) {
        const b = tokenBox(x, y, tok, true);
        codePiece += b.svg;
        x += b.w + (tok.r === "i" ? 3 : 6);
      }
      svg += G(dRow, codePiece);
      if (row.res !== undefined) {
        let resPiece = `<line x1="${x + 6}" y1="${y + 14}" x2="${x + 40}" y2="${y + 14}" stroke="#8b97a5" stroke-width="2.2" marker-end="url(#bfr)"/>`;
        const b = tokenBox(x + 48, y, { c: row.res, r: row.plain ? "i" : "e" }, true);
        resPiece += b.svg;
        svg += G(dRes, resPiece);
        x = x + 48 + b.w;
      }
      maxW = Math.max(maxW, x + 14);
    });
    let H = 14 + o.rows.length * 46;
    if (o.note) { svg += G(o.rows.length * 0.85 + 0.4, `<text x="14" y="${H + 8}" class="bfs">${esc(o.note)}</text>`); H += 20; }
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

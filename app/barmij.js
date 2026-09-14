/* Barmij player: real Python (Pyodide) + animated turtle canvas + honest, friendly feedback. */
"use strict";

/* ---------------- i18n (chrome labels only; lesson content EN for now) ---------------- */
const STR = {
  en: { journey: "🗺️ Journey", run: "▶ Run", reset: "Reset code", hint: "💡 Hint", next: "Next lesson →",
        task: "Your mission", predict: "🔮 Predict first", loading: "Waking Python up… (first time takes a moment)",
        world: "World 1 — First Lines", worldSub: "Real Python. Real drawings. Your first six spells.",
        editor: "Your code", locked: "Finish the lesson before this one first 🙂", lang: "عربي",
        storyGo: "Yalla — continue ▸", skip: "Skip to the mission ▸" },
  ar: { journey: "🗺️ الرحلة", run: "▶ شغّل", reset: "أعد الكود", hint: "💡 تلميح", next: "الدرس التالي ←",
        task: "مهمتك", predict: "🔮 توقّع أولاً", loading: "بايثون يستيقظ… (أول مرة تأخذ لحظات)",
        world: "العالم ١ — الأسطر الأولى", worldSub: "بايثون حقيقي. رسومات حقيقية. تعاويذك الست الأولى.",
        editor: "كودك", locked: "أنهِ الدرس السابق أولاً 🙂", lang: "English",
        storyGo: "يلا — تابع ◂", skip: "انتقل إلى المهمة ◂" },
};
let lang = localStorage.getItem("barmij_lang") || "en";

/* ---------------- state ---------------- */
const PROG_KEY = "barmij_v1_progress";
let progress = JSON.parse(localStorage.getItem(PROG_KEY) || "{}");
let current = 0;
let pyodide = null, pyReady = false;
let runsThisLesson = 0, hintsUsed = 0, hintIndex = 0;
let editor = null;
let stdoutBuf = "";

/* ---------------- python preamble: the turtle ---------------- */
const PREAMBLE = `
import math, json
_cmds = []
_state = {}
def reset():
    global _cmds, _state
    _cmds = []
    _state = {"x":0.0,"y":0.0,"h":0.0,"pen":True,"color":"#5b8dc9","width":4}
def forward(d):
    x2 = _state["x"] + d*math.sin(math.radians(_state["h"]))
    y2 = _state["y"] + d*math.cos(math.radians(_state["h"]))
    if _state["pen"]:
        _cmds.append({"t":"line","x1":_state["x"],"y1":_state["y"],"x2":x2,"y2":y2,
                      "c":_state["color"],"w":_state["width"],"h":_state["h"]})
    _state["x"], _state["y"] = x2, y2
def back(d): forward(-d)
def right(a): _state["h"] = (_state["h"] + a) % 360
def left(a): right(-a)
def turn(a): right(a)
def color(c): _state["color"] = str(c)
def width(w): _state["width"] = max(1, float(w))
def penup(): _state["pen"] = False
def pendown(): _state["pen"] = True
def jump(x, y):
    _state["x"], _state["y"] = float(x), float(y)
def dot(r=8):
    _cmds.append({"t":"dot","x":_state["x"],"y":_state["y"],"r":float(r),"c":_state["color"]})
def _dump(): return json.dumps(_cmds)
import builtins as _bi
from js import window as _win
def _input(msg=""):
    ans = _win.prompt(str(msg))
    if ans is None:
        ans = ""
    print(str(msg) + "  \\u2192  " + str(ans))
    return str(ans)
_bi.input = _input
reset()
`;

/* ---------------- boot ---------------- */
window.addEventListener("DOMContentLoaded", async () => {
  editor = CodeMirror.fromTextArea(document.getElementById("code"), {
    mode: "python", theme: "barmij", lineNumbers: true, indentUnit: 4,
    autofocus: false, viewportMargin: Infinity,
  });
  document.getElementById("runBtn").addEventListener("click", run);
  document.getElementById("resetBtn").addEventListener("click", () => {
    editor.setValue(LESSONS[current].starter);
  });
  document.getElementById("hintBtn").addEventListener("click", showHint);
  document.getElementById("nextBtn").addEventListener("click", () => openLesson(current + 1));
  document.getElementById("demoWatchBtn").addEventListener("click", demoWatch);
  document.getElementById("demoAgainBtn").addEventListener("click", demoWatch);
  document.getElementById("demoHeroBtn").addEventListener("click", demoHero);
  document.getElementById("demoTakeBtn").addEventListener("click", demoTake);
  document.getElementById("demoSkipBtn").addEventListener("click", () => revealCodeStage(true));
  document.getElementById("storyGoBtn").addEventListener("click", storyGo);
  document.getElementById("demoCode").addEventListener("keydown", heroKey);
  document.getElementById("langBtn").addEventListener("click", () => {
    lang = lang === "en" ? "ar" : "en";
    localStorage.setItem("barmij_lang", lang);
    applyLang(); renderSidebar();
  });
  document.getElementById("bankBtn").addEventListener("click", openBank);
  document.getElementById("bankCount").textContent = CODEBANK.length;
  const toggleDrawer = () => document.body.classList.toggle("drawer-open");
  document.getElementById("journeyBtn").addEventListener("click", toggleDrawer);
  document.getElementById("drawerOverlay").addEventListener("click", toggleDrawer);
  applyLang();
  renderSidebar();
  renderRank();
  const last = parseInt(localStorage.getItem("barmij_last") || "0");
  openLesson(isUnlocked(last) ? last : 0, true);

  try {
    pyodide = await loadPyodide({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.2/full/" });
    pyodide.runPython(PREAMBLE);
    pyodide.setStdout({ batched: (s) => { stdoutBuf += s + "\n"; } });
    pyReady = true;
    document.getElementById("loading").style.display = "none";
    document.getElementById("runBtn").disabled = false;
  } catch (e) {
    document.getElementById("loading").textContent =
      "Python couldn't load — check the internet connection and refresh.";
  }
});

function applyLang() {
  const s = STR[lang];
  document.getElementById("runBtn").childNodes[0].textContent = s.run;
  document.getElementById("resetBtn").textContent = s.reset;
  document.getElementById("hintBtn").textContent = s.hint;
  document.getElementById("nextBtn").textContent = s.next;
  document.getElementById("editorTitle").textContent = s.editor;
  document.getElementById("journeyBtn").textContent = s.journey;
  document.getElementById("storyGoBtn").textContent = s.storyGo;
  document.getElementById("demoSkipBtn").textContent = s.skip;
  document.getElementById("langBtn").textContent = s.lang;
  if (!pyReady) document.getElementById("loading").textContent = s.loading;
}

/* ---------------- ranks — earned by mastery, never by age (DECISIONS B14) ---------------- */
const RANKS = [
  { key: "mustakshif", label: "مستكشف Mustakshif", icon: "🧭" },
  { key: "bannaa", label: "بنّاء Bannaa", icon: "🛠️" },
  { key: "raid", label: "رائد Ra'id", icon: "🦅" },
];
function worldComplete(w) { return w.lessons.every(ls => (progress[ls.id] || 0) > 0); }
function computeRank() {
  if (WORLDS.length >= 2 && worldComplete(WORLDS[0]) && worldComplete(WORLDS[1])) return 2;
  if (worldComplete(WORLDS[0])) return 1;
  return 0;
}
function renderRank() {
  const r = computeRank();
  const chip = document.getElementById("rankChip");
  chip.textContent = RANKS[r].icon + " " + RANKS[r].label;
  const prev = parseInt(localStorage.getItem("barmij_rank") || "0");
  if (r > prev) {
    localStorage.setItem("barmij_rank", String(r));
    chip.classList.remove("rankup"); void chip.offsetWidth; chip.classList.add("rankup");
    confetti();
    flashFeedback("ok", "🎖️ RANK UP — you are now " + RANKS[r].label + "! Earned, not given.");
  } else if (r < prev) {
    localStorage.setItem("barmij_rank", String(r));
  }
}

/* ---------------- the Code Bank (DECISIONS B17) ---------------- */
let bankMode = false, currentBankItem = null, bankFilter = "all";

function openBank() {
  bankMode = true; currentBankItem = null;
  document.getElementById("lessonPanel").style.display = "none";
  document.getElementById("bankPanel").style.display = "block";
  document.getElementById("demoCard").style.display = "none";
  setCodeStage(true); /* the bank IS the doing stage */
  document.getElementById("taskText").style.display = "none";
  document.getElementById("hintBox").style.display = "none";
  document.getElementById("nextWrap").style.display = "none";
  document.getElementById("feedback").className = "feedback";
  document.getElementById("bankBtn").classList.add("active");
  document.body.classList.remove("drawer-open");
  renderBank();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderBank() {
  const panel = document.getElementById("bankPanel");
  const items = CODEBANK.filter(it => bankFilter === "all" || it.rank === bankFilter);
  const FLT = [["all", "All"], ["m", "🧭 Mustakshif"], ["b", "🛠️ Bannaa"], ["r", "🦅 Ra'id"]];
  panel.innerHTML = `
    <h1>Code Bank</h1>
    <div class="sub">${CODEBANK.length} original programs — tap one, it runs, then remix it until it's yours.</div>
    <div class="bank-filters">${FLT.map(([k, l]) =>
      `<button data-f="${k}" class="${bankFilter === k ? "on" : ""}">${l}</button>`).join("")}</div>
    <div class="bank-grid">${items.map(it => `
      <div class="bank-card" data-id="${it.id}">
        <h3>${it.emoji} ${it.title}</h3>
        <div class="cap">${it.caption}</div>
        <div class="meta">
          <span class="rank-badge ${it.rank}">${it.rank === "m" ? "مستكشف" : it.rank === "b" ? "بنّاء" : "رائد"}</span>
          ${it.talks ? '<span class="talks-badge">🎤 talks to you</span>' : ""}
        </div>
      </div>`).join("")}</div>`;
  panel.querySelectorAll(".bank-filters button").forEach(b =>
    b.addEventListener("click", () => { bankFilter = b.dataset.f; renderBank(); }));
  panel.querySelectorAll(".bank-card").forEach(card =>
    card.addEventListener("click", () => {
      currentBankItem = CODEBANK.find(it => it.id === card.dataset.id);
      editor.setValue(currentBankItem.code);
      run();
    }));
}

/* ---------------- beats — the page writes itself, one idea at a time (charter §I) --------- */
const REDUCED_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
let beatIdx = 0;
let buildSession = 0;

/* a build beat: the code constructs itself letter by letter while the turtle explains each
   piece, then the effect appears — no code ever meets a child fully formed (DECISIONS B22) */
async function playBuild(container, build, instant) {
  const mySession = buildSession;
  const stage = container.querySelector(".build-code");
  const cap = container.querySelector(".build-cap");
  const eff = container.querySelector(".build-effect");
  const chars = [];
  build.steps.forEach((s, si) => {
    tokenizeRoles(s.text).forEach(c => chars.push({ ...c, step: si }));
  });
  instant = instant || REDUCED_MOTION || window._demoFast;
  let lastStep = -1;
  for (let i = 0; i <= chars.length; i++) {
    if (buildSession !== mySession) return;
    stage.innerHTML = "";
    chars.slice(0, i).forEach(c => {
      const sp = document.createElement("span");
      sp.className = c.cls; sp.textContent = c.ch;
      stage.appendChild(sp);
    });
    if (i < chars.length) {
      const cur = document.createElement("span");
      cur.className = "demo-cursor"; stage.appendChild(cur);
      const st = chars[i].step;
      if (st !== lastStep) {
        lastStep = st;
        cap.textContent = "🐢 " + build.steps[st].say;
        if (!instant) await sleep(1100);
      }
      if (!instant) await sleep(160 + Math.random() * 70);
    }
  }
  if (buildSession !== mySession) return;
  eff.style.display = "flex";
  cap.textContent = "🐢 " + (build.done || "…and that is what happens.");
  if (!instant) await sleep(500);
}

function renderBeats(ls) {
  const body = document.getElementById("lessonBody");
  body.innerHTML = "";
  const beats = ls.beats || [];
  beats.forEach((b, i) => {
    const div = document.createElement("div");
    div.className = "beat";
    div.dataset.i = i;
    let html = b.t;
    if (b.fig) html += `<figure>${FIG[b.fig]}${b.figcap ? `<figcaption>${b.figcap}</figcaption>` : ""}</figure>`;
    if (b.build) html += `<div class="build"><div class="build-code"></div><div class="build-cap"></div>
      <div class="build-effect"><span class="arrow">→</span><span class="chip">${b.build.effect}</span></div></div>`;
    div.innerHTML = html;
    body.appendChild(div);
  });
  const next = document.createElement("button");
  next.className = "beat-next"; next.id = "beatNext"; next.textContent = "tap ▸";
  next.addEventListener("click", () => revealBeat(beatIdx + 1));
  body.appendChild(next);
  const all = document.createElement("button");
  all.className = "show-all"; all.id = "showAllBtn"; all.textContent = "show everything";
  all.addEventListener("click", () => revealBeat(beats.length - 1, true));
  body.appendChild(all);
  beatIdx = -1;
  buildSession++;
  revealBeat(0);
}

function revealBeat(upto, instant) {
  const body = document.getElementById("lessonBody");
  const beats = body.querySelectorAll(".beat");
  if (!beats.length) { finishBeats(); return; }
  upto = Math.min(upto, beats.length - 1);
  for (let i = 0; i <= upto; i++) {
    const b = beats[i];
    if (!b.classList.contains("on")) {
      b.classList.add("on");
      if (REDUCED_MOTION || instant) b.classList.add("in");
      else requestAnimationFrame(() => requestAnimationFrame(() => b.classList.add("in")));
    }
  }
  beatIdx = upto;
  const next = document.getElementById("beatNext");
  const all = document.getElementById("showAllBtn");
  const finish = () => {
    if (next) next.remove();
    if (all) all.remove();
    finishBeats();
  };
  const proceed = () => {
    if (upto >= beats.length - 1) { finish(); return; }
    body.appendChild(next); body.appendChild(all); /* keep controls below the newest beat */
    if (!instant) beats[upto].scrollIntoView({ behavior: REDUCED_MOTION ? "auto" : "smooth", block: "nearest" });
  };
  const b = beats[upto];
  const ls = LESSONS[current];
  const beatDef = (ls.beats || [])[upto];
  if (beatDef && beatDef.build && !b.dataset.played) {
    b.dataset.played = "1";
    /* controls step aside while the code builds itself */
    if (next) next.style.display = "none";
    if (all) all.style.display = "none";
    playBuild(b, beatDef.build, instant).then(() => {
      if (next) next.style.display = "";
      if (all) all.style.display = "";
      proceed();
    });
  } else {
    proceed();
  }
}

function finishBeats() {
  const ls = LESSONS[current];
  const pr = document.getElementById("predictBox");
  if (ls.predict) { pr.style.display = "block"; pr.innerHTML = `<b>${STR[lang].predict}:</b> ${ls.predict}`; }
  document.getElementById("storyGoBtn").style.display = "";
}

/* ---------------- staged reveal — the page grows as you go (DECISIONS B19) ---------------- */
const CODE_STAGE_IDS = ["taskText", "editorCard", "canvasCard"];
let lessonStage = 0; /* 0 story · 1 demo · 2 code */

function setCodeStage(visible) {
  CODE_STAGE_IDS.forEach(id => { document.getElementById(id).style.display = visible ? "" : "none"; });
}
function revealCodeStage(scroll) {
  lessonStage = 2;
  setCodeStage(true);
  document.getElementById("storyGoBtn").style.display = "none";
  if (scroll) document.getElementById("taskText").scrollIntoView({ behavior: "smooth", block: "center" });
}
function storyGo() {
  const ls = LESSONS[current];
  if (ls.demo && lessonStage === 0) {
    lessonStage = 1;
    document.getElementById("demoCard").style.display = "block";
    document.getElementById("storyGoBtn").style.display = "none";
    document.getElementById("demoCard").scrollIntoView({ behavior: "smooth", block: "center" });
  } else {
    revealCodeStage(true);
  }
}

/* ---------------- lessons & navigation ---------------- */
function isUnlocked(i) {
  if (i === 0) return true;
  if (i >= LESSONS.length) return false;
  return (progress[LESSONS[i - 1].id] || 0) > 0;
}

function renderSidebar() {
  const box = document.getElementById("lessonList");
  box.innerHTML = "";
  let i = 0;
  WORLDS.forEach((world, wi) => {
    const head = document.createElement("div");
    head.className = "world-title";
    if (wi > 0) head.style.marginTop = "16px";
    head.textContent = lang === "ar" && world.titleAr ? world.titleAr : world.title;
    const sub = document.createElement("div");
    sub.className = "world-sub";
    sub.textContent = world.sub;
    box.appendChild(head); box.appendChild(sub);
    world.lessons.forEach((ls, li) => {
      const idx = i++;
      const el = document.createElement("div");
      const stars = progress[ls.id] || 0;
      el.className = "lesson-item" + (idx === current ? " active" : "") + (isUnlocked(idx) ? "" : " locked");
      el.innerHTML = `<span class="num">${isUnlocked(idx) ? li + 1 : "🔒"}</span>
        <span>${ls.title}</span>
        <span class="stars">${"★".repeat(stars)}${"☆".repeat(stars ? 3 - stars : 0)}</span>`;
      el.addEventListener("click", () => {
        if (isUnlocked(idx)) openLesson(idx);
        else flashFeedback("err", STR[lang].locked);
      });
      box.appendChild(el);
    });
  });
}

function openLesson(i, keepQuiet) {
  if (i >= LESSONS.length || !isUnlocked(i)) return;
  bankMode = false; currentBankItem = null;
  document.getElementById("lessonPanel").style.display = "block";
  document.getElementById("bankPanel").style.display = "none";
  document.getElementById("taskText").style.display = "";
  document.getElementById("bankBtn").classList.remove("active");
  document.body.classList.remove("drawer-open");
  current = i;
  let wi = 0, li = i;
  for (const w of WORLDS) { if (li < w.lessons.length) break; li -= w.lessons.length; wi++; }
  document.getElementById("crumb").textContent =
    `${WORLDS[wi].title} · Lesson ${li + 1} of ${WORLDS[wi].lessons.length}`;
  localStorage.setItem("barmij_last", String(i));
  runsThisLesson = 0; hintsUsed = 0; hintIndex = 0;
  const ls = LESSONS[i];
  document.getElementById("lessonTitle").textContent = ls.title;
  document.getElementById("lessonSub").textContent = ls.subtitle;
  document.getElementById("taskText").innerHTML = `<b>${STR[lang].task}:</b> ${ls.task}`;
  document.getElementById("predictBox").style.display = "none";
  editor.setValue(ls.starter);
  initDemo(ls);
  /* staged reveal: beats first (storyGo appears when they finish), then demo, then mission */
  lessonStage = 0;
  document.getElementById("demoCard").style.display = "none";
  setCodeStage(false);
  document.getElementById("storyGoBtn").style.display = "none";
  renderBeats(ls);
  document.getElementById("hintBox").style.display = "none";
  document.getElementById("feedback").className = "feedback";
  document.getElementById("nextWrap").style.display = "none";
  clearOutputs(); clearCanvas();
  renderSidebar();
  if (!keepQuiet) window.scrollTo({ top: 0, behavior: "smooth" });
}

function showHint() {
  const hints = LESSONS[current].hints;
  const box = document.getElementById("hintBox");
  box.style.display = "block";
  box.textContent = "💡 " + hints[Math.min(hintIndex, hints.length - 1)];
  hintIndex++; hintsUsed++;
  box.scrollIntoView({ behavior: "smooth", block: "center" });
}

/* ---------------- running code ---------------- */
async function run() {
  if (!pyReady) return;
  runsThisLesson++;
  clearOutputs(); clearCanvas();
  document.getElementById("feedback").className = "feedback";
  stdoutBuf = "";
  const code = editor.getValue();
  let cmds = [];
  try {
    pyodide.runPython("reset()");
    await pyodide.runPythonAsync(code);
    cmds = JSON.parse(pyodide.runPython("_dump()"));
  } catch (err) {
    showError(err);
    return;
  }
  renderStdout();
  await animate(cmds);
  const lines = cmds.filter(c => c.t === "line");
  const fb = document.getElementById("feedback");
  if (bankMode) {
    fb.className = "feedback ok";
    fb.textContent = "✨ It ran! " + (currentBankItem ? "Remix idea: " + currentBankItem.remix : "Change a number and run again — that's how it becomes yours.");
    fb.scrollIntoView({ behavior: "smooth", block: "nearest" });
    return;
  }
  const verdict = LESSONS[current].check({ cmds, lines, code, stdout: stdoutBuf });
  if (verdict.pass) {
    const YAY = ["Mumtaz! 🌟", "Ya salam! ✨", "Wallah, beautiful! 🎨", "Genius! 🧠", "Masha'Allah! 🌙", "Yalla, look at that! 🚀"];
    fb.className = "feedback ok";
    fb.textContent = "✅ " + YAY[(Math.random() * YAY.length) | 0] + " " + verdict.msg;
    const stars = hintsUsed === 0 ? (runsThisLesson <= 2 ? 3 : 2) : 1;
    if (stars > (progress[LESSONS[current].id] || 0)) {
      progress[LESSONS[current].id] = stars;
      localStorage.setItem(PROG_KEY, JSON.stringify(progress));
    }
    renderSidebar();
    renderRank();
    confetti();
    if (current + 1 < LESSONS.length) document.getElementById("nextWrap").style.display = "block";
  } else {
    fb.className = "feedback err";
    fb.textContent = "🧭 " + verdict.msg;
  }
  fb.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function renderStdout() {
  const out = document.getElementById("outputs");
  stdoutBuf.split("\n").filter(s => s.trim().length).forEach(line => {
    const b = document.createElement("div");
    b.className = "bubble"; b.textContent = line;
    out.appendChild(b);
  });
}

function clearOutputs() { document.getElementById("outputs").innerHTML = ""; }

/* ---------------- friendly errors (real one kept underneath — honesty) ---------------- */
function friendly(msg) {
  const last = msg.trim().split("\n").filter(s => s.trim()).pop() || "";
  let m;
  if ((m = last.match(/NameError: name '(.+?)' is not defined/)))
    return `Python doesn't know the word "${m[1]}". Magic words must be spelled exactly — like forward, right, color, print.`;
  if (/was never closed|unexpected EOF/i.test(last))
    return "A bracket ( ) or quote \" \" was opened but never closed. Every opener needs its twin.";
  if (/unterminated string/i.test(last))
    return "A quote \" was opened but never closed — your words need a quote on BOTH sides.";
  if (/IndentationError|expected an indented block/.test(last))
    return "The spaces at the start of a line confused Python. Lines inside a loop need 4 spaces in front — and lines outside need none.";
  if (/TypeError: .*missing \d+ required/.test(last))
    return "This magic word needs something inside its brackets — like forward(100).";
  if (/ZeroDivisionError/.test(last))
    return "You divided by zero! Even computers can't do that one 🙂";
  if (/SyntaxError/.test(last))
    return "Python couldn't read that line — check it letter by letter: brackets, quotes, and the : at the end of a for line.";
  return "Something confused Python. Read the real message below — the LAST line usually says what and where.";
}

function showError(err) {
  const fb = document.getElementById("feedback");
  fb.className = "feedback err";
  const msg = String(err.message || err);
  fb.innerHTML = "";
  const head = document.createElement("div");
  head.textContent = "🤔 " + friendly(msg);
  const det = document.createElement("details");
  det.innerHTML = `<summary class="real">what Python really said (real programmers read these!)</summary>`;
  const pre = document.createElement("pre");
  pre.textContent = msg.split("\n").slice(-12).join("\n");
  det.appendChild(pre);
  fb.appendChild(head); fb.appendChild(det);
}

/* ---------------- canvas & animation ---------------- */
const cv = () => document.getElementById("world");
function setupCanvas() {
  const c = cv(), dpr = window.devicePixelRatio || 1;
  const w = c.clientWidth || 640, h = 460;
  c.width = w * dpr; c.height = h * dpr;
  const ctx = c.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, w * dpr / 2, h * dpr / 2);
  ctx.lineCap = "round"; ctx.lineJoin = "round";
  return ctx;
}
function clearCanvas() {
  const ctx = setupCanvas();
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, cv().width, cv().height); ctx.restore();
}
/* logical coords: y up, origin center → canvas: (x, -y) */
function drawSeg(ctx, s, t) { /* t in [0,1] */
  const x2 = s.x1 + (s.x2 - s.x1) * t, y2 = s.y1 + (s.y2 - s.y1) * t;
  ctx.strokeStyle = s.c; ctx.lineWidth = s.w;
  ctx.beginPath(); ctx.moveTo(s.x1, -s.y1); ctx.lineTo(x2, -y2); ctx.stroke();
  return { x: x2, y: y2 };
}
function drawTurtle(ctx, x, y, hdeg) {
  const h = (90 - hdeg) * Math.PI / 180; /* logical heading → math angle */
  ctx.save();
  ctx.translate(x, -y); ctx.rotate(-h + Math.PI / 2);
  ctx.fillStyle = "#3f9d6e";
  ctx.beginPath(); ctx.moveTo(0, -10); ctx.lineTo(7, 8); ctx.lineTo(-7, 8); ctx.closePath(); ctx.fill();
  ctx.restore();
}
function drawAll(segs) {
  const ctx = setupCanvas();
  for (const s of segs) {
    if (s.t === "dot") { ctx.fillStyle = s.c; ctx.beginPath(); ctx.arc(s.x, -s.y, s.r, 0, 7); ctx.fill(); }
    else drawSeg(ctx, s, 1);
  }
}
function animate(cmds) {
  return new Promise((resolve) => {
    const segs = cmds;
    if (!segs.length) { resolve(); return; }
    const totalLen = segs.reduce((a, s) => a + (s.t === "line" ? Math.hypot(s.x2 - s.x1, s.y2 - s.y1) : 20), 0);
    const dur = Math.min(5000, Math.max(700, totalLen * 2.2));
    const t0 = performance.now();
    let done = false;
    const finish = () => { if (done) return; done = true; drawAll(segs); resolve(); };
    /* rAF pauses in hidden tabs — the watchdog guarantees completion */
    setTimeout(finish, dur + 600);
    if (document.hidden) { finish(); return; }
    function frame(now) {
      if (done) return;
      const p = Math.min(1, (now - t0) / dur);
      const drawnLen = totalLen * (1 - Math.pow(1 - p, 2)); /* ease-out */
      const ctx = setupCanvas();
      ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, cv().width, cv().height); ctx.restore();
      let acc = 0, tip = null, tipH = 0;
      for (const s of segs) {
        const L = s.t === "line" ? Math.hypot(s.x2 - s.x1, s.y2 - s.y1) : 20;
        if (s.t === "dot") {
          if (acc + L <= drawnLen) { ctx.fillStyle = s.c; ctx.beginPath(); ctx.arc(s.x, -s.y, s.r, 0, 7); ctx.fill(); tip = { x: s.x, y: s.y }; }
        } else if (acc + L <= drawnLen) {
          tip = drawSeg(ctx, s, 1); tipH = s.h;
        } else if (acc < drawnLen) {
          tip = drawSeg(ctx, s, (drawnLen - acc) / L); tipH = s.h;
        } else break;
        acc += L;
      }
      if (tip && p < 1) drawTurtle(ctx, tip.x, tip.y, tipH);
      if (p < 1) requestAnimationFrame(frame);
      else finish();
    }
    requestAnimationFrame(frame);
  });
}

/* ---------------- "Watch, then try" guided typing (DECISIONS B13) ---------------- */
const KW = new Set(["print", "input", "if", "elif", "else", "for", "in", "range", "import",
  "int", "str", "while", "def", "return", "forward", "back", "right", "left", "turn",
  "color", "width", "penup", "pendown", "jump", "dot", "randint", "choice"]);

function tokenizeRoles(text) {
  const out = [];
  let i = 0;
  while (i < text.length) {
    const rest = text.slice(i);
    let m;
    if ((m = rest.match(/^"[^"\n]*"?/))) { for (const ch of m[0]) out.push({ ch, cls: "r-val" }); i += m[0].length; }
    else if ((m = rest.match(/^\d+(\.\d+)?/))) { for (const ch of m[0]) out.push({ ch, cls: "r-val" }); i += m[0].length; }
    else if ((m = rest.match(/^[A-Za-z_]\w*/))) {
      const cls = KW.has(m[0]) ? "r-kw" : "r-name";
      for (const ch of m[0]) out.push({ ch, cls }); i += m[0].length;
    }
    else { out.push({ ch: rest[0], cls: "r-ink" }); i += 1; }
  }
  return out;
}

const demo = { state: "idle", chars: [], pos: 0, wrong: 0, session: 0, heroText: "" };
const $d = (id) => document.getElementById(id);

function initDemo(ls) {
  demo.session++;
  const card = $d("demoCard");
  card.style.display = "none"; /* stage logic (storyGo) reveals it when its turn comes */
  if (!ls.demo) return;
  demo.state = "idle";
  demo.heroText = ls.demo.steps.map(s => s.text).join("");
  demo.chars = [];
  let pos = 0;
  ls.demo.steps.forEach((step, si) => {
    for (const t of tokenizeRoles(step.text)) demo.chars.push({ ...t, step: si });
    pos += step.text.length;
  });
  demo.pos = 0; demo.wrong = 0;
  if ((ls.beats || []).some(b => b.build)) {
    /* the build beat already showed the construction — go straight to the hero */
    $d("demoSay").innerHTML = "You watched it build itself. Now — <b>your turn, hero.</b> ✍️";
    demoButtons("watched");
  } else {
    $d("demoSay").innerHTML = "Watch my fingers first — then it's your turn, hero.";
    demoButtons("idle");
  }
  renderDemoCode(0, false);
}

function demoButtons(state) {
  demo.state = state;
  $d("demoWatchBtn").style.display = state === "idle" ? "" : "none";
  $d("demoHeroBtn").style.display = (state === "watched") ? "" : "none";
  $d("demoAgainBtn").style.display = (state === "watched" || state === "hero" || state === "done") ? "" : "none";
  $d("demoTakeBtn").style.display = state === "done" ? "" : "none";
  $d("demoSkipBtn").style.display =
    (lessonStage < 2 && (state === "idle" || state === "watched" || state === "hero")) ? "" : "none";
}

function renderDemoCode(upto, heroMode) {
  const pre = $d("demoCode");
  pre.innerHTML = "";
  demo.chars.forEach((c, i) => {
    const span = document.createElement("span");
    if (i < upto) { span.className = c.cls; span.textContent = c.ch; }
    else if (heroMode) { span.className = "ghost"; span.textContent = c.ch === "\n" ? "⏎\n" : c.ch; }
    else return;
    pre.appendChild(span);
    if (i === upto - 1 || (upto === 0 && i === 0)) { /* cursor added after loop */ }
  });
  const cur = document.createElement("span");
  cur.className = "demo-cursor"; cur.id = "demoCursor";
  const spans = pre.querySelectorAll("span:not(.demo-cursor)");
  if (upto === 0) pre.insertBefore(cur, pre.firstChild);
  else if (heroMode && upto < demo.chars.length) {
    let seen = 0, ref = null;
    for (const s of spans) { if (seen === upto) { ref = s; break; } seen++; }
    pre.insertBefore(cur, ref);
  } else pre.appendChild(cur);
}

async function demoWatch() {
  const mySession = ++demo.session;
  demoButtons("watching");
  /* a child's watching pace: ~4-5 characters per second, with a breath at each word break */
  const speed = 175;
  let lastStep = -1;
  for (let i = 0; i <= demo.chars.length; i++) {
    if (demo.session !== mySession) return; /* aborted by navigation or restart */
    renderDemoCode(i, false);
    if (i < demo.chars.length) {
      const st = demo.chars[i].step;
      if (st !== lastStep) {
        lastStep = st;
        $d("demoSay").textContent = LESSONS[current].demo.steps[st].say;
        if (!window._demoFast) await new Promise(r => setTimeout(r, 1100));
      }
      if (!window._demoFast) {
        const ch = demo.chars[i].ch;
        const extra = (ch === " " || ch === "\n") ? 320 : 0;
        await new Promise(r => setTimeout(r, speed + extra + Math.random() * 85));
      }
    }
  }
  $d("demoSay").innerHTML = "That's the whole spell. Now — <b>go on, hero. Your turn.</b> ✍️";
  demoButtons("watched");
}

function demoHero() {
  demo.pos = 0; demo.wrong = 0;
  demoButtons("hero");
  renderDemoCode(0, true);
  $d("demoSay").textContent = "Type it yourself — I'll light up every key you get right. Take your time.";
  $d("demoCode").focus();
}

function heroKeyName(ch) {
  if (ch === "\n") return "Enter ⏎";
  if (ch === " ") return "space ␣";
  return ch;
}

/* keys that keyboard layouts often make "dead" (they wait to combine with the next letter) */
const DEAD_CANDIDATES = new Set(['"', "'", "`", "^", "~"]);

function heroNudge(msg) {
  demo.wrong++;
  const cur = $d("demoCursor");
  if (cur) { cur.classList.remove("wobble"); void cur.offsetWidth; cur.classList.add("wobble"); }
  const expect = demo.chars[demo.pos]?.ch;
  if (msg) $d("demoSay").innerHTML = msg;
  else if (demo.wrong >= 2) $d("demoSay").innerHTML = `Almost! The next key is <kbd>${heroKeyName(expect)}</kbd> — you've got this.`;
  else $d("demoSay").textContent = "Hmm, not that key — look at the gray letters and try again. No rush.";
}

function heroKey(e) {
  if (demo.state !== "hero") return;
  const expect = demo.chars[demo.pos]?.ch;
  if (expect === undefined) return;
  let key = e.key;
  if (key === "Enter") key = "\n";
  /* dead keys (US-International & friends): the browser says "Dead" instead of the character.
     If a quote-like key was expected, accept it directly — no child should fight a keyboard. */
  if (key === "Dead" || key === "Unidentified") {
    e.preventDefault();
    if (DEAD_CANDIDATES.has(expect)) key = expect;
    else { heroNudge(); return; }
  }
  if (key.length !== 1 && key !== "\n") return; /* ignore shift, arrows, etc. */
  e.preventDefault();
  /* keyboard left in Arabic? the most common UAE mix-up — say it kindly */
  if (key !== expect && /[؀-ۿ]/.test(key)) {
    heroNudge("Your keyboard is speaking Arabic right now 🙂 — switch it to English (try Alt+Shift) and continue, hero.");
    return;
  }
  /* right letter, wrong size → Caps Lock / Shift, named gently */
  if (key !== expect && key.toLowerCase() === expect.toLowerCase() && /[a-zA-Z]/.test(expect)) {
    heroNudge(`So close — same letter, wrong size! You need <kbd>${expect}</kbd>. Check Caps Lock ⇪ or Shift.`);
    return;
  }
  if (key === expect) {
    demo.pos++; demo.wrong = 0;
    renderDemoCode(demo.pos, true);
    const spans = $d("demoCode").querySelectorAll("span:not(.demo-cursor):not(.ghost)");
    const lastTyped = spans[spans.length - 1];
    if (lastTyped) lastTyped.classList.add("pop");
    if (demo.pos >= demo.chars.length) {
      demoButtons("done");
      $d("demoSay").innerHTML = "🎉 <b>You typed real Python, hero!</b> Every character, yours. Now the big editor belongs to you.";
      confetti();
      if (lessonStage < 2) setTimeout(() => revealCodeStage(true), 1200);
    } else if (expect === "\n") {
      $d("demoSay").textContent = "New line! In Python, every instruction gets its own line.";
    } else if (expect === " " && demo.chars[demo.pos - 2]?.ch === "\n") {
      $d("demoSay").textContent = "Now the secret handshake — spaces that say 'I belong to the loop'.";
    }
  } else {
    heroNudge();
  }
}

function demoTake() {
  if (lessonStage < 2) revealCodeStage(false);
  editor.replaceRange(demo.heroText + "\n", { line: 0, ch: 0 });
  $d("demoSay").textContent = "It's in your editor — now press ▶ Run and make it yours!";
  editor.focus();
}

/* ---------------- feedback helpers & confetti ---------------- */
function flashFeedback(kind, text) {
  const fb = document.getElementById("feedback");
  fb.className = "feedback " + kind; fb.textContent = text;
  setTimeout(() => { fb.className = "feedback"; }, 2200);
}
function confetti() {
  const c = document.getElementById("confetti"), ctx = c.getContext("2d");
  c.width = innerWidth; c.height = innerHeight;
  const cols = ["#5b8dc9", "#9c86cf", "#d99a2b", "#d96a57", "#3f9d6e"];
  const parts = Array.from({ length: 90 }, () => ({
    x: Math.random() * c.width, y: -20 - Math.random() * 120,
    vx: (Math.random() - .5) * 2.4, vy: 2.2 + Math.random() * 3.2,
    s: 5 + Math.random() * 6, r: Math.random() * 6.28, vr: (Math.random() - .5) * .3,
    col: cols[(Math.random() * cols.length) | 0],
  }));
  const t0 = performance.now();
  (function frame(now) {
    ctx.clearRect(0, 0, c.width, c.height);
    for (const p of parts) {
      p.x += p.vx; p.y += p.vy; p.r += p.vr;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r);
      ctx.fillStyle = p.col; ctx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s * .6);
      ctx.restore();
    }
    if (now - t0 < 1900) requestAnimationFrame(frame);
    else ctx.clearRect(0, 0, c.width, c.height);
  })(t0);
}

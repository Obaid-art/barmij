/* Barmij player: real Python (Pyodide) + animated turtle canvas + honest, friendly feedback. */
"use strict";

/* ---------------- i18n (chrome labels only; lesson content EN for now) ---------------- */
/* English-only UI (founder, 2026-09-14). Latin warmth words (Ahlan, Yalla, Mumtaz) stay. */
const STR = {
  en: { journey: "🗺️ Journey", run: "▶ Run", reset: "Reset code", hint: "💡 Hint", next: "Next lesson →",
        task: "Your mission", predict: "🔮 Predict first", loading: "Waking Python up… (first time takes a moment)",
        editor: "Your code", locked: "Finish the lesson before this one first 🙂",
        storyGo: "Yalla — continue ▸", skip: "Skip to the mission ▸" },
};
const lang = "en";

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
    _state = {"x":0.0,"y":0.0,"h":0.0,"pen":True,"color":"#0072B2","width":4}
def forward(d):
    if len(_cmds) > 3000:
        raise RuntimeError("DRAW_LIMIT")
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
    if len(_cmds) > 3000:
        raise RuntimeError("DRAW_LIMIT")
    _cmds.append({"t":"dot","x":_state["x"],"y":_state["y"],"r":float(r),"c":_state["color"]})
def _dump(): return json.dumps(_cmds)

class _GameBox:
    pass
game = _GameBox()

def _fresh_game():
    game.__dict__.clear()

def distance(x1, y1, x2, y2):
    return math.hypot(x2 - x1, y2 - y1)

def write(x, y, msg):
    if len(_cmds) > 3000:
        raise RuntimeError("DRAW_LIMIT")
    _cmds.append({"t": "text", "x": float(x), "y": float(y), "m": str(msg)[:200], "c": _state["color"]})

def key_pressed(name):
    try:
        from js import _barmijKeys
        return bool(getattr(_barmijKeys, str(name), 0))
    except Exception:
        return False

_in_tick = [False]

def _live_tick():
    """One heartbeat: clear the frame, run the child's tick() (guarded), hand back the frame."""
    reset()
    _in_tick[0] = True
    _cnt = [0]
    def _t(frame, event, arg):
        if frame.f_code.co_filename != "<run>":
            return None
        if event == "line":
            _cnt[0] += 1
            if _cnt[0] > 8000:
                raise RuntimeError("LOOP_LIMIT")
        return _t
    _sys.settrace(_t)
    try:
        tick()
    finally:
        _sys.settrace(None)
        _in_tick[0] = False
    return _dump()

import sys as _sys

def _scrub():
    """Every Run starts as a FRESH program — yesterday's variables and defs are gone.
    (Honesty: code must work because of what it says, never because of what ran before.)"""
    global _BASELINE
    if _BASELINE is None:
        _BASELINE = set(globals().keys()) | {"_BASELINE"}
    for _k in list(globals().keys()):
        if _k not in _BASELINE and not _k.startswith("_"):
            del globals()[_k]

def _run_guarded(code):
    """Normal Run, but a runaway loop is caught kindly instead of freezing the browser.
    Only the CHILD's lines count — libraries (matplotlib etc.) are neither counted nor traced."""
    _scrub()
    _cnt = [0]
    def _t(frame, event, arg):
        if frame.f_code.co_filename != "<run>":
            return None
        if event == "line":
            _cnt[0] += 1
            if _cnt[0] > 20000:
                raise RuntimeError("LOOP_LIMIT")
        return _t
    _sys.settrace(_t)
    try:
        exec(compile(code, "<run>", "exec"), globals())
    finally:
        _sys.settrace(None)
_BASELINE = None  # snapshot of pristine globals, taken after preamble loads

def _step_run(code):
    """Run user code under a line tracer; return the full time-line for replay:
    per executed line -> (line no, user variables, drawing length, print count)."""
    _scrub()
    reset()
    _outs = []
    _tr = []
    _bi2 = __import__("builtins")
    _orig_print = _bi2.print
    def _p(*a, **k):
        _outs.append(" ".join(str(x) for x in a))
    _bi2.print = _p
    def _tracer(frame, event, arg):
        if event == "line" and frame.f_code.co_filename == "<step>":
            if len(_tr) >= 500:
                raise RuntimeError("STEP_LIMIT")
            vs = {}
            for k, v in frame.f_globals.items():
                if k not in _BASELINE and not k.startswith("_") and isinstance(v, (bool, int, float, str, list)):
                    vs[k] = repr(v)[:36]
            if frame.f_locals is not frame.f_globals:  # inside a child's own function: show its jars
                for k, v in frame.f_locals.items():
                    if not k.startswith("_") and isinstance(v, (bool, int, float, str, list)):
                        vs[k] = repr(v)[:36]
            _tr.append({"line": frame.f_lineno, "vars": vs, "nc": len(_cmds), "no": len(_outs)})
        return _tracer
    err = None
    try:
        _compiled = compile(code, "<step>", "exec")
        _sys.settrace(_tracer)
        exec(_compiled, globals())
    except BaseException as e:
        err = type(e).__name__ + ": " + str(e)
    finally:
        _sys.settrace(None)
        _bi2.print = _orig_print
    return json.dumps({"trace": _tr, "outs": _outs, "cmds": json.loads(_dump()), "error": err})
import builtins as _bi
from js import window as _win
def _input(msg=""):
    if _in_tick[0]:
        raise RuntimeError("INPUT_IN_TICK")
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
  document.getElementById("runBtn").addEventListener("click", () => { exitStep(); run(); });
  document.getElementById("stepBtn").addEventListener("click", stepRun);
  document.getElementById("stepPrev").addEventListener("click", () => stepMove(-1));
  document.getElementById("stepNext").addEventListener("click", () => stepMove(1));
  document.getElementById("stepExit").addEventListener("click", exitStep);
  document.getElementById("liveStopBtn").addEventListener("click", stopLive);
  document.getElementById("puzzleExit").addEventListener("click", puzzleExit);
  document.getElementById("puzzleCheck").addEventListener("click", puzzleCheck);
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
  document.getElementById("bankBtn").addEventListener("click", openBank);
  document.getElementById("bankCount").textContent = CODEBANK.length;
  document.getElementById("galleryBtn").addEventListener("click", openGallery);
  galCountRefresh();
  document.getElementById("narrBtn").addEventListener("click", () => {
    narrOn = !narrOn;
    localStorage.setItem(NARR_KEY, narrOn ? "1" : "0");
    if (!narrOn) stopNarration();
    else narrate("live", "Read-aloud is on. I'll read each step to you, hero.");
    renderNarrBtn();
  });
  renderNarrBtn();
  document.getElementById("challengesBtn").addEventListener("click", openChallenges);
  document.getElementById("challengesCount").textContent = CHALLENGES.length;
  document.getElementById("chExit").addEventListener("click", exitChallenge);
  document.getElementById("chHintBtn").addEventListener("click", () => {
    if (!chState) return;
    const box = document.getElementById("chHintBox");
    box.style.display = "block";
    box.textContent = "💡 " + chState.def.hints[Math.min(chHintIdx, chState.def.hints.length - 1)];
    chHintIdx++;
  });
  const toggleDrawer = () => document.body.classList.toggle("drawer-open");
  document.getElementById("journeyBtn").addEventListener("click", toggleDrawer);
  document.getElementById("drawerOverlay").addEventListener("click", toggleDrawer);
  applyLang();
  renderSidebar();
  renderRank();
  renderWarmup();
  const last = parseInt(localStorage.getItem("barmij_last") || "0");
  openLesson(isUnlocked(last) ? last : 0, true);

  try {
    pyodide = await loadPyodide({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.2/full/" });
    pyodide.runPython(PREAMBLE);
    pyodide.setStdout({ batched: (s) => { stdoutBuf += s + "\n"; } });
    pyReady = true;
    document.getElementById("loading").style.display = "none";
    document.getElementById("runBtn").disabled = false;
    document.getElementById("stepBtn").disabled = false;
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
}

/* ---------------- ranks — earned by mastery, never by age (DECISIONS B14) ---------------- */
const RANKS = [
  { key: "mustakshif", label: "Mustakshif", icon: "🧭" },
  { key: "bannaa", label: "Bannaa", icon: "🛠️" },
  { key: "raid", label: "Ra'id", icon: "🦅" },
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
  /* KHATAM — the whole journey, complete */
  if (LESSONS.every(l => (progress[l.id] || 0) > 0)) {
    chip.textContent = "🏆 " + RANKS[2].icon + " Ra'id ✦";
    if (!localStorage.getItem("barmij_khatam")) {
      localStorage.setItem("barmij_khatam", "1");
      confetti();
      flashFeedback("ok", "🏆 KHATAM — all eight worlds! From print to thinking machines. The journey is complete, and it is YOURS.");
    }
  }
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

/* gentle-order gates (mirrors tools/check_progression.py): each item is placed at the moment
   all its concepts have been taught — the bank presents the gentle slope, never a cliff */
function _nestedForJS(code) {
  const stack = [];
  for (const line of code.split("\n")) {
    if (!line.trim()) continue;
    const indent = line.length - line.trimStart().length;
    while (stack.length && indent <= stack[stack.length - 1]) stack.pop();
    if (/^\s*for\s+\w+\s+in\b/.test(line)) {
      if (stack.length) return true;
      stack.push(indent);
    }
  }
  return false;
}
function computeGate(code) {
  const gates = [];
  const add = (cond, w, l) => { if (cond) gates.push(w * 10 + l); };
  add(/print\(/.test(code), 1, 1);
  add(/forward\(|back\(|right\(|left\(/.test(code), 1, 2);
  add(/color\(|width\(|penup\(|jump\(|dot\(/.test(code), 1, 3);
  add(/^[ \t]*[A-Za-z_]\w*[ \t]*=[ \t]*[^=]/m.test(code), 1, 4);
  add(/\bfor\s+\w+\s+in\s+range\(/.test(code), 1, 5);
  add(/input\(|"\s*\+|\+\s*"/.test(code), 2, 1);
  add(/^\s*if\b/m.test(code) || /^\s*else\s*:/m.test(code) || /==|[<>]/.test(code), 2, 2);
  add(/randint|choice/.test(code), 2, 3);
  add(/(?<![A-Za-z_])int\(|\belif\b|str\(/.test(code), 2, 5);
  add(_nestedForJS(code), 3, 1);
  add(/range\([^)]+,[^)]+,[^)]+\)/.test(code), 3, 3);
  add(/^\s*while\b/m.test(code), 3, 4);
  add(/^\s*def\s+\w+\s*\(\s*\)/m.test(code), 4, 1);
  add(/^\s*def\s+\w+\s*\([^)]+\)/m.test(code), 4, 2);
  add(/\breturn\b/.test(code), 4, 4);
  add(/\[[^\]\n]*,[^\]\n]*\]|\w+\[\w*\d*\]/.test(code), 5, 1);
  add(/for\s+\w+\s+in\s+(?!range\b)[\w\["']/.test(code), 5, 2);
  add(/\.append\(|(?<![\w])len\(/.test(code), 5, 3);
  add(/\.find\(/.test(code), 5, 5);
  add(/def\s+tick\s*\(|game\.\w+/.test(code), 6, 1);
  add(/key_pressed\(/.test(code), 6, 2);
  add(/(?<![\w])distance\(|(?<![\w])write\(/.test(code), 6, 4);
  add(/\{[^{}\n]*:/.test(code), 7, 2);
  add(/matplotlib|plt\./.test(code), 7, 3);
  add(/\.split\(/.test(code), 7, 5);
  add(/\.remove\(/.test(code), 8, 3);
  add(/sklearn/.test(code), 8, 5);
  const g = gates.length ? Math.max(...gates) : 11;
  return { g, peek: false, label: `after W${Math.floor(g / 10)}·L${g % 10}` };
}
CODEBANK.forEach(it => Object.assign(it, computeGate(it.code)));
const RANK_ORDER = { m: 0, b: 1, r: 2 };
CODEBANK.sort((a, b) => a.g - b.g || RANK_ORDER[a.rank] - RANK_ORDER[b.rank] || a.id.localeCompare(b.id));

/* ---------------- spaced-repetition scheduler (PEDAGOGY §3: 2 / 7 / 21 days) ----------------
   Passing a lesson schedules its skills for revisit. A due skill surfaces as ONE gentle
   warm-up banner (never blocking, always snoozable). Running the suggested bank item
   completes the review and pushes the skill to its next, longer interval. */
const REVIEW_KEY = "barmij_reviews";
const INTERVALS_DAYS = [2, 7, 21];
let reviewsDb = JSON.parse(localStorage.getItem(REVIEW_KEY) || "{}");
const saveReviews = () => localStorage.setItem(REVIEW_KEY, JSON.stringify(reviewsDb));

function lessonGateOf(i) {
  let wi = 0, li = i;
  for (const w of WORLDS) { if (li < w.lessons.length) break; li -= w.lessons.length; wi++; }
  return (wi + 1) * 10 + (li + 1);
}
function scheduleReview(gate) {
  if (!reviewsDb[gate]) {
    reviewsDb[gate] = { stage: 0, due: Date.now() + INTERVALS_DAYS[0] * 864e5 };
    saveReviews();
  }
}
function dueReviewGate() {
  const due = Object.entries(reviewsDb)
    .filter(([g, r]) => r.stage < INTERVALS_DAYS.length && r.due <= Date.now())
    .sort((a, b) => a[1].due - b[1].due);
  return due.length ? parseInt(due[0][0]) : null;
}
function completeReview(gate) {
  const r = reviewsDb[gate];
  if (!r) return;
  r.stage++;
  if (r.stage < INTERVALS_DAYS.length) r.due = Date.now() + INTERVALS_DAYS[r.stage] * 864e5;
  saveReviews();
  renderWarmup();
}
function renderWarmup() {
  const card = document.getElementById("warmupCard");
  const gate = dueReviewGate();
  if (gate === null) { card.style.display = "none"; return; }
  const pool = CODEBANK.filter(it => it.g === gate && !it.peek && it.rank !== "r");
  if (!pool.length) { card.style.display = "none"; return; }
  const pick = pool[(Math.random() * pool.length) | 0];
  const asPuzzle = pick.puzzle && Math.random() < 0.5; /* vary the retrieval — same skill, new angle */
  card.style.display = "flex";
  document.getElementById("warmupText").textContent =
    `Keep it second nature — a 2-minute warm-up of your W${Math.floor(gate / 10)}·L${gate % 10} skills: ` +
    (asPuzzle ? `🧩 puzzle: ${pick.title}` : `${pick.emoji} ${pick.title}`);
  document.getElementById("warmupGo").onclick = () => {
    openBank();
    if (asPuzzle) { puzzleStart(pick); return; }
    currentBankItem = pick;
    editor.setValue(pick.code);
    if (pick.think) showThinking(pick); else run();
  };
  document.getElementById("warmupLater").onclick = () => {
    reviewsDb[gate].due = Date.now() + 864e5; /* snooze one day — gentle, never nagging */
    saveReviews();
    renderWarmup();
  };
}

/* ---------------- guided think-alouds (BANK_BLUEPRINT role 5) ---------------- */
function showThinking(it) {
  const card = document.getElementById("thinkCard");
  card.style.display = "block";
  let idx = 0;
  const steps = it.think;
  const render = () => {
    document.getElementById("thinkStep").innerHTML =
      `<b>Thought ${idx + 1} of ${steps.length}:</b> ${steps[idx]}`;
    document.getElementById("thinkNext").textContent =
      idx < steps.length - 1 ? "next thought ▸" : "▶ Now run it";
    narrate(`${it.id}-t${idx}`, steps[idx]);
  };
  document.getElementById("thinkNext").onclick = () => {
    if (idx < steps.length - 1) { idx++; render(); }
    else { card.style.display = "none"; run(); }
  };
  render();
  card.scrollIntoView({ behavior: REDUCED_MOTION ? "auto" : "smooth", block: "center" });
}

function openBank() {
  bankMode = true; currentBankItem = null;
  document.getElementById("lessonPanel").style.display = "none";
  document.getElementById("bankPanel").style.display = "block";
  document.getElementById("demoCard").style.display = "none";
  setCodeStage(true); /* the bank IS the doing stage */
  showCanvas(false); /* appears the moment something draws */
  document.getElementById("taskText").style.display = "none";
  document.getElementById("thinkCard").style.display = "none";
  galleryMode = false;
  document.getElementById("galleryPanel").style.display = "none";
  document.getElementById("galleryBtn").classList.remove("active");
  if (challengeMode) exitChallenge();
  document.getElementById("challengesPanel").style.display = "none";
  document.getElementById("challengesBtn").classList.remove("active");
  stopNarration();
  stopLive();
  hideSaveBar();
  if (puz) puzzleExit();
  exitStep();
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
    <div class="sub">${CODEBANK.length} original programs, in gentle order — each one uses only what you've already met. Tap, run, remix.</div>
    <div class="bank-filters">${FLT.map(([k, l]) =>
      `<button data-f="${k}" class="${bankFilter === k ? "on" : ""}">${l}</button>`).join("")}</div>
    <div class="bank-grid">${items.map(it => `
      <div class="bank-card" data-id="${it.id}">
        <h3>${it.emoji} ${it.title}</h3>
        <div class="cap">${it.caption}</div>
        <div class="meta">
          <span class="rank-badge ${it.rank}">${it.rank === "m" ? "Mustakshif" : it.rank === "b" ? "Bannaa" : "Ra'id"}</span>
          ${it.talks ? '<span class="talks-badge">🎤 talks to you</span>' : ""}
          ${it.think ? '<span class="think-badge">🧠 guided</span>' : ""}
          ${it.puzzle ? `<button class="puz-mini puz-launch" data-id="${it.id}">🧩${puzzlesSolved[it.id] ? "✅" : " puzzle"}</button>` : ""}
          <span class="gate-tag">${it.label}</span>
        </div>
      </div>`).join("")}</div>`;
  panel.querySelectorAll(".bank-filters button").forEach(b =>
    b.addEventListener("click", () => { bankFilter = b.dataset.f; renderBank(); }));
  panel.querySelectorAll(".puz-launch").forEach(btn =>
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      puzzleStart(CODEBANK.find(it => it.id === btn.dataset.id));
    }));
  panel.querySelectorAll(".bank-card").forEach(card =>
    card.addEventListener("click", () => {
      if (puz) puzzleExit();
      currentBankItem = CODEBANK.find(it => it.id === card.dataset.id);
      editor.setValue(currentBankItem.code);
      if (currentBankItem.think) showThinking(currentBankItem); /* think first, run after */
      else run();
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
  /* first meeting is letter-by-letter (B22); a REVISIT of a passed lesson replays instantly */
  instant = instant || REDUCED_MOTION || window._demoFast || (progress[LESSONS[current].id] || 0) > 0;
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
        narrate(`${LESSONS[current].id}-bl${st}`, build.steps[st].say);
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
      if (i === upto && !instant) {
        const def = (LESSONS[current].beats || [])[i];
        if (def) narrate(`${LESSONS[current].id}-b${i}`, def.t);
      }
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
  if (instant) {
    /* "show everything" must not skip a build — every one plays, instantly */
    for (let i = 0; i <= upto; i++) {
      const bd = (ls.beats || [])[i];
      if (bd && bd.build && !beats[i].dataset.played) {
        beats[i].dataset.played = "1";
        playBuild(beats[i], bd.build, true);
      }
    }
  }
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
  if (visible) showCanvas(canvasWanted); /* the canvas keeps its earned visibility */
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
    head.textContent = world.title;
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
  document.getElementById("thinkCard").style.display = "none";
  galleryMode = false;
  document.getElementById("galleryPanel").style.display = "none";
  document.getElementById("galleryBtn").classList.remove("active");
  if (challengeMode) exitChallenge();
  document.getElementById("challengesPanel").style.display = "none";
  document.getElementById("challengesBtn").classList.remove("active");
  stopNarration();
  stopLive();
  hideSaveBar();
  if (puz) puzzleExit();
  exitStep();
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
  showCanvas(DRAWY.test(ls.starter) || DRAWY.test(ls.hints.join(" ")));
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
let runSeq = 0; /* a newer Run supersedes an older one still awaiting — no interleaved verdicts */
async function run() {
  if (!pyReady) { flashFeedback("err", "Python is still waking up — one moment, hero."); return; }
  const myRun = ++runSeq;
  runsThisLesson++;
  stopLive();
  hideSaveBar();
  clearOutputs(); clearCanvas();
  document.getElementById("feedback").className = "feedback";
  stdoutBuf = "";
  const code = editor.getValue();
  let cmds = [];
  chartShownThisRun = false;
  const isLive = /(^|\n)def\s+tick\s*\(/.test(code);
  if (/matplotlib|plt\./.test(code) && !mplReady) {
    const fb0 = document.getElementById("feedback");
    fb0.className = "feedback ok";
    fb0.textContent = "📦 Fetching the professional's toolbox (matplotlib) — a one-time download, hold on…";
    try { await ensureMpl(); } catch (e) {
      fb0.className = "feedback err";
      fb0.textContent = "The toolbox couldn't download — check the internet connection and Run again.";
      return;
    }
    fb0.className = "feedback";
  }
  if (/sklearn/.test(code) && !skReady) {
    const fb1 = document.getElementById("feedback");
    fb1.className = "feedback ok";
    fb1.textContent = "🧠 Fetching the learning machine (scikit-learn) — the biggest one-time download of the journey. Worth it.";
    try { await ensureSklearn(); } catch (e) {
      fb1.className = "feedback err";
      fb1.textContent = "The learning machine couldn't download — check the internet and Run again.";
      return;
    }
    /* first import is also heavy (~3s) — keep talking so it never looks frozen */
    fb1.textContent = "🧠 The learning machine is here — waking it up and teaching it now…";
  }
  if (runSeq !== myRun) return; /* a newer Run started while the toolbox downloaded */
  try {
    pyodide.runPython("reset()");
    pyodide.runPython("_fresh_game()");
    pyodide.globals.set("_usercode", code);
    await pyodide.runPythonAsync("_run_guarded(_usercode)");
    cmds = JSON.parse(pyodide.runPython("_dump()"));
  } catch (err) {
    if (runSeq === myRun) showError(err);
    return;
  }
  if (runSeq !== myRun) return;
  if (isLive) {
    /* a living program: simulate 90 silent heartbeats for the check, then hand it to the child */
    window._barmijKeys = { left: 0, right: 0, up: 0, down: 0, space: 0 };
    let frames = [];
    try {
      for (let f = 0; f < 90; f++) frames.push(JSON.parse(pyodide.runPython("_live_tick()")));
    } catch (err) { showError(err); return; }
    /* restart fresh so the child's game begins at the beginning */
    clearOutputs();
    try {
      pyodide.runPython("reset()");
      pyodide.runPython("_fresh_game()");
      stdoutBuf = "";
      await pyodide.runPythonAsync("_run_guarded(_usercode)");
    } catch (err) { if (runSeq === myRun) showError(err); return; }
    if (runSeq !== myRun) return;
    renderStdout();
    showCanvas(true);
    if (frames[60]) drawAll(frames[60]);
    lastRun = { code, hadCmds: (frames[60] || []).length > 0, firstOut: stdoutBuf.split("\n").find(s => s.trim()) || "" };
    showSaveBar();
    const fb = document.getElementById("feedback");
    if (bankMode || galleryMode || challengeMode) {
      fb.className = "feedback ok";
      fb.textContent = "🔴 It's ALIVE — arrows to play, Esc or ⏹ to stop." + (currentBankItem ? " Remix: " + currentBankItem.remix : "");
      if (currentBankItem && dueReviewGate() === currentBankItem.g) completeReview(currentBankItem.g);
    } else {
      const verdict = safeCheck(LESSONS[current], { cmds, lines: [], code, stdout: stdoutBuf, chart: chartShownThisRun, frames });
      if (verdict.pass) {
        fb.className = "feedback ok";
        fb.textContent = "✅ " + verdict.msg + " (Playing now — Esc stops.)";
        narrate("live", verdict.msg);
        const stars = hintsUsed === 0 ? (runsThisLesson <= 2 ? 3 : 2) : 1;
        if (stars > (progress[LESSONS[current].id] || 0)) {
          progress[LESSONS[current].id] = stars;
          localStorage.setItem(PROG_KEY, JSON.stringify(progress));
        }
        renderSidebar(); renderRank();
        scheduleReview(lessonGateOf(current));
        confetti();
        if (current + 1 < LESSONS.length) document.getElementById("nextWrap").style.display = "block";
      } else {
        fb.className = "feedback err";
        fb.textContent = "🧭 " + verdict.msg + " (It still runs — play, observe, adjust.)";
      }
    }
    enterLive();
    return;
  }
  renderStdout();
  showCanvas(cmds.length > 0 || chartShownThisRun);
  await animate(cmds);
  if (runSeq !== myRun) return;
  const lines = cmds.filter(c => c.t === "line");
  lastRun = { code, hadCmds: cmds.length > 0, firstOut: stdoutBuf.split("\n").find(s => s.trim()) || "" };
  showSaveBar(); /* anything that runs may be kept — art is never gated by a test */
  if (challengeMode && chState) { challengeEvaluate(cmds); return; }
  const fb = document.getElementById("feedback");
  if (bankMode || galleryMode) {
    fb.className = "feedback ok";
    fb.textContent = "✨ It ran! " + (currentBankItem ? "Remix idea: " + currentBankItem.remix : "Change a number and run again — that's how it becomes yours.");
    fb.scrollIntoView({ behavior: "smooth", block: "nearest" });
    if (currentBankItem && dueReviewGate() === currentBankItem.g) completeReview(currentBankItem.g);
    return;
  }
  const verdict = safeCheck(LESSONS[current], { cmds, lines, code, stdout: stdoutBuf, chart: chartShownThisRun, frames: [] });
  if (verdict.pass) {
    const YAY = ["Mumtaz! 🌟", "Ya salam! ✨", "Wallah, beautiful! 🎨", "Genius! 🧠", "Masha'Allah! 🌙", "Yalla, look at that! 🚀"];
    fb.className = "feedback ok";
    fb.textContent = "✅ " + YAY[(Math.random() * YAY.length) | 0] + " " + verdict.msg;
    narrate("live", fb.textContent);
    const stars = hintsUsed === 0 ? (runsThisLesson <= 2 ? 3 : 2) : 1;
    if (stars > (progress[LESSONS[current].id] || 0)) {
      progress[LESSONS[current].id] = stars;
      localStorage.setItem(PROG_KEY, JSON.stringify(progress));
    }
    renderSidebar();
    renderRank();
    scheduleReview(lessonGateOf(current)); /* today's skills return in 2 days — then 7, then 21 */
    confetti();
    if (current + 1 < LESSONS.length) document.getElementById("nextWrap").style.display = "block";
  } else {
    fb.className = "feedback err";
    fb.textContent = "🧭 " + verdict.msg;
  }
  fb.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

/* a check must never take the feedback down with it — surprises get a kind, honest answer */
function safeCheck(lesson, ctx) {
  try { return lesson.check(ctx); }
  catch (e) {
    console.error("check() crashed for " + lesson.id, e);
    return { pass: false, msg: "Your code ran — but it surprised my checker! Compare it with the mission once more, or Reset code and rebuild." };
  }
}

function renderStdout() {
  const out = document.getElementById("outputs");
  const all = stdoutBuf.split("\n").filter(s => s.trim().length);
  all.slice(0, 200).forEach(line => {
    const b = document.createElement("div");
    b.className = "bubble"; b.textContent = line.slice(0, 400);
    out.appendChild(b);
  });
  if (all.length > 200) {
    const b = document.createElement("div");
    b.className = "bubble";
    b.textContent = `… and ${all.length - 200} more lines — all real, just too many to show one by one.`;
    out.appendChild(b);
  }
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
  if (/LOOP_LIMIT/.test(last))
    return "Your loop never found its way out — it ran 20,000 steps! A while needs its promise to come true (like n = n + 1 inside the loop).";
  if (/DRAW_LIMIT/.test(last))
    return "Over 3,000 drawn lines — the turtle is exhausted! Try smaller numbers in range().";
  if (/AttributeError: '_GameBox'|AttributeError: .*_GameBox/.test(last)) {
    const m2 = last.match(/attribute '(\w+)'/);
    return `game.${m2 ? m2[1] : "…"} doesn't exist yet! Give it a starting value at the TOP, before tick begins: game.${m2 ? m2[1] : "x"} = 0`;
  }
  if (/NameError: name 'tick'/.test(last))
    return "No tick() found — a living program needs its heartbeat: def tick(): with the world's moves inside.";
  if (/INPUT_IN_TICK/.test(last))
    return "input() can't live inside tick — tick beats 30 times a second, and a question every blink would freeze the world. Ask BEFORE the heartbeat, above def tick.";
  if (/ValueError: list\.remove/.test(last))
    return "remove looked for a treasure that isn't in the box — check what you're removing, exactly.";
  if (/KeyError: '(.+?)'/.test(last)) {
    const km = last.match(/KeyError: '(.+?)'/);
    return `The dictionary has no entry called "${km[1]}" — check the spelling of the key, exactly as it was packed.`;
  }
  if (/ModuleNotFoundError.*matplotlib/.test(last))
    return "The chart toolbox isn't loaded yet — Run again and let the download finish.";
  if (/IndexError/.test(last))
    return "You asked for a slot that doesn't exist! Boxes count from 0 — a box of 3 things has slots 0, 1 and 2.";
  if (/TypeError: can only concatenate str|TypeError: unsupported operand.*str/.test(last))
    return "You tried to glue words with a NUMBER. Wrap it first: str(number) — then + works.";
  if (/RecursionError/.test(last))
    return "Your word calls ITSELF, forever! A word may use other words — but a word that says itself needs an exit door. (That's advanced magic — for now, call a different word.)";
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
/* setting canvas.width ALWAYS wipes the bitmap (even to the same value) — so we resize only
   when the size truly changed, and clear explicitly. keep=true preserves what's drawn
   (overlays: the child's attempt on top of the ghost). Cheaper too: no realloc per frame. */
function setupCanvas(keep) {
  const c = cv(), dpr = window.devicePixelRatio || 1;
  const w = c.clientWidth || 640;
  /* the logical stage is 480x460 (x ±240, y ±230) — on narrow screens the WHOLE stage
     scales down to fit, so the falcon's walls and the zellij's edges are never cut off */
  const s = Math.min(1, w / 480);
  const h = Math.round(460 * s);
  if (c.width !== w * dpr || c.height !== h * dpr) {
    c.width = w * dpr; c.height = h * dpr;
    c.style.height = h + "px";
  }
  const ctx = c.getContext("2d");
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  if (!keep) ctx.clearRect(0, 0, c.width, c.height);
  ctx.setTransform(dpr * s, 0, 0, dpr * s, w * dpr / 2, h * dpr / 2);
  ctx.lineCap = "round"; ctx.lineJoin = "round";
  return ctx;
}
let animSession = 0; /* any clear cancels an in-flight animation — no stale repaint races */
function clearCanvas() {
  animSession++;
  setupCanvas();
}
/* the canvas earns its place: hidden for text-only work, present the moment anything draws */
let canvasWanted = true;
function showCanvas(v) {
  canvasWanted = v;
  document.getElementById("canvasCard").style.display = v ? "" : "none";
}
const DRAWY = /forward\(|back\(|right\(|left\(|dot\(|jump\(|plt\.|def\s+tick|write\(/;
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
    else if (s.t === "text") { ctx.fillStyle = s.c; ctx.font = "800 18px 'JetBrains Mono', monospace"; ctx.fillText(s.m, s.x, -s.y); }
    else drawSeg(ctx, s, 1);
  }
}

/* ---------------- 📊 matplotlib — the professional's pen (DECISIONS B38) ----------------
   Loaded lazily (big one-time download, said honestly). Agg backend; plt.show() hands the
   PNG to our canvas, so thumbnails, Gallery saves and Picture downloads all keep working. */
let mplReady = false, chartShownThisRun = false;
const MPL_SETUP = `
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import io as _io, base64 as _b64
def _plt_show():
    _f = plt.gcf()
    _f.set_size_inches(6.2, 4.4)
    _buf = _io.BytesIO()
    _f.savefig(_buf, format="png", dpi=96, bbox_inches="tight")
    plt.close("all")
    from js import _barmijChart
    _barmijChart(_b64.b64encode(_buf.getvalue()).decode())
plt.show = _plt_show
`;
window._barmijChart = (b64) => {
  chartShownThisRun = true;
  const img = new Image();
  img.onload = () => {
    const ctx = setupCanvas();
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0);
    const c = cv();
    const scale = Math.min(c.width / img.width, c.height / img.height) * 0.97;
    const w = img.width * scale, h = img.height * scale;
    ctx.fillStyle = "#ffffff"; ctx.fillRect(0, 0, c.width, c.height);
    ctx.drawImage(img, (c.width - w) / 2, (c.height - h) / 2, w, h);
    ctx.restore();
  };
  img.src = "data:image/png;base64," + b64;
};
async function ensureMpl() {
  if (mplReady) return;
  if (!window._mplPromise)
    window._mplPromise = pyodide.loadPackage(["matplotlib"]).then(() => pyodide.runPython(MPL_SETUP));
  await window._mplPromise;
  mplReady = true;
}

/* scikit-learn — the single honest ML taste (B16): loaded once, only when World 8 asks */
let skReady = false;
async function ensureSklearn() {
  if (skReady) return;
  if (!window._skPromise) window._skPromise = pyodide.loadPackage(["scikit-learn"]);
  await window._skPromise;
  skReady = true;
}

/* ---------------- 🔴 LIVE mode — programs that never finish (DECISIONS B37) ----------------
   def tick(): makes a program ALIVE: ~30 times a second Python wakes, reads the keys, moves
   the game's jars, draws a frame. Every frame runs under the runaway guard. */
let liveMode = false, liveRaf = null, liveLast = 0;
const KEYMAP = { ArrowLeft: "left", ArrowRight: "right", ArrowUp: "up", ArrowDown: "down", " ": "space" };

function liveKeyDown(e) {
  const k = KEYMAP[e.key];
  if (k) { window._barmijKeys[k] = 1; e.preventDefault(); }
  if (e.key === "Escape") stopLive();
}
function liveKeyUp(e) {
  const k = KEYMAP[e.key];
  if (k) { window._barmijKeys[k] = 0; e.preventDefault(); }
}

function enterLive() {
  liveMode = true;
  window._barmijKeys = { left: 0, right: 0, up: 0, down: 0, space: 0 };
  window.addEventListener("keydown", liveKeyDown);
  window.addEventListener("keyup", liveKeyUp);
  document.getElementById("liveBar").style.display = "flex";
  document.getElementById("canvasCard").scrollIntoView({ behavior: REDUCED_MOTION ? "auto" : "smooth", block: "center" });
  liveLast = 0;
  const frame = (now) => {
    if (!liveMode) return;
    if (now - liveLast >= 32) { /* ~30 fps */
      liveLast = now;
      try {
        drawAll(JSON.parse(pyodide.runPython("_live_tick()")));
      } catch (err) {
        stopLive();
        showError(err);
        return;
      }
    }
    liveRaf = requestAnimationFrame(frame);
  };
  liveRaf = requestAnimationFrame(frame);
}

function stopLive() {
  if (!liveMode) return;
  liveMode = false;
  if (liveRaf) cancelAnimationFrame(liveRaf);
  window.removeEventListener("keydown", liveKeyDown);
  window.removeEventListener("keyup", liveKeyUp);
  document.getElementById("liveBar").style.display = "none";
}
function animate(cmds) {
  return new Promise((resolve) => {
    const my = ++animSession; /* a later Run/clear cancels this animation cleanly */
    const segs = cmds;
    if (!segs.length) { resolve(); return; }
    const totalLen = segs.reduce((a, s) => a + (s.t === "line" ? Math.hypot(s.x2 - s.x1, s.y2 - s.y1) : 20), 0);
    const dur = Math.min(5000, Math.max(700, totalLen * 2.2));
    const t0 = performance.now();
    let done = false;
    const finish = () => { if (done) return; done = true; if (animSession === my) drawAll(segs); resolve(); };
    /* rAF pauses in hidden tabs — the watchdog guarantees completion */
    setTimeout(finish, dur + 600);
    if (document.hidden) { finish(); return; }
    function frame(now) {
      if (done) return;
      if (animSession !== my) { done = true; resolve(); return; }
      const p = Math.min(1, (now - t0) / dur);
      const drawnLen = totalLen * (1 - Math.pow(1 - p, 2)); /* ease-out */
      const ctx = setupCanvas();
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
        narrate(`${LESSONS[current].id}-d${st}`, LESSONS[current].demo.steps[st].say);
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

/* ---------------- 🔊 Narration — the turtle's voice (DECISIONS B33) ----------------
   Mayer's modality principle: spoken words + pictures beat printed words + pictures for
   young readers. OFF by default (no sound uninvited — B7). Placeholder voice: the browser's
   speech engine; the founder's recordings (audio_manifest.js) override it clip by clip. */
const NARR_KEY = "barmij_narration";
let narrOn = localStorage.getItem(NARR_KEY) === "1";
let narrVoice = null, narrAudio = null;

function pickNarrVoice() {
  if (!window.speechSynthesis) return;
  const vs = speechSynthesis.getVoices();
  narrVoice =
    vs.find(v => /^en/i.test(v.lang) && /natural|neural|online/i.test(v.name)) ||
    vs.find(v => /^en/i.test(v.lang)) || null;
}
if (window.speechSynthesis) {
  speechSynthesis.onvoiceschanged = pickNarrVoice;
  pickNarrVoice();
}

function stopNarration() {
  try { if (window.speechSynthesis) speechSynthesis.cancel(); } catch (e) {}
  if (narrAudio) { narrAudio.pause(); narrAudio = null; }
}

function narrate(id, text) {
  if (!narrOn || !text) return;
  stopNarration();
  const clean = String(text).replace(/<[^>]+>/g, " ")
    .replace(/[🐢🔮🧭🌀⭐🎯🧩💡▸◀►·→⇥]/g, " ").replace(/\s+/g, " ").trim();
  if (!clean) return;
  if (typeof AUDIO_MANIFEST !== "undefined" && AUDIO_MANIFEST[id]) {
    narrAudio = new Audio(AUDIO_MANIFEST[id]);
    narrAudio.play().catch(() => {});
    return;
  }
  if (!window.speechSynthesis) return;
  const u = new SpeechSynthesisUtterance(clean);
  if (narrVoice) u.voice = narrVoice;
  u.rate = 0.95;
  speechSynthesis.speak(u);
}

function renderNarrBtn() {
  const b = document.getElementById("narrBtn");
  b.textContent = narrOn ? "🔊" : "🔇";
  b.title = narrOn ? "Read-aloud is ON — tap to turn off" : "Read aloud (tap to turn on)";
}

/* ---------------- 🎯 Challenges — match the masterpiece (DECISIONS B32) ----------------
   Deliberate practice (Ericsson): the ghost is the goal, the editor starts blank, feedback is
   immediate and specific. Matching is by SHAPE + color (unordered, either direction, tolerant)
   — any code that draws the goal wins; the hidden target-maker is never an answer key. */
const CH_KEY = "barmij_challenges";
let challengesSolved = JSON.parse(localStorage.getItem(CH_KEY) || "{}");
let challengeMode = false, chState = null, chHintIdx = 0;

CHALLENGES.forEach(c => Object.assign(c, computeGate(c.code)));
CHALLENGES.sort((a, b) => a.g - b.g || a.id.localeCompare(b.id));

function openChallenges() {
  challengeMode = false; chState = null;
  galleryMode = false; bankMode = false; currentBankItem = null;
  if (puz) puzzleExit();
  stopNarration(); stopLive();
  exitStep(); hideSaveBar();
  ["lessonPanel", "bankPanel", "galleryPanel", "demoCard", "taskText", "thinkCard", "hintBox", "nextWrap", "chGoalCard"]
    .forEach(id => document.getElementById(id).style.display = "none");
  document.getElementById("challengesPanel").style.display = "block";
  setCodeStage(true);
  showCanvas(false);
  document.getElementById("taskText").style.display = "none";
  document.getElementById("feedback").className = "feedback";
  document.getElementById("bankBtn").classList.remove("active");
  document.getElementById("galleryBtn").classList.remove("active");
  document.getElementById("challengesBtn").classList.add("active");
  document.body.classList.remove("drawer-open");
  renderChallenges();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderChallenges() {
  const panel = document.getElementById("challengesPanel");
  panel.innerHTML = `
    <h1>Challenges</h1>
    <div class="sub">The ghost shows the goal — your code must summon it. Any way that draws it, wins.</div>
    <div class="ch-grid"></div>`;
  const grid = panel.querySelector(".ch-grid");
  CHALLENGES.forEach(c => {
    const card = document.createElement("div");
    card.className = "ch-card";
    card.innerHTML = `<h3>${c.emoji} ${c.title}</h3><div class="cap"></div>
      <div class="meta">${challengesSolved[c.id] ? '<span class="ch-solved">✔ matched</span>' : ""}
      <span class="gate-tag">${c.label}</span></div>`;
    card.querySelector(".cap").textContent = c.goal;
    card.addEventListener("click", () => startChallenge(c));
    grid.appendChild(card);
  });
}

async function startChallenge(c) {
  if (!pyReady) { flashFeedback("err", "Python is still waking up — one moment, hero."); return; }
  challengeMode = true; chHintIdx = 0;
  document.getElementById("chGoalCard").style.display = "block";
  document.getElementById("chTitle").textContent = `🎯 ${c.emoji} ${c.title}`;
  document.getElementById("chGoal").textContent = c.goal;
  document.getElementById("chHintBox").style.display = "none";
  document.getElementById("feedback").className = "feedback";
  clearOutputs(); hideSaveBar();
  /* build the target silently — on scrubbed ground, so no child global can shadow a tool */
  stdoutBuf = "";
  pyodide.runPython("_scrub()");
  pyodide.runPython("reset()");
  await pyodide.runPythonAsync(c.code);
  chState = { def: c, targetCmds: JSON.parse(pyodide.runPython("_dump()")) };
  showCanvas(true);
  editor.setValue("# Summon the ghost. Your code, your way.\n\n");
  drawGhost(chState.targetCmds);
  narrate(`${c.id}-goal`, c.title + ". " + c.goal);
  document.getElementById("chGoalCard").scrollIntoView({ behavior: REDUCED_MOTION ? "auto" : "smooth", block: "center" });
  editor.focus();
}

function exitChallenge() {
  challengeMode = false; chState = null;
  document.getElementById("chGoalCard").style.display = "none";
  clearCanvas();
  document.getElementById("feedback").className = "feedback";
}

/* shape matching: unordered, either direction, tolerant — color must agree */
function segMatch(target, mine) {
  const tol = 8;
  const near = (a, b) => Math.abs(a - b) <= tol;
  const used = new Array(mine.length).fill(false);
  let hit = 0;
  for (const t of target) {
    let found = -1;
    for (let j = 0; j < mine.length; j++) {
      if (used[j]) continue;
      const m = mine[j];
      if (t.t !== m.t || t.c !== m.c) continue;
      if (t.t === "line") {
        const fwd = near(t.x1, m.x1) && near(t.y1, m.y1) && near(t.x2, m.x2) && near(t.y2, m.y2);
        const rev = near(t.x1, m.x2) && near(t.y1, m.y2) && near(t.x2, m.x1) && near(t.y2, m.y1);
        if (fwd || rev) found = j;
      } else if (near(t.x, m.x) && near(t.y, m.y) && Math.abs(t.r - m.r) <= 5) found = j;
      if (found >= 0) break;
    }
    if (found >= 0) { used[found] = true; hit++; }
  }
  return { hit, total: target.length, extras: mine.length - hit };
}

function challengeEvaluate(cmds) {
  const fb = document.getElementById("feedback");
  const { hit, total, extras } = segMatch(chState.targetCmds, cmds);
  if (hit === total && extras === 0) {
    challengesSolved[chState.def.id] = true;
    localStorage.setItem(CH_KEY, JSON.stringify(challengesSolved));
    if (dueReviewGate() === chState.def.g) completeReview(chState.def.g);
    fb.className = "feedback ok";
    fb.textContent = `✅ 🎯 MATCHED — the ghost is yours! ${chState.def.title}, summoned by your own code, your own way.`;
    confetti();
    return;
  }
  /* their attempt in color over the ghost — the difference is the teacher */
  drawGhost(chState.targetCmds);
  const ctx = setupCanvas(true);
  for (const s of cmds) {
    if (s.t === "dot") { ctx.fillStyle = s.c; ctx.beginPath(); ctx.arc(s.x, -s.y, s.r, 0, 7); ctx.fill(); }
    else { ctx.strokeStyle = s.c; ctx.lineWidth = s.w; ctx.beginPath(); ctx.moveTo(s.x1, -s.y1); ctx.lineTo(s.x2, -s.y2); ctx.stroke(); }
  }
  fb.className = "feedback err";
  const parts = [`🧭 ${hit} of ${total} matched`];
  if (hit < total) parts.push(`${total - hit} of the ghost's marks still missing`);
  if (extras > 0) parts.push(`${extras} extra mark${extras > 1 ? "s" : ""} the goal doesn't have`);
  const colorMiss = cmds.length && chState.targetCmds.length &&
    cmds.every(m => m.c !== chState.targetCmds[0].c);
  if (colorMiss) parts.push("check the COLOR the goal asks for");
  fb.textContent = parts.join(" · ") + ". Compare your colors with the gray ghost — then adjust and Run again.";
  fb.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

/* ---------------- 🖼️ My Gallery — private portfolio (DECISIONS B31) ----------------
   Constructionism's payoff: artifacts a child OWNS. Privacy by design (device-only, stated in
   the UI), no likes/feeds/comparison (deliberate anti-features), saving never gated by a test
   passing, one optional reflection prompt (portfolio practice + self-explanation). All child-
   entered text rendered via textContent only. */
const GAL_KEY = "barmij_gallery";
let gallery = JSON.parse(localStorage.getItem(GAL_KEY) || "[]");
let galleryMode = false;
let lastRun = null; /* {code, hadCmds, firstOut} — what the save bar would save */

function galSave() {
  try { localStorage.setItem(GAL_KEY, JSON.stringify(gallery)); return true; }
  catch (e) { return false; }
}
function galCountRefresh() {
  document.getElementById("galleryCount").textContent = gallery.length || "";
}

function makeThumb(hadCmds, firstOut) {
  const off = document.createElement("canvas");
  off.width = 240; off.height = 180;
  const c2 = off.getContext("2d");
  c2.fillStyle = "#f8f9fc"; c2.fillRect(0, 0, 240, 180);
  if (hadCmds) {
    c2.drawImage(cv(), 0, 0, 240, 180);
  } else {
    c2.fillStyle = "#f8e0d2";
    c2.beginPath(); c2.roundRect(20, 62, 200, 56, 14); c2.fill();
    c2.fillStyle = "#A84300"; c2.font = "700 15px monospace"; c2.textAlign = "center";
    c2.fillText((firstOut || "…").slice(0, 22), 120, 95);
  }
  return off.toDataURL("image/jpeg", 0.65);
}

function showSaveBar() {
  const bar = document.getElementById("saveBar");
  bar.style.display = "flex";
  bar.innerHTML = "";
  const btn = document.createElement("button");
  btn.className = "btn demo-primary"; btn.textContent = "💾 Save to My Gallery";
  btn.onclick = showSaveForm;
  const pic = document.createElement("button");
  pic.className = "btn ghost"; pic.textContent = "⬇ Picture";
  pic.onclick = () => {
    const a = document.createElement("a");
    a.download = "barmij-art.png"; a.href = cv().toDataURL("image/png"); a.click();
  };
  const priv = document.createElement("span");
  priv.className = "gal-privacy";
  priv.textContent = "Your gallery lives only on this device — nothing is uploaded, ever.";
  bar.appendChild(btn);
  if (lastRun && lastRun.hadCmds) bar.appendChild(pic);
  bar.appendChild(priv);
}
function hideSaveBar() { document.getElementById("saveBar").style.display = "none"; }

function showSaveForm() {
  const bar = document.getElementById("saveBar");
  bar.innerHTML = "";
  const name = document.createElement("input");
  name.maxLength = 40; name.placeholder = "Name your creation…";
  const refl = document.createElement("input");
  refl.maxLength = 120; refl.placeholder = "What did you teach the computer? (optional)";
  const ok = document.createElement("button");
  ok.className = "btn run"; ok.textContent = "Save ✔";
  ok.onclick = () => {
    const title = name.value.trim() || "Untitled masterpiece";
    gallery.unshift({
      id: Date.now(), t: title, refl: refl.value.trim(), code: lastRun.code,
      thumb: makeThumb(lastRun.hadCmds, lastRun.firstOut), when: new Date().toISOString().slice(0, 10),
    });
    let saved = galSave();
    if (!saved) { gallery[0].thumb = ""; saved = galSave(); } /* storage full: keep code, drop image */
    galCountRefresh();
    hideSaveBar();
    flashFeedback("ok", saved ? `🖼️ "${title}" is in your gallery — yours, forever.`
                              : "Saved the code — the device's picture storage is full.");
    if (galleryMode) renderGallery();
  };
  const cancel = document.createElement("button");
  cancel.className = "btn ghost"; cancel.textContent = "✕";
  cancel.onclick = showSaveBar;
  bar.appendChild(name); bar.appendChild(refl); bar.appendChild(ok); bar.appendChild(cancel);
  name.focus();
}

function openGallery() {
  galleryMode = true; bankMode = false; currentBankItem = null;
  stopNarration();
  if (challengeMode) exitChallenge();
  document.getElementById("challengesPanel").style.display = "none";
  document.getElementById("challengesBtn").classList.remove("active");
  if (puz) puzzleExit();
  exitStep();
  stopLive();
  hideSaveBar();
  document.getElementById("lessonPanel").style.display = "none";
  document.getElementById("bankPanel").style.display = "none";
  document.getElementById("galleryPanel").style.display = "block";
  document.getElementById("demoCard").style.display = "none";
  setCodeStage(true);
  showCanvas(false);
  document.getElementById("taskText").style.display = "none";
  document.getElementById("thinkCard").style.display = "none";
  document.getElementById("hintBox").style.display = "none";
  document.getElementById("nextWrap").style.display = "none";
  document.getElementById("feedback").className = "feedback";
  document.getElementById("bankBtn").classList.remove("active");
  document.getElementById("galleryBtn").classList.add("active");
  document.body.classList.remove("drawer-open");
  renderGallery();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderGallery() {
  const panel = document.getElementById("galleryPanel");
  panel.innerHTML = `
    <h1>My Gallery</h1>
    <div class="sub">Everything here is yours — made by you, kept by you.
    It lives only on this device; nothing is uploaded, ever.</div>`;
  if (!gallery.length) {
    const empty = document.createElement("div");
    empty.className = "gal-empty";
    empty.textContent = "Your gallery is waiting for its first masterpiece. Run something you love — then press 💾 Save.";
    panel.appendChild(empty);
    return;
  }
  const grid = document.createElement("div");
  grid.className = "gal-grid";
  gallery.forEach(item => {
    const card = document.createElement("div");
    card.className = "gal-card";
    if (item.thumb) { const img = document.createElement("img"); img.src = item.thumb; img.alt = ""; card.appendChild(img); }
    const body = document.createElement("div");
    body.className = "gal-body";
    const title = document.createElement("div");
    title.className = "gal-title"; title.textContent = item.t; title.title = "click to rename";
    title.onclick = () => {
      const n = window.prompt("New name for this creation:", item.t);
      if (n && n.trim()) { item.t = n.trim().slice(0, 40); galSave(); renderGallery(); }
    };
    body.appendChild(title);
    if (item.refl) { const r = document.createElement("div"); r.className = "gal-refl"; r.textContent = "🗒 " + item.refl; body.appendChild(r); }
    const date = document.createElement("div");
    date.className = "gal-date"; date.textContent = item.when;
    body.appendChild(date);
    const actions = document.createElement("div");
    actions.className = "gal-actions";
    const open = document.createElement("button");
    open.className = "puz-mini"; open.textContent = "▶ Open & run";
    open.onclick = () => { editor.setValue(item.code); run(); document.getElementById("canvasCard").scrollIntoView({ behavior: "smooth", block: "center" }); };
    const del = document.createElement("button");
    del.className = "puz-mini"; del.textContent = "✕";
    del.onclick = () => {
      if (del.dataset.arm) { gallery = gallery.filter(g => g.id !== item.id); galSave(); galCountRefresh(); renderGallery(); }
      else { del.dataset.arm = "1"; del.textContent = "really delete?"; setTimeout(() => { del.dataset.arm = ""; del.textContent = "✕"; }, 2600); }
    };
    actions.appendChild(open); actions.appendChild(del);
    body.appendChild(actions);
    card.appendChild(body);
    grid.appendChild(card);
  });
  panel.appendChild(grid);
}

/* ---------------- 🧩 Parsons puzzles — order the thoughts (DECISIONS B30) ----------------
   The finished drawing appears as a ghost; the code arrives as shuffled tiles. The child
   orders them (and chooses indentation — the secret handshake as a decision). The check RUNS
   the arrangement and compares BEHAVIOR to the target — a different valid order that produces
   the same result is a win, because it is one. (Parsons & Haden 2006; Ericson et al.) */
const PUZ_KEY = "barmij_puzzles";
let puzzlesSolved = JSON.parse(localStorage.getItem(PUZ_KEY) || "{}");
let puz = null;

CODEBANK.forEach(it => {
  const n = it.code.split("\n").filter(l => l.trim()).length;
  it.puzzle = !it.talks && !/random|input\(|def\s+tick|plt\.|matplotlib/.test(it.code) && n >= 3 && n <= 12;
});

function drawGhost(cmds) {
  clearCanvas();
  const ctx = setupCanvas();
  for (const s of cmds) {
    if (s.t === "dot") {
      ctx.fillStyle = "#d7dde6";
      ctx.beginPath(); ctx.arc(s.x, -s.y, s.r, 0, 7); ctx.fill();
    } else if (s.t === "text") {
      ctx.fillStyle = "#d7dde6"; ctx.font = "800 18px 'JetBrains Mono', monospace";
      ctx.fillText(s.m, s.x, -s.y);
    } else {
      ctx.strokeStyle = "#d7dde6"; ctx.lineWidth = s.w;
      ctx.beginPath(); ctx.moveTo(s.x1, -s.y1); ctx.lineTo(s.x2, -s.y2); ctx.stroke();
    }
  }
}

async function puzzleStart(it) {
  if (!pyReady) { flashFeedback("err", "Python is still waking up — one moment, hero."); return; }
  exitStep();
  hideSaveBar();
  document.getElementById("thinkCard").style.display = "none";
  document.getElementById("editorCard").style.display = "none";
  document.getElementById("hintBox").style.display = "none";
  document.getElementById("feedback").className = "feedback";
  clearOutputs();
  currentBankItem = it;
  /* run the original once, silently, to learn the target behavior — on scrubbed ground */
  stdoutBuf = "";
  pyodide.runPython("_scrub()");
  pyodide.runPython("reset()");
  await pyodide.runPythonAsync(it.code);
  const targetCmds = JSON.parse(pyodide.runPython("_dump()"));
  const targetOut = stdoutBuf.trim();
  const lines = it.code.split("\n").filter(l => l.trim());
  let tray = lines.map(l => l.trim());
  for (let k = tray.length - 1; k > 0; k--) { /* shuffle; reshuffle if unchanged */
    const j = (Math.random() * (k + 1)) | 0; [tray[k], tray[j]] = [tray[j], tray[k]];
  }
  if (tray.join("\n") === lines.map(l => l.trim()).join("\n")) tray.reverse();
  puz = { item: it, tray, placed: [], targetCmds, targetOut };
  showCanvas(targetCmds.length > 0);
  document.getElementById("puzzleGoal").textContent =
    `${it.emoji} ${it.title} — the ghost below is the goal. Order the pieces to draw it.`;
  document.getElementById("puzzlePanel").style.display = "block";
  drawGhost(targetCmds);
  renderPuzzle();
  document.getElementById("puzzlePanel").scrollIntoView({ behavior: REDUCED_MOTION ? "auto" : "smooth", block: "center" });
}

function puzzleTile(text) {
  const span = document.createElement("span");
  tokenizeRoles(text).forEach(c => {
    const s = document.createElement("span"); s.className = c.cls; s.textContent = c.ch; span.appendChild(s);
  });
  return span;
}

function renderPuzzle() {
  const placedBox = document.getElementById("puzzlePlaced");
  const trayBox = document.getElementById("puzzleTray");
  placedBox.innerHTML = ""; trayBox.innerHTML = "";
  puz.placed.forEach((p, i) => {
    const tile = document.createElement("div");
    tile.className = "puz-tile";
    tile.style.marginInlineStart = (p.indent / 4) * 26 + "px";
    const ind = document.createElement("button");
    ind.className = "puz-mini"; ind.textContent = "⇥";
    ind.title = "change indent";
    ind.onclick = () => { p.indent = (p.indent + 4) % 12; renderPuzzle(); };
    const rm = document.createElement("button");
    rm.className = "puz-mini"; rm.textContent = "✕";
    rm.onclick = () => { puz.placed.splice(i, 1); puz.tray.push(p.text); renderPuzzle(); };
    tile.appendChild(ind); tile.appendChild(puzzleTile(p.text)); tile.appendChild(rm);
    placedBox.appendChild(tile);
  });
  if (!puz.placed.length) placedBox.innerHTML = '<span class="small" style="color:var(--muted)">…your program starts empty…</span>';
  puz.tray.forEach((text, i) => {
    const tile = document.createElement("div");
    tile.className = "puz-tile";
    tile.appendChild(puzzleTile(text));
    tile.onclick = () => {
      const prev = puz.placed[puz.placed.length - 1];
      const indent = prev ? (prev.text.trimEnd().endsWith(":") ? Math.min(prev.indent + 4, 8) : prev.indent) : 0;
      puz.placed.push({ text, indent });
      puz.tray.splice(i, 1);
      renderPuzzle();
    };
    trayBox.appendChild(tile);
  });
}

function cmdsEqual(a, b) {
  if (a.length !== b.length) return false;
  const near = (x, y) => Math.abs(x - y) < 1.5;
  for (let i = 0; i < a.length; i++) {
    const p = a[i], q = b[i];
    if (p.t !== q.t) return false;
    if (p.t === "line") {
      if (!near(p.x1, q.x1) || !near(p.y1, q.y1) || !near(p.x2, q.x2) || !near(p.y2, q.y2)) return false;
      if (p.c !== q.c || p.w !== q.w) return false;
    } else if (!near(p.x, q.x) || !near(p.y, q.y) || !near(p.r, q.r) || p.c !== q.c) return false;
  }
  return true;
}

async function puzzleCheck() {
  if (!puz) return;
  const fb = document.getElementById("feedback");
  if (puz.tray.length) {
    fb.className = "feedback err";
    fb.textContent = "🧩 Every piece belongs somewhere — " + puz.tray.length + " still waiting in the tray.";
    return;
  }
  const code = puz.placed.map(p => " ".repeat(p.indent) + p.text).join("\n");
  stdoutBuf = "";
  let cmds;
  try {
    pyodide.runPython("reset()");
    pyodide.globals.set("_usercode", code);
    await pyodide.runPythonAsync("_run_guarded(_usercode)");
    cmds = JSON.parse(pyodide.runPython("_dump()"));
  } catch (err) { showError(err); return; }
  const outOk = stdoutBuf.trim() === puz.targetOut;
  if (cmdsEqual(cmds, puz.targetCmds) && outOk) {
    puzzlesSolved[puz.item.id] = true;
    localStorage.setItem(PUZ_KEY, JSON.stringify(puzzlesSolved));
    if (dueReviewGate() === puz.item.g) completeReview(puz.item.g);
    fb.className = "feedback ok";
    fb.textContent = "✅ 🧩 Same masterpiece — your order works! (Even if it wasn't the original order — same result means also correct.)";
    confetti();
    clearCanvas();
    await animate(cmds);
    renderStdoutPuz();
    lastRun = { code, hadCmds: cmds.length > 0, firstOut: stdoutBuf.split("\n").find(s => s.trim()) || "" };
    showSaveBar();
  } else {
    /* their attempt in color, the goal as ghost underneath — the difference teaches */
    drawGhost(puz.targetCmds);
    const ctx = setupCanvas(true);
    for (const s of cmds) {
      if (s.t === "dot") { ctx.fillStyle = s.c; ctx.beginPath(); ctx.arc(s.x, -s.y, s.r, 0, 7); ctx.fill(); }
      else { ctx.strokeStyle = s.c; ctx.lineWidth = s.w; ctx.beginPath(); ctx.moveTo(s.x1, -s.y1); ctx.lineTo(s.x2, -s.y2); ctx.stroke(); }
    }
    renderStdoutPuz();
    fb.className = "feedback err";
    fb.textContent = outOk
      ? "🧭 It runs — but compare your colored drawing with the ghost. Where do they part ways? Rearrange and try again."
      : "🧭 It runs — but the printed words differ from the goal. Check the order of your print lines.";
    fb.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
}

function renderStdoutPuz() {
  document.getElementById("outputs").innerHTML = "";
  renderStdout();
}

function puzzleExit() {
  puz = null;
  document.getElementById("puzzlePanel").style.display = "none";
  document.getElementById("editorCard").style.display = "";
  clearCanvas(); clearOutputs();
  document.getElementById("feedback").className = "feedback";
}

/* ---------------- 👣 Step mode — the notional machine, visible (DECISIONS B28) ----------
   Runs the code once under a real Python tracer, then replays it line by line: current line
   glowing, variables as jar chips, the canvas drawn only up to this moment, loop headers
   counted as passes. Forward AND backward through time — mental simulation, trained. */
let stepState = null, stepMarkedLine = null;
const escH = (t) => { const d = document.createElement("div"); d.textContent = t; return d.innerHTML; };

function stepRun() {
  if (!pyReady) return;
  exitStep();
  clearOutputs(); clearCanvas();
  document.getElementById("feedback").className = "feedback";
  const code = editor.getValue();
  let data;
  try {
    pyodide.runPython("reset()");
    pyodide.globals.set("_usercode", code);
    data = JSON.parse(pyodide.runPython("_step_run(_usercode)"));
  } catch (err) { showError(err); return; }
  if (data.error && !data.trace.length) { showError({ message: data.error }); return; }
  const lines = code.split("\n");
  const counters = {};
  const passMap = data.trace.map(t => {
    const src = (lines[t.line - 1] || "").trim();
    if (/^(for|while)\b/.test(src)) { counters[t.line] = (counters[t.line] || 0) + 1; return counters[t.line]; }
    return 0;
  });
  stepState = { ...data, idx: 0, passMap, lines };
  showCanvas(data.cmds.length > 0);
  document.getElementById("stepBar").style.display = "flex";
  renderStep();
}

function renderStep() {
  const s = stepState; if (!s) return;
  const t = s.trace[s.idx];
  if (stepMarkedLine !== null) editor.removeLineClass(stepMarkedLine, "background", "step-line");
  stepMarkedLine = t.line - 1;
  editor.addLineClass(stepMarkedLine, "background", "step-line");
  const shown = s.cmds.slice(0, t.nc);
  drawAll(shown);
  const lastSeg = [...shown].reverse().find(c => c.t === "line" || c.t === "dot");
  if (lastSeg) {
    const ctx = cv().getContext("2d");
    if (lastSeg.t === "line") drawTurtle(ctx, lastSeg.x2, lastSeg.y2, lastSeg.h);
    else drawTurtle(ctx, lastSeg.x, lastSeg.y, 0);
  }
  const out = document.getElementById("outputs");
  out.innerHTML = "";
  s.outs.slice(0, t.no).forEach(line => {
    const b = document.createElement("div"); b.className = "bubble"; b.textContent = line; out.appendChild(b);
  });
  const pass = s.passMap[s.idx];
  let cap = `<b>Step ${s.idx + 1} of ${s.trace.length}</b> · line ${t.line}`;
  if (pass) cap += ` · <b>🔁 pass ${pass}</b>`;
  const vars = Object.entries(t.vars).slice(0, 4)
    .map(([k, v]) => `<code class="v">${escH(k)}</code> = <code class="a">${escH(v)}</code>`).join("  ");
  if (vars) cap += ` &nbsp; ${vars}`;
  if (s.error && s.idx === s.trace.length - 1) {
    cap += s.error.includes("STEP_LIMIT")
      ? " · ⚠ paused after 500 steps — an endless loop, maybe?"
      : ` · ⚠ stops here: ${escH(s.error)}`;
  }
  document.getElementById("stepInfo").innerHTML = cap;
  document.getElementById("stepSrc").textContent = (s.lines[t.line - 1] || "").trim();
  document.getElementById("stepPrev").disabled = s.idx === 0;
  document.getElementById("stepNext").textContent = s.idx < s.trace.length - 1 ? "Next ▶" : "⏭ Finish";
}

function stepMove(d) {
  const s = stepState; if (!s) return;
  if (d > 0 && s.idx >= s.trace.length - 1) {
    const cmds = s.cmds, outs = s.outs;
    exitStep();
    drawAll(cmds);
    const out = document.getElementById("outputs");
    out.innerHTML = "";
    outs.forEach(line => { const b = document.createElement("div"); b.className = "bubble"; b.textContent = line; out.appendChild(b); });
    return;
  }
  s.idx = Math.max(0, Math.min(s.trace.length - 1, s.idx + d));
  renderStep();
}

function exitStep() {
  if (stepMarkedLine !== null) { editor.removeLineClass(stepMarkedLine, "background", "step-line"); stepMarkedLine = null; }
  stepState = null;
  document.getElementById("stepBar").style.display = "none";
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

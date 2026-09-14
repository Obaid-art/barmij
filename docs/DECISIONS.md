# Decisions Log — Barmij

- **2026-09-14 / B40 — Post-completion hardening audit (founder: "flag anything slowing down
  or breaking — fix right away").** Four engine defects found by review, each proven live
  before and after the fix:
  1. GHOST OVERLAY WAS BROKEN (silent): setting canvas.width wipes the bitmap even when
     unchanged, so every Challenge/Puzzle mismatch showed the child's attempt WITHOUT the
     ghost — the "compare with the ghost" feedback was a lie. setupCanvas now resizes only on
     real size change, clears explicitly, and takes keep=true for overlays. Pixel-verified:
     ghost + attempt both present.
  2. DOUBLE-CLICK RUN RACE: an older run's animation watchdog could repaint the previous
     drawing over the new one. animSession token (any clear cancels in-flight animation) +
     runSeq token (a newer Run supersedes one still awaiting downloads/exec). Verified: only
     the second run's drawing survives.
  3. STALE GLOBALS BETWEEN RUNS: _run_guarded kept yesterday's variables/defs/imports alive,
     so deleted lines could keep "working" until reload — "it worked yesterday" poison, and
     checks could pass on state the code no longer creates. _run_guarded now scrubs to the
     preamble baseline like _step_run always did: every Run is a fresh program. All 259
     programs (199 bank + 48 starters + 12 challenge targets) re-ran clean under fresh
     semantics — zero hidden cross-item dependencies.
  4. CRASH + FREEZE-LOOK PAPER CUTS: tapping a puzzle before Pyodide wakes crashed on null
     (now a kind "still waking up" flash, same for Run); the FIRST sklearn Run stalled ~3s
     silently after download (first import) — the notice now keeps talking through it.
  Perf: canvas no longer realloc'd 30-60x/sec in LIVE/animation (real cost on school
  laptops). Full sweep: 259/259 clean, only flagged cost is sklearn's one-time ~3s first
  import (inherent, now narrated). Assets v18.

- **2026-09-14 / B39 — World 8 shipped: Thinking Machines. THE CURRICULUM IS COMPLETE.**
  Six lessons closing the arc that صفر opened in W5: al-Khwarizmi named the algorithm, and the
  world's story ends with the child WRITING one. Ladder: champion pattern (max by hand, no
  built-in magic) → linear search with a printed steps receipt (the notional machine made
  visible) → selection sort (build-beat letter by letter; the check verifies the rising
  staircase BEHAVIORALLY, not by string-matching) → measuring work (count steps, chart the
  cost curve with matplotlib — W7 skills warm, Rohrer interleaving) → scikit-learn as ONE
  honest taste: KNN telling dates from olives, framed as "patterns, not understanding"
  (honest-ML law, no anthropomorphizing) → the signed capstone (>= 2 defs, >= 2 world-powers,
  a signature line — Ericsson's deliberate-practice summit).
  Engine: ensureSklearn() lazy loader (~4.5 s, honest download notice, cached promise);
  kind list.remove ValueError translation; KHATAM ceremony — when every lesson in all eight
  worlds is complete, the rank chip crowns (🏆 Ra'id ✦), confetti fires once, and the toast
  says the journey is theirs. Gates: .remove→(8,3) and sklearn→(8,5) in INTRO/detectors;
  FLOOR_EXEMPT sklearn:2 and GATE_EXEMPT (8,5) — one capstone taste is B16 scope discipline,
  and padding it out is banned by B27. Bank 186→199 (cb187–cb199). Narration 303 clips.
  All machine gates PASS; every lesson verified end-to-end in the live engine, KHATAM fired.
  Worlds 1–8, 48 lessons, 199 bank items: from print("Ahlan!") to a machine that learns.

- **2026-09-14 / B38 — World 7 shipped: Real Data — and REAL matplotlib in the browser.**
  Pedagogical order deliberate: hand-built bars FIRST ("a chart is just drawing driven by
  data" — build the tool before receiving it), then dictionaries (the W5 promise kept, with
  real Dubai temps marked approximate per honesty rules), then matplotlib as "the professional's
  pen" (lazy-loaded with an honest one-time-download notice; loaded in ~4 s; Agg → PNG →
  our canvas, so thumbnails/Gallery/Picture all still work), then the labeling law — title,
  xlabel, ylabel enforced by the lesson check: "an unlabeled chart is a rumor" — then split
  parsing pipelines (raw text → twin boxes → labeled chart), and the Make: chart a REAL week
  of your life + print one honest sentence of analysis (data storytelling). Engine findings:
  the runaway guard was counting LIBRARY lines — matplotlib tripped it; fixed on principle
  (only the child's <run> lines count; libraries neither counted nor traced — also faster);
  kind KeyError message added for dicts. 16-item W7 batch (bank = 186, 16/16 clean after the
  fix); gates PASS; narration → 274 clips. pandas-light deferred honestly (split covers the
  level; noted in curriculum).
- **2026-09-14 / B37 — World 6 shipped: Living Programs — and LIVE MODE, a new engine organ.**
  def tick() makes a program ALIVE: ~30 fps, real arrow-key input (key_pressed), game.* jars
  remembered between blinks (no `global` wall for kids), distance() collision, write() HUD —
  every frame under the runaway guard (8k steps/frame), Esc/⏹ stops, kind errors for unborn
  game jars and missing tick. Lesson checks run 90 SIMULATED heartbeats and assert motion,
  stillness-without-keys, fall+respawn, and HUD presence — living programs verified headlessly.
  Six lessons grow ONE game: the heartbeat → keys → the falling houbara → the catch
  (distance/score/write) → game feel as three laws (EDGES, CHALLENGE, MERCY — a miss costs
  nothing, per the joy charter) → Make: your own living world (dhow dodge suggested, freedom
  granted). Verified end-to-end incl. the falcon actually flying under a held key. 14-item W6
  batch of living toys (bank = 170, all clean); gates PASS after catching one 16-word beat and
  two thin unlock points; narration → 245 clips. Step mode note: living programs are watched,
  not stepped (setup still steppable).
- **2026-09-14 / B36 — World 5 shipped: Collections** — six lessons: the treasure box (lists,
  with the count-from-zero trap staged in the build: "the zero is our gift to mathematics") ·
  the visiting loop (for-in, no range) · the majlis guest list (append/len/in — the door keeper
  catches double arrivals) · words are boxes too (string slots, len-1) · **the cipher machine**
  (the صفر/sifr etymology taught as a beat; find/slide/wrap built stagewise; verified live:
  salam → vdodp; decoder as the task) · Make: the quiz machine (twin lists, range(len()),
  score, kind verdict). Engine: lists now visible in Step-mode jars; IndexError and
  str-concat TypeErrors translated kindly. Honest scope call: **dictionaries deferred to
  World 7** where real data motivates them (curriculum updated). 21-item W5 batch (bank = 156,
  all engine-verified); gates PASS (beats ≤15 words, FK ≤4.9; six W5 concepts over floor;
  W5·L2 thin-slope caught by the gate and filled); narration → 217 clips. Recurring lesson
  logged twice now: append-to-bank edits must anchor the true end-of-array — the double-];
  mistake happened again and was caught by console-first debugging in one minute.
- **2026-09-14 / B35 — World 4 shipped: Your Own Magic Words** — six lessons: def with the
  define-vs-call distinction staged explicitly in the build ("Teaching is silent… now we SAY
  the word") + typing demo · square(size) parameters · poly(sides, size) with computed
  360/sides — one word, every regular shape · return with the jar-catches-the-answer build ·
  composition (ray→sun→sky: "all software is this tower") · Make: the Eid card generator
  (input + own words + print). Engine upgrades shipped with it: **Step mode now walks INSIDE
  the child's own functions** (parameter jars like size = 90 visible mid-loop — verified) and
  **RecursionError translated kindly** ("your word calls itself, forever…" — verified).
  16-item W4 bank batch (bank = 135, all engine-verified); all gates PASS (beats ≤14 words,
  FK -0.1–3.6; def 16 / def-params 12 / return 6 items; progression W4·L1/L2/L4 soft entries,
  zero queue-jumping); narration script → 183 clips. The W4L6 check rejected the test author's
  own 9-line card — the gates guard everyone.
- **2026-09-14 / B34 — World 3 shipped: Patterns & Power** — six lessons (nested loops with a
  double-handshake typing demo + build beat · the zellij rose window · range(start, stop, step)
  build · the patient while with its "promise" build · the National Day fireworks show ·
  Make: your own zellij tile). All charter gates pass (beats ≤13 words, FK -0.5–2.9; coverage
  floors met by a 14-item W3 bank batch, bank = 119 engine-verified; progression: W3 concepts
  now shipped concepts, zero queue-jumping, W3·L1/L3/L4 unlock with 9/7/7 items). Narration
  script regenerated (149 clips). **Safety shipped with while (essential):** every Run is
  guarded — a runaway loop is caught at 20,000 steps in ~20 ms with a kind explanation of the
  missing "promise", and the canvas surrenders gracefully past 3,000 marks; W3L4 teaches the
  guard's existence honestly ("I catch runaway loops and tell you kindly"). Rank ladder intact:
  completing Worlds 1-2 still earns Ra'id.
- **2026-09-14 / B33 — 🔊 Narration: the turtle's voice** (Mayer's modality principle — spoken
  words + pictures beat printed words for young readers). A 🔊 header toggle, OFF by default
  (B7: no sound uninvited); when on, every teaching moment speaks: beats as they reveal, demo
  and build captions as they change, guided thoughts, challenge goals, lesson-pass
  celebrations. Voice today: the browser's best English speech voice (placeholder, stated
  plainly). **Recording-ready by construction**: every clip has a stable ID; the founder
  records lines from docs/NARRATION_SCRIPT.md (110 clips, auto-generated by
  tools/build_narration_script.py) into app/audio/<ID>.mp3, maps them in audio_manifest.js,
  and each recording overrides the synthetic voice clip-by-clip (override path verified).
  Interrupt-safe: navigation and toggling stop speech; new speech cancels old.
- **2026-09-14 / B32 — 🎯 Challenges: Match the Masterpiece.** Twelve curated, original,
  prerequisite-gated challenges (auto-gated from their hidden target-maker code, sorted on the
  gentle slope): a ghost drawing appears, the editor starts blank ("Summon the ghost. Your
  code, your way."), and matching is by SHAPE + color — unordered, direction-agnostic, tolerant
  — so any code that draws the goal wins (verified: an unrolled opposite-rotation square
  matches the loop-drawn target). Feedback is precise deliberate-practice feedback: "3 of 4
  matched · 1 missing · 2 extras · check the COLOR", with the attempt overlaid in color on the
  ghost. Hint ladder per challenge; solved state persists; success feeds the spaced-review
  scheduler and offers the Gallery save. Grounding: Ericsson's deliberate practice (clear goal,
  edge-of-ability effort, immediate specific feedback). Also: default pen color moved to the
  Okabe-Ito blue (#0072B2) for palette consistency.
- **2026-09-14 / B31 — 🖼️ My Gallery: the private portfolio.** After ANY clean run — pass or
  fail, lesson or bank or puzzle — a save bar offers "💾 Save to My Gallery": name it, add one
  optional reflection ("What did you teach the computer?"), kept with a thumbnail. Gallery page:
  the child's creations with open-&-run, rename, gentle two-tap delete, and picture download
  (show the family, offline). Criticism-proofing as design law: (a) device-only storage, stated
  in the UI — "nothing is uploaded, ever" (privacy-by-design, no accounts, no COPPA surface);
  (b) NO likes, feeds, counts, or sharing platform — social comparison is a documented
  motivation killer for young learners, so it is an anti-feature here, permanently; (c) saving
  is never gated by a test passing — ownership is not graded; (d) all child-entered text
  rendered via textContent (injection-safe). Grounding: Papert's constructionism (the artifact
  you own IS the learning), portfolio practice with reflection (Paulson & Paulson; Barrett),
  self-explanation (Chi), SDT autonomy (Deci & Ryan). Storage-full handled gracefully (keeps
  code, drops image).
- **2026-09-14 / B30 — 🧩 Parsons puzzles with ghost targets.** Any eligible bank item (3-12
  lines, deterministic, no input) becomes a puzzle for free: the finished drawing appears as a
  pale ghost on the canvas; the code arrives as shuffled role-colored tiles; the child taps them
  into order and chooses indentation (auto-suggested after a ':' line, adjustable — the secret
  handshake as a decision). The check RUNS the arrangement and compares BEHAVIOR to the target:
  a different valid order producing the same result is accepted and told so — honest computing,
  not answer-key matching. A mismatch draws the child's attempt in color OVER the ghost so the
  difference itself teaches. 41 puzzles born from the existing bank, zero new content authored.
  Warm-ups now sometimes arrive as puzzles (varied retrieval). Evidence: Parsons & Haden 2006;
  Ericson et al. — comparable learning to code-writing in roughly half the time, less
  frustration; ideal for young typists. Completes the fading ladder: watch → ORDER → type → make.
- **2026-09-14 / B29 — English-only product (founder: "no more arabic").** All Arabic script
  removed from the UI, content, and license page: logo is "Barmij" alone, language toggle
  deleted, ranks shown as Mustakshif/Bannaa/Ra'id (Latin), the two bank items with Arabic
  strings rewritten. Latin warmth words (Ahlan, Yalla, Mumtaz, Salam) STAY — they are the voice.
  Kept invisible: the Arabic-keyboard detection regex (functional helper, never displayed).
  The Arabic content track is off the roadmap unless the founder reopens it.
- **2026-09-14 / B28 — 👣 Step mode: the notional machine, visible** (founder: "in this pass we
  get this, in another pass we get that — writing code while seeing a window showing what's
  happening"). A Step button beside Run: the code runs once under a real Python line-tracer,
  then replays under the child's control — current line glowing in the editor, variables shown
  as jar chips (i = 1), the canvas drawn only up to this moment with the turtle at its true
  position, loop headers counted as 🔁 passes, print bubbles appearing in time. Forward AND
  backward through time. Bonus: an endless loop pauses safely at 500 steps with a gentle
  question instead of freezing the browser. Grounding: Sorva's notional machine; Guo's Python
  Tutor (the canonical evidence that stepping visualization works, ~millions of learners).
- **2026-09-14 / B27 — Quota killed, thinking shipped, spacing shipped.** (a) The "500" target
  is DEAD (founder: "no padding") — the bank holds what mastery requires, gated by quality bars
  only (BANK_BLUEPRINT revised). (b) **Guided think-alouds**: bank items can carry a thinking
  track — the programmer's reasoning, thought by tappable thought, before the run (cognitive
  apprenticeship, Collins/Brown/Newman; self-explanation, Chi). Six exemplars shipped (🧠 badge),
  one per concept cluster; more with each World. (c) **Spaced-repetition scheduler shipped**
  (PEDAGOGY §3): passing a lesson schedules its skills at 2 → 7 → 21 days; a due skill surfaces
  as ONE gentle snoozable warm-up banner suggesting a matching bank item; running it advances
  the interval. Goal restated per founder: not professional coders — complete foundations +
  the habit of thinking like a programmer, ready for university.
- **2026-09-14 / B26 — Bank Blueprint adopted + batch 2 shipped.** The 500 is engineered, not
  vibes: 36 concepts × worked/tweak/independent/transfer ladder (+100 interleaved spirals, +40
  capstones) = ~500, machine-checked by tools/check_bank.py (auto-detects concepts from code —
  coverage cannot drift). Batch 2: 60 items targeting the checker's exposed gaps (decision
  cluster, loop-var, randint, Mustakshif floor). **Bank = 100/500, all engine-verified, coverage
  PASS.** Cadence: ~60-item batch ships with each World.
- **2026-09-14 / B25 — Public license: CC BY-NC-SA 4.0.** Founder's rule in plain words on the
  site footer + license.html: "free for every learner and teacher, forever — and not for sale,
  by anyone." Teachers/schools may use and adapt (share-alike inherits free-forever); all
  commercial use banned; Barmij name/characters excluded from the license. The founder's
  intention stays private — public text is legal and warm, never preachy. Legal review before
  launch logged.
- **2026-09-14 / B24 — FREE FOREVER, SEALED (founder's word, final).** After weighing charging
  (AED 20 lifetime was considered), the founder decided: "I will stick for the sake of Allah,
  and I will not take profit — not for this one. Allah will reward me with better things."
  Binding rules, permanent:
  1. **A child never pays.** No price, no trial, no premium tier, no ads, no data monetization —
     for any student, family, or public school, in any country, ever.
  2. Permissible sustainability lanes that never touch rule 1: institutional licenses (private
     schools / teacher dashboards), sponsorship or waqf-style endowment (a "supported by" line;
     no ads, no data, no editorial influence), grants and innovation awards.
  3. The founder's income needs are served by his separate ventures (Hisab — live;
     Itqan — parked, revenue-designed), never by this initiative.
  This decision is not revisited by future sessions; it is the initiative's identity.
- **2026-09-12 / B23 KILLED by founder** ("lame idea") — no guide characters, no mascots, in
  Barmij or any spin-off. characters.html removed from the repo 2026-09-14. The turtle remains
  the only voice. Original entry kept below for the record:
- ~~**2026-09-09 / B23 — The guides: Emirati characters as soft power** (founder vision).~~
  A boy and a girl in Emirati dress become the speaking guides (child chooses; turtle becomes
  their pet). Strategy + precedents in INITIATIVE.md; concept board with 2 style directions +
  in-context mock + name candidates (Rashid/Salem/Hamdan · Moza/Alia/Maitha) at
  app/characters.html. Pending founder: pick direction + names. Pending before launch:
  professional illustrator, trademark, cultural dress review. Integration after approval:
  guide face replaces 🐢 in captions; narration (PEDAGOGY §8 modality) becomes their voice.
- **2026-09-09 / B22 — First-meeting law + header minimalism** (founder: "why show print all of
  a sudden? show it in progress, letter by letter"). (a) **No code meets a child fully formed the
  first time**: concept-introducing lessons carry a "build beat" — the code constructs itself
  letter by letter at teaching pace while the turtle narrates each piece's role, then the effect
  appears; the Watch-then-try demo then skips straight to "your turn, hero" (no double-watch).
  Shipped on W1L1; extend to every lesson that introduces a new construct. (b) Header carries
  only what a child needs: logo, Journey, rank, language — slogans deleted. (c) Breadcrumb
  restyled from gray uppercase to a soft pill (aesthetics are part of pedagogy).
- **2026-09-09 / B21 — Charter rebuild executed.** Beat engine (tap-advance, show-all,
  reduced-motion), all 12 lessons converted to beats (readability-gated by
  tools/check_content.py: ≤14 words/beat, FK 1.0-4.2), Okabe-Ito palette with AA text variants,
  border-style role cues (grayscale-survivable), contrast fixes. Full flow re-verified
  end-to-end. Remaining charter debt tracked inside DESIGN_CHARTER.md status list.
- **2026-09-09 / B20 — The Design Charter adopted** (founder deliberation: "grown-up
  initiative, best coding exercises ever for school students"). Binding laws in
  docs/DESIGN_CHARTER.md: beats not paragraphs (≤15 words, revealed one at a time,
  tap-advanced, reduced-motion respected); arrows-not-adjectives (labeled-specimen figures);
  WCAG 2.2 AA floor; colorblind-safe palette (Okabe-Ito) + color-never-the-only-channel;
  readability gates per rank; UDL named; think-aloud child testing protocol; per-lesson release
  checklist. Implementation backlog lives in the charter. No code written this session by
  founder instruction — thinking first, building next.
- **2026-09-09 / B19 — Staged reveal + human typing pace (attention law II).** Founder: "step by
  step, not full page at once — these are kids." Lessons reveal in three stages: story (ends at
  one 'Yalla — continue' button) → Watch-then-try (finishing the hero, or 'skip to mission',
  reveals the rest) → mission + editor + canvas. Nothing below exists until earned. The demo
  types at a child's watching pace (~4-5 chars/sec, a breath at every word break, ~1.1s pause per
  teaching caption) — never at programmer speed. Applies to all future Worlds.
- **2026-09-09 / B18 — One calm column (attention law).** Founder: "it goes in order, not all
  over the place — kids have ADHD these days." The lesson screen is a single centered column in
  strict reading order: story → predict → Watch-then-try → mission → editor → hint (appears
  directly under the editor) → canvas → feedback. Worlds/Bank navigation lives in a Journey
  drawer, closed by default. Feedback and hints auto-scroll into view. Nothing competes for the
  eyes; no simultaneous panels. This law applies to every future screen.

- **2026-09-09 / B9 — Name locked: Barmij برمج** (founder: "let's go with it").
- **2026-09-09 / B10 — Benchmark declared:** beat 100 Days of Code (Angela Yu, Udemy) — in our
  lane (school students, from zero). Analysis & joy-principle product laws: docs/BENCHMARK.md.
- **2026-09-09 / B11 — Joy is the metric.** "I want them to enjoy, not to be challenged" —
  challenge only as part of joy; colors pleasing; no red X; warm specific feedback; celebration
  variety. Pedagogy stays front and center (PEDAGOGY.md governs every mechanic).
- **2026-09-09 / B14 (REVISED same day, founder call) — Ranks, not ages.** مستكشف Mustakshif →
  بنّاء Bannaa → رائد Ra'id are **earned levels**, decoupled from age entirely: an 11-year-old
  prodigy reaches Ra'id on pure mastery. Rank is computed from completed worlds and shown as a
  badge that upgrades with celebration. Ages remain only as *typical* guides in docs; the app
  never asks for age to gate content. Presentation comforts (bigger type, tap-to-insert) become
  opt-in settings, not age locks. Names kept (founder approved).
- **2026-09-09 / B17 — The Code Bank: 500+ original programs.** A browsable, one-click-runnable,
  remixable treasury inside the app — every item authored original (B15 law), UAE-souled,
  tagged by rank/world/concepts, with a remix hint. Grown in reviewed batches (founder gate);
  first batch ships 2026-09-09. The bank is the "exceedingly interactive" engine: browse →
  run → remix → own.
- **2026-09-09 / B15 — Content law: zero borrowed content, UAE-souled.** No projects or code
  adapted from any course (100DoC included), textbook, or the internet — everything authored
  original. Cultural rules codified in docs/CONTENT_POLICY.md (family course: no romance
  framings, no alcohol/gambling framings, our own calendar; naturally Emirati themes).
- **2026-09-09 / B16 — Library ladder scoped.** In: turtle-canvas, random/math → matplotlib +
  pandas-light (World 7) → scikit-learn as ONE honest capstone taste (World 8, Ra'id only).
  Out: web frameworks, Selenium, deployment — vocational adult material. "Graduate who can learn
  any library in a weekend" is the success metric, not library count.
- **2026-09-09 / B13 — "Watch, then try" guided typing** (founder request: "we teach them and
  then say, go on, hero — it's your turn"). Lessons can carry a typing demo: code types itself
  character-by-character with a teacher caption per chunk, then the child re-types it on the same
  stage — correct keys light up in role colors; a wrong key gets a gentle wobble, and after two
  tries the next key is shown big. No buzzer, no red, ever. This is PEDAGOGY.md §4 (worked
  examples → guided practice) made literal. Shipped on 5 anchor lessons; rest incremental.
- **2026-09-09 / B12 — input() in the browser** implemented via the native prompt dialog
  (synchronous, real Python `input()` semantics preserved — no non-standard syntax taught).
  A beautiful in-page input box replaces the native dialog later (NOT_YET_BUILT).

- **2026-09-09 / B1 — Founded.** Free national initiative (not a business): every UAE student
  graduates competent in Python. Gifted to the Ministry. Priority over Itqan (parked, see
  ../itqan/docs/DECISIONS.md D16).
- **2026-09-09 / B2 — Real Python from minute one.** No blocks, no pseudo-language. Browser-based
  via Pyodide (WebAssembly CPython) — zero installation, runs on any school machine.
- **2026-09-09 / B3 — The turtle is the first world.** Papert's object-to-think-with; code becomes
  visible motion. Custom lightweight turtle (animated canvas), not Python's tkinter turtle.
- **2026-09-09 / B4 — Design language = founder's manuscript aesthetic.** Colors encode roles,
  consistently, everywhere (figures AND syntax highlighting): blue = Python's words, lavender =
  names you invent, amber = values, rose = effects/output. Never decorative color.
- **2026-09-09 / B5 — Pedagogy stack:** PRIMM + constructionism + worked examples +
  misconception-driven feedback (docs/PEDAGOGY.md). Friendly error translations always show the
  real Python error underneath — honest induction into real tooling.
- **2026-09-09 / B6 — Working name Barmij (برمج)**; alternate Sifr (صفر). Founder to decide.
- **2026-09-09 / B7 — Motivation ethics:** stars/streaks yes; dark patterns never. No accounts,
  no data collection in the prototype; progress lives in the browser (localStorage).
- **2026-09-09 / B8 — English content first, Arabic as first-class second track** once World 1 is
  polished (Arabic UI labels shipped from day one as a signal of intent).

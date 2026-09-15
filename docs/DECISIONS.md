# Decisions Log — Barmij

- **2026-09-15 / B57 — THE FIGURE FLOOD (founder: "flood it with figures, explaining what's
  happening at each stage, then make them practice — text is boring… figures kids easily
  comprehend").** The charter's oldest promise ("every concept gets a beautiful figure"),
  finally paid in full — and paid SYSTEMATICALLY:
  - app/figures.js: a figure ENGINE, not 48 hand drawings. Four generators in the manuscript
    language (role-colored token boxes with the charter's border cues, arrows, rose effect
    chips): ANATOMY (a code line dissected, labels beneath, → what happens), SLOTS (boxes
    with slot numbers — lists, strings, bags), CYCLE (steps around a loop — heartbeats,
    while-promises, for-in), ROWS (little pipelines: code → result, stacked).
  - Beats carry figure DATA (fig: {k:…}); the engine renders them at view time. Kid-simple
    law: one idea per figure, ≤4 elements, concrete words ("slot 0", "what happens"),
    arrows left-to-right or circular.
  - 27 new figures authored across ALL EIGHT WORLDS (43 figure placements total with the
    legacy anatomy set): print anatomy, color/width, the choice bag, int(input), the mood
    fork, nested-laps, 360 arithmetic, range(start,stop,step), the while cycle, fireworks,
    teach-vs-say, the size door, poly's two doors, return-catches, ray→sun→sky, slot-zero,
    for-in cycle, append/len/in, word-as-slots, the Caesar slide, quiz twins, the tick
    heartbeat, key_pressed True/False, fall-and-respawn, the distance judge, three game
    laws, number→bar, dict-by-name, three chart duties, the split pipeline, the champion,
    the search walk, the sort staircase, cost-vs-size, fit/predict.
  Verified: 43 figures render on all 48 stories, zero geometry faults, zero console errors,
  gates PASS (fig data keys chosen to never collide with the beat-text gate). Assets v33,
  deployed. Remaining polish: founder review of each figure — his eye is the final gate.

- **2026-09-15 / B56 — THE TYPING CARD IS DEAD (founder: keyboard failed him twice on the
  live site; "blank space then 'watch me first' is very strange… should happen
  automatically… I prefer it like the figures… I will not publish this").** When a component
  fails the founder twice while passing every synthetic test, the component is the bug.
  The entire "Watch, then try" apparatus is REMOVED (~200 lines: the card, the blank code
  box, all five buttons, hero typing, key interception, dead-key/CapsLock/Arabic nudges,
  the Enter bridge). The flow is now what the founder specified:
  - The code writes itself AUTOMATICALLY in the story (build beats — paced captions in the
    same box, ↺ replay); the four demo-only lessons (w1l2/w1l4/w1l5/w2l1) got their demos
    CONVERTED into build beats (a backlog item since B22, closed by necessity).
  - Explanation stays the FIGURE way: the anatomy figures with arrows (print/turtle/jar/
    loop/input) remain in the same stories.
  - The child types in the REAL editor, where every key on earth works natively. No
    imitation keyboard surface exists anymore — that class of bug is extinct.
  - The "🔮 Predict first" pink box (founder: "the hell is this?") is now simply the turtle
    asking — "🐢 Think first: …" — as a normal story line. Element and style deleted.
  Story flow: beats+builds → Yalla continue → mission. One path, no branches, no blanks.
  Verified: all 48 stories render (22 builds), 34 predict lines, story→mission direct,
  259/259 programs, zero console errors, gates PASS. Assets v32, redeployed.

- **2026-09-15 / B55 — ONE box, one gaze (founder: "no more writing below — a child should
  not be watching two things simultaneously").** The Watch-then-try card used to split
  attention: code typing in the box, the turtle's sentence below it. Now they share ONE
  bordered box — the turtle's line at the top, the code directly beneath, a hairline between
  (split-attention principle, honored at last). Build beats reordered the same way: caption
  above the constructing code. Hero nudges now appear inside the very box the child is
  typing in. (The founder's "not fixed" sighting of the Enter bridge was a STALE TAB from
  before the deploy — the current version verified again: forward(100) then typing r-i-g-h-t
  flows to the celebration with no Enter. Remedy for stale tabs: reload; versions are
  cache-busted per asset.) Assets v31, redeployed.

- **2026-09-15 / B54 — Founder's flow notes: the Next door, smoother seams, and the end of
  "hero".**
  1. THE NEXT-LESSON DOOR: previously the Next button simply didn't exist until a pass — a
     child wondering "how do I go on?" met silence. Now the door is always visible once the
     mission shows: locked ("🔒 Next lesson", muted) with a kind refusal on click — "Not yet
     — finish this mission first, and the door opens. 🙂" — and it turns blue and opens the
     moment they pass. Verified: locked click stays put with the message; pass unlocks;
     click flows to the next lesson.
  2. SMOOTHER SEAMS: every lesson opens with a gentle 0.3s rise-and-fade (reduced-motion
     safe); html scroll-behavior: smooth unifies all remaining scrolls. No more jump cuts
     between finishing one thing and starting the next.
  3. "HERO" RETIRED from all child-facing text (founder: a child may think the turtle means
     ITSELF — ambiguous). The typing button is now the child's own voice: "✍️ I try now"
     ("▶ Watch me first" stays). All captions re-addressed directly (your turn / YOU try /
     keep going); the two bank items that said hero reworded (one now says ya sadiqi).
     Code-internal identifiers (demoHero, heroKey) untouched. Zero "hero" in the visible UI.
  Gates PASS, assets v30, redeployed live.

- **2026-09-15 / B53 — Full pass ON THE LIVE LINK, typed like a child (founder: "go through
  it… don't embarrass me").** Everything driven at https://obaid-art.github.io/barmij/:
  - All 48 lessons' stories opened live: beats render, builds fill, every figure exists,
    zero "undefined", zero console errors.
  - HERO TYPING, BOTH WAYS, ALL SEVEN DEMOS: as the child (visible letters only — never
    Enter, never leading spaces; the B52 bridge carries all of it, zero extra keys needed)
    AND as the literalist (every exact character). All 14 paths reach the celebration.
  - Features on the live internet: lesson pass, drawing, Step, matplotlib chart,
    scikit-learn (6.3s total on the public CDN, narrated), the falcon FLOWN with real
    ArrowRight events, puzzle solved, challenge ghost built, gallery save/open/delete.
  - ONE BUG caught and fixed: flashFeedback's 2.2s reset timer blanked WHATEVER feedback
    was showing when it fired — so a verdict arriving just after a RANK-UP/KHATAM toast was
    silently wiped (exactly the world-completion moment). The timer now erases only its own
    message. Reproduced, fixed, re-proven: the verdict survives. Assets v29, redeployed.

- **2026-09-15 / B52 — The founder's own live test (first real user!): the Enter trap, and
  captions still "fast and long."**
  1. THE ENTER TRAP: in hero typing, at a line break the child sees the next line's letters
     (right(90)) and naturally types "r" — but the machine silently demanded the invisible
     Enter first, answering "Hmm, not that key." The founder himself hit this wall on the
     live site. LAW: invisible keys are never a wall — typing the next visible LETTER now
     auto-presses Enter and the indent spaces, with "I pressed Enter and the spaces with
     you — keep going, hero!" Typing them manually still works (the handshake caption still
     teaches them). Verified with real key events: f-o-r-w-a-r-d-(1-0-0-)-r flows straight
     through to the celebration.
  2. PACING, second pass: readTime raised ~40% — 520ms/word, floor 2.6s, cap 5.6s
     (B48 was 380/1.9/4.2).
  3. LENGTH: caption cap tightened 16 → 12 words in the permanent gate; the seven captions
     over it trimmed (the w1l5 handshake line, the w5l2 visiting loop, the w6l1 heartbeat,
     four more). Gate PASS at the new cap.
  Assets v28; redeployed to the live site.

- **2026-09-15 / B51 — BARMIJ IS LIVE. 🌍** The founder created his GitHub account
  (Obaid-art), authorized the CLI himself from Abu Dhabi, and the gift went to the world:
  - Repository: https://github.com/Obaid-art/barmij (public — the code, the docs, all
    fifty-one decisions of history)
  - THE LINK: **https://obaid-art.github.io/barmij/** — free hosting on GitHub Pages
    (gh-pages branch = app/ at root), HTTPS enforced, no server bills, ever — the
    free-forever product on free-forever infrastructure.
  Verified from the live internet before telling the founder: Pyodide woke, three prints
  passed w1l1 ("The computer speaks your words"), and a golden star was drawn by real
  Python at the public URL. First audience: the founder's professor, 2026-09-15.
  Deploy discipline: master holds truth; publishing an update = commit to master, then
  refresh gh-pages from it (git commit-tree HEAD:app + branch -f + push) so the site is
  always a pure image of app/.

- **2026-09-14 / B50 — ADHD limits applied EVERYWHERE, and made LAW (founder: "applied
  everywhere… no leftovers").** B49 covered lessons; this pass covered everything else:
  1. FULL-SURFACE SCAN: all 199 bank captions/remix-hints, every think-aloud step, all 12
     challenge goals + hint ladders, and every child-visible string in the engine (feedback
     templates, friendly errors, UI strings). ONE violation in the entire product: the
     RecursionError message at 32 words — trimmed to 23.
  2. THE LAST RECOVERY ASYMMETRY: 🧠 think-alouds could only go forward — a missed thought
     was gone. A "◀ back" now steps through thoughts both ways (hidden on thought 1),
     matching Step mode, demo Watch-again, and build replay: nowhere in Barmij does a
     glance away cost the child anything.
  3. MADE PERMANENT: check_content.py now gates ALL of it, forever — lessons (task 30w /
     hint 26w / msg 24w / say 16w), bank (caption+remix 22w / think 30w), challenges
     (goal+hints 26w), engine strings (32w). A future wall of text FAILS the build.
  Verified live (back-stepping, trimmed message at 23 words); gate PASS everywhere. v27.

- **2026-09-14 / B49 — The ADHD audit (founder: "ADHD check bro").** The founding law (one
  calm column, one idea at a time — B18/B19/B22) audited with instruments, not vibes:
  1. TEXT LOAD, machine-scanned beyond the beat gate: every task ≤30 words, every hint ≤26,
     every check message ≤24, every build/demo caption ≤16 — ZERO flags across all 48
     lessons. The discipline held even where no gate was watching.
  2. ATTENTION MECHANICS, measured live: 0 infinite/looping animations at idle (nothing
     pulses at a child uninvited — the live-dot pulses only DURING a game, the cursor only
     during typing practice); story stage holds exactly 2 calls-to-action (tap ▸ + show
     everything); demo stage max 3; one scroll per action, never competing scrolls.
  3. THE GAP, fixed — INTERRUPTION RECOVERY: a build beat could not be replayed. An ADHD
     child who glances away mid-build lost the explanation with no way back (the demo had
     "Watch again"; builds did not). Every completed build now offers "↺ watch it build
     again" — full letter-by-letter replay, any number of times, also on revisits (where
     builds are instant by default, the button IS the slow path back). Verified live:
     replays, effect returns, button returns.
  4. Judged and kept by design: the warm-up banner (one line, snoozable, spaced-repetition
     duty); the pass-moment cluster (confetti + verdict + save + next = THE reward moment);
     the 4-button editor toolbar (tools, not competing calls).
  Assets v26.

- **2026-09-14 / B48 — Captions get reading time; narration REMOVED (founder: "too fast,
  the sentences below + no need for voice no more").**
  1. PACING: build and demo captions held a flat 1.1s regardless of length — too fast to
     read. Now readTime(): ~380ms per word, floor ~1.9s, ceiling 4.2s. Measured live:
     "print — Python's word…" holds 4.1s, "The doors open…" 2.2s (was 1.1s both); the
     closing caption stays on screen. The letter-by-letter typing pace itself is unchanged
     (the founder-approved ~4-5 chars/sec).
  2. NARRATION REMOVED (was B33, the 🔊 jewel): button, TTS, audio manifest, the 305-clip
     script and its build tool — all gone (git history keeps them if ever reopened). The
     founder no longer records clips — one task struck from his list. Mayer's modality gift
     to slow readers is honored with TIME instead of sound: the captions ARE the voice.
     DESIGN_CHARTER §16 and NOT_YET_BUILT updated; localStorage key barmij_narration is a
     harmless orphan on old devices.
  Verified live: caption timings, demo watch, lesson pass, clean boot; no narration
  references remain in code. Assets v25.

- **2026-09-14 / B47 — The student-answer matrix (founder: "correct and incorrect answers —
  any crash?").** Every lesson tested against the full spectrum of what a real child submits,
  through the exact run() pipeline (exec + frames + safeCheck). The matrix:
  - CORRECT: hand-written honest solutions for the 14 lessons whose missions demand additions
    (w1l1/w1l2/w1l6/w2l1/w2l3/w2l4/w2l6/w3l6/w4l6/w5l1/w5l6/w6l6/w7l6/w8l6 — including a
    full dhow-dodge game, a labeled life-chart, and a champion+chart capstone) — ALL 14 PASS.
    With the 34 run-first starters (B42), every one of the 48 lessons has a proven passing path.
  - INCOMPLETE: those 14 starters run unmodified — all fail with warm, SPECIFIC coaching
    ("Nice, 1 message! Now make it three or more"), never a crash, never a dead end.
  - GARBAGE: 6 hostile inputs (empty editor, prose, broken syntax, infinite while, division
    by zero, undefined name) x all 48 lessons = 288 runs — zero crashes, zero false passes,
    zero empty messages; every error lands in a friendly translation.
  - POPUP ABUSE: Cancel, empty, and words fed to every input() lesson — each lands in one of
    three good endings: still plays (the fork takes the other road), guides (task coaching),
    or kind error (the int() and slot-zero translations, both reading like teaching).
  NOTHING TO FIX — the first pass of eight (B40-B47) to end with an empty fix list.

- **2026-09-14 / B46 — The beauty pass (founder: "beauty, aesthetics?").** A designer's
  critique after six functional audits — fixes stay inside the charter (calm, roles-not-
  decoration, Okabe-Ito):
  1. FAVICON: the browser tab showed a generic globe — on a ministry projector, an undressed
     detail. Now an inline-SVG zellij eight-point star (amber square rotated under a blue
     square, white heart) — role colors, geometry from World 3, no mascot.
  2. PALETTE DISCIPLINE: confetti and the turtle glyph still used the PRE-charter palette
     (#5b8dc9…, #3f9d6e) — the exact colors B20/B21 retired. Both now celebrate in
     Okabe-Ito (turtle = charter green, same family as the Run button).
  3. THE SIGNATURE RIBBON: a 3px line under the header — blue → lavender → amber → rose, the
     four roles in teaching order, at half opacity. The design language itself, worn quietly.
     (Not decoration: it is the legend, distilled.)
  4. CONSISTENT ACCENT LANGUAGE: feedback verdicts now carry the same left accent bar as the
     mission/predict/hint cards (green for ok, vermillion for err) — one dialect everywhere.
  5. Typography & dignity: lesson titles 25px with tightened tracking; drawer stars in amber
     (earned gold, not ink); brand-tinted text selection; a proper :focus-visible ring for
     keyboard children (was the browser default).
  Verified in the live app (ribbon, feedback accents, footer, fresh boot); assets v24.

- **2026-09-14 / B45 — The family-on-the-line pass (founder: an auditor who "would lose his
  family" if anything slipped — crashes, ugly, nonsensical, jumps).** Sixth and final audit:
  1. NONSENSE REJECTION (the embarrassment class): w3l4's promise-check demanded the counter
     be literally named n — a child who renamed it to count had a PERFECT 12-petal flower
     rejected with "Where is the promise?". Proven live, fixed with a backreference
     (any \\w+ = itself ± …); the honest rename now passes. All other name-checks audited:
     the W6/W8 ones test starter-provided names their own builds teach — kept as convention.
  2. CANCEL CRASHED UNKINDLY: pressing Cancel (or typing words) on the guessing game's popup
     fed int("") a ValueError with only the generic fallback. Now a kind translation:
     "int() needs digits — like 7 — … Run again and type a number."
  3. LAST DATA-LOSS HOLE: B44 stashed typed code on Run and navigation — but typing then
     CLOSING THE TAB still lost it. An 800ms debounced stash on every editor change closes
     it; verified on disk with no Run and no navigation.
  4. THE REAL-UI CHILD JOURNEY, finally driven as a child drives it — actual button clicks,
     actual keydown events: beats tapped one by one → build renders → predict → Yalla →
     demo → hero mode typed print("Ahlan!") key by REAL key → 🎉 → mission auto-reveals →
     canvas correctly absent (text lesson) → real Run click → warm verdict → Next click →
     Lesson 2. ZERO uncaught errors end to end.
  5. UGLY FIXED: the story-stage footer no longer floats mid-void (body is a column, footer
     rests at the bottom). A11y touch: the canvas now carries role=img + a warm aria-label.
  259/259 programs re-verified, all gates PASS. Assets v23. SIX passes on 2026-09-14
  (B40–B45): overlays, races, fresh-run law, reveal order, dead canvas, concept bags, check
  crashes, mobile clipping, scale guards, honest receipts, storage armor, editor persistence,
  real-UI journey. The auditors found less each round; this one had to invent a renamed
  variable to draw blood. Frozen pending the founder: GitHub deploy, pilot kids, his voice.

- **2026-09-14 / B44 — The job-on-the-line pass (founder: an auditor "who would lose his job
  entirely if he did not catch bugs").** Attacked surfaces no pass had touched:
  1. A CORRUPTED STORAGE KEY BRICKED THE APP — PERMANENTLY. Top-level JSON.parse of any
     barmij_* key (a browser crash mid-write is enough) killed the whole script, on every
     reload, forever, with a blank page. PROVEN live (set "{corrupted!!" → app dead), then
     armored: loadJSON()/loadStr()/store() wrap every storage read AND write; bad data is
     dropped, never fatal. Re-proven: the same corruption now boots clean and self-cleans.
     A garbage barmij_last (NaN) also crashed boot — now validated and clamped.
  2. DATA LOSS: a child's typed mission code was silently destroyed by ANY navigation (peek
     at another lesson via the Journey drawer → work gone). Editor content is now stashed
     per-lesson (barmij_code_<id>) on navigation and on every Run, restored on return —
     survives even a closed browser. "Reset code" restores the starter and clears the stash.
     Verified end-to-end.
  3. BLOCKED CDN = BLANK PAGE: if the CodeMirror script fails (school networks block CDNs),
     the boot handler died before wiring a single button — silent blank app. Now a clear
     message ("couldn't load its code editor — check the internet and refresh"). Pyodide
     failure already had one; the editor did not.
  4. MONKEY TEST: 80 random interleaved actions across every feature (lessons, bank,
     challenges, puzzles, step, LIVE, gallery, save bar, drawer, hints, broken code included)
     — ZERO uncaught errors. The state machine holds.
  259/259 programs re-verified, gates PASS. Assets v22. Storage engine law: every
  localStorage read goes through loadJSON/loadStr, every write through store() (galSave keeps
  its own try/catch — its failure IS the quota feature).

- **2026-09-14 / B43 — The angry-auditor pass (founder: "literally any mistake, however
  small").** Caught and fixed:
  1. THE SEARCH LESSON'S RECEIPT LIED (w8l2): with no break (untaught, deliberately), steps
     always ended at len(guests) — "Sara found at slot 3 - in 5 steps" (4 questions found
     her), and the task's own experiment ("move Sara to slot 0 — what happens to the steps?")
     would answer NOTHING HAPPENS. The hunter now stops asking once found via a nested
     if spot == -1 (fully taught): slot 3 → 4, slot 0 → 1, absent → 5, all verified live.
     Bank twins audited: cb189/cb190/cb196 were already honest (they print at find time).
  2. "in 1 steps" grammar (w8l2 receipt + cb189's move-to-front remix) → "questions asked: N",
     which also literally answers the lesson's predict question.
  3. input() INSIDE tick() fired a blocking native prompt ~30x/sec (and 90x during the silent
     check) — now a kind refusal: "tick beats 30 times a second… Ask BEFORE the heartbeat."
     Normal input() untouched (verified both).
  4. Opening Challenges during a LIVE game left the game running on a hidden canvas with key
     listeners armed (stopLive added); navigating to Gallery/Challenges/another lesson
     mid-narration left the old clip talking (stopNarration added to all three).
  5. STALE-DOC PURGE (log entries untouched — history stays): CURRICULUM still promised
     "500+" and a bilingual track; NOT_YET_BUILT still listed Worlds 3-8, the Gallery and
     demos as unbuilt and an "age question" B14 forbids (rewritten to current truth);
     CONTENT_POLICY/BENCHMARK/DESIGN_CHARTER/INITIATIVE bilingual-era lines aligned with B29;
     LICENSE.md "Characters/name/logo" → "name/logo" (B23); BANK_BLUEPRINT header "the 500" →
     item-based, W5 row still claimed dictionaries (B36 moved them to W7), W7 row said
     "reading files/CSV" (we teach split pipelines, not files); README "bilingual-ready"
     dropped; check_bank/check_progression stale comments ("Worlds 1-3", "W3 peeks") fixed.
  6. Launch Barmij.bat opened the browser BEFORE the server existed (first-visit race) and
     died cryptically without Python — now: python check with a kind message, server first,
     browser 2s later.
  7. license.html stylesheet now version-pinned with the app (was uncached-forever).
  Typo scan across all content: clean. 259/259 programs re-verified, gates PASS, narration
  305 (unchanged). Assets v21.

- **2026-09-14 / B42 — Third deep pass: adversarial checks, scale guards, MOBILE.** Findings:
  1. CHECK CRASH = SILENT DEATH: an accidentally INDENTED def tick() (isLive is line-anchored,
     the W6 checks' guards are not) sent live-shaped code down the normal path, where
     ctx.frames was undefined — w6l1–w6l4 checks threw and the child got NO feedback at all.
     Fixed twice over: the normal path now passes frames: [] (checks then answer with real
     guidance — verified: "change a game jar inside tick"), and every check runs inside
     safeCheck() — a crashing check can never take the feedback down again.
  2. MOBILE WAS CLIPPED: the logical stage assumes x ±240 but a phone canvas is ~311px wide —
     the falcon's walls (±220) and zellij edges were off-screen. setupCanvas now scales the
     whole 480x460 logical stage to fit narrow screens (pixel-verified: all four ±220 corners
     visible at 375px). Rest of mobile audited clean: zero horizontal overflow on lesson/
     bank/challenges/puzzle, drawer fine.
  3. SCALE GUARDS: write() joined DRAW_LIMIT (was the one uncapped drawing command — a while
     of write() piled unbounded canvas text) and clips messages at 200 chars; stdout bubbles
     cap at 200 + an honest "…and N more lines" (4000-print flood verified snappy); challenge
     and puzzle target builds now run on scrubbed ground (a child's forward = 5 can no longer
     poison a ghost).
  4. Starter-passes-check sweep: 34 teach-lessons pass on first Run — audited each against
     its task and kept BY DESIGN (PRIMM's Run phase + gentle slope); every lesson whose task
     adds a quantified demand (w1l1/w1l2/w2l1/w2l3/w2l4/w5l1, all six Makes) does enforce it.
  5. Cosmetics: bank grid 2-column breakpoint fixed (1250px relic → 640px, matching the other
     grids); dead CSS rules from removed features deleted (.logo .ar, .subtitle, .stage,
     .puz-indent); license.html "name or characters" → "name" (B23: no characters exist).
  259/259 programs re-verified; gates PASS; locking, star flow, drawer re-smoked. Assets v20.

- **2026-09-14 / B41 — Deep flow & pedagogy audit (founder: reveal order, flow killers,
  ugliness, "are we jumping concepts / expecting too much?").** Findings and fixes:
  1. "SHOW EVERYTHING" LEFT BUILDS BLANK: revealBeat played only the LAST beat's build, so a
     child who tapped "show everything" got empty build boxes — the lesson's core code never
     appeared (and on a last-beat build, it appeared fully formed with its effect at once —
     the "already there" sight). Now every unplayed build plays (instantly in that mode).
  2. REVISIT TEDIUM: builds replayed letter-by-letter on every return. B22 is a FIRST-meeting
     law — a passed lesson's builds now replay instantly; first meetings unchanged.
  3. DEAD CANVAS KILLED THE TEXT LESSONS' FLOW: print-only work (w1l1! the fortune teller,
     the search lessons) showed a 460px empty dotted canvas between editor and output — the
     child's first-ever result hid below a meaningless box. The canvas now earns its place:
     hidden for text-only lessons/runs, appearing the moment anything draws (drawing runs,
     charts, LIVE, ghosts, Step-with-drawing all verified showing it).
  4. CONCEPT JUMPS, found by a mechanical lesson audit (starter/demo/build code vs INTRO
     gates): w2l3/w2l4/w3l5 used [ ] list literals three worlds before W5 teaches lists,
     with the notation never taught. Fix honors "use before formalize": w2l3 now TEACHES the
     bag reading ("[ ... ]? A bag of options — Python grabs ONE"), hints say "bag", and
     w5l1's opening names it back ("the dice's bag, finally named"). w2l5 used str() with no
     teaching beat (it IS the str lesson) — a beat now teaches it as int's reversed twin.
  5. Audit also verified: no beat carries fig+build (no spoiled reveals); watch/build typing
     payloads all under ~31s; W1–W8 lesson-by-lesson read found the ladder sound — every
     check enforceable from taught material, tasks within reach of what came before.
  Narration 305 clips (beat indices shifted). All gates PASS. Assets v19.

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

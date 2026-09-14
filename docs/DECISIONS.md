# Decisions Log — Barmij

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

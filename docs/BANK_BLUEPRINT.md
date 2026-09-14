# Code Bank Blueprint — why every one of the 500 exists (B26, 2026-09-14)
_The founder's demand: "not an initiative with good intentions that doesn't carry educational
cornerstones." So the bank is not 500 nice programs — it is a coverage-engineered instrument.
Every item occupies a cell in the matrix below; the matrix is machine-checked by
`tools/check_bank.py` (like the readability gate). No orphan items; no uncovered concepts._

## The two axes

### Axis 1 — the concept inventory (what must be covered)
Every teachable concept in Worlds 1-8, enumerated. Current inventory (~36 core concepts):

| World | Concepts |
|---|---|
| 1 | print · sequencing · turtle motion (forward/back) · turns (right/left) · pen style (color/width) · penup/jump/dot · variables (=) · for + range · using the loop variable |
| 2 | input · string gluing (+) · int() conversion · if · elif/else ladders · comparisons (== > <) · random.randint · random.choice |
| 3 | nested loops · bounded while · range(start, stop, step) · geometric patterns (angle math) |
| 4 | def · parameters · return · composing functions |
| 5 | lists (index/append/len) · strings as sequences · dictionaries · membership (in) |
| 6 | game state variables · the animation/event loop · collision logic |
| 7 | reading files/CSV · matplotlib (line/bar/scatter) · data cleaning light |
| 8 | search · sort · algorithmic thinking · ML taste (train/test idea) |

### Axis 2 — the learning ladder (what each item is FOR)
Grounded in the worked-example → guided → independent → transfer fade (PEDAGOGY §4, Sweller;
Renkl's example-based learning) plus deliberate reinforcement (PEDAGOGY §2-3, §7):

| Item role | Definition | Per concept |
|---|---|---|
| **Worked** | runs beautifully as-is; the child reads and runs (a model to absorb) | 2 |
| **Tweak** | remix hint changes ONE thing; low-risk manipulation | 3 |
| **Independent** | a small goal using mainly this concept | 3 |
| **Transfer** | this concept in a NEW context (art concept → talking program, etc.) | 2 |

### Size (REVISED 2026-09-14, founder: "forget the 500 — no padding")
There is **no numeric quota**. The bank holds exactly as many items as mastery requires —
the ladder per concept, the spiral quota, the gates — **and not one more**. An item that
teaches nothing new and reinforces nothing due is padding, and padding is rejected at review.
Quality bars replace the number: every concept fully laddered · every unlock point soft ·
spiral quota met · zero orphans. (~360 ladder + spirals + capstones remains the natural
*order of magnitude* when all 8 Worlds ship — as an outcome, never a target.)

### Item role 5 — GUIDED think-alouds (added 2026-09-14, founder's ask)
Selected items carry a **thinking track**: the programmer's actual reasoning, step by tappable
step, BEFORE the child runs — "What do I want? … What repeats? … So: a loop." This is
cognitive apprenticeship (Collins, Brown & Newman 1989 — making expert thinking visible) plus
self-explanation prompting (Chi et al. 1994). Goal per the founder: not professional coders by
course's end, but **complete foundations + the habit of thinking like a programmer** — ready
for university. At least one guided item per core concept cluster; marked 🧠 in the bank.

## Differentiation (the founder: "people are different")
- Every concept's ladder spans ranks: at least 2 items reachable at Mustakshif presentation
  (short, art-first), the rest Bannaa/Ra'id — low floor, high ceiling per concept (Resnick).
- Both modalities per concept where meaningful: a drawing item AND a talking item (UDL:
  multiple representations).
- Peek-ahead items stay unlocked in the bank — curiosity is never gated.

## Quality gates (all must pass before an item ships)
1. Engine-verified: the code executes clean in the real runtime (automated, existing practice).
2. CONTENT_POLICY.md compliant (original, UAE-souled, family-safe).
3. Occupies a declared blueprint cell (checker) — or is rejected as an orphan.
4. Carries a remix hint (the tweak invitation is the interaction).

## Production cadence (honest plan — no all-at-once quality collapse)
- 2026-09-09: batch 1 — 40 items, engine-verified. **Total 40.**
- 2026-09-14: batch 2 — target ≥60 W1-2 ladder + spiral items. **Total ~100.**
- Each new World ships WITH its ~60-item ladder batch + ~15 spirals into older worlds.
- Founder review pass over every batch (the human gate) before public deployment.

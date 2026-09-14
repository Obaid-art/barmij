# Pedagogy — the learning science under Barmij
_Load-bearing, not marketing. Product mechanics cite their evidence. Founder verification of
citations pending (NOT_YET_BUILT.md)._

## 1. Constructionism — children learn by making (Papert)
- Papert, S. (1980). *Mindstorms: Children, Computers, and Powerful Ideas.* Logo's turtle was
  invented exactly for this: an "object-to-think-with" that makes abstract code physically
  visible. Our canvas turtle is Papert's turtle reborn in real Python.
- Mechanic: every lesson ends in the child MAKING something of their own, not completing a form.

## 2. Low floor, high ceiling, wide walls (Resnick / Scratch team)
- Resnick, M. et al. (2009). "Scratch: Programming for All." *CACM* 52(11).
- Mechanic: first success within 60 seconds (low floor); the same environment scales to
  advanced projects (high ceiling); art, games, data — many kinds of projects (wide walls).
  Unlike Scratch we stay in real Python text — the skill the founder wants them to graduate with.

## 3. PRIMM — Predict, Run, Investigate, Modify, Make (Sentance)
- Sentance, S., Waite, J., & Kallia, M. (2019). "Teaching computer programming with PRIMM."
  *Computer Science Education* 29(2-3).
- Mechanic: lessons open with working code the child *predicts* before running, then modifies
  ("change one number and see"), and only then makes their own. Reading before writing.

## 4. Worked examples & cognitive load (Sweller)
- Sweller (1988) *Cognitive Science* 12(2); Kalyuga et al. (2003) expertise reversal.
- Mechanic: starter code is always a worked example; scaffolding fades as Worlds progress.
- Mechanic ("Watch, then try", B13): anchor lessons open with code that types itself
  character-by-character with a teacher caption per chunk (the worked example, animated), then
  the child re-types it on the same stage with per-keystroke feedback (guided practice), then
  the free editor (independence). The faded sequence inside a single two-minute experience.

## 4b. Parsons problems — ordering before writing (Parsons & Haden 2006; Ericson et al.)
- Research repeatedly finds Parsons puzzles teach program construction about as well as
  writing code, in roughly half the time with less frustration — the strongest
  learning-per-minute result in CS education. Ideal for young typists.
- Mechanic (SHIPPED 2026-09-14, B30): eligible bank items become 🧩 puzzles — ghost target on
  canvas, shuffled role-colored tiles, tap-to-order, indentation as an explicit decision.
  Checking runs the arrangement and compares behavior (alternate valid orders accepted and
  praised); mismatches overlay the attempt on the ghost so the difference teaches. Slots into
  the fading ladder as the missing rung: watch → order → type → make.

## 5. The notional machine & misconceptions (Sorva; du Boulay)
- Sorva, J. (2013). "Notional machines and introductory programming education." *ACM TOCE* 13(2).
- Documented novice misconceptions we design against: `=` means equality (it's assignment — the
  "labeled jar" figure); code runs all-at-once (it runs line-by-line — the turtle animates
  line-by-line to SHOW sequential execution); loops "remember" nothing (we visualize i changing).
- Mechanic: error messages are translated into kid-readable hints that name the misconception,
  with the real Python error kept visible underneath (honesty, and gradual induction into real
  tooling).
- Mechanic (SHIPPED 2026-09-14, B28 — cf. Guo's Python Tutor): 👣 Step mode replays any program
  line by line under the child's control — current line highlighted, variables visible as they
  change, the drawing shown only up to this moment, loop passes counted. The notional machine
  stops being notional; "think two steps ahead" gets trained by walking time forward and back.

## 6. Immediate, visual feedback (Hattie & Timperley 2007)
- Mechanic: Run is one keystroke; the drawing animates instantly; errors are friendly and
  specific. No grades, no red X — a hint and another try.

## 7. Retrieval & spacing (Roediger & Karpicke 2006; Cepeda et al. 2006)
- Mechanic (SHIPPED 2026-09-14, B27): passing a lesson schedules its skills at expanding
  intervals — 2 → 7 → 21 days. A due skill surfaces as ONE gentle, snoozable warm-up banner
  suggesting a matching bank item; completing it advances the interval. Never blocking, never
  nagging. Interleaving backs it structurally: 100% of W2 items also exercise W1 skills
  (enforced by tools/check_progression.py).

## 7b. Cognitive apprenticeship — thinking made visible (Collins, Brown & Newman 1989)
- Also: self-explanation effect (Chi et al. 1994).
- Mechanic (SHIPPED 2026-09-14, B27): guided 🧠 bank items open with the programmer's actual
  reasoning, thought by tappable thought — "What do I want? What repeats? So: a loop." — the
  expert's invisible thinking made visible BEFORE the run. The founder's goal in one line:
  graduates who own the foundations and the habit of thinking like a programmer.

## 8. Multimedia learning (Mayer) — how the material itself must be built
- Mayer, R. E. (2020). *Multimedia Learning* (3rd ed.), Cambridge University Press — decades of
  controlled experiments on how people learn from words + pictures.
- Principles we now build by (see DESIGN_CHARTER.md for the binding rules):
  **coherence** (cut every non-essential word), **segmenting** (learner-paced small pieces —
  our "beats"), **spatial contiguity** (labels ON the thing, with arrows — never paragraphs
  about the thing), **signaling** (highlight what matters), **personalization** (conversational
  voice), **modality** (planned: spoken narration beats printed text for young readers),
  **pre-training** (name the parts before the process — our role colors do this).

## 9. Universal Design for Learning (CAST UDL Guidelines)
- Multiple means of representation, engagement, and expression — the umbrella under which our
  visuals+text+planned-audio, art/games/choice, and type/remix/make commitments live. Named
  explicitly: it is the shared language of educators and ministries.

## 10. Motivation done honestly (Deci & Ryan — self-determination theory)
- Autonomy (choose your colors, your shapes, your projects), competence (visible mastery
  progression), relatedness (share your creation with family). Streaks and stars exist but the
  real hook is creative ownership — "addictive in a good way" = intrinsic, not slot-machine.
  No dark patterns, no infinite scroll, no manufactured scarcity. Ever.

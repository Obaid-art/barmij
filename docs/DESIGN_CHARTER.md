# Design Charter — how Barmij looks, moves, and respects a child
_Adopted 2026-09-09 after founder deliberation (DECISIONS B20). This is law for every screen and
every World. "It has to be a grown-up initiative" — the founder. Companion to PEDAGOGY.md
(the learning science) and CONTENT_POLICY.md (the content law)._

## I. Words — beats, not paragraphs
1. **A lesson is a sequence of BEATS**: one idea, ≤ 15 words, anchored to a visual. Prose
   paragraphs are banned from lesson bodies. (Mayer: coherence + segmenting.)
2. Beats **appear one at a time** as the page opens, at a human pace, advanced by the child's
   tap — never a full page at once. Motion is the eye's shepherd: one new thing, where the
   child is looking. (Mayer: segmenting; founder law B18/B19 extended into the text itself.)
3. Always available: **"show all"** for re-readers; full respect for the OS
   `prefers-reduced-motion` setting (beats render instantly, no animation).
4. **Readability gate**: Mustakshif-rank lesson text must score ≤ US grade 4 on a standard
   readability measure (Flesch-Kincaid or equivalent) before shipping; Bannaa ≤ grade 6.
5. Voice stays warm and conversational (Mayer: personalization) — warmth lives in *short*
   sentences, not long ones.

## II. Explaining — arrows, not adjectives
6. Code is explained as a **labeled specimen**: the real code, large, with short labels
   pointing (arrows/pins) at its parts — "Python's word ↗", "your words go here ↘",
   "what happens →". (Mayer: spatial contiguity + signaling; the founder's manuscript grammar.)
7. **If it can't be drawn as labels-with-arrows on the real thing, the explanation is too
   complicated — redesign the explanation, never lengthen it.**

## III. Eyes — ergonomics & accessibility (WCAG 2.2 AA is the floor)
8. **Color is never the only channel** (WCAG 1.4.1). Every role color carries a redundant cue:
   keywords also bold; values also chip-shaped; figure role-blobs also differ by subtle
   icon/pattern. The grayscale-print test: all figures must survive it.
9. **Colorblind-safe palette**: role colors retuned within the Okabe–Ito range
   (Okabe & Ito 2008); every release checked in deuteranopia + protanopia simulation.
   ~1 in 12 boys is color-vision-deficient; two of them sit in every classroom.
10. Contrast: text ≥ 4.5:1 (AA); audit the current soft grays — suspected failures.
11. Type: body ≥ 16-17px (larger for Mustakshif), generous line height (~1.6), line length
    ≤ ~65 characters, emphasis by **weight** not italics (kinder to young & dyslexic readers).
12. Ground stays warm off-white — pure white is glare. No blinking beyond the gentle cursor;
    no flashing, ever (photosensitivity).
13. Touch targets ≥ 44px (tablets are half our classrooms).

## IV. Interaction — student-first (UDL as the umbrella)
14. **UDL commitments** (CAST guidelines): multiple means of representation (visual + text +
    planned audio narration), engagement (art, games, choice, remix), and expression (type it,
    remix it, build your own). Named explicitly because it is the language educators and
    ministries speak.
15. **Self-pacing is sacred**: the child advances every beat, every stage, every lesson.
    Nothing auto-plays past them; nothing rushes them; nothing shames slowness.
16. **Narration REMOVED (B48, founder call — was B33)**: the written captions ARE the voice,
    and they honor the slow reader with time instead of sound: every caption stays on screen
    for real reading time (~380ms a word, never under ~2s) before the code types on.
17. Failure is always gentle, specific, and followed by an invitation to retry (existing law:
    no red X, no buzzer — reaffirmed here as charter).

## V. Proof — we test like scientists
18. **Think-aloud protocol**: every major iteration is watched with 3-5 real children
    (silent observer, log every hesitation/squint/misclick). Small-n usability testing finds
    the large majority of problems (Nielsen); the founder's own dead-key discovery is
    participant-zero evidence.
19. **Per-lesson release checklist** (all must pass): beats ≤15 words · readability grade ·
    arrows-not-adjectives · colorblind simulation · contrast · reduced-motion behavior ·
    CONTENT_POLICY compliance · factual/scientific correctness · engine-verified code.
20. Honesty note: beat-by-beat text reveal is a design inference from segmenting/signaling
    research, not itself an RCT-tested technique — we will watch for it in our own child
    testing and adjust if the evidence disagrees. We follow evidence, including ours.

## Charter implementation status (updated 2026-09-09, same day)
- [x] Worlds 1-2 rewritten as beat sequences — 12 lessons, max 14 words/beat, FK grades 1.0-4.2
      (verified by tools/check_content.py; w1l5 & w2l6 at 4.2 — the ceiling, watch in kid tests).
- [x] Beat-reveal engine: tap-to-advance, "show everything", prefers-reduced-motion honored.
- [x] Role palette retuned to Okabe-Ito (#0072B2 / #CC79A7 / #E69F00 / #D55E00) with
      AA-verified darkened text variants; buttons darkened to pass AA with white text.
- [x] Redundant non-color cues: role chips/figure blobs differ by border style
      (solid / dotted / dashed / double); keywords also bold in the editor.
- [x] Contrast pass: muted gray darkened, caption/hint/bubble colors moved to AA variants.
      (Known deliberate exception: hero-mode ghost target letters are faint by design.)
- [x] Readability gate script: tools/check_content.py (fails the build on >15-word beats).
- [ ] Formal colorblind SIMULATION screenshots (palette is safe by construction; simulate and
      archive the proof before the ministry pack).
- [ ] Editor syntax colors: full CB-proofing beyond bold-keywords is an open design question
      (honest note — color+weight+context today).
- [ ] Think-aloud sessions with 3-5 real children — the founder's pilot.
- [ ] Narration (beats are audio-ready by construction: one clip per beat, when we record).

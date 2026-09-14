"""Progression gate (BANK_BLUEPRINT + founder's 'second nature' demand, 2026-09-14):
1. PREREQUISITE DISCIPLINE — every bank item may use only concepts introduced at or before
   its gate lesson; nothing jumps the queue. W3 peek concepts allowed at rank r ONLY.
2. GRADIENT — every shipped lesson should unlock >= 3 practice items, with a gentle entry
   (at least one m or b at each gate).
3. SPIRAL QUOTA — later items must keep older skills warm: report the % of W2-gated items
   that also exercise W1 concepts (interleaving; target >= 60%).

Run:  python tools/check_progression.py
"""
import re
from pathlib import Path
from collections import defaultdict

from check_bank import DETECTORS, parse_items  # same detectors: coverage & progression agree

SRC = Path(__file__).resolve().parent.parent / "app" / "codebank.js"

# canonical introduction order: concept -> (world, lesson) where our lessons teach it
INTRO = {
    "print": (1, 1),
    "turtle-motion": (1, 2), "turns": (1, 2),
    "pen-style": (1, 3), "pen-jump-dot": (1, 3),
    "variables": (1, 4),
    "for-range": (1, 5), "loop-var-use": (1, 5),
    "input": (2, 1), "string-glue": (2, 1),
    "if": (2, 2), "else": (2, 2), "comparisons": (2, 2),
    "randint": (2, 3), "choice": (2, 3),
    "int-conv": (2, 5), "elif": (2, 5), "str-conv": (2, 5),
    "nested-loops": (3, 1), "step-range": (3, 3), "while": (3, 4),
    "def": (4, 1), "def-params": (4, 2), "return": (4, 4),
    "list": (5, 1), "indexing": (5, 1), "for-in": (5, 2),
    "append": (5, 3), "len": (5, 3), "find": (5, 5),
    "tick": (6, 1), "game-state": (6, 1), "key-pressed": (6, 2),
    "distance": (6, 4), "write": (6, 4),
    "dict": (7, 2), "matplotlib": (7, 3), "split": (7, 5),
    "remove": (8, 3), "sklearn": (8, 5),
}
PEEK = set()  # ALL EIGHT WORLDS SHIPPED (2026-09-14). The curriculum is complete.

EXTRA_DETECTORS = {"str-conv": lambda c: "str(" in c}


def gate_of(code):
    concepts = [k for k, det in {**DETECTORS, **EXTRA_DETECTORS}.items() if det(code)]
    shipped = [INTRO[c] for c in concepts if c in INTRO]
    peeks = [c for c in concepts if c in PEEK]
    gate = max(shipped) if shipped else (1, 1)
    return gate, concepts, peeks


def main():
    items = parse_items(SRC.read_text(encoding="utf-8"))
    per_gate = defaultdict(list)
    violations = []
    w2_items = w2_with_w1 = 0
    w1_concepts = {c for c, (w, _) in INTRO.items() if w == 1}
    for it in items:
        gate, concepts, peeks = gate_of(it["code"])
        if peeks and it["rank"] != "r":
            violations.append(f"{it['id']}: rank '{it['rank']}' uses W3 peek {peeks}")
        per_gate[gate].append(it)
        if gate[0] == 2:
            w2_items += 1
            if any(c in w1_concepts for c in concepts):
                w2_with_w1 += 1
    print(f"items: {len(items)}\n")
    print(f"{'gate':8} {'items':>5}  ranks (m/b/r)   gradient")
    # (8,5): sklearn is ONE honest capstone taste, Ra'id-only by B16 — padding banned by B27.
    GATE_EXEMPT = {(8, 5)}
    for gate in sorted(per_gate):
        g = per_gate[gate]
        ranks = {r: sum(1 for x in g if x['rank'] == r) for r in 'mbr'}
        if gate in GATE_EXEMPT:
            print(f"W{gate[0]}·L{gate[1]:<4} {len(g):>5}  {ranks['m']}/{ranks['b']}/{ranks['r']}          ok (capstone-taste exemption, B16)")
            continue
        gentle = ranks['m'] + ranks['b'] > 0
        thin = len(g) < 3
        note = ("THIN (<3 items)" if thin else "ok") + ("" if gentle else " · NO GENTLE ENTRY")
        print(f"W{gate[0]}·L{gate[1]:<4} {len(g):>5}  {ranks['m']}/{ranks['b']}/{ranks['r']}          {note}")
    print()
    if w2_items:
        pct = round(100 * w2_with_w1 / w2_items)
        print(f"spiral quota: {pct}% of W2-gated items also exercise W1 skills "
              f"(target >= 60%) -> {'ok' if pct >= 60 else 'LOW'}")
    if violations:
        print("\nPREREQUISITE VIOLATIONS:")
        for v in violations:
            print("  " + v)
    else:
        print("\nPASS: no item jumps the queue - every program is playable when it unlocks.")


if __name__ == "__main__":
    main()

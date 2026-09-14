"""Bank coverage gate (BANK_BLUEPRINT.md). Detects concepts from each item's CODE
(deterministic — coverage can't drift from reality), then reports the concept x rank matrix
for the shipped worlds and flags gaps vs. minimum targets.

Run:  python tools/check_bank.py
"""
import re
import json
from pathlib import Path
from collections import defaultdict

SRC = Path(__file__).resolve().parent.parent / "app" / "codebank.js"

# concept -> detector over the code string (Worlds 1-2 inventory + W3 peeks)
DETECTORS = {
    "print": lambda c: "print(" in c,
    "turtle-motion": lambda c: "forward(" in c or "back(" in c,
    "turns": lambda c: "right(" in c or "left(" in c,
    "pen-style": lambda c: "color(" in c or "width(" in c,
    "pen-jump-dot": lambda c: "penup(" in c or "jump(" in c or "dot(" in c,
    "variables": lambda c: re.search(r"^[ \t]*[A-Za-z_]\w*[ \t]*=[ \t]*[^=]", c, re.M) is not None,
    "for-range": lambda c: re.search(r"\bfor\s+\w+\s+in\s+range\(", c) is not None,
    "loop-var-use": lambda c: _loop_var_used(c),
    "input": lambda c: "input(" in c,
    "string-glue": lambda c: re.search(r"\"\s*\+|\+\s*\"|\+\s*str\(", c) is not None,
    "int-conv": lambda c: "int(" in c,
    "if": lambda c: re.search(r"^\s*if\b", c, re.M) is not None,
    "elif-else": lambda c: "elif" in c or re.search(r"^\s*else\s*:", c, re.M) is not None,
    "comparisons": lambda c: "==" in c or re.search(r"[<>]", c) is not None,
    "randint": lambda c: "randint" in c,
    "choice": lambda c: "choice" in c,
    "nested-loops [W3]": lambda c: len(re.findall(r"\bfor\s+\w+\s+in\b", c)) >= 2,
    "step-range [W3]": lambda c: re.search(r"range\([^)]+,[^)]+,[^)]+\)", c) is not None,
    "while [W3]": lambda c: re.search(r"^\s*while\b", c, re.M) is not None,
}

# minimum items per shipped-world concept (blueprint ladder = 10; interim floor while growing)
MIN_PER_CONCEPT = 6
SHIPPED = [k for k in DETECTORS if "[W3]" not in k]


def _loop_var_used(c):
    m = re.search(r"\bfor\s+(\w+)\s+in\b", c)
    if not m:
        return False
    var = m.group(1)
    body = re.sub(r"\bfor\s+\w+\s+in\b[^\n]*", "", c)
    return re.search(rf"\b{re.escape(var)}\b", body) is not None


def parse_items(js):
    items = []
    for m in re.finditer(r'\{\s*id:\s*"(cb\d+)",\s*rank:\s*"(\w)"', js):
        start = m.start()
        code_m = re.search(r'code:\s*`([^`]*)`', js[start:start + 4000])
        if code_m:
            code = code_m.group(1).replace("\\n", "\n").replace('\\"', '"')
            items.append({"id": m.group(1), "rank": m.group(2), "code": code})
    return items


def main():
    js = SRC.read_text(encoding="utf-8")
    items = parse_items(js)
    print(f"bank items parsed: {len(items)}\n")
    matrix = defaultdict(lambda: defaultdict(int))
    for it in items:
        for concept, det in DETECTORS.items():
            if det(it["code"]):
                matrix[concept][it["rank"]] += 1
    print(f"{'concept':22} {'m':>3} {'b':>3} {'r':>3} {'tot':>4}  status")
    gaps = []
    for concept in DETECTORS:
        row = matrix[concept]
        tot = sum(row.values())
        if concept in SHIPPED:
            ok = tot >= MIN_PER_CONCEPT and row.get("m", 0) + row.get("b", 0) >= 2
            if not ok:
                gaps.append(concept)
            status = "ok" if ok else f"GAP (need >= {MIN_PER_CONCEPT}, >=2 at m/b)"
        else:
            status = "peek-ahead"
        print(f"{concept:22} {row.get('m',0):>3} {row.get('b',0):>3} {row.get('r',0):>3} {tot:>4}  {status}")
    print()
    if gaps:
        print(f"GAPS in shipped-world coverage: {', '.join(gaps)}")
    else:
        print(f"PASS: all shipped-world concepts at floor (>= {MIN_PER_CONCEPT} items each).")


if __name__ == "__main__":
    main()

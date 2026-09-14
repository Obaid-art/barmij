"""Charter gate (DESIGN_CHARTER.md I.1 + I.4): every beat <= 15 words; per-lesson
readability at/below the rank's grade ceiling (Mustakshif-facing Worlds 1-2: aim <= US grade 4,
tolerate <= 5 for Bannaa-flavored lessons; the report prints the numbers, the founder judges).

ADHD limits EVERYWHERE (B49/B50 — no wall of text on ANY surface):
lessons: task <= 30w, hint <= 26w, check msg <= 24w, caption(say) <= 16w;
bank: caption/remix <= 22w, think step <= 30w; challenges: goal/hints <= 26w;
engine (barmij.js): any child-visible string <= 32w.

Run:  python tools/check_content.py
"""
import re
import sys
from pathlib import Path

SRC = Path(__file__).resolve().parent.parent / "app" / "lessons.js"
MAX_WORDS = 15

TAG = re.compile(r"<[^>]+>")


def clean(text):
    text = TAG.sub(" ", text)
    text = text.replace("\\\"", '"')
    text = re.sub(r"[→▸·—…🌀⭐🐢🔮🎯]+", " ", text)
    return re.sub(r"\s+", " ", text).strip()


def syllables(word):
    word = re.sub(r"[^a-z]", "", word.lower())
    if not word:
        return 1
    groups = re.findall(r"[aeiouy]+", word)
    n = len(groups)
    if word.endswith("e") and n > 1:
        n -= 1
    return max(1, n)


def fk_grade(text):
    sentences = max(1, len(re.findall(r"[.!?]", text)))
    words = [w for w in re.findall(r"[A-Za-z'\"()+=*.\-]+", text) if any(c.isalpha() for c in w)]
    if not words:
        return 0.0
    syl = sum(syllables(w) for w in words)
    return 0.39 * (len(words) / sentences) + 11.8 * (syl / len(words)) - 15.59


def main():
    js = SRC.read_text(encoding="utf-8")
    lesson_blocks = re.split(r'\n\s*id:\s*"', js)[1:]
    failures = 0
    print(f"{'lesson':8} {'beats':>5} {'max words':>10} {'FK grade':>9}  notes")
    for block in lesson_blocks:
        lid = block.split('"', 1)[0]
        beats_m = re.search(r"beats:\s*\[(.*?)\n {4}\]", block, re.S)
        if not beats_m:
            continue
        beats = re.findall(r'\bt:\s*"((?:[^"\\]|\\.)*)"', beats_m.group(1))
        texts = [clean(b) for b in beats]
        counts = [len(t.split()) for t in texts]
        grade = fk_grade(". ".join(texts) + ".")
        worst = max(counts) if counts else 0
        notes = []
        for t, c in zip(texts, counts):
            if c > MAX_WORDS:
                notes.append(f"OVER {MAX_WORDS}w ({c}): '{t[:40]}...'")
                failures += 1
        print(f"{lid:8} {len(beats):>5} {worst:>10} {grade:>9.1f}  {'; '.join(notes) if notes else 'ok'}")
    print()
    failures += adhd_everywhere()
    if failures:
        print(f"FAIL: {failures} string(s) over an ADHD word limit.")
        sys.exit(1)
    print("PASS: all beats within the word limit. Judge FK grades against the rank ceiling.")


def _wc(s):
    return len([w for w in clean(s).split() if w])


def adhd_everywhere():
    """B50: the calm-column word limits hold on EVERY child-facing surface, forever."""
    app = SRC.parent
    bad = []
    js = SRC.read_text(encoding="utf-8")
    for field, cap in (("task", 30), ("msg", 24), ("say", 16)):
        for m in re.finditer(rf'\b{field}:\s*"((?:[^"\\]|\\.)*)"', js):
            if _wc(m.group(1)) > cap:
                bad.append(f"lessons {field} {_wc(m.group(1))}w: {clean(m.group(1))[:55]}")
    for hm in re.finditer(r"hints: \[(.*?)\n\s{4}\]", js, re.S):
        for h in re.findall(r'"((?:[^"\\]|\\.)*)"', hm.group(1)):
            if _wc(h) > 26:
                bad.append(f"lessons hint {_wc(h)}w: {clean(h)[:55]}")
    cb = (app / "codebank.js").read_text(encoding="utf-8")
    for field, cap in (("caption", 22), ("remix", 22)):
        for m in re.finditer(rf'\b{field}:\s*"((?:[^"\\]|\\.)*)"', cb):
            if _wc(m.group(1)) > cap:
                bad.append(f"bank {field} {_wc(m.group(1))}w: {clean(m.group(1))[:55]}")
    for tm in re.finditer(r"think: \[(.*?)\n\s{4}\]", cb, re.S):
        for t in re.findall(r'"((?:[^"\\]|\\.)*)"', tm.group(1)):
            if _wc(t) > 30:
                bad.append(f"bank think {_wc(t)}w: {clean(t)[:55]}")
    ch = (app / "challenges.js").read_text(encoding="utf-8")
    for field in ("goal",):
        for m in re.finditer(rf'\b{field}:\s*"((?:[^"\\]|\\.)*)"', ch):
            if _wc(m.group(1)) > 26:
                bad.append(f"challenge goal {_wc(m.group(1))}w: {clean(m.group(1))[:55]}")
    for hm in re.finditer(r"hints: \[(.*?)\]", ch, re.S):
        for h in re.findall(r'"((?:[^"\\]|\\.)*)"', hm.group(1)):
            if _wc(h) > 26:
                bad.append(f"challenge hint {_wc(h)}w: {clean(h)[:55]}")
    bj = (app / "barmij.js").read_text(encoding="utf-8")
    for line in bj.split("\n"):
        if re.search(r"textContent|innerHTML|flashFeedback|return \"|msg:", line):
            for s in re.findall(r'"((?:[^"\\]|\\.)*)"', line):
                if _wc(s) > 32:
                    bad.append(f"engine {_wc(s)}w: {clean(s)[:55]}")
    if bad:
        print("ADHD-limit violations (B50):")
        for b in bad:
            print("  " + b)
    else:
        print("ADHD limits: every surface (lessons/bank/challenges/engine) within word caps.")
    return len(bad)


if __name__ == "__main__":
    main()

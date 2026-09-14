"""Charter gate (DESIGN_CHARTER.md I.1 + I.4): every beat <= 15 words; per-lesson
readability at/below the rank's grade ceiling (Mustakshif-facing Worlds 1-2: aim <= US grade 4,
tolerate <= 5 for Bannaa-flavored lessons; the report prints the numbers, the founder judges).

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
        beats_m = re.search(r"beats:\s*\[(.*?)\n\s*\]", block, re.S)
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
    if failures:
        print(f"FAIL: {failures} beat(s) over the {MAX_WORDS}-word limit.")
        sys.exit(1)
    print("PASS: all beats within the word limit. Judge FK grades against the rank ceiling.")


if __name__ == "__main__":
    main()

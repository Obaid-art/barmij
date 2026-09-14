"""Generate docs/NARRATION_SCRIPT.md — every narratable line with its stable clip ID.
The founder records each line as app/audio/<ID>.mp3 and maps it in app/audio_manifest.js;
recordings override the browser voice clip by clip (DECISIONS B33).

Run:  python tools/build_narration_script.py
"""
import re
from pathlib import Path

APP = Path(__file__).resolve().parent.parent / "app"
OUT = Path(__file__).resolve().parent.parent / "docs" / "NARRATION_SCRIPT.md"

TAG = re.compile(r"<[^>]+>")
EMO = re.compile(r"[\U0001F000-\U0001FAFF←-➿⬀-⯿·▸◀►⇥→]")


def clean(s):
    s = s.replace('\\"', '"')
    s = TAG.sub(" ", s)
    s = EMO.sub(" ", s)
    return re.sub(r"\s+", " ", s).strip()


def grab_strings(block, key):
    return [m.group(1) for m in re.finditer(rf'(?<![\w]){key}:\s*"((?:[^"\\]|\\.)*)"', block)]


def main():
    lessons_js = (APP / "lessons.js").read_text(encoding="utf-8")
    bank_js = (APP / "codebank.js").read_text(encoding="utf-8")
    ch_js = (APP / "challenges.js").read_text(encoding="utf-8")
    lines = ["# Narration Recording Script",
             "_One line per clip. Record as `app/audio/<ID>.mp3`, then map the ID in",
             "`app/audio_manifest.js`. Warm, unhurried, like reading to one child. (B33)_", ""]

    for lm in re.finditer(r'id:\s*"(w\d+l\d+)"(.*?)(?=\n\s*\{\s*\n\s*id:|\n\];)', lessons_js, re.S):
        lid, block = lm.group(1), lm.group(2)
        lines.append(f"## Lesson {lid}")
        beats_m = re.search(r"beats:\s*\[(.*?)\n {4}\]", block, re.S)
        if beats_m:
            for i, t in enumerate(grab_strings(beats_m.group(1), "t")):
                lines.append(f"- **{lid}-b{i}** — {clean(t)}")
        demo_m = re.search(r"demo:\s*\{\s*steps:\s*\[(.*?)\]\s*\}", block, re.S)
        if demo_m:
            for i, s in enumerate(grab_strings(demo_m.group(1), "say")):
                lines.append(f"- **{lid}-d{i}** — {clean(s)}")
        build_m = re.search(r"build:\s*\{(.*?)\n\s*\}\s*\}", block, re.S)
        if build_m:
            for i, s in enumerate(grab_strings(build_m.group(1), "say")):
                lines.append(f"- **{lid}-bl{i}** — {clean(s)}")
        lines.append("")

    lines.append("## Guided thinking (Code Bank)")
    for im in re.finditer(r'id:\s*"(cb\d+)"(.*?)think:\s*\[(.*?)\n\s*\]', bank_js, re.S):
        cid, steps = im.group(1), im.group(3)
        for i, s in enumerate(re.findall(r'"((?:[^"\\]|\\.)*)"', steps)):
            lines.append(f"- **{cid}-t{i}** — {clean(s)}")
    lines.append("")

    lines.append("## Challenges")
    for cm in re.finditer(r'id:\s*"(ch\d+)".*?title:\s*"([^"]*)".*?goal:\s*"((?:[^"\\]|\\.)*)"', ch_js, re.S):
        lines.append(f"- **{cm.group(1)}-goal** — {clean(cm.group(2))}. {clean(cm.group(3))}")
    lines.append("")

    n = sum(1 for l in lines if l.startswith("- **"))
    lines.insert(3, f"**{n} clips total.**\n")
    OUT.write_text("\n".join(lines), encoding="utf-8")
    print(f"wrote {OUT.name}: {n} clips")


if __name__ == "__main__":
    main()

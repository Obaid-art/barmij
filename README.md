# Barmij برمج — real Python for every student in the UAE

A free initiative (see docs/INITIATIVE.md): visual, joyful, pedagogically serious Python for
school students, built to be gifted to the Ministry of Education.

## Run the prototype
Double-click **`Launch Barmij.bat`**, or:

```
python -m http.server 5025 --directory app
```

then open http://localhost:5025 — World 1 ("First Lines"), six lessons, real Python running in
the browser (Pyodide; needs internet on first load to fetch Python itself).

## What's inside
- `app/` — the lesson player: role-colored code editor, animated turtle canvas, friendly
  bilingual-ready feedback, stars & progression (stored in the browser only — no accounts, no data)
- `docs/` — INITIATIVE (vision & ministry path), PEDAGOGY (the learning science, cited),
  CURRICULUM (Worlds 1-8 map), DECISIONS, SOURCES, NOT_YET_BUILT

## House rules
- Colors always mean the same thing: blue = Python's words, lavender = names you invent,
  amber = values, rose = what happens.
- Friendly error messages always keep the real Python error underneath — honesty, from lesson one.
- No dark patterns. A child's attention is an amanah.

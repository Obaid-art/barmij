/* World 1 — First Lines. Each lesson: story (HTML), starter code, task, hints, check(ctx).
   ctx = { cmds: [drawing commands], code: editor text, stdout: printed text, lines: line segments }.
   Role colors in figures & inline code chips: blue=Python's words, lavender=your names,
   amber=values, rose=effects. (docs/DECISIONS.md B4) */

const FIG = {
  print: `
<svg viewBox="0 0 560 210" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Anatomy of a print line">
  <style>.t{font:700 15px Nunito,sans-serif;fill:#2e3a46}.s{font:600 12px Nunito,sans-serif;fill:#6b7887}
         .m{font:700 17px 'JetBrains Mono',monospace}</style>
  <rect x="30" y="55" width="300" height="46" rx="10" fill="#fff" stroke="#e2e6ee"/>
  <rect x="42" y="62" width="64" height="32" rx="8" fill="#dbe7f5"/>
  <text x="48" y="84" class="m" fill="#33639c">print</text>
  <text x="108" y="84" class="m" fill="#2e3a46">(</text>
  <rect x="120" y="62" width="150" height="32" rx="8" fill="#f8ecd4"/>
  <text x="128" y="84" class="m" fill="#9c6d12">"Ahlan!"</text>
  <text x="272" y="84" class="m" fill="#2e3a46">)</text>
  <text x="42" y="40" class="s">Python's word — an order it obeys</text>
  <text x="120" y="125" class="s">your words go inside quotes</text>
  <path d="M340 78 L410 78" stroke="#8b97a5" stroke-width="2.5" marker-end="url(#arw)"/>
  <defs><marker id="arw" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
    <path d="M0,0 L8,4.5 L0,9 z" fill="#8b97a5"/></marker></defs>
  <rect x="418" y="52" width="120" height="52" rx="14" fill="#fae3df"/>
  <text x="432" y="84" class="m" fill="#a8402f" font-size="15">Ahlan!</text>
  <text x="418" y="125" class="s">what happens — the effect</text>
</svg>`,

  turtle: `
<svg viewBox="0 0 560 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="forward moves the turtle">
  <style>.t{font:700 14px Nunito,sans-serif;fill:#2e3a46}.s{font:600 12px Nunito,sans-serif;fill:#6b7887}
         .m{font:700 16px 'JetBrains Mono',monospace}</style>
  <rect x="30" y="72" width="230" height="42" rx="10" fill="#fff" stroke="#e2e6ee"/>
  <rect x="40" y="78" width="94" height="30" rx="8" fill="#dbe7f5"/>
  <text x="46" y="99" class="m" fill="#33639c">forward</text>
  <text x="134" y="99" class="m" fill="#2e3a46">(</text>
  <rect x="146" y="78" width="52" height="30" rx="8" fill="#f8ecd4"/>
  <text x="152" y="99" class="m" fill="#9c6d12">100</text>
  <text x="198" y="99" class="m" fill="#2e3a46">)</text>
  <text x="40" y="60" class="s">the order</text>
  <text x="146" y="135" class="s">how many steps</text>
  <line x1="330" y1="160" x2="330" y2="52" stroke="#5b8dc9" stroke-width="4" stroke-linecap="round"/>
  <path d="M330 40 l-11 20 h22 z" fill="#3f9d6e"/>
  <circle cx="330" cy="160" r="5" fill="#9c86cf"/>
  <text x="348" y="150" class="s">start</text>
  <text x="348" y="66" class="s">100 steps later ↑</text>
</svg>`,

  jar: `
<svg viewBox="0 0 560 210" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="a variable is a labeled jar">
  <style>.s{font:600 12px Nunito,sans-serif;fill:#6b7887}.m{font:700 16px 'JetBrains Mono',monospace}</style>
  <rect x="40" y="60" width="200" height="42" rx="10" fill="#fff" stroke="#e2e6ee"/>
  <rect x="50" y="66" width="58" height="30" rx="8" fill="#e9e2f7"/>
  <text x="56" y="87" class="m" fill="#6a4fa8">size</text>
  <text x="112" y="87" class="m" fill="#2e3a46">=</text>
  <rect x="132" y="66" width="52" height="30" rx="8" fill="#f8ecd4"/>
  <text x="138" y="87" class="m" fill="#9c6d12">100</text>
  <text x="50" y="48" class="s">a name YOU invent</text>
  <text x="132" y="125" class="s">the value it holds</text>
  <path d="M255 80 L305 80" stroke="#8b97a5" stroke-width="2.5" marker-end="url(#arw2)"/>
  <defs><marker id="arw2" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
    <path d="M0,0 L8,4.5 L0,9 z" fill="#8b97a5"/></marker></defs>
  <path d="M330 60 h90 v78 a10 10 0 0 1 -10 10 h-70 a10 10 0 0 1 -10 -10 z" fill="#e9e2f7" stroke="#9c86cf" stroke-width="2"/>
  <rect x="342" y="48" width="66" height="22" rx="7" fill="#9c86cf"/>
  <text x="352" y="64" class="m" font-size="13" fill="#fff">size</text>
  <rect x="352" y="90" width="46" height="28" rx="8" fill="#f8ecd4"/>
  <text x="360" y="110" class="m" fill="#9c6d12">100</text>
  <text x="440" y="90" class="s">a labeled jar.</text>
  <text x="440" y="108" class="s">use the name —</text>
  <text x="440" y="126" class="s">get what's inside.</text>
</svg>`,

  loop: `
<svg viewBox="0 0 560 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="a loop repeats instructions">
  <style>.s{font:600 12px Nunito,sans-serif;fill:#6b7887}.m{font:700 14.5px 'JetBrains Mono',monospace}</style>
  <rect x="26" y="40" width="250" height="120" rx="12" fill="#fff" stroke="#e2e6ee"/>
  <rect x="38" y="52" width="40" height="26" rx="7" fill="#dbe7f5"/><text x="44" y="71" class="m" fill="#33639c">for</text>
  <rect x="84" y="52" width="22" height="26" rx="7" fill="#e9e2f7"/><text x="90" y="71" class="m" fill="#6a4fa8">i</text>
  <rect x="112" y="52" width="30" height="26" rx="7" fill="#dbe7f5"/><text x="116" y="71" class="m" fill="#33639c">in</text>
  <rect x="148" y="52" width="98" height="26" rx="7" fill="#dbe7f5"/><text x="152" y="71" class="m" fill="#33639c">range(<tspan fill="#9c6d12">4</tspan>):</text>
  <text x="58" y="105" class="m" fill="#2e3a46">forward(<tspan fill="#9c6d12">100</tspan>)</text>
  <text x="58" y="132" class="m" fill="#2e3a46">right(<tspan fill="#9c6d12">90</tspan>)</text>
  <path d="M290 100 C 320 100, 320 60, 300 55 M290 100 C 320 100, 320 140, 300 145" stroke="#9c86cf" stroke-width="2" fill="none"/>
  <text x="296" y="34" class="s">runs 4 times — i counts 0,1,2,3</text>
  <rect x="360" y="45" width="150" height="150" rx="12" fill="#f1f3f7"/>
  <path d="M395 165 h80 v-80 h-80 z" fill="none" stroke="#5b8dc9" stroke-width="4" stroke-linejoin="round"/>
  <text x="382" y="215" class="s">2 lines of code → a whole square</text>
</svg>`
};

const WORLD1_LESSONS = [
  {
    id: "w1l1",
    title: "The first magic word",
    subtitle: "Every program starts with hello",
    beats: [
      { t: "Computers do exactly what you tell them." },
      { t: "You tell them with <b>instructions</b> — one per line." },
      { t: "Watch your first instruction build itself:",
        build: {
          steps: [
            { text: "print", say: "print — Python's word. It means: say something." },
            { text: "(", say: "The doors open…" },
            { text: "\"Ahlan!\"", say: "Between the doors: YOUR words, inside quotes." },
            { text: ")", say: "…and the doors close." },
          ],
          effect: "Ahlan!",
          done: "Run it — and the computer says your words.",
        } },
      { t: "The colors never lie:",
        fig: { k: "anat", p: [
          { c: "print", r: "k", l: "Python's word" },
          { c: "(", r: "i" },
          { c: "\"Ahlan!\"", r: "v", l: "your words, in quotes" },
          { c: ")", r: "i" },
        ], eff: "Ahlan!", effl: "what happens" } },
    ],
    predict: "Before you press Run — what exactly do you think will appear?",
    starter: `print("Ahlan! I am the computer")\n`,
    task: "Make the computer say YOUR name — then make it say two more things (one print per line).",
    hints: [
      "Change the words inside the quotes \" \" — the quotes stay, your words change.",
      "Want more lines? Write more print lines: each print(\"...\") on its own line.",
    ],
    check: (ctx) => {
      const n = ctx.stdout.split("\n").filter(s => s.trim()).length;
      if (n === 0) return { pass: false, msg: "Nothing was printed yet — check your print line." };
      if (n < 3) return { pass: false, msg: `Nice, ${n} message${n>1?"s":""}! Now make it three or more.` };
      return { pass: true, msg: "The computer speaks your words. That's programming." };
    },
  },
  {
    id: "w1l2",
    title: "Meet the turtle",
    subtitle: "Code you can SEE",
    beats: [
      { t: "Meet the turtle 🐢 — it walks, and its pen draws." },
      { t: "It only understands code. Read the arrows:", fig: "turtle" },
      { t: "Watch the walk write itself:",
        build: {
          steps: [
            { text: "forward(100)", say: "The walking word — one hundred steps." },
            { text: "\nright(90)", say: "New line, new order: turn right ninety." },
            { text: "\nforward(100)", say: "And walk again. Top to bottom, always." },
          ],
          effect: "walk → turn → walk",
          done: "Three orders, obeyed in order.",
        } },
      { t: "Code runs <b>top to bottom</b>. Nothing skipped, nothing guessed." },
    ],
    predict: "Two forward lines with a turn between them — what shape will the pen leave?",
    starter: `forward(120)\nright(90)\nforward(120)\n`,
    task: "Make the turtle draw a longer path — at least 4 lines, using forward and right (or left). Try big numbers!",
    hints: [
      "right(90) turns the turtle. Try right(45) or left(120) — any angle you like.",
      "Copy a forward + right pair and paste it a few times. What pattern appears?",
    ],
    check: (ctx) => {
      if (ctx.lines.length === 0) return { pass: false, msg: "The pen didn't move — you need forward(...) with a number inside." };
      if (ctx.lines.length < 4) return { pass: false, msg: `The turtle drew ${ctx.lines.length} line${ctx.lines.length>1?"s":""} — make it at least 4.` };
      return { pass: true, msg: "You just steered a computer, step by step." };
    },
  },
  {
    id: "w1l3",
    title: "Colors & thick pens",
    subtitle: "Your drawing, your style",
    beats: [
      { t: "Two new magic words:",
        fig: { k: "rows", rows: [
          { code: [{ c: "color(", r: "k" }, { c: "\"gold\"", r: "v" }, { c: ")", r: "k" }], res: "next lines turn gold" },
          { code: [{ c: "width(", r: "k" }, { c: "8", r: "v" }, { c: ")", r: "k" }], res: "a thick pen" },
        ] } },
      { t: "They style whatever the pen draws <b>next</b>." },
      { t: "It knows 100+ colors: <code class=\"a\">\"red\"</code> <code class=\"a\">\"teal\"</code> <code class=\"a\">\"hotpink\"</code> <code class=\"a\">\"royalblue\"</code> <code class=\"a\">\"orchid\"</code>…" },
      { t: "Change color between lines → every side different." },
      { t: "Bonus pen tricks: <code class=\"k\">penup()</code> lifts the pen · <code class=\"k\">jump(x, y)</code> teleports · <code class=\"k\">dot()</code> stamps." },
    ],
    starter: `color("royalblue")\nwidth(8)\nforward(120)\nright(120)\ncolor("gold")\nforward(120)\nright(120)\ncolor("seagreen")\nforward(120)\n`,
    task: "Draw a picture that uses at least 3 different colors. Any shape you like — this is YOUR art.",
    hints: [
      "Put a color(\"...\") line before a forward line — the next lines drawn take that color.",
      "Triangle: three forwards with right(120) between them. Square: four with right(90).",
    ],
    check: (ctx) => {
      const used = new Set(ctx.lines.map(l => l.c));
      if (ctx.lines.length < 3) return { pass: false, msg: "Draw at least 3 lines — then style them with colors." };
      if (used.size < 3) return { pass: false, msg: `I count ${used.size} color${used.size>1?"s":""} — use at least 3 different ones.` };
      return { pass: true, msg: "An artist AND a programmer. The gallery grows." };
    },
  },
  {
    id: "w1l4",
    title: "The labeled jar",
    subtitle: "Variables — names you invent",
    beats: [
      { t: "A superpower: invent a name, give it a value." },
      { t: "Follow the arrow — the value goes into a jar:", fig: "jar",
        figcap: "= means \"put this inside\" — not \"equals\" like math class!" },
      { t: "Watch a jar being filled, then used:",
        build: {
          steps: [
            { text: "size", say: "Invent a name — this jar is YOURS." },
            { text: " = ", say: "The filling sign: 'put this inside'." },
            { text: "100", say: "What goes in the jar." },
            { text: "\nforward(size)", say: "Now USE it — the name fetches what's inside." },
          ],
          effect: "the turtle walks 100",
          done: "One jar, ready to feed every line below.",
        } },
      { t: "Change the jar once → the <b>whole drawing</b> changes with it." },
    ],
    predict: "If you change ONLY the first line to size = 180 and run again — what changes?",
    starter: `size = 100\n\nforward(size)\nright(90)\nforward(size)\nright(90)\nforward(size)\nright(90)\nforward(size)\n`,
    task: "Run it. Then change ONLY the number in the first line and run again. Finish with a square you like, drawn from the jar.",
    hints: [
      "The lavender word is yours — you could call it size, s, or gamestep. Keep it the same everywhere.",
      "A square needs 4 forwards with right(90) between them — all reading from the jar.",
    ],
    check: (ctx) => {
      const assign = /^[ \t]*([A-Za-z_]\w*)[ \t]*=[ \t]*\d+/m.exec(ctx.code);
      if (!assign) return { pass: false, msg: "Create your jar first: a line like size = 100." };
      const name = assign[1];
      if (!new RegExp(`forward\\s*\\(\\s*${name}`).test(ctx.code))
        return { pass: false, msg: `You made the jar "${name}" — now USE it: forward(${name}).` };
      if (ctx.lines.length < 4) return { pass: false, msg: "Almost — the square needs 4 sides." };
      return { pass: true, msg: "One jar, many lines. That's how real programs are built." };
    },
  },
  {
    id: "w1l5",
    title: "The magic multiplier",
    subtitle: "Loops — write once, run many",
    beats: [
      { t: "Never copy-paste the same lines. Command repetition itself:", fig: "loop" },
      { t: "The indent (4 spaces) means: <b>I belong to the loop</b>." },
      { t: "<code class=\"v\">i</code> is a jar the loop fills: 0, 1, 2, 3…" },
      { t: "Watch the spell being cast:",
        build: {
          steps: [
            { text: "for i in range(4):", say: "The repeat spell — one line, ending with ':'" },
            { text: "\n    forward(100)", say: "FOUR spaces — the handshake: 'I belong to the loop.'" },
            { text: "\n    right(90)", say: "Same handshake, next instruction." },
          ],
          effect: "a whole square",
          done: "Two indented lines, four times around.",
        } },
      { t: "Use <code class=\"v\">i</code> inside → <code class=\"k\">forward</code>(<code class=\"v\">i</code> * <code class=\"a\">4</code>) → every step grows 🌀" },
    ],
    predict: "range(36) with right(100) — 36 repeats. What could THAT look like?",
    starter: `for i in range(36):\n    forward(i * 4)\n    right(100)\n`,
    task: "Run the spiral! Then experiment: change range(36), the * 4, and right(100). When you find a pattern you love, you've passed.",
    hints: [
      "Try right(91), right(121), right(144) — tiny angle changes, wildly different galaxies.",
      "color(\"purple\") before the loop styles it; range(100) makes it huge.",
    ],
    check: (ctx) => {
      if (!/for\s+\w+\s+in\s+range\s*\(/.test(ctx.code))
        return { pass: false, msg: "Use the loop: for i in range(...): with the drawing lines indented under it." };
      if (ctx.lines.length < 8) return { pass: false, msg: "The loop should draw at least 8 lines — increase range(...)." };
      return { pass: true, msg: "Three lines of code. Look what they made. THIS is the power." };
    },
  },
  {
    id: "w1l6",
    title: "Challenge: the star",
    subtitle: "Make — no starter code, just you",
    beats: [
      { t: "Your first solo make: a five-pointed star ⭐" },
      { t: "You know everything needed:",
        fig: { k: "rows", rows: [
          { lab: "5 times", code: [{ c: "forward(150)", r: "k" }, { c: " then ", r: "i" }, { c: "right(144)", r: "k" }], res: "⭐" },
        ] } },
      { t: "(A square turned 90. A star folds sharper.)" },
      { t: "Loop or no loop — your call. Mastery means <b>your way</b>." },
    ],
    starter: `# Draw your star here.\n# You know: 5 lines, right(144) after each.\n\n`,
    task: "Draw a five-pointed star. Any size, any color. Loop or no loop — mastery is doing it YOUR way.",
    hints: [
      "for i in range(5): then indented: forward(150) and right(144).",
      "Not closing? Check: exactly 5 forwards, and the turn is 144 — not 44, not 114.",
      "Add color(\"gold\") and width(6) before the loop for a star worth framing.",
    ],
    check: (ctx) => {
      const L = ctx.lines;
      if (L.length < 5) return { pass: false, msg: `${L.length} line${L.length===1?"":"s"} so far — a star needs 5.` };
      if (L.length > 5) return { pass: false, msg: `That's ${L.length} lines — a clean star is exactly 5. (penup()/pendown() can hide extras.)` };
      const len = Math.hypot(L[0].x2-L[0].x1, L[0].y2-L[0].y1);
      for (const s of L) {
        const l2 = Math.hypot(s.x2-s.x1, s.y2-s.y1);
        if (Math.abs(l2 - len) > 3) return { pass: false, msg: "The 5 lines should all be the same length — same number in every forward." };
      }
      for (let k = 1; k < L.length; k++) {
        const h1 = Math.atan2(L[k-1].y2-L[k-1].y1, L[k-1].x2-L[k-1].x1);
        const h2 = Math.atan2(L[k].y2-L[k].y1, L[k].x2-L[k].x1);
        let d = ((h1 - h2) * 180 / Math.PI + 720) % 360; // clockwise turn
        if (Math.abs(d - 144) > 3 && Math.abs(d - 216) > 3)
          return { pass: false, msg: `Your turn between lines looks like ${Math.round(Math.min(d, 360-d))}° — a five-pointed star needs 144°.` };
      }
      const dx = L[4].x2 - L[0].x1, dy = L[4].y2 - L[0].y1;
      if (Math.hypot(dx, dy) > 8) return { pass: false, msg: "So close — the star should end where it began. Check every turn is 144." };
      return { pass: true, msg: "⭐ A perfect star, drawn by code YOU wrote. World 1 — complete. Mumtaz!" };
    },
  },
];

/* ================= World 2 — Decisions ================= */

Object.assign(FIG, {
  input: `
<svg viewBox="0 0 560 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="input waits for an answer and fills a jar">
  <style>.s{font:600 12px Nunito,sans-serif;fill:#6b7887}.m{font:700 15px 'JetBrains Mono',monospace}</style>
  <rect x="24" y="70" width="250" height="42" rx="10" fill="#fff" stroke="#e2e6ee"/>
  <rect x="34" y="76" width="58" height="30" rx="8" fill="#e9e2f7"/><text x="40" y="97" class="m" fill="#6a4fa8">name</text>
  <text x="96" y="97" class="m" fill="#2e3a46">=</text>
  <rect x="116" y="76" width="64" height="30" rx="8" fill="#dbe7f5"/><text x="122" y="97" class="m" fill="#33639c">input</text>
  <text x="180" y="97" class="m" fill="#2e3a46">(</text><text x="190" y="97" class="m" fill="#9c6d12">…</text><text x="206" y="97" class="m" fill="#2e3a46">)</text>
  <path d="M285 91 L330 91" stroke="#8b97a5" stroke-width="2.5" marker-end="url(#arw3)"/>
  <defs><marker id="arw3" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0,0 L8,4.5 L0,9 z" fill="#8b97a5"/></marker></defs>
  <rect x="338" y="52" width="196" height="46" rx="10" fill="#fae3df"/>
  <text x="350" y="80" class="s" font-size="13" fill="#a8402f">the program STOPS and waits ⏸</text>
  <rect x="338" y="112" width="196" height="46" rx="10" fill="#e9e2f7"/>
  <text x="350" y="132" class="s" fill="#55418a">whatever is typed lands</text>
  <text x="350" y="148" class="s" fill="#55418a">in the jar called <tspan font-weight="800">name</tspan></text>
</svg>`,
  fork: `
<svg viewBox="0 0 560 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="if and else are a fork in the road">
  <style>.s{font:600 12px Nunito,sans-serif;fill:#6b7887}.m{font:700 14px 'JetBrains Mono',monospace}</style>
  <rect x="170" y="18" width="230" height="40" rx="10" fill="#fff" stroke="#e2e6ee"/>
  <text x="182" y="44" class="m"><tspan fill="#33639c">if</tspan> <tspan fill="#6a4fa8">answer</tspan> <tspan fill="#2e3a46">==</tspan> <tspan fill="#9c6d12">"blue"</tspan><tspan fill="#2e3a46">:</tspan></text>
  <path d="M285 62 C 285 90, 160 95, 150 125" stroke="#5b8dc9" stroke-width="3" fill="none" marker-end="url(#arwB)"/>
  <path d="M285 62 C 285 90, 410 95, 420 125" stroke="#d99a2b" stroke-width="3" fill="none" marker-end="url(#arwA)"/>
  <defs>
    <marker id="arwB" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0,0 L8,4.5 L0,9 z" fill="#5b8dc9"/></marker>
    <marker id="arwA" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0,0 L8,4.5 L0,9 z" fill="#d99a2b"/></marker>
  </defs>
  <text x="120" y="112" class="s" fill="#33639c">True — words match</text>
  <text x="392" y="112" class="s" fill="#9c6d12">False — they don't</text>
  <rect x="60" y="132" width="180" height="42" rx="10" fill="#dbe7f5"/>
  <text x="74" y="158" class="m" fill="#2e3a46">color(<tspan fill="#9c6d12">"royalblue"</tspan>)</text>
  <rect x="330" y="132" width="180" height="42" rx="10" fill="#f8ecd4"/>
  <text x="344" y="158" class="m" fill="#2e3a46">color(<tspan fill="#9c6d12">"gold"</tspan>)</text>
  <text x="118" y="205" class="s">only ONE road is taken — never both</text>
  <text x="330" y="205" class="s">== asks "equal?" · = fills a jar. Twins, not the same!</text>
</svg>`,
  dice: `
<svg viewBox="0 0 560 190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="random gives a different number each run">
  <style>.s{font:600 12px Nunito,sans-serif;fill:#6b7887}.m{font:700 15px 'JetBrains Mono',monospace}</style>
  <rect x="24" y="66" width="286" height="42" rx="10" fill="#fff" stroke="#e2e6ee"/>
  <text x="36" y="93" class="m"><tspan fill="#6a4fa8">random</tspan><tspan fill="#2e3a46">.</tspan><tspan fill="#33639c">randint</tspan><tspan fill="#2e3a46">(</tspan><tspan fill="#9c6d12">1</tspan><tspan fill="#2e3a46">,</tspan> <tspan fill="#9c6d12">6</tspan><tspan fill="#2e3a46">)</tspan></text>
  <g transform="translate(350,50)">
    <rect width="52" height="52" rx="12" fill="#e9e2f7" stroke="#9c86cf" stroke-width="2"/>
    <circle cx="14" cy="14" r="5 " fill="#55418a"/><circle cx="38" cy="14" r="5" fill="#55418a"/>
    <circle cx="14" cy="38" r="5" fill="#55418a"/><circle cx="38" cy="38" r="5" fill="#55418a"/>
  </g>
  <g transform="translate(420,72)">
    <rect width="44" height="44" rx="10" fill="#f8ecd4" stroke="#d99a2b" stroke-width="2"/>
    <circle cx="22" cy="22" r="5" fill="#9c6d12"/>
  </g>
  <g transform="translate(478,58)">
    <rect width="48" height="48" rx="11" fill="#dbe7f5" stroke="#5b8dc9" stroke-width="2"/>
    <circle cx="14" cy="14" r="5" fill="#33639c"/><circle cx="34" cy="34" r="5" fill="#33639c"/>
  </g>
  <text x="350" y="140" class="s">every Run throws the dice again — 4, then 1, then 2…</text>
</svg>`,
});

const WORLD2_LESSONS = [
  {
    id: "w2l1",
    title: "Ask me anything",
    subtitle: "input — programs that listen",
    beats: [
      { t: "Your programs can speak. Now they learn to <b>listen</b>." },
      { t: "<code class=\"k\">input</code> asks a question — then <b>waits</b>. Follow the arrows:", fig: "input" },
      { t: "Watch a question being built:",
        build: {
          steps: [
            { text: "name = ", say: "A jar, ready and waiting for the answer." },
            { text: "input", say: "The listening word." },
            { text: "(\"What is your name?\")", say: "Your question goes inside — quotes and all." },
          ],
          effect: "the program waits for YOU",
          done: "Ask, wait, catch the answer in the jar.",
        } },
      { t: "Glue words with +: <code class=\"k\">print</code>(<code class=\"a\">\"Ahlan, \"</code> + <code class=\"v\">name</code>)" },
    ],
    predict: "Where will the question appear — and where will your answer go?",
    starter: `name = input("What is your name?")\nprint("Ahlan wa sahlan, " + name + "!")\nprint("Welcome to World 2, " + name)\n`,
    task: "Run it and answer! Then add a SECOND question (favorite color? favorite food?) and print a reply that uses the answer.",
    hints: [
      "Copy the pattern: food = input(\"Favorite food?\") then print(\"Yummy, \" + food + \"!\")",
      "Gluing words: pieces join with + — and every piece of text needs its own quotes.",
    ],
    check: (ctx) => {
      const inputs = (ctx.code.match(/input\s*\(/g) || []).length;
      if (inputs === 0) return { pass: false, msg: "Use input(\"...\") to ask something — the program should stop and wait for you." };
      if (inputs < 2) return { pass: false, msg: "One question asked and answered! Now add a second one." };
      if (ctx.stdout.split("\n").filter(s => s.trim()).length < 2)
        return { pass: false, msg: "Now print replies that use BOTH answers." };
      return { pass: true, msg: "Your program listens and answers. That's a conversation with a machine — one you built." };
    },
  },
  {
    id: "w2l2",
    title: "The fork in the road",
    subtitle: "if / else — programs that decide",
    beats: [
      { t: "Now — code that <b>decides</b>." },
      { t: "<code class=\"k\">if</code> opens two roads. Python takes exactly one:", fig: "fork" },
      { t: "The twins: <b>=</b> fills a jar. <b>==</b> asks \"equal?\". Not the same!" },
      { t: "Indented lines belong to their road." },
    ],
    predict: "If you type banana instead of blue — which road runs? What color will the square be?",
    starter: `answer = input("Which color do you love?")\n\nif answer == "blue":\n    color("royalblue")\nelse:\n    color("gold")\n\nwidth(10)\nfor i in range(4):\n    forward(120)\n    right(90)\n`,
    task: "Run it twice — once answering blue, once answering anything else. Then make it YOURS: change the question, the colors, the shape.",
    hints: [
      "The if road runs only on an exact match — \"blue\", not \"Blue \". Computers are exact.",
      "Try a different shape under the decision: range(3) with right(120) is a triangle.",
    ],
    check: (ctx) => {
      if (!/if\s+.+==/.test(ctx.code)) return { pass: false, msg: "The decision needs: if answer == \"something\":" };
      if (!/\belse\b/.test(ctx.code)) return { pass: false, msg: "Add the other road too: else: with its own indented lines." };
      if (ctx.lines.length < 3) return { pass: false, msg: "Now let the chosen road draw — at least 3 lines." };
      return { pass: true, msg: "Your code just made a decision by itself. This is the seed of every smart machine." };
    },
  },
  {
    id: "w2l3",
    title: "The dice of Python",
    subtitle: "random — delightful surprises",
    beats: [
      { t: "<code class=\"k\">import</code> <code class=\"v\">random</code> — a toolbox of chance." },
      { t: "One tool throws dice:", fig: "dice" },
      { t: "See <code>[ ... ]</code>? A <b>bag</b> of options:",
        fig: { k: "slots", items: ["\"gold\"", "\"royalblue\"", "\"hotpink\"", "\"seagreen\""], idx: false,
               note: "choice grabs ONE — eyes closed, different every run" } },
      { t: "The grabbing tool: <code class=\"v\">random</code>.<code class=\"k\">choice</code>([<code class=\"a\">\"gold\"</code>, <code class=\"a\">\"pink\"</code>])" },
      { t: "Same code. Different result. <b>Every run.</b>" },
    ],
    predict: "Run the same code twice. Will the two stars be identical?",
    starter: `import random\n\nsize = random.randint(40, 140)\ncolor(random.choice(["gold", "royalblue", "hotpink", "seagreen"]))\nwidth(6)\n\nfor i in range(5):\n    forward(size)\n    right(144)\n`,
    task: "Run it at least 3 times and watch the star change. Then add two more colors you love to the list.",
    hints: [
      "The bag lives inside [ ] — add a color like \"orchid\" or \"teal\", with quotes and a comma.",
      "Make the surprise bigger: randint(20, 200), or a random width(random.randint(2, 12)).",
    ],
    check: (ctx) => {
      if (!/import\s+random/.test(ctx.code)) return { pass: false, msg: "First fetch the toolbox: import random (its own line, at the top)." };
      if (!/random\.(randint|choice)/.test(ctx.code)) return { pass: false, msg: "Use a chance tool: random.randint(...) or random.choice([...])." };
      const colors = (ctx.code.match(/"[a-zA-Z]+"/g) || []).length;
      if (colors < 6) return { pass: false, msg: "Grow the color list — at least 6 colors for a proper surprise." };
      if (ctx.lines.length < 3) return { pass: false, msg: "Let the dice draw something — keep the star loop." };
      return { pass: true, msg: "Every Run is a little gift now. You taught your code to surprise even YOU." };
    },
  },
  {
    id: "w2l4",
    title: "The fortune teller",
    subtitle: "input + random = magic",
    beats: [
      { t: "Two powers, one machine: <code class=\"k\">input</code> + <code class=\"v\">random</code>." },
      { t: "A question from a human. An answer from chance. 🔮",
        fig: { k: "rows", rows: [
          { lab: "ask", code: [{ c: "input(...)", r: "k" }], res: "your question" },
          { lab: "chance", code: [{ c: "choice([ 8 fortunes ])", r: "k" }], res: "ONE fortune" },
          { lab: "reply", code: [{ c: "print(...)", r: "k" }], res: "the magic answer" },
        ] } },
      { t: "This is how real apps are born." },
    ],
    starter: `import random\n\nquestion = input("Ask the fortune teller anything...")\n\nfortune = random.choice([\n    "Yes, absolutely!",\n    "The stars say... try again tomorrow",\n    "All signs point to YES",\n    "Very doubtful, ya sadiqi",\n])\n\nprint("You asked: " + question)\nprint("The fortune says: " + fortune)\n`,
    task: "Ask it something! Then write at least 4 MORE fortunes in your own voice — funny ones, kind ones — and test it on a second question.",
    hints: [
      "Each fortune is a quoted line inside the [ ], ending with a comma.",
      "Make it feel alive: print(\"🔮 ...thinking...\") before the answer.",
    ],
    check: (ctx) => {
      if (!/input\s*\(/.test(ctx.code)) return { pass: false, msg: "A fortune teller must be asked — keep the input(...) question." };
      if (!/random\.choice/.test(ctx.code)) return { pass: false, msg: "The fortune must come from chance: random.choice([...])." };
      const fortunes = (ctx.code.match(/"[^"]{2,}"/g) || []).length;
      if (fortunes < 8) return { pass: false, msg: "More destiny needed — grow the list to at least 8 fortunes." };
      if (!ctx.stdout.trim()) return { pass: false, msg: "Print the question and the fortune so we can see the magic." };
      return { pass: true, msg: "🔮 You built a real app. Tonight, someone in your family asks it a question." };
    },
  },
  {
    id: "w2l5",
    title: "The guessing game",
    subtitle: "elif, int — your first real game",
    beats: [
      { t: "<code class=\"k\">input</code> gives <b>words</b> — even \"7\" is a word." },
      { t: "<code class=\"k\">int</code>(...) turns words into real numbers:",
        fig: { k: "anat", p: [
          { c: "int(", r: "k", l: "words → number" },
          { c: "input(\"...\")", r: "k", l: "the typed answer" },
          { c: ")", r: "i" },
        ], eff: "7", effl: "a real number — now > and < work" } },
      { t: "<code class=\"k\">str</code>(...) is the twin, reversed — numbers back into words, ready for +." },
      { t: "Between if and else lives <code class=\"k\">elif</code>: \"else, if…\"" },
      { t: "That's everything a guessing game needs. 🎯" },
    ],
    predict: "The spiral's color will tell you how your guess went. Which color means victory?",
    starter: `import random\n\nsecret = random.randint(1, 10)\nguess = int(input("I am thinking of a number from 1 to 10..."))\n\nif guess == secret:\n    print("You read my mind! It WAS " + str(secret))\n    color("gold")\nelif guess > secret:\n    print("Too high! It was " + str(secret) + " - run and try again!")\n    color("royalblue")\nelse:\n    print("Too low! It was " + str(secret) + " - run and try again!")\n    color("hotpink")\n\nwidth(8)\nfor i in range(36):\n    forward(i * 2)\n    right(92)\n`,
    task: "Play until you WIN a gold spiral! Then make the game harder: 1 to 20.",
    hints: [
      "Each Run is one round — the secret changes every time. That's the game!",
      "str(secret) turns the number back into words so + can glue it into the sentence.",
    ],
    check: (ctx) => {
      if (!/\belif\b/.test(ctx.code)) return { pass: false, msg: "Use all three roads: if, elif, else." };
      if (!/int\s*\(\s*input/.test(ctx.code)) return { pass: false, msg: "Turn the typed guess into a number: int(input(...))." };
      if (!/random\.randint/.test(ctx.code)) return { pass: false, msg: "The secret must be random — random.randint(1, 10)." };
      if (!ctx.stdout.trim()) return { pass: false, msg: "The game must speak — keep the print lines." };
      return { pass: true, msg: "A real game, rules and all — and YOU are the game maker now." };
    },
  },
  {
    id: "w2l6",
    title: "Challenge: the Mood Machine",
    subtitle: "Make — everything you know, your way",
    beats: [
      { t: "Final make: a machine that answers <b>feelings</b> with <b>art</b>." },
      { t: "Ingredients: <code class=\"k\">input</code> to ask · <code class=\"k\">if</code>/<code class=\"k\">elif</code>/<code class=\"k\">else</code> to choose · 3 moods minimum." },
      { t: "One feeling in, one artwork out:",
        fig: { k: "rows", rows: [
          { lab: "\"happy\"", code: [], res: "a golden sun" },
          { lab: "\"sleepy\"", code: [], res: "blue waves" },
          { lab: "anything else", code: [], res: "a pink firework" },
        ] } },
      { t: "You are artist AND engineer. There is no wrong machine." },
    ],
    starter: `# The Mood Machine\n# Ask how they feel - then answer with art.\n\nmood = input("How do you feel today?")\n\n`,
    task: "Build a Mood Machine with at least 3 moods, each drawing something different. Then test it on yourself — honestly 🙂",
    hints: [
      "Skeleton: if mood == \"happy\": ... elif mood == \"sleepy\": ... else: ...",
      "Give each mood its own color(...) and its own loop — a different shape per feeling.",
      "A sun: color(\"gold\") then for i in range(12): forward(80) right(150). Try it!",
    ],
    check: (ctx) => {
      if (!/input\s*\(/.test(ctx.code)) return { pass: false, msg: "The machine must ask first — keep the input(...)." };
      if (!/\bif\b/.test(ctx.code) || !/\belif\b/.test(ctx.code) || !/\belse\b/.test(ctx.code))
        return { pass: false, msg: "Three moods minimum: if, elif, and else — three roads, three feelings." };
      if (ctx.lines.length < 3 && !ctx.stdout.trim())
        return { pass: false, msg: "Let the chosen mood DRAW its answer (or at least speak it)." };
      return { pass: true, msg: "🎨 The Mood Machine lives! World 2 complete — your code listens, decides, and creates. Fakhamah!" };
    },
  },
];

/* ================= World 3 — Patterns & Power ================= */

const WORLD3_LESSONS = [
  {
    id: "w3l1",
    title: "The loop inside a loop",
    subtitle: "Repeat the repeating",
    beats: [
      { t: "New power: repeat the <b>repeating</b>." },
      { t: "Watch a loop climb inside another loop:",
        build: {
          steps: [
            { text: "for i in range(6):", say: "The outer loop — six turns of the wheel." },
            { text: "\n    for j in range(6):", say: "INSIDE it, a second loop. Deeper indent: it belongs to the first." },
            { text: "\n        forward(60)\n        right(60)", say: "The deepest lines run six times six — thirty-six times." },
            { text: "\n    right(60)", say: "Back one indent — this line belongs to the OUTER loop only." },
          ],
          effect: "a ring of 6 hexagons",
          done: "Four little lines. Thirty-six moves. That is the power of nesting.",
        } },
      { t: "Indent depth says who you belong to:",
        fig: { k: "rows", rows: [
          { lab: "outer lap 1", code: [{ c: "inner runs 6 times", r: "i" }], res: "one hexagon" },
          { lab: "outer lap 2", code: [{ c: "inner runs again", r: "i" }], res: "next hexagon" },
          { lab: "6 laps", code: [{ c: "6 × 6", r: "i" }], res: "36 moves" },
        ] } },
      { t: "Small code, huge work — that's what computers are FOR." },
    ],
    predict: "Six hexagons, each drawn after a turn of 60 — what ring appears?",
    starter: `color("darkslateblue")\nwidth(2)\nfor i in range(6):\n    for j in range(6):\n        forward(60)\n        right(60)\n    right(60)\n`,
    task: "Run the ring. Then change BOTH range numbers and the last right() — hunt for a ring you love.",
    hints: [
      "Outer range = how many shapes. Inner range = the shape's sides.",
      "The LAST right() must be 360 ÷ (outer number), or the ring won't close.",
      "Try 8 shapes of 4 sides with a final right(45).",
    ],
    check: (ctx) => {
      if (!/\n\s+for\s+\w+\s+in\b/.test(ctx.code))
        return { pass: false, msg: "Put a loop INSIDE the loop — the inner for needs a deeper indent." };
      if (ctx.lines.length < 12) return { pass: false, msg: "Let the nest draw — at least 12 lines." };
      return { pass: true, msg: "You commanded a loop to command a loop. That's real computational power." };
    },
  },
  {
    id: "w3l2",
    title: "The zellij window",
    subtitle: "The tile art of our mosques",
    beats: [
      { t: "Zellij — the tile art of our mosques. Pure geometry, pure patience." },
      { t: "The recipe: draw a shape. Turn a little. Draw again." },
      { t: "To close the circle: small turn × repeats = <b>360</b>.",
        fig: { k: "rows", rows: [
          { code: [{ c: "12", r: "v" }, { c: " squares × ", r: "i" }, { c: "30", r: "v" }, { c: "° each", r: "i" }], res: "360° — it closes" },
        ], note: "12×30 · 8×45 · 10×36 · 6×60 — all roads to 360" } },
      { t: "Twelve squares × turns of 30 = a rose window." },
    ],
    predict: "Twelve overlapping squares — what blooms where they cross?",
    starter: `color("darkcyan")\nwidth(2)\nfor i in range(12):\n    for j in range(4):\n        forward(95)\n        right(90)\n    right(30)\n`,
    task: "Run the window. Then craft two more tiles: 8 squares with right(45), and 10 with right(36).",
    hints: [
      "Only TWO numbers change between tiles: the outer range and the last right().",
      "They must multiply to 360: 12×30, 8×45, 10×36, 6×60…",
      "Triangles instead of squares? Inner range(3) with right(120).",
    ],
    check: (ctx) => {
      if (!/\n\s+for\s+\w+\s+in\b/.test(ctx.code))
        return { pass: false, msg: "A zellij needs the nest: a shape-loop inside a rotation-loop." };
      if (ctx.lines.length < 24) return { pass: false, msg: "More repeats — a window needs at least 24 lines." };
      return { pass: true, msg: "Craftsmen spent years learning this geometry. You just computed it." };
    },
  },
  {
    id: "w3l3",
    title: "Counting your way",
    subtitle: "range with start, stop, step",
    beats: [
      { t: "range can count YOUR way:",
        fig: { k: "anat", p: [
          { c: "range(", r: "k" },
          { c: "20", r: "v", l: "START here" },
          { c: ", ", r: "i" },
          { c: "121", r: "v", l: "STOP before this" },
          { c: ", ", r: "i" },
          { c: "20", r: "v", l: "STEP by this" },
          { c: ")", r: "i" },
        ], eff: "20 40 60 80 100 120" } },
      { t: "Watch the three numbers take their places:",
        build: {
          steps: [
            { text: "for size in range(", say: "The loop jar this time is called size." },
            { text: "20", say: "START counting at 20…" },
            { text: ", 121", say: "…STOP before 121…" },
            { text: ", 20):", say: "…STEPPING by 20 each time." },
          ],
          effect: "size = 20, 40, 60, 80, 100, 120",
          done: "Six sizes from one line. The step is yours to choose.",
        } },
      { t: "Backwards too: range(120, 19, -20) counts <b>down</b>." },
    ],
    predict: "Six squares, each 20 bigger, all from one corner — what staircase of squares appears?",
    starter: `color("goldenrod")\nwidth(3)\nfor size in range(20, 121, 20):\n    for j in range(4):\n        forward(size)\n        right(90)\n`,
    task: "Run it. Then make it count DOWN: range(120, 19, -20). Does the drawing change? Think, then check.",
    hints: [
      "Counting down draws the same squares — in reverse order. The drawing keeps the secret.",
      "A tighter staircase: step of 10. A wilder one: step of 35.",
    ],
    check: (ctx) => {
      if (!/range\([^)]+,[^)]+,[^)]+\)/.test(ctx.code))
        return { pass: false, msg: "Use the three-number range: range(start, stop, step)." };
      if (ctx.lines.length < 16) return { pass: false, msg: "Let it draw the full family of squares — at least 16 lines." };
      return { pass: true, msg: "start, stop, step — you now command HOW the machine counts." };
    },
  },
  {
    id: "w3l4",
    title: "The patient while",
    subtitle: "Repeat as long as it's true",
    beats: [
      { t: "Meet <code class=\"k\">while</code>: repeat AS LONG AS something is true." },
      { t: "Watch the promise being built:",
        build: {
          steps: [
            { text: "n = 0", say: "A counter jar, starting at zero." },
            { text: "\nwhile n < 6:", say: "while — keep going AS LONG AS n is under six." },
            { text: "\n    forward(90)\n    back(90)\n    right(60)", say: "The work: one petal per lap." },
            { text: "\n    n = n + 1", say: "The PROMISE — the counter grows, so the loop can end." },
          ],
          effect: "6 petals — then it stops itself",
          done: "No promise, no escape. The counter is the loop's word of honor.",
        } },
      { t: "Forget the promise → the loop runs forever.",
        fig: { k: "cycle", title: "while n < 6", steps: ["check: n < 6 ?", "yes → draw a petal", "n = n + 1"],
               note: "the promise grows n — one day the check says no, and the loop stops itself" } },
      { t: "Don't fear it: I catch runaway loops and tell you kindly." },
    ],
    predict: "What happens if n = n + 1 is deleted? (Try it later — I'll catch you.)",
    starter: `color("seagreen")\nwidth(5)\nn = 0\nwhile n < 6:\n    forward(90)\n    back(90)\n    right(60)\n    n = n + 1\n`,
    task: "Run the six petals. Then grow the flower: 12 petals (fix BOTH the condition and the angle).",
    hints: [
      "12 petals: while n < 12, and the turn becomes 30 (12 × 30 = 360).",
      "Brave experiment: delete n = n + 1 and run. Read what I tell you. Then put it back.",
    ],
    check: (ctx) => {
      if (!/^\s*while\b/m.test(ctx.code))
        return { pass: false, msg: "This lesson's power is while — use it instead of for." };
      if (!/\b(\w+)\s*=\s*\1\s*[+\-]|[+\-]=/.test(ctx.code))
        return { pass: false, msg: "Where is the promise? The counter must change inside the loop." };
      if (ctx.lines.length < 10) return { pass: false, msg: "Let it bloom — at least 10 drawn lines." };
      return { pass: true, msg: "You made a loop that knows when to stop. That's engineering wisdom." };
    },
  },
  {
    id: "w3l5",
    title: "The National Day show",
    subtitle: "Nested loops light the sky",
    beats: [
      { t: "December 2nd. The sky over the Union. Your code lights it." },
      { t: "Each rocket, three moves:",
        fig: { k: "rows", rows: [
          { code: [{ c: "jump somewhere", r: "i" }], res: "a new spot" },
          { code: [{ c: "pick a color", r: "i" }], res: "a new color" },
          { code: [{ c: "burst 12 rays", r: "i" }], res: "boom 🎆" },
        ] } },
      { t: "Nested: outer loop = rockets. Inner loop = one burst." },
    ],
    predict: "Eight rockets of twelve rays — how many lines will light the sky?",
    starter: `import random\n\nfor i in range(8):\n    penup()\n    jump(random.randint(-170, 170), random.randint(-110, 130))\n    pendown()\n    color(random.choice(["gold", "crimson", "seagreen", "hotpink", "royalblue"]))\n    L = random.randint(28, 55)\n    for j in range(12):\n        forward(L)\n        back(L)\n        right(30)\n`,
    task: "Run the show. Then: 15 rockets, add TWO colors of your own, and a gold dot() at each rocket's heart.",
    hints: [
      "The dot goes after the inner loop finishes — color(\"gold\") then dot(6).",
      "More rays per burst: inner range(18) with right(20).",
    ],
    check: (ctx) => {
      if (!/\n\s+for\s+\w+\s+in\b/.test(ctx.code))
        return { pass: false, msg: "The show needs the nest: bursts (inner loop) inside rockets (outer loop)." };
      if (!/random\./.test(ctx.code)) return { pass: false, msg: "Fireworks need chance — keep random in the sky." };
      if (ctx.lines.length < 60) return { pass: false, msg: "A shy show — light at least 60 rays." };
      return { pass: true, msg: "Eid Al Etihad! A whole celebration, commanded by nested loops. 🇦🇪" };
    },
  },
  {
    id: "w3l6",
    title: "Challenge: your own zellij",
    subtitle: "Make — the tile only you would make",
    beats: [
      { t: "Design YOUR tile — the one only you would make." },
      { t: "Choose N shapes: 6, 8, 10 or 12. Turn = 360 ÷ N." },
      { t: "Any inner shape: square, triangle, hexagon… or something stranger." },
      { t: "Mosques kept these patterns for centuries. Yours starts today." },
    ],
    starter: `# Your zellij. The recipe:\n#   outer loop  = how many shapes (N)\n#   inner loop  = one shape\n#   last right() = 360 / N\n\ncolor("darkslateblue")\nwidth(2)\n\n`,
    task: "Craft an original tile: nested loops, your N, your shape, your colors. At least 18 lines of geometry.",
    hints: [
      "Start from the rose window recipe and change ONE thing at a time.",
      "Two colors? Change color() between the outer laps: color inside the outer loop, before the inner.",
      "Stars as the inner shape: range(5) with right(144). Zellij of stars!",
    ],
    check: (ctx) => {
      if (!/\n\s+for\s+\w+\s+in\b/.test(ctx.code))
        return { pass: false, msg: "A zellij is born from the nest — a loop inside a loop." };
      if (ctx.lines.length < 18) return { pass: false, msg: "Grow it — a true tile carries at least 18 lines." };
      return { pass: true, msg: "🕌 A pattern that never existed until you commanded it. World 3 — complete. Fakhamah!" };
    },
  },
];

/* ================= World 4 — Your Own Magic Words ================= */

const WORLD4_LESSONS = [
  {
    id: "w4l1",
    title: "Teach Python a word",
    subtitle: "def — your first invention",
    beats: [
      { t: "Until now you used Python's words. Now you INVENT one." },
      { t: "Watch a new word being taught:",
        build: {
          steps: [
            { text: "def star():", say: "def — 'dear Python, learn a new word: star.'" },
            { text: "\n    for i in range(5):\n        forward(120)\n        right(144)", say: "The recipe, indented — this is what the word MEANS." },
            { text: "\n\nstar()", say: "Teaching is silent. Nothing was drawn yet. Now we SAY the word…" },
          ],
          effect: "the star appears — the word obeyed",
          done: "Teach once. Say it whenever you want, forever.",
        } },
      { t: "The great secret: <b>teaching is silent — saying makes it happen</b>.",
        fig: { k: "rows", rows: [
          { lab: "teaching", code: [{ c: "def star():", r: "k" }, { c: " + recipe", r: "i" }], res: "silence" },
          { lab: "saying", code: [{ c: "star()", r: "n" }], res: "⭐ it happens!" },
        ] } },
      { t: "Python only knows the words you teach it. Today, its dictionary grew." },
    ],
    predict: "The code teaches star() but says it TWICE — how many stars appear?",
    starter: `def star():\n    for i in range(5):\n        forward(120)\n        right(144)\n\ncolor("gold")\nstar()\npenup()\njump(-150, -60)\npendown()\ncolor("crimson")\nstar()\n`,
    task: "Run the twin stars. Then teach a SECOND word — burst() or box() — and say both words in one program.",
    hints: [
      "A second word is a second def block. Teach both at the top, say them below.",
      "The word's name is yours to invent — letters and underscores, no spaces.",
    ],
    check: (ctx) => {
      const m = ctx.code.match(/def\s+(\w+)\s*\(\s*\)\s*:/);
      if (!m) return { pass: false, msg: "Teach a word first: def yourword(): with the recipe indented under it." };
      const calls = (ctx.code.match(new RegExp("\\b" + m[1] + "\\s*\\(", "g")) || []).length - 1;
      if (calls < 2) return { pass: false, msg: `You taught "${m[1]}" — now SAY it at least twice. Teaching alone draws nothing.` };
      if (ctx.lines.length < 8) return { pass: false, msg: "Let your word work — at least 8 drawn lines." };
      return { pass: true, msg: "Python's dictionary just grew — because YOU taught it. That's what programmers do all day." };
    },
  },
  {
    id: "w4l2",
    title: "A word that listens",
    subtitle: "Parameters — the door in the word",
    beats: [
      { t: "Your word can have a <b>door</b> — a jar it receives through." },
      { t: "Watch the door being built:",
        build: {
          steps: [
            { text: "def square(size):", say: "size — a door. Each call hands a value through it." },
            { text: "\n    for i in range(4):\n        forward(size)\n        right(90)", say: "Inside, size is a jar — filled by whoever calls." },
            { text: "\n\nsquare(50)\nsquare(110)", say: "Two calls, two gifts: first size is 50… then 110." },
          ],
          effect: "two squares, one word",
          done: "One recipe, endless sizes. The door makes the word powerful.",
        } },
      { t: "Same word + different gift = different result.",
        fig: { k: "rows", rows: [
          { code: [{ c: "def square(", r: "k" }, { c: "size", r: "n" }, { c: "):", r: "k" }], res: "a door" },
          { code: [{ c: "square(", r: "n" }, { c: "50", r: "v" }, { c: ")", r: "n" }], res: "small square" },
          { code: [{ c: "square(", r: "n" }, { c: "110", r: "v" }, { c: ")", r: "n" }], res: "big square" },
        ] } },
    ],
    predict: "square(50), square(110), square(170) — what family of squares appears?",
    starter: `def square(size):\n    for i in range(4):\n        forward(size)\n        right(90)\n\ncolor("teal")\nwidth(3)\nsquare(50)\nsquare(110)\nsquare(170)\n`,
    task: "Run the family. Then add TWO more sizes — and a color() change between calls.",
    hints: [
      "Each new square is just one more line: square(80).",
      "color(\"crimson\") before a call paints that square only — until the next color.",
    ],
    check: (ctx) => {
      const m = ctx.code.match(/def\s+(\w+)\s*\(\s*\w+\s*\)\s*:/);
      if (!m) return { pass: false, msg: "Give your word a door: def square(size): — one name inside the brackets." };
      const args = [...ctx.code.matchAll(new RegExp("\\b" + m[1] + "\\s*\\(\\s*(\\d+)", "g"))].map(x => x[1]);
      if (new Set(args).size < 3) return { pass: false, msg: "Call it with at least 3 DIFFERENT sizes — that's the door's whole point." };
      if (ctx.lines.length < 12) return { pass: false, msg: "Let the family grow — at least 12 lines." };
      return { pass: true, msg: "One word, many gifts, many squares. You just invented a tool, not a drawing." };
    },
  },
  {
    id: "w4l3",
    title: "The universal shape",
    subtitle: "Two doors — sides AND size",
    beats: [
      { t: "Two doors:",
        fig: { k: "anat", p: [
          { c: "def poly(", r: "k" },
          { c: "sides", r: "n", l: "door 1" },
          { c: ", ", r: "i" },
          { c: "size", r: "n", l: "door 2" },
          { c: "):", r: "k" },
        ], eff: "right(360 / sides)", effl: "the turn computes ITSELF" } },
      { t: "The turn is computed: 360 ÷ sides. Python writes ÷ as <b>/</b>." },
      { t: "One word now draws EVERY regular shape that exists." },
    ],
    predict: "poly(3, 120), poly(4, 90), poly(6, 70), poly(8, 55) — which shapes will stack up?",
    starter: `def poly(sides, size):\n    for i in range(sides):\n        forward(size)\n        right(360 / sides)\n\nwidth(3)\ncolor("crimson")\npoly(3, 120)\ncolor("teal")\npoly(4, 90)\ncolor("goldenrod")\npoly(6, 70)\ncolor("mediumorchid")\npoly(8, 55)\n`,
    task: "Run the shape tower. Then call poly(12, 45) and poly(20, 30) — watch shapes become circles.",
    hints: [
      "More sides + smaller size = smoother. poly(36, 15) is almost a perfect circle.",
      "The order of gifts matters: poly(sides first, size second) — always.",
    ],
    check: (ctx) => {
      if (!/def\s+\w+\s*\(\s*\w+\s*,\s*\w+\s*\)\s*:/.test(ctx.code))
        return { pass: false, msg: "Two doors, comma between: def poly(sides, size):" };
      if (!/360\s*\/\s*\w+/.test(ctx.code))
        return { pass: false, msg: "Let the word compute its own turn: right(360 / sides)." };
      if (ctx.lines.length < 15) return { pass: false, msg: "Call it more — at least 4 shapes' worth of lines." };
      return { pass: true, msg: "Triangle, square, hexagon, circle — retired. One word rules them all." };
    },
  },
  {
    id: "w4l4",
    title: "A word that answers",
    subtitle: "return — the gift that comes back",
    beats: [
      { t: "Some words don't draw — they <b>answer</b>." },
      { t: "Watch a word learn to answer:",
        build: {
          steps: [
            { text: "def double(n):", say: "A word with a door, as before…" },
            { text: "\n    return n * 2", say: "return — send the answer BACK to whoever asked." },
            { text: "\n\nsize = double(75)", say: "The answer lands in a jar: size is now 150." },
            { text: "\nforward(size)", say: "…and the drawing uses it." },
          ],
          effect: "size = 150",
          done: "Ask a word a question. Catch its answer in a jar. Use it.",
        } },
      { t: "print shows a human. <code class=\"k\">return</code> hands to the PROGRAM.",
        fig: { k: "rows", rows: [
          { code: [{ c: "double(", r: "n" }, { c: "75", r: "v" }, { c: ")", r: "n" }], res: "150 comes BACK" },
          { code: [{ c: "size", r: "n" }, { c: " = ", r: "i" }, { c: "double(75)", r: "n" }], res: "the jar catches it" },
        ] } },
    ],
    predict: "Each square's size is double the last — 40, then ?, then ? — how big is the third?",
    starter: `def double(n):\n    return n * 2\n\ndef square(size):\n    for i in range(4):\n        forward(size)\n        right(90)\n\nwidth(3)\ns = 40\ncolor("teal")\nsquare(s)\ns = double(s)\ncolor("goldenrod")\nsquare(s)\ns = double(s)\ncolor("crimson")\nsquare(s)\n`,
    task: "Run the doubling squares. Then teach triple(n) — return n * 3 — and grow a second family with it.",
    hints: [
      "triple is double's twin: def triple(n): return n * 3.",
      "The jar trick: s = triple(s) REPLACES the jar with the answer. That's how growth compounds.",
    ],
    check: (ctx) => {
      if (!/\breturn\b/.test(ctx.code))
        return { pass: false, msg: "The lesson's magic is return — a word must hand an answer back." };
      if (!/\w+\s*=\s*\w+\s*\(/.test(ctx.code))
        return { pass: false, msg: "Catch the answer in a jar: size = double(75)." };
      if (ctx.lines.length < 12) return { pass: false, msg: "Use the answers to draw — at least 12 lines." };
      return { pass: true, msg: "Words that answer + jars that catch = calculation itself. This is the heart of all software." };
    },
  },
  {
    id: "w4l5",
    title: "Words made of words",
    subtitle: "Composition — the tower of meaning",
    beats: [
      { t: "The deepest magic: a new word may USE your words." },
      { t: "<code class=\"v\">ray</code>() is taught… then <code class=\"v\">sun</code>() is taught USING ray()." },
      { t: "Words build words build words. <b>All software is this tower.</b>",
        fig: { k: "rows", rows: [
          { code: [{ c: "ray()", r: "n" }], res: "one line" },
          { code: [{ c: "sun()", r: "n" }, { c: " says 12 × ", r: "i" }, { c: "ray()", r: "n" }], res: "a sun" },
          { code: [{ c: "sky()", r: "n" }, { c: " says 3 × ", r: "i" }, { c: "sun()", r: "n" }], res: "a whole sky" },
        ] } },
    ],
    predict: "sun() says ray() twelve times, turning 30 between — what rises?",
    starter: `def ray():\n    forward(75)\n    back(75)\n\ndef sun():\n    for i in range(12):\n        ray()\n        right(30)\n\ncolor("gold")\nwidth(4)\nsun()\npenup()\njump(150, 90)\npendown()\ncolor("darkorange")\nsun()\n`,
    task: "Two suns rise. Now teach sky() — a word that says sun() in THREE places. One word, whole sky.",
    hints: [
      "sky()'s recipe: penup, jump somewhere, pendown, sun() — three times over.",
      "Then the whole program below the defs becomes just: sky()",
    ],
    check: (ctx) => {
      const defs = [...ctx.code.matchAll(/def\s+(\w+)\s*\(/g)].map(x => x[1]);
      if (defs.length < 2) return { pass: false, msg: "Teach at least two words — one of them built FROM the other." };
      if (!defs.some(n => new RegExp("\\n\\s+" + n + "\\s*\\(").test(ctx.code)))
        return { pass: false, msg: "The tower is missing: one of your words must be CALLED inside another word's recipe." };
      if (ctx.lines.length < 20) return { pass: false, msg: "Let the tower shine — at least 20 lines of sky." };
      return { pass: true, msg: "ray builds sun builds sky. You just discovered how every program on Earth is made." };
    },
  },
  {
    id: "w4l6",
    title: "Challenge: the Eid card generator",
    subtitle: "Make — a machine that makes cards",
    beats: [
      { t: "The final make: a machine that generates Eid cards." },
      { t: "Teach your words: a frame word, a star word — whatever your card needs." },
      { t: "Ask the name with <code class=\"k\">input</code>. Draw with your words. Greet with <code class=\"k\">print</code>." },
      { t: "Every card it makes is different. Every card is yours." },
    ],
    starter: `# The Eid Card Generator\n# Your words, your card. A frame? Stars? A crescent?\n\nname = input("Who is this Eid card for?")\n\n`,
    task: "Build it: teach at least 2 of your own words, use them to draw the card, and print a greeting with the name.",
    hints: [
      "frame(): four forward/right lines around the edge. star(size): you've known it since World 1.",
      "Scatter stars: penup, jump(x, y), pendown, star(30) — inside a loop for many.",
      "The greeting glues: print(\"Eid Mubarak, \" + name + \"!\")",
    ],
    check: (ctx) => {
      const defs = [...ctx.code.matchAll(/def\s+(\w+)\s*\(/g)].map(x => x[1]);
      if (defs.length < 2) return { pass: false, msg: "A generator needs its own vocabulary — teach at least 2 words with def." };
      if (!/input\s*\(/.test(ctx.code)) return { pass: false, msg: "Whose card is it? Ask with input(...)." };
      if (!/print\s*\(/.test(ctx.code)) return { pass: false, msg: "Greet them! print the name into an Eid wish." };
      if (ctx.lines.length < 10) return { pass: false, msg: "Decorate — a card deserves at least 10 drawn lines." };
      return { pass: true, msg: "🌙 A machine that makes gifts. World 4 complete — Python speaks YOUR words now. Eid Mubarak!" };
    },
  },
];

/* ================= World 5 — Collections ================= */

const WORLD5_LESSONS = [
  {
    id: "w5l1",
    title: "The treasure box",
    subtitle: "Lists — many things, one name",
    beats: [
      { t: "One jar, one thing. A <b>list</b> holds many — the dice's bag, finally named." },
      { t: "Watch a treasure box being packed:",
        build: {
          steps: [
            { text: "colors = [", say: "Square brackets — the box opens." },
            { text: "\"gold\", \"teal\", \"crimson\"", say: "Three treasures, commas between them." },
            { text: "]", say: "The box closes. One name — colors — holds all three." },
            { text: "\n\ncolor(colors[0])", say: "colors[0] — slot ZERO. Boxes count from zero, always." },
          ],
          effect: "colors[0] → gold",
          done: "Slot 0 is the first. Slot 1 the second. The zero is our gift to mathematics.",
        } },
      { t: "The trap everyone falls in once: <b>the first slot is 0, not 1</b>.",
        fig: { k: "slots", name: "colors", items: ["\"gold\"", "\"teal\"", "\"crimson\""],
               note: "boxes count from zero — always" } },
    ],
    predict: "Three dots, painted from slots 0, 1, 2 — which colors, in which order?",
    starter: `colors = ["gold", "teal", "crimson"]\n\npenup()\njump(-90, 0)\ncolor(colors[0])\ndot(30)\njump(0, 0)\ncolor(colors[1])\ndot(30)\njump(90, 0)\ncolor(colors[2])\ndot(30)\n`,
    task: "Run the three treasures. Then add TWO more colors to the box — and two more dots to show them.",
    hints: [
      "New treasures go inside the brackets: \"orchid\", with a comma.",
      "The fourth treasure lives in slot… 3. (Not 4! The zero shifts everything.)",
    ],
    check: (ctx) => {
      if (!/\[[^\]\n]*,[^\]\n]*\]/.test(ctx.code))
        return { pass: false, msg: "Pack a box first: name = [\"thing\", \"thing\", ...] — brackets and commas." };
      if (!/\w+\[\d+\]/.test(ctx.code))
        return { pass: false, msg: "Open a slot by number: colors[0], colors[1]…" };
      const dots = ctx.cmds.filter(c => c.t === "dot").length;
      if (dots < 5 && ctx.lines.length < 5) return { pass: false, msg: "Show at least five treasures on the canvas." };
      return { pass: true, msg: "Many things, one name, numbered slots — you just met the most useful invention in programming." };
    },
  },
  {
    id: "w5l2",
    title: "Visit every treasure",
    subtitle: "The loop that walks the box",
    beats: [
      { t: "Opening slots one by one is slow. There's a loop that <b>visits</b>." },
      { t: "Watch the visiting loop:",
        build: {
          steps: [
            { text: "for c in colors:", say: "No range! The loop walks the box itself." },
            { text: "\n    color(c)", say: "Each lap, c holds the NEXT treasure." },
            { text: "\n    forward(80)\n    back(80)\n    right(45)", say: "…and the drawing uses whatever c holds." },
          ],
          effect: "one ray per treasure, each in its color",
          done: "However many treasures the box holds — the loop visits them all.",
        } },
      { t: "Add a treasure to the box → the loop draws one more. Automatically.",
        fig: { k: "cycle", title: "for c in colors", steps: ["c = next treasure", "draw with c", "more in the box?"],
               note: "one more treasure → one more lap, no code changes" } },
    ],
    predict: "Five colors in the box, rays turning 72 — what wheel appears?",
    starter: `colors = ["gold", "crimson", "teal", "mediumorchid", "darkorange"]\n\nwidth(5)\nfor c in colors:\n    color(c)\n    forward(90)\n    back(90)\n    right(72)\n`,
    task: "Run the color wheel. Then grow the box to 8 colors — and fix the turn so the wheel still closes (360 ÷ 8).",
    hints: [
      "Eight colors need right(45) — the box and the turn must agree.",
      "The loop never changes. Only the box does. That's the beauty.",
    ],
    check: (ctx) => {
      if (!/for\s+\w+\s+in\s+(?!range\b)\w+/.test(ctx.code))
        return { pass: false, msg: "Use the visiting loop: for c in colors: — no range, the box itself." };
      if (ctx.lines.length < 10) return { pass: false, msg: "Let it visit — at least 5 treasures' worth of rays." };
      return { pass: true, msg: "The loop reads the box like a guest list. One more guest? One more ray. No code changes." };
    },
  },
  {
    id: "w5l3",
    title: "The majlis guest list",
    subtitle: "append, len, and in",
    beats: [
      { t: "Boxes can start empty — and <b>grow</b>." },
      { t: "Watch the majlis fill up:",
        build: {
          steps: [
            { text: "guests = []", say: "An empty majlis — brackets with nothing inside." },
            { text: "\nguests.append(\"Maryam\")", say: "append — one more guest walks in." },
            { text: "\nguests.append(\"Khalid\")", say: "And another. The box grows as they arrive." },
            { text: "\nprint(len(guests))", say: "len asks: how many are in the box? Two." },
          ],
          effect: "len(guests) → 2",
          done: "append grows the box. len counts it. in checks who's inside.",
        } },
      { t: "Three powers for one majlis:",
        fig: { k: "rows", rows: [
          { code: [{ c: "guests.append(", r: "k" }, { c: "\"Sara\"", r: "v" }, { c: ")", r: "k" }], res: "the box grows" },
          { code: [{ c: "len(", r: "k" }, { c: "guests", r: "n" }, { c: ")", r: "k" }], res: "3" },
          { code: [{ c: "\"Sara\"", r: "v" }, { c: " in ", r: "k" }, { c: "guests", r: "n" }], res: "True" },
        ] } },
    ],
    starter: `guests = []\n\nfor i in range(3):\n    name = input("Who is arriving at the majlis?")\n    if name in guests:\n        print(name + " is already inside!")\n    else:\n        guests.append(name)\n\nprint("Tonight we are " + str(len(guests)) + ":")\nfor g in guests:\n    print("Ahlan, " + g + "!")\n`,
    task: "Host the majlis: welcome 3 guests, catch any double arrival, count them, greet each by name.",
    hints: [
      "Try entering the same name twice — watch the in check catch it.",
      "A bigger majlis: range(5). The rest of the code doesn't change. Why not?",
    ],
    check: (ctx) => {
      if (!/\.append\(/.test(ctx.code)) return { pass: false, msg: "Guests must arrive: guests.append(name)." };
      if (!/(?<![\w])len\(/.test(ctx.code)) return { pass: false, msg: "Count the majlis with len(guests)." };
      if (!/\bin\s+guests|\bin\s+\w+:/.test(ctx.code) && !/if\s+\w+\s+in\s+\w+/.test(ctx.code))
        return { pass: false, msg: "Check arrivals with in: if name in guests:" };
      if (!ctx.stdout.trim()) return { pass: false, msg: "A silent majlis? Greet your guests with print." };
      return { pass: true, msg: "Grow, count, check, greet — you just built what every app on Earth does with its users." };
    },
  },
  {
    id: "w5l4",
    title: "Words are boxes too",
    subtitle: "Strings have slots and length",
    beats: [
      { t: "A secret: every WORD is already a box — of letters." },
      { t: "<code class=\"v\">word</code>[<code class=\"a\">0</code>] is its first letter. <code class=\"k\">len</code>(<code class=\"v\">word</code>) counts them.",
        fig: { k: "slots", name: "word", items: ["\"s\"", "\"a\"", "\"l\"", "\"a\"", "\"m\""],
               note: "a word is a box of letters — len(word) is 5" } },
      { t: "And the visiting loop walks words: <code class=\"k\">for</code> <code class=\"v\">letter</code> <code class=\"k\">in</code> <code class=\"v\">word</code>:" },
    ],
    predict: "A name walks through the loop, one dot per letter — how long is the trail for YOUR name?",
    starter: `name = input("Your name, letter-collector?")\n\nprint("First letter: " + name[0])\nprint("Length: " + str(len(name)) + " letters")\n\ncolor("mediumorchid")\nfor letter in name:\n    print(letter)\n    penup()\n    forward(34)\n    dot(10)\n`,
    task: "Run it with your name. Then print the LAST letter too — its slot is len(name) - 1. (Why minus one? The zero!)",
    hints: [
      "Last letter: name[len(name) - 1]. A box of 6 letters ends at slot 5.",
      "Try your family name after — longer trail, more dots.",
    ],
    check: (ctx) => {
      if (!/for\s+\w+\s+in\s+(?!range\b)\w+/.test(ctx.code))
        return { pass: false, msg: "Walk the word: for letter in name:" };
      if (!/(?<![\w])len\(/.test(ctx.code)) return { pass: false, msg: "Measure it: len(name)." };
      if (!/\w+\[/.test(ctx.code)) return { pass: false, msg: "Open a letter-slot: name[0]." };
      return { pass: true, msg: "Words were boxes all along. Now the cipher machine becomes possible…" };
    },
  },
  {
    id: "w5l5",
    title: "The cipher machine",
    subtitle: "صفر — the zero that named the codes",
    beats: [
      { t: "The word <b>cipher</b> comes from <b>صفر — sifr, zero</b>. Arab mathematicians named the secret codes." },
      { t: "The oldest trick: slide every letter 3 steps down the alphabet.",
        fig: { k: "rows", rows: [
          { lab: "find", code: [{ c: "alphabet.find(", r: "k" }, { c: "\"a\"", r: "v" }, { c: ")", r: "k" }], res: "0" },
          { lab: "slide", code: [{ c: "0 + 3", r: "i" }], res: "3" },
          { lab: "collect", code: [{ c: "alphabet[", r: "n" }, { c: "3", r: "v" }, { c: "]", r: "n" }], res: "\"d\"" },
        ], note: "a → d · b → e · z wraps back to c" } },
      { t: "Watch the machine's heart:",
        build: {
          steps: [
            { text: "spot = alphabet.find(letter)", say: "find asks: WHERE does this letter live? (-1 means: nowhere.)" },
            { text: "\nspot = spot + 3", say: "Slide three steps down the alphabet…" },
            { text: "\nif spot >= 26:\n    spot = spot - 26", say: "Past z? Wrap to the start — the alphabet is a circle." },
            { text: "\ncoded = coded + alphabet[spot]", say: "…and collect the disguised letter." },
          ],
          effect: "a → d,  z → c",
          done: "Every letter slides. The message hides in plain sight.",
        } },
      { t: "Caesar used it for armies. You'll use it for secrets at school." },
    ],
    starter: `alphabet = "abcdefghijklmnopqrstuvwxyz"\n\nsecret = input("Whisper your message (small letters)...")\ncoded = ""\n\nfor letter in secret:\n    spot = alphabet.find(letter)\n    if spot == -1:\n        coded = coded + letter\n    else:\n        spot = spot + 3\n        if spot >= 26:\n            spot = spot - 26\n        coded = coded + alphabet[spot]\n\nprint("Your secret:  " + secret)\nprint("The cipher:   " + coded)\n`,
    task: "Encode a message! Then build the DECODER: slide back by 3 — and below zero, wrap the other way (+26).",
    hints: [
      "The decoder is the same machine with spot - 3, and: if spot < 0: spot = spot + 26.",
      "Test honestly: encode a word, feed the result to your decoder — did your word come home?",
      "Change the slide from 3 to your lucky number — a cipher only your friends know.",
    ],
    check: (ctx) => {
      if (!/\.find\(/.test(ctx.code)) return { pass: false, msg: "The machine's heart is find: alphabet.find(letter)." };
      if (!/for\s+\w+\s+in\s+(?!range\b)\w+/.test(ctx.code))
        return { pass: false, msg: "Walk the secret letter by letter: for letter in secret:" };
      if (!/\w+\[\w+\]/.test(ctx.code)) return { pass: false, msg: "Collect from the alphabet by slot: alphabet[spot]." };
      if (!ctx.stdout.trim()) return { pass: false, msg: "Show the cipher — print the coded message." };
      return { pass: true, msg: "صفر gave codes their name — and today, you built one. The mathematicians would be proud." };
    },
  },
  {
    id: "w5l6",
    title: "Challenge: the quiz machine",
    subtitle: "Make — everything in one box",
    beats: [
      { t: "The final make: a quiz machine — questions in one box, answers in another." },
      { t: "Slot i of questions matches slot i of answers. Twins by number.",
        fig: { k: "rows", rows: [
          { code: [{ c: "questions[", r: "n" }, { c: "0", r: "v" }, { c: "]", r: "n" }], res: "answers[0]" },
          { code: [{ c: "questions[", r: "n" }, { c: "1", r: "v" }, { c: "]", r: "n" }], res: "answers[1]" },
        ], note: "same number, same pair — twins" } },
      { t: "Ask, compare, count the score. Then judge — kindly." },
    ],
    starter: `questions = ["What is the capital of the UAE?"]\nanswers = ["abu dhabi"]\n\nscore = 0\n\nfor i in range(len(questions)):\n    reply = input(questions[i])\n    if reply == answers[i]:\n        print("Correct!")\n        score = score + 1\n    else:\n        print("It was: " + answers[i])\n\nprint("Score: " + str(score) + " of " + str(len(questions)))\n`,
    task: "Grow it to at least 3 questions (your subjects, your trivia!) and add a kind final verdict with if/else.",
    hints: [
      "New pairs: one line in questions, its twin in answers — SAME positions.",
      "The verdict: if score == len(questions): perfect praise. else: warm encouragement.",
      "range(len(questions)) means: however many you add, the loop follows. Zero edits.",
    ],
    check: (ctx) => {
      const lists = (ctx.code.match(/\[[^\]\n]*,[^\]\n]*\]/g) || []).length;
      if (lists < 2) return { pass: false, msg: "Two boxes, at least 3 slots each: questions and their answer-twins." };
      if (!/range\(\s*len\(/.test(ctx.code))
        return { pass: false, msg: "Let the loop follow the box: for i in range(len(questions)):" };
      if (!/score/.test(ctx.code)) return { pass: false, msg: "Count the victories — a score jar that grows." };
      if (!ctx.stdout.trim()) return { pass: false, msg: "The machine must speak — questions, verdicts, score." };
      return { pass: true, msg: "📚 A real quiz app — lists, loops, logic, all yours. World 5 complete. Mumtaz, ya ustadh!" };
    },
  },
];

/* ================= World 6 — Living Programs ================= */

const WORLD6_LESSONS = [
  {
    id: "w6l1",
    title: "The heartbeat",
    subtitle: "tick — a program that never finishes",
    beats: [
      { t: "Every program so far ran, finished, showed its work. Games never finish — they <b>live</b>." },
      { t: "Watch a heartbeat being born:",
        build: {
          steps: [
            { text: "game.x = -200", say: "game. — the game's own jars, remembered between blinks." },
            { text: "\n\ndef tick():", say: "tick — Python calls this word THIRTY times a second." },
            { text: "\n    game.x = game.x + 3", say: "Each blink, slide a little. Tiny moves, fast — that IS motion." },
            { text: "\n    penup()\n    jump(game.x, -130)\n    dot(16)", say: "…and draw the world as it is THIS blink." },
          ],
          effect: "a falcon gliding across the sky",
          done: "Run doesn't finish anymore. Run begins a LIFE. Esc ends it.",
        } },
      { t: "The frame is wiped every blink — whatever tick draws IS the world.",
        fig: { k: "cycle", title: "30× a second", steps: ["wipe the frame", "run tick()", "draw the world"],
               note: "tiny moves, thirty a second — that IS motion" } },
    ],
    predict: "x grows 3 per blink and wraps at the edge — describe the motion before you see it.",
    starter: `game.x = -200\n\ndef tick():\n    game.x = game.x + 3\n    if game.x > 220:\n        game.x = -220\n    color("peru")\n    penup()\n    jump(game.x, -130)\n    dot(16)\n    color("saddlebrown")\n    jump(game.x + 11, -123)\n    dot(5)\n`,
    task: "Run — your falcon glides, forever. Then: make it faster, and make it glide the OTHER way (watch the wrap!).",
    hints: [
      "Speed lives in the + 3. Direction lives in its sign.",
      "Going left means wrapping on the LEFT edge: if game.x < -220: game.x = 220.",
    ],
    check: (ctx) => {
      if (!/def\s+tick\s*\(/.test(ctx.code)) return { pass: false, msg: "A living program needs its heartbeat: def tick():" };
      if (!/game\.\w+/.test(ctx.code)) return { pass: false, msg: "The world's memory lives in game jars: game.x = …" };
      const d0 = (ctx.frames[5] || []).find(c => c.t === "dot");
      const d1 = (ctx.frames[40] || []).find(c => c.t === "dot");
      if (!d0 || !d1 || (Math.abs(d0.x - d1.x) < 2 && Math.abs(d0.y - d1.y) < 2))
        return { pass: false, msg: "Nothing moved between blinks — change a game jar inside tick." };
      return { pass: true, msg: "It LIVES. Thirty blinks a second, and your code is the pulse." };
    },
  },
  {
    id: "w6l2",
    title: "Listening to keys",
    subtitle: "The player enters the world",
    beats: [
      { t: "A living game listens: <code class=\"k\">key_pressed</code>(<code class=\"a\">\"left\"</code>) asks — held right now?" },
      { t: "Ask every blink. Move only while the answer is yes.",
        fig: { k: "rows", rows: [
          { lab: "held down", code: [{ c: "key_pressed(\"left\")", r: "k" }], res: "True → move" },
          { lab: "not held", code: [{ c: "key_pressed(\"left\")", r: "k" }], res: "False → wait" },
        ] } },
      { t: "Now the falcon obeys not the code — but the CHILD at the keys." },
    ],
    predict: "No key held → what does the falcon do? (Hint: what SHOULD a waiting falcon do?)",
    starter: `game.x = 0\n\ndef tick():\n    if key_pressed("left"):\n        game.x = game.x - 6\n    if key_pressed("right"):\n        game.x = game.x + 6\n    color("peru")\n    penup()\n    jump(game.x, -130)\n    dot(16)\n    color("saddlebrown")\n    jump(game.x + 11, -123)\n    dot(5)\n`,
    task: "Run, then FLY it with the arrow keys. Then give it a vertical life too: up and down arrows.",
    hints: [
      "Up/down are two more ifs: key_pressed(\"up\") changes a game.y jar — and jump uses it.",
      "Faster falcon? The 6 is its wingspeed.",
    ],
    check: (ctx) => {
      if (!/key_pressed\(\s*"left"\s*\)/.test(ctx.code) || !/key_pressed\(\s*"right"\s*\)/.test(ctx.code))
        return { pass: false, msg: "Listen to both wings: key_pressed(\"left\") and key_pressed(\"right\")." };
      const d0 = (ctx.frames[5] || []).find(c => c.t === "dot");
      const d1 = (ctx.frames[60] || []).find(c => c.t === "dot");
      if (!d0 || !d1) return { pass: false, msg: "Where is the falcon? Draw it each tick." };
      if (Math.abs(d0.x - d1.x) > 2 || Math.abs(d0.y - d1.y) > 2)
        return { pass: false, msg: "With no key held, a good falcon WAITS — it should move only while a key is pressed." };
      return { pass: true, msg: "The player is inside the world now. That's the line between a film and a game." };
    },
  },
  {
    id: "w6l3",
    title: "The falling prey",
    subtitle: "A second life in the sky",
    beats: [
      { t: "Enter the houbara — the falcon's legendary quarry — falling from the sky." },
      { t: "It needs its OWN jars: game.prey_x, game.prey_y." },
      { t: "Past the ground? Respawn at the top. The sky never empties.",
        fig: { k: "rows", rows: [
          { lab: "every blink", code: [{ c: "game.prey_y - 6", r: "n" }], res: "it falls" },
          { lab: "below ground", code: [{ c: "back to the top", r: "i" }], res: "random new x" },
        ] } },
    ],
    predict: "The prey falls 6 per blink from 240 — roughly how many blinks to cross the sky?",
    starter: `import random\n\ngame.x = 0\ngame.prey_x = 60\ngame.prey_y = 240\n\ndef tick():\n    if key_pressed("left"):\n        game.x = game.x - 6\n    if key_pressed("right"):\n        game.x = game.x + 6\n    game.prey_y = game.prey_y - 6\n    if game.prey_y < -240:\n        game.prey_y = 240\n        game.prey_x = random.randint(-200, 200)\n    color("slategray")\n    penup()\n    jump(game.prey_x, game.prey_y)\n    dot(10)\n    color("peru")\n    jump(game.x, -130)\n    dot(16)\n`,
    task: "Run — chase the falling houbara (you can't catch it YET). Then make the sky busier: a faster fall, or a second prey with its own jars.",
    hints: [
      "A second prey = game.prey2_x / game.prey2_y, its own fall, its own respawn, its own dot.",
      "random.randint on respawn is what makes every fall a new story.",
    ],
    check: (ctx) => {
      if (!/random\./.test(ctx.code)) return { pass: false, msg: "Respawn somewhere NEW each time — random.randint for the x." };
      const ys = ctx.frames.map(f => { const d = f.find(c => c.t === "dot"); return d ? d.y : null; }).filter(y => y !== null);
      let falls = false, respawns = false;
      for (let i = 1; i < ys.length; i++) {
        if (ys[i] < ys[i - 1] - 2) falls = true;
        if (ys[i] > ys[i - 1] + 100) respawns = true;
      }
      if (!falls) return { pass: false, msg: "The prey should FALL — shrink its y jar every tick." };
      if (!respawns) return { pass: false, msg: "Past the ground it must respawn at the top — the if that refills the sky." };
      return { pass: true, msg: "Two lives in one sky, each with its own jars. Worlds are built exactly like this." };
    },
  },
  {
    id: "w6l4",
    title: "The catch",
    subtitle: "distance, score, and the writing on the sky",
    beats: [
      { t: "The hunt needs a judge:",
        fig: { k: "anat", p: [
          { c: "distance(", r: "k" },
          { c: "falcon x, y", r: "n", l: "me" },
          { c: ", ", r: "i" },
          { c: "prey x, y", r: "n", l: "it" },
          { c: ")", r: "i" },
        ], eff: "steps apart", effl: "closer than 30 = CATCH" } },
      { t: "Watch the judging line:",
        build: {
          steps: [
            { text: "if distance(game.x, -130, game.prey_x, game.prey_y) < 30:", say: "Closer than 30? That's a CATCH." },
            { text: "\n    game.score = game.score + 1", say: "The score jar grows —" },
            { text: "\n    game.prey_y = 240", say: "— and a new houbara takes the sky." },
            { text: "\n\nwrite(-230, 200, \"Score: \" + str(game.score))", say: "write paints words ONTO the world, every blink." },
          ],
          effect: "Score: 1",
          done: "Distance judges. Score remembers. write announces. The game is whole.",
        } },
      { t: "No buzzers for misses — in OUR games, only the catches count." },
    ],
    starter: `import random\n\ngame.x = 0\ngame.prey_x = 60\ngame.prey_y = 240\ngame.score = 0\n\ndef tick():\n    if key_pressed("left"):\n        game.x = game.x - 6\n    if key_pressed("right"):\n        game.x = game.x + 6\n    game.prey_y = game.prey_y - 6\n    if game.prey_y < -240:\n        game.prey_y = 240\n        game.prey_x = random.randint(-200, 200)\n    if distance(game.x, -130, game.prey_x, game.prey_y) < 30:\n        game.score = game.score + 1\n        game.prey_y = 240\n        game.prey_x = random.randint(-200, 200)\n    color("slategray")\n    penup()\n    jump(game.prey_x, game.prey_y)\n    dot(10)\n    color("peru")\n    jump(game.x, -130)\n    dot(16)\n    color("darkslateblue")\n    write(-230, 200, "Score: " + str(game.score))\n`,
    task: "HUNT! Catch three houbara. Then tune the talons: is < 30 too generous? Too cruel? You decide the game's justice.",
    hints: [
      "A bigger catch-circle (< 45) is kinder for younger players. Game design is empathy.",
      "Show more on the sky: write the falcon's x, or a hunter's title after 5 catches.",
    ],
    check: (ctx) => {
      if (!/(?<![\w])distance\(/.test(ctx.code)) return { pass: false, msg: "Appoint the judge: distance(...) < something means a catch." };
      if (!/game\.score/.test(ctx.code)) return { pass: false, msg: "The hunt needs memory: a game.score jar that grows." };
      if (!/(?<![\w])write\(/.test(ctx.code)) return { pass: false, msg: "Announce it on the sky: write(-230, 200, \"Score: \" + str(game.score))." };
      const hasText = (ctx.frames[10] || []).some(c => c.t === "text");
      if (!hasText) return { pass: false, msg: "The score should be visible on the world itself — write it every tick." };
      return { pass: true, msg: "Judge, memory, announcement — the game is WHOLE. Now go hunt." };
    },
  },
  {
    id: "w6l5",
    title: "Game feel",
    subtitle: "Edges, difficulty, mercy",
    beats: [
      { t: "A finished game respects three laws:",
        fig: { k: "rows", rows: [
          { lab: "EDGES", code: [], res: "the falcon can't leave the world" },
          { lab: "CHALLENGE", code: [], res: "every catch — a little faster" },
          { lab: "MERCY", code: [], res: "a miss costs nothing" },
        ] } },
      { t: "EDGES: the falcon may not leave the world — clamp it at both walls." },
      { t: "CHALLENGE: every catch, the sky falls a little faster. Mastery earns storm." },
      { t: "MERCY: a miss costs nothing. The hunt simply continues." },
    ],
    predict: "Speed starts at 5 and grows by 1 per catch — what does catch number 8 feel like?",
    starter: `import random\n\ngame.x = 0\ngame.prey_x = 60\ngame.prey_y = 240\ngame.score = 0\ngame.speed = 5\n\ndef tick():\n    if key_pressed("left"):\n        game.x = game.x - 7\n    if key_pressed("right"):\n        game.x = game.x + 7\n    if game.x < -220:\n        game.x = -220\n    if game.x > 220:\n        game.x = 220\n    game.prey_y = game.prey_y - game.speed\n    if game.prey_y < -240:\n        game.prey_y = 240\n        game.prey_x = random.randint(-200, 200)\n    if distance(game.x, -130, game.prey_x, game.prey_y) < 34:\n        game.score = game.score + 1\n        game.speed = game.speed + 1\n        if game.speed > 14:\n            game.speed = 14\n        game.prey_y = 240\n        game.prey_x = random.randint(-200, 200)\n    color("slategray")\n    penup()\n    jump(game.prey_x, game.prey_y)\n    dot(10)\n    color("peru")\n    jump(game.x, -130)\n    dot(16)\n    color("saddlebrown")\n    jump(game.x + 11, -123)\n    dot(5)\n    color("darkslateblue")\n    write(-230, 200, "Score: " + str(game.score))\n    write(-230, 175, "Speed: " + str(game.speed))\n`,
    task: "Play to score 5 — feel the storm build. Then tune YOUR game: wingspeed, catch-circle, the speed cap. Sign it in the Gallery.",
    hints: [
      "The speed cap (14) is mercy for the hands. Raise it only if your hands agree.",
      "Champions' mode: start speed 8, catch-circle 26. Sign it with write(0, 200, \"by YOURNAME\").",
    ],
    check: (ctx) => {
      if (!/game\.x\s*[<>]/.test(ctx.code)) return { pass: false, msg: "Law of EDGES: clamp the falcon at both walls with two ifs." };
      if (!/game\.speed/.test(ctx.code)) return { pass: false, msg: "Law of CHALLENGE: a game.speed jar that grows with the score." };
      if (!/(?<![\w])write\(/.test(ctx.code) || !/(?<![\w])distance\(/.test(ctx.code))
        return { pass: false, msg: "Keep the judge and the sky-writing — a whole game stays whole." };
      return { pass: true, msg: "Edges, challenge, mercy — you didn't just build a game. You designed one. 🦅" };
    },
  },
  {
    id: "w6l6",
    title: "Challenge: your own living world",
    subtitle: "Make — dhow dodge, or something no one imagined",
    beats: [
      { t: "The final make: a living world that is entirely yours." },
      { t: "An idea if you want one: the dhow dodge — steer a dhow, dodge what falls." },
      { t: "The laws: a heartbeat, keys, a judge, a score on the sky." },
      { t: "Or ignore the idea entirely. Living worlds obey their makers." },
    ],
    starter: `# Your living world.\n# Needs: game jars · def tick() · key_pressed · distance · write\n\nimport random\n\n`,
    task: "Build a living game of your own: tick, keys, a distance judge, a written score — and at least one rule nobody taught you.",
    hints: [
      "Dodge games flip the catch: if distance(...) < 30 means you were HIT — maybe lose speed, never shame.",
      "Two falling things? Two sets of jars. You've done this since the houbara.",
      "The falcon-catch code is yours to remix — open it from Lesson 5 anytime.",
    ],
    check: (ctx) => {
      if (!/def\s+tick\s*\(/.test(ctx.code)) return { pass: false, msg: "A living world needs its heartbeat: def tick():" };
      if (!/key_pressed\(/.test(ctx.code)) return { pass: false, msg: "Let the player in: key_pressed(...)." };
      if (!/(?<![\w])distance\(/.test(ctx.code)) return { pass: false, msg: "Every game needs its judge: distance(...)." };
      if (!/(?<![\w])write\(/.test(ctx.code)) return { pass: false, msg: "Write something onto the world — a score, a title, a taunt." };
      if (!(ctx.frames[10] || []).length) return { pass: false, msg: "The world looks empty — draw its life inside tick." };
      return { pass: true, msg: "🌊 A world that lives because you commanded it to. World 6 complete — game maker, officially." };
    },
  },
];

/* ================= World 7 — Real Data ================= */

const WORLD7_LESSONS = [
  {
    id: "w7l1",
    title: "Data becomes bars",
    subtitle: "A chart is just drawing, driven by numbers",
    beats: [
      { t: "A secret before the fancy tools: <b>a chart is just drawing driven by data</b>." },
      { t: "A bar is a line whose LENGTH is a number from your box.",
        fig: { k: "rows", rows: [
          { code: [{ c: "3", r: "v" }], res: "▮▮▮" },
          { code: [{ c: "5", r: "v" }], res: "▮▮▮▮▮" },
        ], note: "bigger number, longer bar — that is the whole secret of charts" } },
      { t: "Build one by hand once — and no chart will ever be magic again." },
    ],
    predict: "Goals per week: 3, 1, 4, 2, 5 — which bar will tower, which will shrink?",
    starter: `goals = [3, 1, 4, 2, 5]\n\nx = -140\npenup()\nfor g in goals:\n    jump(x, -100)\n    color("seagreen")\n    width(18)\n    pendown()\n    forward(g * 35)\n    penup()\n    color("dimgray")\n    write(x - 8, -128, str(g))\n    x = x + 70\n`,
    task: "Chart your own week: replace the goals with YOUR numbers (goals, books, laps — your data). Add a title with write.",
    hints: [
      "A title is one write at the top: write(-120, 200, \"My week in goals\").",
      "Taller chart: change the * 35 scale. Data unchanged, view changed — that's a scientist's choice.",
    ],
    check: (ctx) => {
      if (!/\[[^\]\n]*,[^\]\n]*\]/.test(ctx.code)) return { pass: false, msg: "The data lives in a box: a list of numbers." };
      if (!/for\s+\w+\s+in\s+/.test(ctx.code)) return { pass: false, msg: "One loop, one bar per number — visit the box." };
      if (ctx.lines.length < 4) return { pass: false, msg: "Draw the bars — at least 4 of them." };
      if (!(ctx.cmds || []).some(c => c.t === "text")) return { pass: false, msg: "Label it — numbers under bars, or a title. Unlabeled charts are rumors." };
      return { pass: true, msg: "You built a chart from raw numbers, by hand. Now you've EARNED the professional tools." };
    },
  },
  {
    id: "w7l2",
    title: "The dictionary",
    subtitle: "Data with NAMES — the promised box",
    beats: [
      { t: "Lists number their slots. A <b>dictionary</b> NAMES them." },
      { t: "Watch real data being packed:",
        build: {
          steps: [
            { text: "temps = {", say: "Curly braces — the naming box opens." },
            { text: "\"Jan\": 24, \"Apr\": 34,", say: "Each entry: a NAME, a colon, its value." },
            { text: " \"Jul\": 41, \"Oct\": 35}", say: "Dubai's real average highs — data with meaning." },
            { text: "\n\nprint(temps[\"Jul\"])", say: "Ask by NAME, not by number: July, please." },
          ],
          effect: "temps[\"Jul\"] → 41",
          done: "And the visiting loop walks the names: for month in temps:",
        } },
      { t: "Ask by NAME, not by slot:",
        fig: { k: "rows", rows: [
          { code: [{ c: "temps[", r: "n" }, { c: "\"Jan\"", r: "v" }, { c: "]", r: "n" }], res: "24" },
          { code: [{ c: "temps[", r: "n" }, { c: "\"Jul\"", r: "v" }, { c: "]", r: "n" }], res: "41" },
        ], note: "numbers approximate — real data is honest about that" } },
    ],
    predict: "Four months, four bars from the dictionary — which month towers?",
    starter: `temps = {"Jan": 24, "Apr": 34, "Jul": 41, "Oct": 35}\n\nx = -150\npenup()\nfor month in temps:\n    t = temps[month]\n    jump(x, -100)\n    color("darkorange")\n    width(16)\n    pendown()\n    forward(t * 4)\n    penup()\n    color("dimgray")\n    write(x - 14, -128, month)\n    write(x - 10, t * 4 - 92, str(t))\n    x = x + 90\n`,
    task: "Run Dubai's year in four bars. Then pack YOUR dictionary — favorite foods and their scores, and chart them.",
    hints: [
      "Your turn: votes = {\"machboos\": 9, \"luqaimat\": 10, …} — same loop, your names.",
      "Inside the loop: the name is month, the value is temps[month]. Name asks, value answers.",
    ],
    check: (ctx) => {
      if (!/\{[^{}\n]*:/.test(ctx.code)) return { pass: false, msg: "Pack a dictionary: {\"name\": value, …} — braces and colons." };
      if (!/\w+\[\s*\w+\s*\]|\w+\[\s*"/.test(ctx.code)) return { pass: false, msg: "Ask it by name: temps[month]." };
      if (ctx.lines.length < 4) return { pass: false, msg: "Chart it — a bar per entry." };
      return { pass: true, msg: "Named data — the shape of every real dataset on Earth. The promise from World 5, kept." };
    },
  },
  {
    id: "w7l3",
    title: "The professional's pen",
    subtitle: "matplotlib — the tool scientists actually use",
    beats: [
      { t: "You built charts by hand. Now meet the pen the world's scientists use." },
      { t: "One honest note: it downloads ONCE, and it's big. Patience, then power." },
      { t: "Watch the four sacred lines:",
        build: {
          steps: [
            { text: "import matplotlib.pyplot as plt", say: "Fetch the toolbox — 'as plt' gives it a short nickname." },
            { text: "\n\nplt.plot(months, temps)", say: "plot — a line through your data points." },
            { text: "\nplt.title(\"Dubai, month by month\")", say: "Name your chart. Always." },
            { text: "\nplt.show()", say: "…and show it to the world." },
          ],
          effect: "a real scientific chart",
          done: "The same pen used in research papers — now in your hand.",
        } },
    ],
    predict: "Twelve months of Dubai heat as a LINE — where will it peak?",
    starter: `import matplotlib.pyplot as plt\n\nmonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]\ntemps = [24, 26, 29, 34, 38, 40, 41, 41, 39, 35, 30, 26]\n\nplt.plot(months, temps)\nplt.title("Dubai average high, month by month (approx.)")\nplt.show()\n`,
    task: "Run the year (first run downloads the toolbox — wait it out). Then plot a SECOND line: night temps, your guesses — two lines, one chart.",
    hints: [
      "A second line is a second plt.plot(months, other_list) BEFORE plt.show().",
      "Make it readable later — next lesson makes labels law.",
    ],
    check: (ctx) => {
      if (!/import\s+matplotlib/.test(ctx.code)) return { pass: false, msg: "Fetch the professional's toolbox: import matplotlib.pyplot as plt" };
      if (!/plt\.plot\(/.test(ctx.code)) return { pass: false, msg: "Draw the line: plt.plot(months, temps)." };
      if (!/plt\.show\(\)/.test(ctx.code)) return { pass: false, msg: "Charts must be shown: plt.show() at the end." };
      if (!ctx.chart) return { pass: false, msg: "No chart appeared — is plt.show() the last line?" };
      return { pass: true, msg: "That's a real research-grade chart. The turtle is proud of what you've grown into." };
    },
  },
  {
    id: "w7l4",
    title: "Label everything",
    subtitle: "An unlabeled chart is a rumor",
    beats: [
      { t: "The scientist's law: <b>an unlabeled chart is a rumor</b>." },
      { t: "Three duties, every chart, forever:",
        fig: { k: "rows", rows: [
          { code: [{ c: "plt.title", r: "k" }], res: "what am I?" },
          { code: [{ c: "plt.xlabel", r: "k" }], res: "what's across?" },
          { code: [{ c: "plt.ylabel", r: "k" }], res: "what's up?" },
        ] } },
      { t: "plt.bar makes bars; the labels make them TRUE." },
    ],
    predict: "Dubai's rain, month by month — how many bars will barely exist?",
    starter: `import matplotlib.pyplot as plt\n\nmonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]\nrain = [11, 25, 14, 7, 1, 0, 0, 0, 0, 1, 3, 15]\n\nplt.bar(months, rain)\nplt.title("Dubai rainfall by month (approx. mm)")\nplt.xlabel("Month")\nplt.ylabel("Rain (mm)")\nplt.show()\n`,
    task: "Run the rain. Then chart YOUR data as labeled bars — and never ship a rumor again.",
    hints: [
      "Swap in any dataset you love — game scores, pages read — but keep all three labels.",
      "plt.bar for comparing categories; plt.plot for change over time. Choose like a scientist.",
    ],
    check: (ctx) => {
      if (!/plt\.bar\(/.test(ctx.code)) return { pass: false, msg: "This lesson's tool is bars: plt.bar(names, values)." };
      if (!/plt\.title\(/.test(ctx.code) || !/plt\.xlabel\(/.test(ctx.code) || !/plt\.ylabel\(/.test(ctx.code))
        return { pass: false, msg: "The law: title, xlabel AND ylabel. An unlabeled chart is a rumor." };
      if (!ctx.chart) return { pass: false, msg: "Show it: plt.show()." };
      return { pass: true, msg: "Titled, labeled, honest. This chart could walk into a lab meeting." };
    },
  },
  {
    id: "w7l5",
    title: "Raw data, tamed",
    subtitle: "split — reading real records",
    beats: [
      { t: "Real data arrives MESSY — lines of text, commas between values.",
        fig: { k: "rows", rows: [
          { code: [{ c: "\"Dubai,41\"", r: "v" }, { c: ".split(\",\")", r: "k" }], res: "[\"Dubai\", \"41\"]" },
          { code: [{ c: "parts[0]", r: "n" }], res: "\"Dubai\"" },
          { code: [{ c: "int(parts[1])", r: "k" }], res: "41" },
        ] } },
      { t: "Watch the taming tool:",
        build: {
          steps: [
            { text: "rows = data.split(\"\\n\")", say: "split at every line-break — one row per record." },
            { text: "\nparts = rows[0].split(\",\")", say: "split a row at the comma — name and number, separated." },
            { text: "\ncities.append(parts[0])", say: "The name goes to one box…" },
            { text: "\ntemps.append(int(parts[1]))", say: "…the number (int-ed!) to its twin." },
          ],
          effect: "\"Dubai,41\" → [\"Dubai\", 41]",
          done: "This is data cleaning — half of every scientist's real day.",
        } },
    ],
    starter: `import matplotlib.pyplot as plt\n\ndata = "Abu Dhabi,42\\nDubai,41\\nSharjah,41\\nAl Ain,43\\nFujairah,36"\n\ncities = []\ntemps = []\nfor row in data.split("\\n"):\n    parts = row.split(",")\n    cities.append(parts[0])\n    temps.append(int(parts[1]))\n\nplt.bar(cities, temps)\nplt.title("Summer high by city (approx.)")\nplt.xlabel("City")\nplt.ylabel("Temp (C)")\nplt.show()\n`,
    task: "Tame the five cities. Then ADD two more to the raw text — the parser and the chart follow without one more edit. Feel why.",
    hints: [
      "New records join the string: \\nRas Al Khaimah,40 — the split loop does the rest.",
      "parts[0] is the name, parts[1] the number. Twins by position — like your quiz machine.",
    ],
    check: (ctx) => {
      if (!/\.split\(/.test(ctx.code)) return { pass: false, msg: "Tame the text with split — rows first, then commas." };
      if (!/\.append\(/.test(ctx.code)) return { pass: false, msg: "Collect into twin boxes as you parse: append." };
      if (!ctx.chart) return { pass: false, msg: "Finish the pipeline: raw text → boxes → labeled chart → plt.show()." };
      return { pass: true, msg: "Raw text walked in; a labeled chart walked out. That pipeline IS data science." };
    },
  },
  {
    id: "w7l6",
    title: "Challenge: chart your life",
    subtitle: "Make — your data, your chart, your sentence",
    beats: [
      { t: "The final make: chart something TRUE about your own life." },
      { t: "Screen hours? Goals? Quran pages? Laps? — collect a real week." },
      { t: "Then the scientist's finish: print ONE honest sentence about what the chart says." },
    ],
    starter: `import matplotlib.pyplot as plt\n\n# Your real week. Your real numbers.\ndays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]\n\n`,
    task: "Chart a real week of your life — labeled fully — and print one honest sentence of what the data says.",
    hints: [
      "Bars for a week of counts; a line if it's a trend. Scientist's choice.",
      "The sentence is analysis: print(\"My screen time doubles on weekends.\") — say what the SHAPE says.",
      "Honesty rule: real numbers, even if unflattering. Data serves truth.",
    ],
    check: (ctx) => {
      if (!/plt\.(bar|plot)\(/.test(ctx.code)) return { pass: false, msg: "Chart it with the professional's pen: plt.bar or plt.plot." };
      if (!/plt\.title\(/.test(ctx.code) || !/plt\.xlabel\(/.test(ctx.code) || !/plt\.ylabel\(/.test(ctx.code))
        return { pass: false, msg: "Full labels — your life deserves no rumors." };
      if (!ctx.chart) return { pass: false, msg: "Show the chart: plt.show()." };
      if (!ctx.stdout.trim()) return { pass: false, msg: "The scientist's finish: print one sentence of what the data SAYS." };
      return { pass: true, msg: "📊 Data collected, charted, labeled, and READ. World 7 complete — you think in evidence now." };
    },
  },
];

/* ================= World 8 — Thinking Machines (the final world) ================= */

const WORLD8_LESSONS = [
  {
    id: "w8l1",
    title: "The word is a name",
    subtitle: "Algorithm — الخوارزمي, and the champion pattern",
    beats: [
      { t: "The word ALGORITHM is a NAME: <b>الخوارزمي — al-Khwarizmi</b>, mathematician of Baghdad." },
      { t: "Our civilization named the cipher (صفر) — and the algorithm too. We end at our giants." },
      { t: "An algorithm: a recipe so precise, even a machine can follow it." },
      { t: "Your first classic — the CHAMPION pattern:",
        fig: { k: "rows", rows: [
          { lab: "start", code: [{ c: "champion = numbers[0]", r: "n" }], res: "first holds the title" },
          { lab: "fight", code: [{ c: "n > champion ?", r: "i" }], res: "bigger takes it" },
          { lab: "the end", code: [{ c: "last one standing", r: "i" }], res: "the champion 🏆" },
        ] } },
    ],
    predict: "The champion starts as slot 0 and fights every number — who survives [38, 12, 45, 7, 29]?",
    starter: `numbers = [38, 12, 45, 7, 29]\n\nchampion = numbers[0]\nfor n in numbers:\n    if n > champion:\n        champion = n\n\nprint("The champion: " + str(champion))\n\nx = -140\npenup()\nfor n in numbers:\n    jump(x, -100)\n    if n == champion:\n        color("gold")\n    else:\n        color("steelblue")\n    width(16)\n    pendown()\n    forward(n * 3)\n    penup()\n    x = x + 60\n`,
    task: "Crown the champion — the gold bar. Then flip the recipe: find the SMALLEST. One character changes. Which?",
    hints: [
      "The smallest survives if the fight flips: if n < champion.",
      "This exact pattern finds the top scorer, the hottest month, the nearest star. Patterns travel.",
    ],
    check: (ctx) => {
      if (!/\w+\s*=\s*\w+\[0\]/.test(ctx.code)) return { pass: false, msg: "Start the champion at slot 0 — someone must hold the title first." };
      if (!/if\s+\w+\s*[<>]\s*\w+\s*:/.test(ctx.code)) return { pass: false, msg: "The fight: if n beats the champion, the title changes hands." };
      if (!ctx.stdout.trim()) return { pass: false, msg: "Announce the winner with print." };
      return { pass: true, msg: "Your first named algorithm — al-Khwarizmi's heirs write recipes machines can follow." };
    },
  },
  {
    id: "w8l2",
    title: "The patient hunter",
    subtitle: "Linear search — and counting its steps",
    beats: [
      { t: "Searching is walking the box, asking each slot: is it you?",
        fig: { k: "rows", rows: [
          { lab: "slot 0", code: [{ c: "\"Maryam\" — you?", r: "i" }], res: "no" },
          { lab: "slot 1", code: [{ c: "\"Khalid\" — you?", r: "i" }], res: "no" },
          { lab: "slot 3", code: [{ c: "\"Sara\" — you?", r: "i" }], res: "YES — 4 questions" },
        ] } },
      { t: "The new habit of this world: <b>COUNT the steps</b>." },
      { t: "A recipe isn't just correct — it has a COST. Scientists measure it." },
    ],
    predict: "Sara hides at slot 3 of five guests — how many questions until she's found?",
    starter: `guests = ["Maryam", "Khalid", "Omar", "Sara", "Alia"]\ntarget = "Sara"\n\nsteps = 0\nspot = -1\nfor i in range(len(guests)):\n    if spot == -1:\n        steps = steps + 1\n        if guests[i] == target:\n            spot = i\n\nif spot == -1:\n    print(target + " is not at this majlis.")\nelse:\n    print(target + " found at slot " + str(spot) + " - questions asked: " + str(steps))\n`,
    task: "Hunt Sara. Then hunt someone absent — what does the hunter report? Then move Sara to slot 0 — what happens to the steps?",
    hints: [
      "Absent guests cost the MOST steps — the hunter checks everyone before giving up.",
      "steps counts every question asked. Position changes luck; the recipe stays honest.",
    ],
    check: (ctx) => {
      if (!/steps\s*=\s*steps\s*\+\s*1|steps\s*\+=/.test(ctx.code))
        return { pass: false, msg: "Count every question: steps = steps + 1 inside the hunt." };
      if (!/==\s*target|target\s*==/.test(ctx.code)) return { pass: false, msg: "Ask each slot: is it the target?" };
      if (!/-1/.test(ctx.code)) return { pass: false, msg: "Honest hunters admit absence — the -1 'not found' path." };
      if (!ctx.stdout.trim()) return { pass: false, msg: "Report the hunt: where, and in how many steps." };
      return { pass: true, msg: "Found, counted, honestly reported — search is a recipe with a receipt." };
    },
  },
  {
    id: "w8l3",
    title: "Order from chaos",
    subtitle: "Selection sort — the champion, repeated",
    beats: [
      { t: "Sorting is the champion pattern, REPEATED: pull the smallest, again, again." },
      { t: "Watch the heart of the sorter:",
        build: {
          steps: [
            { text: "while len(numbers) > 0:", say: "As long as chaos remains…" },
            { text: "\n    smallest = numbers[0]\n    for n in numbers:\n        if n < smallest:\n            smallest = n", say: "…crown the smallest champion still in the box…" },
            { text: "\n    sorted_list.append(smallest)", say: "…move it to the ordered line…" },
            { text: "\n    numbers.remove(smallest)", say: "remove — take the treasure OUT of the chaos box." },
          ],
          effect: "[38, 12, 45, 7, 29] → [7, 12, 29, 38, 45]",
          done: "Chaos shrinks, order grows. Every sort in the world is a cousin of this.",
        } },
      { t: "The staircase below is the PROOF — bars that only ever rise.",
        fig: { k: "rows", rows: [
          { code: [{ c: "find the smallest", r: "i" }], res: "move it out" },
          { code: [{ c: "again… and again", r: "i" }], res: "order grows" },
          { code: [{ c: "chaos box empty", r: "i" }], res: "[7, 12, 29, 38, 45]" },
        ] } },
    ],
    predict: "Five chaotic bars enter the sorter — what shape must come out, always?",
    starter: `numbers = [38, 12, 45, 7, 29]\nsorted_list = []\n\nwhile len(numbers) > 0:\n    smallest = numbers[0]\n    for n in numbers:\n        if n < smallest:\n            smallest = n\n    sorted_list.append(smallest)\n    numbers.remove(smallest)\n\nprint(sorted_list)\n\nx = -140\npenup()\nfor v in sorted_list:\n    jump(x, -100)\n    color("seagreen")\n    width(16)\n    pendown()\n    forward(v * 3)\n    penup()\n    x = x + 60\n`,
    task: "Sort the chaos — watch the staircase. Then feed it YOUR numbers, and then: sort biggest-first. One character.",
    hints: [
      "Biggest-first: hunt the LARGEST each round — if n > smallest (rename the jar if it bothers you: it should!).",
      "Names sort too: try a list of friends. Python compares words alphabetically.",
    ],
    check: (ctx) => {
      if (!/^\s*while\b/m.test(ctx.code)) return { pass: false, msg: "The sorter's engine is while — as long as chaos remains." };
      if (!/\.remove\(/.test(ctx.code)) return { pass: false, msg: "Pull the champion OUT of the chaos: numbers.remove(...)." };
      if (!/\.append\(/.test(ctx.code)) return { pass: false, msg: "Build the ordered line: sorted_list.append(...)." };
      const bars = ctx.lines.map(l => Math.hypot(l.x2 - l.x1, l.y2 - l.y1));
      for (let i = 1; i < bars.length; i++)
        if (bars[i] < bars[i - 1] - 1) return { pass: false, msg: "The staircase betrays you — the bars must only ever rise (or only ever fall). Check the sort." };
      if (bars.length < 4) return { pass: false, msg: "Draw the proof — the sorted bars." };
      return { pass: true, msg: "Order from chaos, by your own hand. This algorithm has run a trillion times today — now once more, yours." };
    },
  },
  {
    id: "w8l4",
    title: "Judging recipes",
    subtitle: "Steps vs size — complexity, felt",
    beats: [
      { t: "Same recipe, bigger box — what happens to the COST?" },
      { t: "Measure it like a scientist: hunt in 5, in 10, in 20. Chart the steps.",
        fig: { k: "rows", rows: [
          { code: [{ c: "5 names", r: "v" }], res: "5 steps" },
          { code: [{ c: "10 names", r: "v" }], res: "10 steps" },
          { code: [{ c: "20 names", r: "v" }], res: "20 steps" },
        ], note: "double the box → double the hunt. A straight line." } },
      { t: "Double the names, double the hunt. A straight line. Recipes have SHAPES." },
      { t: "Honesty: cleverer recipes exist — university will hand them to you. Today you learned to MEASURE." },
    ],
    predict: "Worst case — the target hides LAST. Before charting: what will the three bars look like?",
    starter: `import matplotlib.pyplot as plt\n\nsizes = [5, 10, 20]\nsteps_taken = []\n\nfor size in sizes:\n    names = []\n    for i in range(size):\n        names.append("guest" + str(i))\n    target = "guest" + str(size - 1)\n    steps = 0\n    for name in names:\n        steps = steps + 1\n        if name == target:\n            print("Box of " + str(size) + ": found in " + str(steps) + " steps")\n    steps_taken.append(steps)\n\nplt.bar(["5 names", "10 names", "20 names"], steps_taken)\nplt.title("The patient hunter: cost vs box size (worst case)")\nplt.xlabel("Box size")\nplt.ylabel("Steps")\nplt.show()\n`,
    task: "Run the measurement. Then add a box of 40 — predict its bar BEFORE running. Were you right?",
    hints: [
      "Adding a size: one number in sizes, one label in the bar list. The experiment scales itself.",
      "Prediction before measurement — that's the entire scientific method, in miniature.",
    ],
    check: (ctx) => {
      if (!/steps\s*=\s*steps\s*\+\s*1|steps\s*\+=/.test(ctx.code)) return { pass: false, msg: "The measurement IS the steps counter — keep it." };
      if (!/plt\.bar\(|plt\.plot\(/.test(ctx.code)) return { pass: false, msg: "Chart the cost — bars or a line, labeled." };
      if (!ctx.chart) return { pass: false, msg: "Show the evidence: plt.show()." };
      if (!ctx.stdout.trim()) return { pass: false, msg: "Print each hunt's receipt too — numbers before pictures." };
      return { pass: true, msg: "You just measured an algorithm's cost. Half of computer science is exactly this question." };
    },
  },
  {
    id: "w8l5",
    title: "Teach the machine",
    subtitle: "The honest taste of machine learning",
    beats: [
      { t: "The finale's promise, kept: teach a machine to tell <b>dates from olives</b>." },
      { t: "Honesty first: the machine won't UNDERSTAND. It will find a PATTERN.",
        fig: { k: "rows", rows: [
          { lab: "study", code: [{ c: "brain.fit(", r: "k" }, { c: "examples, labels", r: "n" }, { c: ")", r: "k" }], res: "finds the pattern" },
          { lab: "judge", code: [{ c: "brain.predict(", r: "k" }, { c: "[39, 8]", r: "v" }, { c: ")", r: "k" }], res: "\"date\"" },
        ], note: "a pattern-finder — it never truly understands" } },
      { t: "Watch the two sacred verbs:",
        build: {
          steps: [
            { text: "brain = DecisionTreeClassifier()", say: "An empty brain — a pattern-finder, nothing more." },
            { text: "\nbrain.fit(features, labels)", say: "fit — STUDY my examples: measurements, and what each one truly was." },
            { text: "\n\nbrain.predict([[39, 8]])", say: "predict — now judge a fruit you never saw." },
          ],
          effect: "[39mm, 8g] → 'date'",
          done: "Examples in, pattern out. Every AI you have ever met grew from this seed.",
        } },
      { t: "One-time download, the biggest of the journey. The last door. Patience." },
    ],
    predict: "Mystery fruit [21mm, 5g] — date or olive? Judge it yourself before the machine does.",
    starter: `from sklearn.tree import DecisionTreeClassifier\nimport matplotlib.pyplot as plt\n\ndate_lengths = [35, 40, 38, 42, 36]\ndate_weights = [7, 9, 8, 10, 7]\nolive_lengths = [18, 22, 20, 24, 19]\nolive_weights = [4, 6, 5, 7, 4]\n\nfeatures = []\nlabels = []\nfor i in range(len(date_lengths)):\n    features.append([date_lengths[i], date_weights[i]])\n    labels.append("date")\nfor i in range(len(olive_lengths)):\n    features.append([olive_lengths[i], olive_weights[i]])\n    labels.append("olive")\n\nbrain = DecisionTreeClassifier()\nbrain.fit(features, labels)\n\nmystery = [[39, 8], [21, 5], [30, 6]]\nguesses = brain.predict(mystery)\nfor i in range(len(mystery)):\n    print("Fruit " + str(mystery[i]) + " -> the machine says: " + guesses[i])\n\nplt.scatter(date_lengths, date_weights)\nplt.scatter(olive_lengths, olive_weights)\nplt.title("Dates vs olives - what the machine studied")\nplt.xlabel("Length (mm)")\nplt.ylabel("Weight (g)")\nplt.show()\n`,
    task: "Teach it, test it. The [30, 6] fruit sits BETWEEN the clouds — did the machine hesitate? It can't. Discuss with yourself: should it have?",
    hints: [
      "Add your own examples — more measurements make a wiser (never a knowing) machine.",
      "Try a mystery fruit of [60, 20]. The machine still answers confidently. THAT is the lesson about AI.",
    ],
    check: (ctx) => {
      if (!/\.fit\(/.test(ctx.code)) return { pass: false, msg: "The machine must study first: brain.fit(features, labels)." };
      if (!/\.predict\(/.test(ctx.code)) return { pass: false, msg: "Now test it on fruit it never saw: brain.predict(...)." };
      if (!ctx.stdout.trim()) return { pass: false, msg: "Print the machine's judgments — see them with your eyes." };
      if (!ctx.chart) return { pass: false, msg: "Scatter what it studied — the two clouds tell the whole story." };
      return { pass: true, msg: "You taught a machine. And you know EXACTLY what that does and doesn't mean — which puts you ahead of most adults." };
    },
  },
  {
    id: "w8l6",
    title: "The Capstone",
    subtitle: "Make — the thing only you can build",
    beats: [
      { t: "Eight worlds live in your hands: speak, decide, pattern, extend, collect, animate, measure, teach." },
      { t: "The capstone: build something REAL that mixes at least three of them." },
      { t: "A quiz that charts scores. A game with a champion board. A cipher with statistics." },
      { t: "Sign it. Universities call this a <b>portfolio piece</b>. We call it yours." },
    ],
    starter: `# THE CAPSTONE\n# Mix at least three worlds. Build the thing only you can build.\n# Ideas: quiz + chart of scores - game + champion pattern - cipher + letter statistics\n\nimport matplotlib.pyplot as plt\nimport random\n\n`,
    task: "Build your capstone: at least two of your own def words, powers from three worlds, and your signature printed at the end.",
    hints: [
      "Start from a thing you already love — your quiz, your game, your cipher — and make it BIGGER with another world's power.",
      "The signature: print(\"Built by NAME — Barmij, Worlds 1 to 8.\") — earn the line.",
      "Stuck? The champion pattern + your quiz scores + plt.bar = a personal report card machine.",
    ],
    check: (ctx) => {
      const defs = [...ctx.code.matchAll(/def\s+(\w+)\s*\(/g)].length;
      if (defs < 2) return { pass: false, msg: "A capstone carries your own vocabulary — at least 2 def words." };
      const powers = [/plt\./, /input\(/, /def\s+tick/, /\{[^{}\n]*:/, /\.split\(/, /random\./, /\.fit\(/]
        .filter(rx => rx.test(ctx.code)).length;
      if (powers < 2) return { pass: false, msg: "Mix more worlds — bring at least two big powers together (charts, input, tick, dicts, split, random, ML)." };
      if (!ctx.stdout.trim() && !(ctx.cmds || []).length && !ctx.chart)
        return { pass: false, msg: "The capstone must DO something visible — speak, draw, or chart." };
      if (!/print\(|write\(/.test(ctx.code)) return { pass: false, msg: "Sign your work — a printed signature line. You earned it." };
      return { pass: true, msg: "🏆 THE CAPSTONE STANDS. Eight worlds, one maker. Whatever you build next — university, career, life — started here. Mabrook, ya ra'id." };
    },
  },
];

/* ---------------- worlds & flat index ---------------- */
const WORLDS = [
  { id: "w1", title: "World 1 — First Lines",
    sub: "Real Python. Real drawings. Your first six spells.",
    lessons: WORLD1_LESSONS },
  { id: "w2", title: "World 2 — Decisions",
    sub: "Programs that listen, choose, and surprise you.",
    lessons: WORLD2_LESSONS },
  { id: "w3", title: "World 3 — Patterns & Power",
    sub: "Repeat the repeating — the geometry of our mosques, the shows of our Union.",
    lessons: WORLD3_LESSONS },
  { id: "w4", title: "World 4 — Your Own Magic Words",
    sub: "Teach Python new words — then build words from words.",
    lessons: WORLD4_LESSONS },
  { id: "w5", title: "World 5 — Collections",
    sub: "Boxes of treasures, words made of letters — and the cipher named by our zero.",
    lessons: WORLD5_LESSONS },
  { id: "w6", title: "World 6 — Living Programs",
    sub: "Programs that never finish — the falcon hunts at thirty blinks a second.",
    lessons: WORLD6_LESSONS },
  { id: "w7", title: "World 7 — Real Data",
    sub: "Numbers from the real world — charted, labeled, and read like a scientist.",
    lessons: WORLD7_LESSONS },
  { id: "w8", title: "World 8 — Thinking Machines",
    sub: "Algorithms bear our giants' names — search, sort, measure, and teach the machine.",
    lessons: WORLD8_LESSONS },
];
const LESSONS = WORLDS.flatMap(w => w.lessons);

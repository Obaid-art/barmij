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
      { t: "The colors never lie: <code class=\"k\">Python's word</code> → <code class=\"a\">your words</code> → <code class=\"r\">what happens</code>." },
    ],
    predict: "Before you press Run — what exactly do you think will appear?",
    demo: { steps: [
      { say: "Watch my fingers. First, Python's magic word — see it turn blue:", text: "print" },
      { say: "Now open the doors — the parentheses:", text: "(" },
      { say: "Your words live inside quotes — watch them turn amber:", text: "\"Ahlan!\"" },
      { say: "Close the quote's twin… and close the door.", text: ")" },
    ]},
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
      { t: "Code runs <b>top to bottom</b>. Nothing skipped, nothing guessed." },
    ],
    predict: "Two forward lines with a turn between them — what shape will the pen leave?",
    demo: { steps: [
      { say: "The walking word:", text: "forward" },
      { say: "Doors open — how many steps? — doors closed:", text: "(100)" },
      { say: "Press Enter — every instruction gets its own line. Now, a turn:", text: "\nright(90)" },
    ]},
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
      { t: "Two new magic words: <code class=\"k\">color</code>(<code class=\"a\">\"gold\"</code>) and <code class=\"k\">width</code>(<code class=\"a\">8</code>)." },
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
      { t: "Write the name anywhere → Python fetches what's inside." },
      { t: "Change the jar once → the <b>whole drawing</b> changes with it." },
    ],
    predict: "If you change ONLY the first line to size = 180 and run again — what changes?",
    demo: { steps: [
      { say: "Invent a name — this jar is YOURS. See it turn lavender:", text: "size" },
      { say: "The filling sign — one =, meaning 'put this inside':", text: " = " },
      { say: "What goes in the jar:", text: "100" },
      { say: "Now USE the jar — write its name and Python fetches what's inside:", text: "\nforward(size)" },
    ]},
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
      { t: "Use <code class=\"v\">i</code> inside → <code class=\"k\">forward</code>(<code class=\"v\">i</code> * <code class=\"a\">4</code>) → every step grows 🌀" },
    ],
    predict: "range(36) with right(100) — 36 repeats. What could THAT look like?",
    demo: { steps: [
      { say: "The repeat spell. Watch the whole first line — ending with its special ':' —", text: "for i in range(4):" },
      { say: "Enter, then FOUR spaces — the secret handshake that says 'I belong to the loop':", text: "\n    forward(100)" },
      { say: "Same handshake, next instruction:", text: "\n    right(90)" },
    ]},
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
      { t: "You know everything needed: <code class=\"a\">5</code> equal lines, turning <code class=\"a\">144</code>° after each." },
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
      { t: "The answer lands in your jar, ready to use." },
      { t: "Glue words with +: <code class=\"k\">print</code>(<code class=\"a\">\"Ahlan, \"</code> + <code class=\"v\">name</code>)" },
    ],
    predict: "Where will the question appear — and where will your answer go?",
    demo: { steps: [
      { say: "First a jar, ready and waiting for the answer:", text: "name = " },
      { say: "The listening word:", text: "input" },
      { say: "Your question goes inside — quotes and all:", text: "(\"What is your name?\")" },
    ]},
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
      { t: "Another picks from a list: <code class=\"v\">random</code>.<code class=\"k\">choice</code>([<code class=\"a\">\"gold\"</code>, <code class=\"a\">\"pink\"</code>])" },
      { t: "Same code. Different result. <b>Every run.</b>" },
    ],
    predict: "Run the same code twice. Will the two stars be identical?",
    starter: `import random\n\nsize = random.randint(40, 140)\ncolor(random.choice(["gold", "royalblue", "hotpink", "seagreen"]))\nwidth(6)\n\nfor i in range(5):\n    forward(size)\n    right(144)\n`,
    task: "Run it at least 3 times and watch the star change. Then add two more colors you love to the list.",
    hints: [
      "The list lives inside [ ] — add a color like \"orchid\" or \"teal\", with quotes and a comma.",
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
      { t: "A question from a human. An answer from chance. 🔮" },
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
      { t: "<code class=\"k\">int</code>(...) turns words into real numbers. Now &gt; and &lt; work." },
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
      { t: "Happy → golden sun? Sleepy → blue waves? Excited → pink firework?" },
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
      { t: "Indent depth says who you belong to." },
      { t: "Small code, huge work — that's what computers are FOR." },
    ],
    predict: "Six hexagons, each drawn after a turn of 60 — what ring appears?",
    demo: { steps: [
      { say: "The outer spell first — you know this one:", text: "for i in range(4):" },
      { say: "Enter, FOUR spaces — then a second for. The double handshake begins:", text: "\n    for j in range(4):" },
      { say: "Enter, EIGHT spaces now — the deepest level:", text: "\n        forward(50)" },
      { say: "Still eight spaces deep:", text: "\n        right(90)" },
      { say: "Back to four — this turn belongs to the outer loop:", text: "\n    right(90)" },
    ]},
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
      { t: "To close the circle: small turn × repeats = <b>360</b>." },
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
      { t: "range can count YOUR way: start, stop, step." },
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
      { t: "Forget the promise → the loop runs forever." },
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
      if (!/\bn\s*=\s*n\s*[+\-]|[+\-]=\s*\d/.test(ctx.code))
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
      { t: "Each rocket: jump somewhere, pick a color, burst in a circle." },
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
      { t: "The great secret: <b>teaching a word is silent — saying it makes it happen</b>." },
      { t: "Python only knows the words you teach it. Today, its dictionary grew." },
    ],
    predict: "The code teaches star() but says it TWICE — how many stars appear?",
    demo: { steps: [
      { say: "def, a space, then YOUR word's name — and the empty doors ():", text: "def burst():" },
      { say: "Enter, four spaces — the recipe belongs to the word:", text: "\n    forward(80)" },
      { say: "Still inside the word:", text: "\n    back(80)" },
      { say: "Now leave the recipe — NO spaces — and say your word:", text: "\nburst()" },
    ]},
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
      { t: "Same word + different gift = different result." },
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
      { t: "Two doors: <code class=\"k\">def</code> <code class=\"v\">poly</code>(<code class=\"v\">sides</code>, <code class=\"v\">size</code>)." },
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
      { t: "print shows a human. <code class=\"k\">return</code> hands to the PROGRAM." },
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
      { t: "Words build words build words. <b>All software is this tower.</b>" },
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
];
const LESSONS = WORLDS.flatMap(w => w.lessons);

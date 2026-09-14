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

/* ---------------- worlds & flat index ---------------- */
const WORLDS = [
  { id: "w1", title: "World 1 — First Lines",
    sub: "Real Python. Real drawings. Your first six spells.",
    lessons: WORLD1_LESSONS },
  { id: "w2", title: "World 2 — Decisions",
    sub: "Programs that listen, choose, and surprise you.",
    lessons: WORLD2_LESSONS },
];
const LESSONS = WORLDS.flatMap(w => w.lessons);

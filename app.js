/* LHS Study Guide — SPA. Hash routing:
 *   #/                     home
 *   #/ch02/learn           notes
 *   #/ch02/practice        quiz hub
 *   #/ch02/summary         one-page summary
 */

/* `blurb`, `topics` and `sections` exist for one screen only: the page a visitor
   without a key sees instead of a locked module. They are a *description* of the
   chapter — what it covers and how big it is — not any of its teaching content.
   The summaries used to do this job, but a summary is the chapter distilled, and
   giving eleven of those away is giving away most of what the key is for. */
const MODULES = [
  { id: "ch01", num: "01", title: "The Scientific Study of Life", ready: true, sections: 13,
    blurb: `How science actually works, and what separates the living from the non-living.
      Builds the scientific method in order, the filters for trusting a claim, and the six
      characteristics a thing must have <em>all</em> of to count as alive.`,
    topics: ["The scientific method", "Controls and variables", "Hypothesis vs theory",
             "Characteristics of life", "Levels of organisation", "Taxonomy and the domains"] },
  { id: "ch02", num: "02", title: "The Chemistry of Life", ready: true, sections: 17,
    blurb: `The chemistry a biologist cannot do without: what atoms are made of, why some are
      radioactive, the three bonds that hold biology together, and the properties of water that
      follow from one of them.`,
    topics: ["Atoms and isotopes", "Electron shells and reactivity", "Ionic, covalent and hydrogen bonds",
             "The properties of water", "pH", "Why carbon"] },
  { id: "ch03", num: "03", title: "Biological Molecules", ready: true, sections: 15,
    blurb: `The four classes of molecule life is built from, and the single pair of reactions that
      assembles and dismantles every one of them.`,
    topics: ["Dehydration synthesis and hydrolysis", "Carbohydrates", "Proteins and the four levels of structure",
             "Nucleic acids", "The four groups of lipid"] },
  { id: "ch04", num: "04", title: "Cell Structure", ready: true, sections: 16,
    blurb: `What a cell is made of and why it has to stay small — cell theory and the microscopes
      that established it, then an organelle-by-organelle tour and the differences that separate
      the two great cell types.`,
    topics: ["Cell theory", "Microscopy", "Surface area to volume", "Prokaryote vs eukaryote",
             "The organelles", "The cytoskeleton", "Plant vs animal", "Cell junctions"] },
  { id: "ch05", num: "05", title: "Cell Membranes", ready: true, sections: 19,
    blurb: `How one structure manages to be sealed and open at the same time: the fluid mosaic
      model, what makes a membrane more or less fluid, and the six mechanisms by which anything
      gets across it.`,
    topics: ["Selective permeability", "The fluid mosaic model", "The phospholipid bilayer",
             "Membrane proteins", "Diffusion and osmosis", "Active transport", "Endo- and exocytosis"] },
  { id: "ch06", num: "06", title: "The Energy of Life", ready: true, sections: 21,
    blurb: `Where a cell's energy comes from and what controls its release — the thermodynamics,
      then ATP and enzymes, then respiration from glucose to the electron transport chain, and
      photosynthesis running the loop backwards.`,
    topics: ["Endergonic vs exergonic", "ATP", "Enzymes and inhibition", "Glycolysis and the citric acid cycle",
             "Chemiosmosis and ATP yield", "Fermentation", "Photosynthesis", "C3, C4 and CAM"] },
  { id: "ch07", num: "07", title: "DNA Structure & Gene Function", ready: true, sections: 18,
    blurb: `How the information in DNA becomes a working protein: the structure, the experiments
      that revealed it, and the central dogma step by step — with what happens when a letter
      changes.`,
    topics: ["DNA structure", "The central dogma", "The three RNAs", "Transcription",
             "The genetic code", "Translation", "Mutations", "Gene regulation"] },
  { id: "ch08", num: "08", title: "DNA Replication & Mitosis", ready: true, sections: 18,
    blurb: `How a cell copies three billion letters and then divides — the replication machinery
      and the accuracy that keeps it honest, the cell cycle and mitosis, and what a failure of
      those controls is called.`,
    topics: ["Semiconservative replication", "Leading and lagging strands", "Proofreading and telomeres",
             "The cell cycle", "The stages of mitosis", "Checkpoints", "Binary fission", "Cancer"] },
  { id: "ch09", num: "09", title: "Sexual Reproduction & Meiosis", ready: true, sections: 16,
    blurb: `Why sexual reproduction produces variation and asexual reproduction does not — ploidy
      and the vocabulary that goes with it, the two divisions of meiosis, and the three places the
      variety actually comes from.`,
    topics: ["Asexual vs sexual", "Haploid and diploid", "Meiosis I and II", "Crossing over and independent assortment",
             "Meiosis vs mitosis", "Gametogenesis", "Sex determination", "Nondisjunction"] },
  { id: "ch10", num: "10", title: "Patterns of Inheritance", ready: true, sections: 21,
    blurb: `Mendel's two laws and everything that complicates them — crosses worked forwards with
      squares and probability, then backwards from a ratio, then the five patterns that do not obey
      Mendel at all.`,
    topics: ["Mendel's two laws", "Monohybrid and dihybrid crosses", "Diagnostic ratios",
             "Incomplete dominance and codominance", "ABO blood groups", "Sex-linked inheritance",
             "Pedigrees", "Genetic disorders"] },
  { id: "ch11", num: "11", title: "Cell Communication", ready: true, sections: 23,
    blurb: `How a cell hears a signal and does something about it: reception, transduction and
      response, why one molecule can move millions, how the message is switched off — and what
      goes wrong when it is not.`,
    topics: ["Forms of signalling", "Ligand solubility", "The three surface receptors",
             "Intracellular receptors", "Kinase cascades", "Second messengers", "Amplification",
             "Termination", "Signalling failure and drugs"] },
  { id: "ch12", num: "12", title: "Health & Diseases", ready: true, sections: 27,
    blurb: `What makes people ill and how the body answers — the six causes of disease, pathogens
      from bacteria down to prions, both arms of the immune system, and the non-communicable
      diseases that kill the most people.`,
    topics: ["The six causes of disease", "Bacteria and their toxins", "Antibiotics and resistance",
             "Viruses, viroids and prions", "Innate immunity", "Adaptive immunity and antibodies",
             "Vaccination and herd immunity", "HIV/AIDS", "Cancer", "Cardiovascular disease"] },
];

/* Every module carries the same question set, and the locked-module page says so
   rather than counting something it is not allowed to have fetched. */
const PER_MODULE = { mcq: 18, short: 8, extended: 4 };

/* Where the paid line falls, for the copy that has to say so. Module 01 is free
   in full — notes, questions, answers, summary and mark schemes; every other
   module shows only a description of itself. Api.FREE_MODULES is the
   machine-readable half of this and is what the code branches on. */
const PRICE = "$25";
const CONTACT = "https://t.me/danypak";

/* Sales copy lives here rather than being retyped at each call site: the lock
   card, the locked-module page and the sign-in screen all have to promise the
   same thing, and three near-identical strings is how they stop doing that. */
const buyButton = (cls = "btn") => `<a class="${cls}" href="${CONTACT}" target="_blank"
  rel="noopener">Get a key — ${PRICE}</a>`;

const WHAT_A_KEY_BUYS = `A key unlocks the other eleven modules in full — notes,
  questions, the answer to every one, the explanation of <em>why</em> each wrong
  option is wrong, the one-page summaries, the model answers and the mark schemes —
  plus the mock exam and the pass over your mistakes. Module 01 stays free, whole.`;

/* Shown as a padlock in the navigation and as "Needs a key" on the cards. Signed
   in, nothing wears a lock: the point is to tell a visitor what they would be
   buying, not to remind a buyer of what they already own. */
const needsKey = modId => !Api.isFree(modId) && !Api.token;

/* Emailing a replacement key needs RESEND_API_KEY on the Worker, which needs a
   verified sending domain — not set up yet. The endpoint and the form both work;
   what would fail is the delivery, and a button that always errors is worse than
   no button. Until the domain exists, "I've lost my key" points at Telegram.
   Flip this to true once `wrangler secret put RESEND_API_KEY` has been done. */
const EMAIL_RECOVERY = false;

/* ---------- progress store (localStorage) ---------- */

const Store = {
  key: "lhs-progress-v1",
  data: null,
  load() {
    try { this.data = JSON.parse(localStorage.getItem(this.key)) || {}; }
    catch { this.data = {}; }
  },
  save() { localStorage.setItem(this.key, JSON.stringify(this.data)); },
  module(id) {
    if (!this.data[id]) this.data[id] = { mcq: {}, mcqOrder: null, mcqIndex: 0, written: {} };
    return this.data[id];
  },
};
Store.load();

const $ = (sel, el = document) => el.querySelector(sel);
const main = $("#main");

/* Inline icons. Emoji were rendering as a different picture on every OS — and at
   different widths, so the tab bar jumped between platforms. */
const ICON = {
  learn: "M4 5.5A2.5 2.5 0 0 1 6.5 3H11v15H6.5A2.5 2.5 0 0 0 4 20.5zM20 5.5A2.5 2.5 0 0 0 17.5 3H13v15h4.5a2.5 2.5 0 0 1 2.5 2.5z",
  practice: "M4 20h4l10-10a2.83 2.83 0 0 0-4-4L4 16zM13.5 6.5l4 4",
  summary: "M13 2 4.5 13.5H11l-1 8.5 8.5-11.5H12z",
  flag: "M5 21V4M5 4h11l-2 3.5L16 11H5",
};
const icon = name => `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="${ICON[name]}"/></svg>`;

/* Plain text, safe to drop into an attribute. Option buttons put their text in
   nested spans, which left them with an empty accessible name in the a11y tree. */
const stripMd = s => s.replace(/[*`_]/g, "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

/* ---------- router ---------- */

function route() {
  Drawer.close(false);
  const hash = location.hash.replace(/^#\/?/, "");
  const [mod, tab] = hash.split("/");
  renderNav(mod);
  // #/unlock/LHS-XXXXX-… — the link sent with the key, so the first sign-in
  // is a click rather than twenty characters typed on a phone.
  if (mod === "unlock") return renderLogin(hash.slice("unlock/".length));
  if (mod === "login") return renderLogin();
  if (mod === "review") return renderReview();
  if (mod === "exam") return renderExam();
  if (mod === "signals") return renderSignals();
  if (!mod) return renderHome();
  const m = MODULES.find(x => x.id === mod);
  if (!m || !m.ready) return renderHome();
  Store.data.last = { mod: m.id, tab: tab || "learn" };
  Store.save();
  renderModule(m, tab || "learn");
}
window.addEventListener("hashchange", route);

/* ---------- mobile drawer ---------- */

const Drawer = {
  get isOpen() { return document.body.classList.contains("nav-open"); },
  open() {
    document.body.classList.add("nav-open");
    $("#scrim").hidden = false;
    $("#nav-toggle").setAttribute("aria-expanded", "true");
    const first = $("#module-nav a");
    if (first) first.focus();
  },
  close(refocus) {
    if (!this.isOpen) return;
    document.body.classList.remove("nav-open");
    $("#scrim").hidden = true;
    $("#nav-toggle").setAttribute("aria-expanded", "false");
    if (refocus) $("#nav-toggle").focus();
  },
  toggle() { this.isOpen ? this.close(true) : this.open(); },
};

/* ---------- theme ----------
 * Three states, not two: "system" has to stay reachable, otherwise a student who
 * tries the toggle once can never get back to following their phone's setting. */
const Theme = {
  key: "lhs-theme",
  order: ["system", "light", "dark"],
  label: { system: "System theme", light: "Light theme", dark: "Dark theme" },
  icon: { system: "◐", light: "☀", dark: "☾" },
  get current() { return localStorage.getItem(this.key) || "system"; },
  apply(mode) {
    if (mode === "system") document.documentElement.removeAttribute("data-theme");
    else document.documentElement.setAttribute("data-theme", mode);
    localStorage.setItem(this.key, mode);
    const btn = $("#theme-toggle");
    $("#theme-label").textContent = this.label[mode];
    $("#theme-ico").textContent = this.icon[mode];
    btn.setAttribute("aria-label", `${this.label[mode]}. Click to change.`);
  },
  cycle() {
    const next = this.order[(this.order.indexOf(this.current) + 1) % this.order.length];
    this.apply(next);
  },
};
Theme.apply(Theme.current);
$("#theme-toggle").addEventListener("click", () => Theme.cycle());

$("#nav-toggle").addEventListener("click", () => Drawer.toggle());
$("#scrim").addEventListener("click", () => Drawer.close(true));
document.addEventListener("keydown", e => { if (e.key === "Escape") Drawer.close(true); });

/* Navigate, and re-render even when the hash is already the target.
 * The quiz player and the results screen both live *inside* #/chNN/practice
 * without changing the hash, so a plain href back to that same hash fires no
 * hashchange and the student is left stranded on the results screen. */
function go(hash) {
  if (location.hash === hash) route();
  else location.hash = hash;
}

/* ---------- sidebar ---------- */

function renderNav(activeId) {
  $("#module-nav").innerHTML = MODULES.map(m => {
    const cls = ["nav-item", m.ready ? "enabled" : "locked", m.id === activeId ? "active" : ""].join(" ");
    const s = mcqScore(m.id);
    // Started modules show progress, finished ones show the score. Before this
    // the marker only appeared at 100%, so a half-done module looked untouched.
    const stat = s
      ? `<span class="nav-stat ${s.answered === s.total ? "done" : ""}">${
          s.answered === s.total ? `${s.correct}/${s.total}` : `${s.answered}/${s.total}`}</span>`
      : "";
    const href = m.ready ? `href="#/${m.id}/learn"` : "";
    const current = m.id === activeId ? ` aria-current="page"` : "";
    const shut = needsKey(m.id);
    const label = `Module ${m.num}: ${m.title}${m.ready ? "" : " (coming soon)"}${
      shut ? " (needs a key)" : ""}${s ? `, ${s.correct} of ${s.total} correct` : ""}`;
    // Locked modules stay in the list and stay clickable: they lead to the
    // module's description and the offer. A hidden list looks like a course with
    // three chapters; a list with padlocks looks like a catalogue.
    const mark = shut ? `<span class="nav-lock" aria-hidden="true">🔒</span>` : stat;
    return `<a class="${cls}" ${href}${current} aria-label="${label}"><span class="num">${m.num}</span><span class="nav-label">${m.title}</span>${mark}</a>`;
  }).join("");

  renderCourseProgress();
  const m = MODULES.find(x => x.id === activeId);
  $("#topbar-title").textContent = m ? `${m.num} · ${m.title}` : "LHS Study Guide";
}

const MCQ_PER_MODULE = 18; // the validator enforces 18 per module

function mcqScore(modId) {
  const p = Store.data[modId];
  if (!p || !p.mcq) return null;
  const entries = Object.values(p.mcq);
  if (!entries.length) return null;
  return {
    answered: entries.length,
    correct: entries.filter(e => e.correct).length,
    total: p.mcqTotal || MCQ_PER_MODULE,
  };
}

function courseProgress() {
  let answered = 0, correct = 0, total = 0;
  MODULES.forEach(m => {
    if (!m.ready) return;
    const p = Store.data[m.id];
    total += (p && p.mcqTotal) || MCQ_PER_MODULE;
    const s = mcqScore(m.id);
    if (!s) return;
    answered += s.answered;
    correct += s.correct;
  });
  return { answered, correct, total, pct: total ? Math.round(100 * answered / total) : 0 };
}

function renderCourseProgress() {
  const c = courseProgress();
  $("#course-progress").innerHTML = `
    <div class="cp-head"><span>Course progress</span><span class="cp-pct">${c.pct}%</span></div>
    <div class="progress-track"><div class="progress-fill" style="width:${c.pct}%"></div></div>
    <p class="cp-sub">${c.answered} of ${c.total} questions answered${
      c.answered ? ` · ${c.correct} correct` : ""}</p>`;

  const ring = $("#topbar-ring");
  ring.style.setProperty("--p", c.pct);
  ring.setAttribute("aria-label", `Course progress: ${c.pct}%`);
}

/* ---------- home ---------- */

function renderHome() {
  document.title = "LHS Study Guide — Interactive";
  main.innerHTML = `
    <div class="page">
      <h1 class="page-title">Life &amp; Health Science</h1>
      <p class="page-sub">The full course, taught from zero. Read the notes, then test yourself —
      every wrong answer tells you exactly which misunderstanding it reveals and what to re-read.</p>
      ${freeModuleCard()}
      ${resumeCard()}
      ${courseTools()}
      <div class="module-grid">
        ${MODULES.map(m => {
          const s = mcqScore(m.id);
          const status = !m.ready ? `<span class="mod-status">Coming soon</span>`
            : needsKey(m.id) ? `<span class="mod-status">🔒 Needs a key</span>`
            : !s ? `<span class="mod-status">Not started</span>`
            : s.answered === s.total
              ? `<span class="mod-status done">Done — ${s.correct}/${s.total} correct</span>`
              : `<span class="mod-status doing">In progress — ${s.answered}/${s.total} answered</span>`;
          const tag = m.ready ? `a href="#/${m.id}/learn"` : "div";
          const closeTag = m.ready ? "a" : "div";
          return `<${tag} class="module-card ${m.ready ? "enabled" : "locked"}">
            <span class="mod-num">MODULE ${m.num}</span>
            <span class="mod-title">${m.title}</span>
            ${status}
          </${closeTag}>`;
        }).join("")}
      </div>
    </div>`;
}

/* Shown to a visitor without a key, once, at the top of the course. It says what
   is free before it says what costs money — someone who has not read a word yet
   has no reason to trust a price, and Module 01 is the argument. */
function freeModuleCard() {
  if (Api.token || Api.mode === "local") return "";
  const free = Api.FREE_MODULES[0];
  const m = MODULES.find(x => x.id === free);
  return `
    <div class="card offer-card">
      <div class="card-head">
        <h3>Module ${m ? m.num : "01"} is free, in full</h3>
        <span class="pill">${PRICE} for the rest</span>
      </div>
      <p class="muted">Notes, all 18 questions, every answer, the one-page summary and every mark
        scheme — no key, no sign-up. It is a whole module, built exactly like the other eleven, so
        you can see what you would be buying before you decide.</p>
      <div class="row-gap">
        <a class="btn" href="#/${free}/learn">Start Module ${m ? m.num : "01"}</a>
        ${buyButton("btn secondary")}
      </div>
    </div>`;
}

/* The two things that work across the whole course rather than inside one
 * module. The mistakes pass only appears once there is something in it —
 * an empty "0 to review" tile is noise on a first visit. */
function courseTools() {
  const n = mistakeIds().length;
  const ex = Store.data.exam;
  const examSub =
    ex && !ex.submitted
      ? `In progress — ${Object.keys(ex.answers).length} of ${EXAM_SIZE} answered,
         ${clock(examRemaining(ex))} left on the clock.`
      : ex && ex.submitted
        ? `Last attempt: ${Object.values(ex.answers).filter(e => e.correct).length} / ${EXAM_SIZE}.
           A new attempt draws a different paper.`
        : `${EXAM_SIZE} questions across all twelve modules, ${EXAM_MINUTES} minutes,
           no feedback until you submit.${Api.token || Api.mode === "local" ? "" : " Needs a key."}`;
  return `
    <div class="tool-grid">
      <a class="tool-card" href="#/exam">
        <span class="tool-title">Mock exam</span>
        <span class="tool-sub">${examSub}</span>
      </a>
      ${n ? `<a class="tool-card" href="#/review">
        <span class="tool-title">Work on your mistakes</span>
        <span class="tool-sub">${n} question${n > 1 ? "s" : ""} you missed or flagged,
          gathered from every module.</span>
      </a>` : ""}
      <a class="tool-card" href="#/signals">
        <span class="tool-title">Questions the course has already graded</span>
        <span class="tool-sub">The twelve items the lectures put on screen with marks
          attached, answered and mapped to the notes.</span>
      </a>
    </div>`;
}

const TAB_LABEL = { learn: "Learn", practice: "Practice", summary: "Summary" };

function resumeCard() {
  const last = Store.data.last;
  if (!last) return "";
  const m = MODULES.find(x => x.id === last.mod);
  if (!m || !m.ready) return "";
  return `<a class="resume-card" href="#/${m.id}/${last.tab}">
    <span class="r-icon">↩︎</span>
    <span>
      <span class="r-label">Pick up where you left off</span>
      <span class="r-what">Module ${m.num} · ${m.title} — ${TAB_LABEL[last.tab] || "Learn"}</span>
    </span>
    <span class="r-go">→</span>
  </a>`;
}

/* ---------- module shell ---------- */

/* Renders are async (the notes are a 60–90 KB fetch), so two of them can be in
 * flight at once — an initial route plus a hashchange, or a fast Learn →
 * Practice → Learn tap. Without this guard the slower one finishes last and
 * wires its listeners to nodes that have already been thrown away, which
 * silently kills the reading progress and the contents highlight. */
let renderEpoch = 0;

async function renderModule(m, tab) {
  const epoch = ++renderEpoch;
  const alive = () => epoch === renderEpoch;
  document.title = `${m.title} — LHS Study Guide`;
  PageScroll.clear();
  main.innerHTML = `
    <div class="page${tab === "learn" ? " wide" : ""}">
      <div class="crumbs"><a href="#/">Modules</a> / Module ${m.num}</div>
      <h1 class="page-title">${m.title}</h1>
      <p class="page-sub module-sub">Learn → practise → review. Your progress is saved on this device.</p>
      <div class="tabbar">
        <div class="tabs" role="tablist">
          ${["learn", "practice", "summary"].map(t =>
            `<button class="tab ${t === tab ? "active" : ""}" data-tab="${t}"
                     role="tab" aria-selected="${t === tab}" aria-label="${TAB_LABEL[t]}">
              ${icon(t)}<span>${TAB_LABEL[t]}</span>
            </button>`).join("")}
        </div>
        <div class="read-progress"><span id="read-fill"></span></div>
      </div>
      <div id="tab-body"></div>
    </div>`;

  main.querySelectorAll(".tab").forEach(b =>
    b.addEventListener("click", () => go(`#/${m.id}/${b.dataset.tab}`)));
  syncStickyOffsets();

  const body = $("#tab-body");
  try {
    if (tab === "learn") await renderLearn(m, body, alive);
    else if (tab === "summary") await renderSummary(m, body, alive);
    else await renderPractice(m, body, alive);
  } catch (e) {
    if (!alive()) return;
    const retry = () => renderModule(m, tab);
    /* A locked module now fails at the *content* fetch, not just at the answers,
       so this catch is where a visitor without a key arrives. On Learn and
       Summary — the two tabs a visitor lands on while deciding — that is a buying
       decision and gets the description and the offer; on Practice the lock card
       already says the right thing. Anything else — throttled, offline — is not a
       product state and must not be dressed up as one. */
    if (e.code === "auth") {
      return tab === "practice" ? renderLock(body, e.message, retry)
        : renderModuleTeaser(m, body, retry);
    }
    if (e.code) return renderBlocked(body, e, retry);
    body.innerHTML = `
      <div class="card">
        <h3>Could not load content</h3>
        <p class="muted">${e.message}</p>
        <div class="row-gap"><button class="btn" id="retry-load">Try again</button></div>
      </div>`;
    $("#retry-load", body).addEventListener("click", retry);
  }
}

/* One scroll listener at a time. Tabs swap the whole body, so whatever the
   previous tab registered has to go with it. */
const PageScroll = {
  fn: null,
  set(fn) {
    this.clear();
    this.fn = () => requestAnimationFrame(fn);
    window.addEventListener("scroll", this.fn, { passive: true });
    fn();
  },
  clear() {
    if (this.fn) window.removeEventListener("scroll", this.fn);
    this.fn = null;
  },
};

function skeleton() {
  return `<div class="skeleton" aria-hidden="true">
    ${`<span class="sk-line"></span>`.repeat(3)}
    <span class="sk-line short"></span>
    ${`<span class="sk-line"></span>`.repeat(5)}
  </div>`;
}

async function renderLearn(m, body, alive = () => true) {
  body.innerHTML = skeleton();
  const md = await Api.getNotes(m.id);
  if (!alive()) return;
  body.innerHTML = `
    <div class="learn-layout">
      <article class="md" id="notes">${MD.render(md)}</article>
      <div class="toc" id="toc"></div>
    </div>`;
  buildToc(m, $("#notes", body), $("#toc", body));
  scrollToPending(body);
}

async function renderSummary(m, body, alive = () => true) {
  body.innerHTML = skeleton();
  const md = await Api.getSummary(m.id);
  if (!alive()) return;
  body.innerHTML = `<article class="md">${MD.render(md)}</article>`;
}

/* ---------- notes navigation ----------
 * The chapters run 8–13k words across 16–21 `## N.M` sections. md.js already
 * gives every heading an id (`sec-6-4`), so the contents list is built straight
 * from the rendered DOM — no second parse of the markdown.
 */

function buildToc(m, notes, tocEl) {
  const heads = [...notes.querySelectorAll("h2")];
  if (heads.length < 3) return;

  tocEl.innerHTML = `
    <button class="toc-toggle" aria-expanded="false" aria-controls="toc-list">
      <span>Contents · ${heads.length} sections</span><span class="toc-caret">▾</span>
    </button>
    <nav class="toc-list" id="toc-list">
      ${heads.map(h => `<a href="#${h.id}" data-id="${h.id}">${h.textContent}</a>`).join("")}
    </nav>`;

  const toggle = $(".toc-toggle", tocEl);
  toggle.addEventListener("click", () => {
    const open = tocEl.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  const links = [...tocEl.querySelectorAll(".toc-list a")];
  links.forEach(a => a.addEventListener("click", e => {
    e.preventDefault();
    document.getElementById(a.dataset.id).scrollIntoView({ behavior: "smooth", block: "start" });
    tocEl.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }));

  const p = Store.module(m.id);
  const fill = $("#read-fill");
  let activeId = null;

  PageScroll.set(() => {
    if (!notes.isConnected) return PageScroll.clear();
    // Reading progress across the article, not the whole document.
    const box = notes.getBoundingClientRect();
    const read = Math.min(1, Math.max(0, -box.top / Math.max(1, box.height - innerHeight)));
    if (fill) fill.style.width = `${read * 100}%`;

    // Current section = the last heading whose top has passed the sticky bar.
    let current = heads[0];
    for (const h of heads) {
      if (h.getBoundingClientRect().top <= 130) current = h;
      else break;
    }
    if (current.id === activeId) return;
    activeId = current.id;
    links.forEach(a => a.classList.toggle("active", a.dataset.id === activeId));
    const hit = links.find(a => a.dataset.id === activeId);
    if (hit) hit.scrollIntoView({ block: "nearest" });
    // Never record the first heading: the page opens at the top, so doing so
    // would wipe the saved position on every visit before the student reads a word.
    if (current === heads[0]) return;
    p.lastSection = { id: activeId, label: current.textContent };
    Store.save();
  });

  // Offer to jump back only if the student got somewhere last time.
  const last = p.lastSection;
  if (last && heads.findIndex(h => h.id === last.id) > 0) {
    const chip = document.createElement("button");
    chip.className = "resume-section";
    chip.innerHTML = `<span class="r-label">Continue reading</span><span>${last.label}</span>`;
    // Above the two-column grid, not inside it — otherwise it becomes a grid item.
    const layout = notes.parentElement;
    layout.parentElement.insertBefore(chip, layout);
    chip.addEventListener("click", () => {
      const el = document.getElementById(last.id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      chip.remove();
    });
  }
}

/* Deep-link from quiz feedback: "review §2.4" sets sessionStorage then routes to learn */
function scrollToPending(body) {
  const target = sessionStorage.getItem("lhs-scroll");
  if (!target) return;
  sessionStorage.removeItem("lhs-scroll");
  const el = body.querySelector(`#${target}`);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    el.classList.add("flash");
  }
}

/* ---------- locked state & sign-in ----------
 * Module 01 ships in full as static files. Everything else — the notes, question
 * stems and summaries of modules 02–12, and the answer key, diagnostics, model
 * answers and rubrics throughout — comes from the Worker, because a file in the
 * published tree is a file anyone can open directly. */

function renderLock(el, message, retry) {
  el.innerHTML = `
    <div class="card lock-card">
      <div class="lock-icon" aria-hidden="true">🔒</div>
      <h3>This part needs a key</h3>
      <p class="muted">${message}</p>
      <p class="muted lock-what">${WHAT_A_KEY_BUYS}</p>
      <div class="row-gap">
        ${buyButton()}
        <a class="btn secondary" href="#/login">I have a key</a>
        <button class="btn secondary" id="lock-retry">Try again</button>
      </div>
    </div>`;
  const again = $("#lock-retry", el);
  if (again) again.addEventListener("click", () => retry());
}

/* A locked module's Learn and Summary tabs. Not the lock card: this is the one
   screen where a visitor is deciding whether to buy, so it says what the chapter
   covers and how much of it there is — the description in MODULES, which is
   written for exactly this page.

   What it deliberately does not show is the module's own text. It used to print
   the whole one-page summary, and a high-yield summary is the chapter distilled:
   eleven of those is most of the revision value given away for nothing. A
   description tells a visitor what they would be buying; a summary is the thing
   itself. */
function renderModuleTeaser(m, body, retry) {
  body.innerHTML = `
    <div class="card lock-card">
      <div class="lock-icon" aria-hidden="true">🔒</div>
      <h3>Module ${m.num} needs a key</h3>
      <p class="muted lock-what">${WHAT_A_KEY_BUYS}</p>
      <div class="row-gap">
        ${buyButton()}
        <a class="btn secondary" href="#/login">I have a key</a>
        <button class="btn secondary" id="teaser-retry">Try again</button>
      </div>
    </div>
    <div class="card teaser-about">
      <div class="card-head"><h3>What Module ${m.num} covers</h3><span class="pill">Preview</span></div>
      <p class="teaser-blurb">${m.blurb}</p>
      <ul class="topic-list">${m.topics.map(t => `<li>${t}</li>`).join("")}</ul>
      <p class="muted teaser-stats">${m.sections} sections of notes ·
        ${PER_MODULE.mcq} multiple-choice questions, each with the misunderstanding its wrong
        options reveal · ${PER_MODULE.short + PER_MODULE.extended} written questions with model
        answers and mark schemes · a one-page summary of the whole chapter</p>
      <div class="row-gap">
        <a class="btn secondary" href="#/${Api.FREE_MODULES[0]}/learn">See all of this in Module 01, free</a>
      </div>
    </div>`;
  $("#teaser-retry", body).addEventListener("click", () => retry());
}

/* Everything that needs an answer key has the same three failure modes, and only
 * one of them is a product state. Being throttled or offline must not send the
 * student to a sign-in form they do not need — they are already signed in. */
function renderBlocked(el, err, retry) {
  if (err.code === "auth") return renderLock(el, err.message, retry);
  const title = err.code === "rate" ? "That's a lot of answers at once"
    : err.code === "net" ? "No connection to the answer service"
      : "Could not load that";
  el.innerHTML = `
    <div class="card lock-card">
      <div class="lock-icon" aria-hidden="true">${err.code === "rate" ? "⏳" : "⚠️"}</div>
      <h3>${title}</h3>
      <p class="muted">${err.message}</p>
      <div class="row-gap"><button class="btn" id="blocked-retry">Try again</button></div>
    </div>`;
  $("#blocked-retry", el).addEventListener("click", () => retry());
}

/* Printed under every explanation and model answer in production. The invisible
 * watermark the Worker adds is what traces a leak; this line is what stops one,
 * by reminding the student that the text they are about to forward has their own
 * name on it. */
function licensedNote() {
  const who = Api.account && Api.account.email;
  return who ? `<p class="licensed-note">Licensed to ${who}</p>` : "";
}

/* The server's own message to a flagged account, shown once. */
function noticeBar() {
  if (!Api.notice) return "";
  const text = Api.notice;
  Api.notice = null;
  return `<div class="card notice">${text}</div>`;
}

/* One field: the key sent when the licence was issued. No mailbox in the way, because the
 * two things that actually cost a sharer something — the device cap and the
 * metered key budget — do not care what the credential is, and taxing every
 * honest buyer with a code round trip buys almost nothing against the common
 * case of lending it to one friend.
 *
 * A licence the server has flagged is the exception: it comes back asking for a
 * code sent to the buyer's own address, which is the one thing a key posted in a
 * public channel cannot get past.
 *
 * Both house rules are stated here rather than buried in terms nobody reads: a
 * rule students do not know about deters nobody, and only feels like a bug the
 * first time it fires. */
function renderLogin(presetKey) {
  document.title = "Unlock the course — LHS Study Guide";
  const back = Store.data.last ? `#/${Store.data.last.mod}/${Store.data.last.tab}` : "#/";
  const signedIn = Api.account && Api.token;

  main.innerHTML = `
    <div class="page">
      <div class="crumbs"><a href="#/">Modules</a> / ${signedIn ? "Your account" : "Unlock"}</div>
      <h1 class="page-title">${signedIn ? "Your account" : "Unlock the course"}</h1>
      ${signedIn ? `
        <p class="page-sub">Unlocked as <strong>${Api.account.email}</strong> on this device
          (${Api.deviceLabel}).</p>
        <div class="card">
          <p class="muted">Your licence covers two devices at a time. Unlocking somewhere else
            signs out whichever device you used least recently.</p>
          <div class="row-gap">
            <a class="btn" href="${back}">Back to the course</a>
            <button class="btn secondary" id="logout">Sign out of this device</button>
          </div>
        </div>` : `
        <p class="page-sub">Paste the access key you were sent. There is no password
          and no account to create.</p>
        <form class="card login-card" id="login-form" novalidate>
          <label class="field">
            <span>Access key</span>
            <input type="text" id="login-key" autocomplete="off" spellcheck="false" required
                   placeholder="LHS-XXXXX-XXXXX-XXXXX-XXXXX" value="${presetKey || ""}">
          </label>
          <label class="field" id="code-field" hidden>
            <span>Confirmation code</span>
            <input type="text" id="login-code" inputmode="numeric" autocomplete="one-time-code"
                   placeholder="6-digit code">
          </label>
          <p class="login-msg" id="login-msg" role="status" aria-live="polite"></p>
          <div class="row-gap">
            <button class="btn" type="submit" id="login-submit">Unlock</button>
            <a class="btn secondary" href="${back}">Back to the course</a>
          </div>
        </form>
        <details class="card lost-key">
          <summary>I've lost my key</summary>
          ${EMAIL_RECOVERY ? `
          <p class="muted">We'll email a new one to the address you bought with. The old key
            stops working — which is also how you kill a key that has got out.</p>
          <form class="row-gap" id="recover-form" novalidate>
            <input type="email" id="recover-email" autocomplete="email" placeholder="you@example.com">
            <button class="btn secondary" type="submit" id="recover-submit">Email me a new key</button>
          </form>
          <p class="login-msg" id="recover-msg" role="status" aria-live="polite"></p>` : `
          <p class="muted">Message me and I'll issue a new one. The old key stops working —
            which is also how you kill a key that has got out.</p>
          <div class="row-gap">
            <a class="btn secondary" href="${CONTACT}" target="_blank" rel="noopener">Message me on Telegram</a>
          </div>`}
        </details>
        <ul class="muted login-terms">
          <li>Two devices at a time — a laptop and a phone. Unlocking a third signs out
            the one you used least recently.</li>
          <li>Every explanation you are shown is tagged with your licence, so a copy that
            ends up in a group chat can be traced back to it.</li>
        </ul>`}
      <p class="muted login-foot">
        ${Api.mode === "local"
          ? "This build runs in local mode — everything is already unlocked, so there is nothing to enter yet."
          : `Trouble unlocking? <a href="${CONTACT}" target="_blank" rel="noopener">Message me on Telegram</a> and I'll sort it out.`}
      </p>
    </div>`;

  const out = $("#logout");
  if (out) return out.addEventListener("click", async () => {
    await Api.logout();
    renderLogin();
  });

  const form = $("#login-form");
  const msg = $("#login-msg");
  const submit = $("#login-submit");
  const codeField = $("#code-field");
  let awaitingCodeFor = null;

  const say = (text, cls = "") => { msg.textContent = text; msg.className = `login-msg ${cls}`; };

  const done = evicted => {
    say(evicted
      ? "Unlocked. Your least recently used device has been signed out."
      : "Unlocked. Taking you to the course…", "good");
    setTimeout(() => go(back), evicted ? 1800 : 700);
  };

  async function attempt() {
    const key = $("#login-key").value.trim();
    if (!key) return say("Paste the key you were sent.", "bad");

    // Changing the key after a code was requested starts over, rather than
    // checking a fresh key against the previous licence's code.
    if (awaitingCodeFor === key) {
      const code = $("#login-code").value.trim();
      if (!code) return say("Enter the six-digit code from your email.", "bad");
      submit.disabled = true;
      say("Checking…");
      try {
        done((await Api.confirm(key, code)).evicted);
      } catch (err) {
        say(err.message, "bad");
        submit.disabled = false;
      }
      return;
    }

    submit.disabled = true;
    say("Checking…");
    try {
      const result = await Api.claim(key);
      if (result.needsCode) {
        awaitingCodeFor = key;
        codeField.hidden = false;
        $("#login-code").focus();
        submit.textContent = "Confirm";
        say(`This licence has been used from a lot of places lately, so this device needs
             confirming. We've emailed a code to ${result.emailHint}.`, "");
      } else {
        done(result.evicted);
      }
    } catch (err) {
      say(err.message, "bad");
    }
    submit.disabled = false;
  }

  form.addEventListener("submit", e => { e.preventDefault(); attempt(); });

  const recover = $("#recover-form");
  if (recover) recover.addEventListener("submit", async e => {
    e.preventDefault();
    const box = $("#recover-msg");
    const email = $("#recover-email").value.trim();
    if (!email) { box.textContent = "Enter the email you bought with."; box.className = "login-msg bad"; return; }
    $("#recover-submit").disabled = true;
    box.textContent = "Sending…";
    box.className = "login-msg";
    try {
      await Api.recover(email);
      // Says "if" on purpose: the server does not reveal whether an address
      // bought the course, and neither should this screen.
      box.textContent = "If that address has a licence, a new key is on its way.";
      box.className = "login-msg good";
    } catch (err) {
      box.textContent = err.message;
      box.className = "login-msg bad";
      $("#recover-submit").disabled = false;
    }
  });

  // Arriving from the unlock link: try it straight away, so the first unlock is
  // a click. If it needs a code, the form is already on screen to take it.
  if (presetKey && !signedIn && Api.mode !== "local") attempt();
}

/* ---------- cross-module question sets ---------- */

/* Every module numbers its questions A1…A18, so an id only identifies a question
 * *inside* its module — ch03's A1 and ch07's A1 are different questions. Any set
 * that mixes modules (the exam, the mistakes pass) therefore works in qualified
 * ids, "ch03:A1", with `modId` and `localId` carried on the item. Progress is
 * still stored per module under the local id, so nothing in the saved shape
 * changes. */
const qualify = (modId, localId) => `${modId}:${localId}`;
const modOfQid = qid => qid.split(":")[0];

/* Question stems only. The answer key is no longer part of loading a screen: it
 * arrives per question from `Keys`, a few at a time, once the student is actually
 * looking at them. See api.js for why that matters. */
async function loadItems(modIds) {
  const parts = await Promise.all(modIds.map(async id => ({
    id,
    q: await Api.getQuestions(id),
  })));
  const items = [];
  parts.forEach(({ id, q }) => {
    q.mcq.forEach(it => items.push({ ...it, id: qualify(id, it.id), localId: it.id, modId: id }));
  });
  return items;
}

/* Progress accessors that take a qualified id and land in the right module. */
const modProgress = {
  read: qid => (Store.data[modOfQid(qid)] || { mcq: {} }).mcq[qid.split(":")[1]],
  write(qid, entry) {
    const [modId, localId] = qid.split(":");
    const p = Store.module(modId);
    p.mcq[localId] = entry;
    // A question answered correctly on a second pass has served its purpose as a
    // flag; leaving it set would drag it back into the next mistakes list.
    if (entry.correct && p.flagged) delete p.flagged[localId];
    Store.save();
    renderNav();
  },
  isFlagged: qid => {
    const [modId, localId] = qid.split(":");
    return !!((Store.data[modId] || {}).flagged || {})[localId];
  },
  toggleFlag(qid) {
    const [modId, localId] = qid.split(":");
    const p = Store.module(modId);
    if (!p.flagged) p.flagged = {};
    p.flagged[localId] = !p.flagged[localId];
    Store.save();
    return !!p.flagged[localId];
  },
};

/* Everything answered wrong or flagged, course-wide. Derived from the progress
 * store on demand, so there is no second list to keep in sync. */
function mistakeIds() {
  const out = [];
  MODULES.forEach(m => {
    if (!m.ready) return;
    const p = Store.data[m.id];
    if (!p) return;
    const ids = new Set();
    Object.entries(p.mcq || {}).forEach(([id, e]) => { if (!e.correct) ids.add(id); });
    Object.entries(p.flagged || {}).forEach(([id, on]) => { if (on) ids.add(id); });
    [...ids].sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      .forEach(id => out.push(qualify(m.id, id)));
  });
  return out;
}

/* ---------- fix pass ----------
 * An instant-feedback run over an arbitrary set of qualified questions, writing
 * every answer through to the module it came from. Both #/review and the
 * "go through what you missed" step after the exam are this. */
function fixPass({ items, body, onFinish }) {
  const session = {};
  playMcq({
    items,
    feedback: "instant",
    // The store already holds an answer for every question that lands here —
    // that is how it got here — so the pass keeps its own session record.
    // Without it the player would see a finished set and jump to the results.
    read: qid => session[qid],
    write: (qid, entry) => { session[qid] = entry; modProgress.write(qid, entry); },
    isFlagged: modProgress.isFlagged,
    toggleFlag: modProgress.toggleFlag,
    badge: it => `Module ${(MODULES.find(m => m.id === it.modId) || {}).num} · ${it.topic}`,
    learnHref: it => `#/${it.modId}/learn`,
    onFinish: () => onFinish(session),
  }, body);
}

/* The screen every fix pass ends on. `back` is the caller's own escape hatch. */
function fixResults({ items, session, body, again, back }) {
  QuizKeys.clear();
  quizMode(false);
  const done = items.filter(it => session[it.id]);
  const fixed = done.filter(it => session[it.id].correct).length;
  const stillWrong = done.filter(it => !session[it.id].correct).map(it => it.id);
  const verdict = !stillWrong.length
    ? "All of them fixed. They are out of your mistakes list."
    : fixed >= stillWrong.length
      ? "Good progress — the ones below are still open."
      : "These are the ideas to go back to the notes for.";

  body.innerHTML = `
    <div class="card">
      <div class="score-hero">
        <div><span class="big">${fixed}</span><span class="of"> / ${done.length} fixed</span></div>
        <p>${verdict}</p>
      </div>
    </div>
    ${weakSections(stillWrong, 6)}
    <div class="quiz-nav">
      ${stillWrong.length ? `<button class="btn" id="again">Another pass at the ${stillWrong.length} still wrong</button>` : ""}
      ${back}
    </div>`;

  body.querySelectorAll("[data-review]").forEach(a =>
    a.addEventListener("click", () =>
      sessionStorage.setItem("lhs-scroll", "sec-" + a.dataset.review.replace(".", "-"))));

  const btn = $("#again", body);
  if (btn) btn.addEventListener("click", () => again(stillWrong));
}

/* ---------- mistakes pass (#/review) ---------- */

async function renderReview() {
  document.title = "Work on your mistakes — LHS Study Guide";
  PageScroll.clear();
  main.innerHTML = `
    <div class="page">
      <div class="crumbs"><a href="#/">Modules</a> / Work on your mistakes</div>
      <h1 class="page-title">Work on your mistakes</h1>
      <p class="page-sub">Every question you answered wrong or flagged, from all twelve
        modules, in one pass. Get it right here and it leaves the list.</p>
      <div id="tab-body"></div>
    </div>`;
  const body = $("#tab-body");

  const ids = mistakeIds();
  if (!ids.length) {
    body.innerHTML = `
      <div class="card empty-card">
        <h3>Nothing to re-do</h3>
        <p class="muted">No wrong answers and no flagged questions. Either you have not
          started yet, or you have cleared everything you missed.</p>
        <div class="row-gap">
          <a class="btn" href="#/exam">Sit the mock exam</a>
          <a class="btn secondary" href="#/">Back to modules</a>
        </div>
      </div>`;
    return;
  }

  body.innerHTML = `<div class="card"><p class="muted">Loading ${ids.length} questions…</p></div>`;

  const modIds = [...new Set(ids.map(modOfQid))];
  let all;
  try {
    all = await loadItems(modIds);
  } catch (e) {
    if (e.code === "auth") return renderLock(body, e.message, () => renderReview());
    body.innerHTML = `<div class="card"><h3>Could not load these questions</h3>
      <p class="muted">${e.message}</p></div>`;
    return;
  }

  const wanted = new Set(ids);
  const items = all.filter(it => wanted.has(it.id));

  fixPass({
    items,
    body,
    onFinish: session => fixResults({
      items, session, body,
      // The store is the source of truth for what is still wrong, so re-entering
      // the route rebuilds exactly the remaining set.
      again: () => go("#/review"),
      back: `<a class="btn secondary" href="#/">Back to modules</a>`,
    }),
  });
}

/* ---------- graded lecture questions (#/signals) ---------- */

async function renderSignals() {
  document.title = "Graded questions — LHS Study Guide";
  PageScroll.clear();
  main.innerHTML = `
    <div class="page wide">
      <div class="crumbs"><a href="#/">Modules</a> / Graded questions</div>
      <div id="tab-body"></div>
    </div>`;
  const body = $("#tab-body");
  body.innerHTML = `<div class="card"><p class="muted">Loading…</p></div>`;

  let md;
  try {
    md = await Api.getDoc("exam-signals");
  } catch (e) {
    body.innerHTML = `<div class="card"><h3>Could not load this page</h3>
      <p class="muted">${e.message}</p></div>`;
    return;
  }
  body.innerHTML = `<article class="md">${MD.render(md)}</article>`;

  // Links are written as "[Module 01 §1.3](#/ch01/learn)", so the section to
  // scroll to is in the link *text*. Pulling it out here keeps the markdown
  // plain and needs no extra syntax in the renderer.
  body.querySelectorAll('a[href^="#/"]').forEach(a => {
    const ref = a.textContent.match(/§\s*(\d+\.\d+)/);
    if (!ref) return;
    a.addEventListener("click", () =>
      sessionStorage.setItem("lhs-scroll", "sec-" + ref[1].replace(".", "-")));
  });
}

/* ---------- mock exam (#/exam) ---------- */

const EXAM_PER_MODULE = 4;
const EXAM_SIZE = EXAM_PER_MODULE * MODULES.filter(m => m.ready).length;
const EXAM_MINUTES = 60;

/* mulberry32. The attempt stores its seed, not its question list: the same seed
 * rebuilds the same paper after a reload, and a new attempt gets a new seed and
 * therefore a different four questions per module out of the eighteen. */
function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6D2B79F5) >>> 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* Course order, `EXAM_PER_MODULE` from each module. Grouping by module rather
 * than interleaving keeps the paper reading like the course does, and makes the
 * per-module breakdown on the results screen mean something. */
function examPaper(items, seed) {
  const rand = rng(seed);
  const out = [];
  MODULES.forEach(m => {
    if (!m.ready) return;
    const pool = items.filter(it => it.modId === m.id);
    for (let i = pool.length - 1; i > 0; i--) {           // Fisher–Yates
      const j = Math.floor(rand() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    out.push(...pool.slice(0, EXAM_PER_MODULE));
  });
  return out;
}

function examState() {
  return Store.data.exam || null;
}

function startExam() {
  Store.data.exam = {
    seed: (Date.now() ^ (Math.random() * 0xffffffff)) >>> 0,
    started: Date.now(),
    answers: {},
    flagged: {},
    submitted: false,
  };
  Store.save();
  return Store.data.exam;
}

const examRemaining = ex =>
  Math.max(0, EXAM_MINUTES * 60000 - (Date.now() - ex.started));

const clock = ms => {
  const s = Math.round(ms / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
};

async function renderExam() {
  document.title = "Mock exam — LHS Study Guide";
  PageScroll.clear();
  main.innerHTML = `
    <div class="page">
      <div class="crumbs"><a href="#/">Modules</a> / Mock exam</div>
      <h1 class="page-title">Mock exam</h1>
      <p class="page-sub">${EXAM_SIZE} multiple-choice questions, ${EXAM_PER_MODULE} from every
        module, under exam conditions: no verdict and no explanation until you submit.</p>
      <div id="tab-body"></div>
    </div>`;
  const body = $("#tab-body");
  body.innerHTML = `<div class="card"><p class="muted">Loading the paper…</p></div>`;

  const modIds = MODULES.filter(m => m.ready).map(m => m.id);
  let pool;
  try {
    pool = await loadItems(modIds);
  } catch (e) {
    if (e.code === "auth") return renderLock(body, e.message, () => renderExam());
    body.innerHTML = `<div class="card"><h3>Could not load the exam</h3>
      <p class="muted">${e.message}</p></div>`;
    return;
  }

  const ex = examState();
  if (!ex) return intro();
  if (ex.submitted) return results(ex);
  if (!examRemaining(ex)) { ex.submitted = true; Store.save(); return results(ex); }
  return sit(ex);

  /* Marks the paper in one call, at the end. Nothing before this point has put an
     answer in the browser — sitting the exam leaks nothing, and what it does
     fetch afterwards is exactly the questions the student sat.
     The attempt is passed in, never read from the enclosing scope: on a first
     sitting `renderExam`'s own `ex` is still null when this runs. */
  async function mark(ex, items) {
    await Keys.ensure(items.map(it => it.id));
    items.forEach(it => {
      const entry = ex.answers[it.id];
      if (!entry) return;
      entry.correct = entry.picked === (Keys.get(it.id) || {}).answer;
    });
    Store.save();
  }

  function intro(previous) {
    const done = Object.keys((previous || {}).answers || {}).length;
    body.innerHTML = `
      <div class="card">
        <h3>Before you start</h3>
        <ul class="exam-rules">
          <li><strong>${EXAM_SIZE} questions</strong> — ${EXAM_PER_MODULE} drawn at random from each
            of the ${modIds.length} modules, so no two attempts are the same paper.</li>
          <li><strong>${EXAM_MINUTES} minutes.</strong> The clock keeps running if you close the
            tab, exactly as it would in the hall.</li>
          <li><strong>No feedback until you submit.</strong> You can move back and forth, change
            an answer and flag anything you want to come back to.</li>
          <li>Your module practice scores are <strong>not</strong> touched by an attempt.</li>
        </ul>
        <div class="row-gap">
          <button class="btn" id="exam-start">Start the exam</button>
          <a class="btn secondary" href="#/">Not yet</a>
        </div>
        ${previous ? `<p class="muted stack-top">Your last attempt: ${previous.score} / ${previous.total}
          (${done} answered).</p>` : ""}
      </div>`;
    $("#exam-start", body).addEventListener("click", () => sit(startExam()));
  }

  function sit(ex) {
    const items = examPaper(pool, ex.seed);

    playMcq({
      items,
      feedback: "deferred",
      read: qid => ex.answers[qid],
      write: (qid, entry) => { ex.answers[qid] = entry; Store.save(); },
      isFlagged: qid => !!ex.flagged[qid],
      toggleFlag: qid => { ex.flagged[qid] = !ex.flagged[qid]; Store.save(); return !!ex.flagged[qid]; },
      badge: it => `Module ${(MODULES.find(m => m.id === it.modId) || {}).num}`,
      learnHref: it => `#/${it.modId}/learn`,
      aside: () => `<span class="exam-clock" id="exam-clock"
                          aria-label="Time remaining">${clock(examRemaining(ex))}</span>`,
      onFinish: submit,
    }, body);

    // One interval for the whole sitting. It removes itself as soon as the clock
    // it writes to is gone from the document, which covers every way of leaving
    // this screen — submitting, navigating away, a hashchange re-render.
    const tick = setInterval(() => {
      const el = $("#exam-clock");
      if (!el || !el.isConnected) return clearInterval(tick);
      const left = examRemaining(ex);
      el.textContent = clock(left);
      el.classList.toggle("low", left < 5 * 60000);
      if (!left) { clearInterval(tick); submit(true); }
    }, 1000);

    function submit(ranOut) {
      const answered = Object.keys(ex.answers).length;
      if (!ranOut && answered < items.length &&
          !confirm(`${items.length - answered} question${items.length - answered > 1 ? "s are" : " is"} still unanswered. Submit anyway?`)) return;
      clearInterval(tick);
      ex.submitted = true;
      ex.finishedAt = Date.now();
      Store.save();
      results(ex, ranOut);
    }
  }

  async function results(ex, ranOut) {
    QuizKeys.clear();
    quizMode(false);
    const items = examPaper(pool, ex.seed);

    // Marking is the first moment this attempt needs the answer key. Re-entering
    // the screen later costs nothing: the keys are already in the store.
    body.innerHTML = `<div class="card"><p class="muted">Marking your paper…</p></div>`;
    try { await mark(ex, items); }
    catch (e) { return renderBlocked(body, e, () => results(ex, ranOut)); }

    const total = items.length;
    const correct = items.filter(it => (ex.answers[it.id] || {}).correct).length;
    const missed = items.filter(it => !(ex.answers[it.id] || {}).correct).map(it => it.id);
    // Same proportions the module quiz uses, so a mark means the same thing
    // wherever the student sees it.
    const pass = Math.ceil(0.72 * total);
    const verdict =
      correct >= Math.ceil(0.88 * total) ? "Exam-ready across the course." :
      correct >= pass ? "A pass — the weak modules below are where the marks are." :
      `Below ${pass} — work through the modules below before sitting the real thing.`;

    const byModule = MODULES.filter(m => m.ready).map(m => {
      const mine = items.filter(it => it.modId === m.id);
      const got = mine.filter(it => (ex.answers[it.id] || {}).correct).length;
      return { m, got, n: mine.length };
    }).sort((a, b) => (a.got / a.n) - (b.got / b.n));

    body.innerHTML = `
      ${ranOut ? `<div class="card notice">Time is up — the paper was submitted as it stood.</div>` : ""}
      <div class="card">
        <div class="score-hero">
          <div><span class="big">${correct}</span><span class="of"> / ${total}</span></div>
          <p>${verdict}</p>
        </div>
      </div>
      <div class="card">
        <h3>By module</h3>
        <p class="muted">Weakest first — ${EXAM_PER_MODULE} questions each.</p>
        <div id="exam-modules" class="stack-top"></div>
      </div>
      ${weakSections(missed, 6)}
      <div class="quiz-nav">
        ${missed.length ? `<button class="btn" id="exam-fix">Go through the ${missed.length} you missed</button>` : ""}
        <button class="btn secondary" id="exam-again">New attempt</button>
        <a class="btn secondary" href="#/">Back to modules</a>
      </div>`;

    $("#exam-modules", body).innerHTML = byModule.map(({ m, got, n }) => {
      const pct = Math.round(100 * got / n);
      const color = pct >= 80 ? "var(--green)" : pct >= 50 ? "var(--amber)" : "var(--red)";
      return `<a class="topic-row exam-row" href="#/${m.id}/learn">
        <span class="t-name">Module ${m.num} · ${m.title}</span>
        <span class="t-track"><span class="t-fill" style="width:${pct}%;background:${color}"></span></span>
        <span class="t-pct">${got}/${n}</span>
      </a>`;
    }).join("");

    body.querySelectorAll("[data-review]").forEach(a =>
      a.addEventListener("click", () =>
        sessionStorage.setItem("lhs-scroll", "sec-" + a.dataset.review.replace(".", "-"))));

    $("#exam-again", body).addEventListener("click", () => {
      Store.data.exam = null; Store.save();
      intro({ answers: ex.answers, score: correct, total });
    });

    const fix = $("#exam-fix", body);
    // The pass over the missed questions *does* write through to module
    // progress: it is deliberate practice with the answer in front of you,
    // unlike the exam itself.
    if (fix) fix.addEventListener("click", () => runFix(missed));

    function runFix(ids) {
      const wanted = new Set(ids);
      const list = items.filter(it => wanted.has(it.id));
      fixPass({
        items: list,
        body,
        onFinish: session => {
          fixResults({
            items: list, session, body,
            again: stillWrong => runFix(stillWrong),
            back: `<button class="btn secondary" id="fix-back">Back to the results</button>`,
          });
          // Wired here, not after fixPass(): fixPass opens on a question, and
          // this button only exists once the pass has rendered its results.
          $("#fix-back", body).addEventListener("click", () => results(ex, ranOut));
        },
      });
    }
  }
}

/* ---------- practice hub ---------- */

async function renderPractice(m, body, alive = () => true) {
  const q = await Api.getQuestions(m.id);
  if (!alive()) return;
  const p = Store.module(m.id);
  p.mcqTotal = q.mcq.length;
  Store.save();

  const answered = Object.keys(p.mcq).length;
  const correct = Object.values(p.mcq).filter(e => e.correct).length;
  const finished = answered === q.mcq.length;

  const doneCount = kind => q[kind].filter(it => (p.written[it.id] || {}).revealed).length;

  body.innerHTML = `
    <div class="card">
      <div class="card-head">
        <h3>Part A — Multiple choice</h3>
        ${answered ? `<span class="pill ${finished ? "done" : ""}">${answered}/${q.mcq.length}</span>` : ""}
      </div>
      <p class="muted">${q.mcq.length} questions · instant feedback on every pick ·
        ${answered ? `${correct}/${answered} correct so far` : "not started"}</p>
      <div class="row-gap">
        <button class="btn" id="start-mcq">
          ${finished ? "See results" : answered ? "Continue" : "Start quiz"}</button>
        ${answered ? `<button class="btn secondary" id="reset-mcq">Start over</button>` : ""}
      </div>
      <div id="topic-summary" class="stack-top"></div>
    </div>
    <div class="card">
      <div class="card-head">
        <h3>Part B — Short answer</h3>
        <span class="pill ${doneCount("short") === q.short.length ? "done" : ""}">${doneCount("short")}/${q.short.length}</span>
      </div>
      <p class="muted">Write your answer, then mark yourself against the examiner's checklist</p>
      <div id="short-list" class="stack-top"></div>
    </div>
    <div class="card">
      <div class="card-head">
        <h3>Part C — Extended questions</h3>
        <span class="pill ${doneCount("extended") === q.extended.length ? "done" : ""}">${doneCount("extended")}/${q.extended.length}</span>
      </div>
      <p class="muted">Exam-style scenarios, marked part by part</p>
      <div id="ext-list" class="stack-top"></div>
    </div>`;

  renderTopicSummary(m, q, $("#topic-summary"), "Your topics so far");

  $("#start-mcq").addEventListener("click", () => runMcq(m, q, body));
  const reset = $("#reset-mcq");
  if (reset) reset.addEventListener("click", () => {
    p.mcq = {}; p.mcqIndex = 0; p.mcqOrder = null; p.flagged = {}; Store.save();
    renderPractice(m, body); renderNav(m.id);
  });

  renderWritten(m, q, "short");
  renderWritten(m, q, "extended");
}

function renderTopicSummary(m, q, el, label = "") {
  const p = Store.module(m.id);
  const byTopic = {};
  q.mcq.forEach(item => {
    const e = p.mcq[item.id];
    if (!e) return;
    byTopic[item.topic] = byTopic[item.topic] || { c: 0, n: 0 };
    byTopic[item.topic].n++;
    if (e.correct) byTopic[item.topic].c++;
  });
  const topics = Object.entries(byTopic);
  if (!topics.length) { el.innerHTML = ""; return; }
  el.innerHTML = (label ? `<p class="muted topic-label"><strong>${label}</strong></p>` : "") +
    topics.map(([name, t]) => {
      const pct = Math.round(100 * t.c / t.n);
      const color = pct >= 80 ? "var(--green)" : pct >= 50 ? "var(--amber)" : "var(--red)";
      return `<div class="topic-row">
        <span class="t-name">${name}</span>
        <span class="t-track"><span class="t-fill" style="width:${pct}%;background:${color}"></span></span>
        <span class="t-pct">${t.c}/${t.n}</span>
      </div>`;
    }).join("");
}

/* ---------- MCQ player ---------- */

/* One keydown handler at a time, cleared whenever the quiz screen changes. */
const QuizKeys = {
  fn: null,
  set(fn) { this.clear(); this.fn = fn; document.addEventListener("keydown", fn); },
  clear() { if (this.fn) document.removeEventListener("keydown", this.fn); this.fn = null; },
};

function quizMode(on) {
  const page = document.querySelector(".page");
  if (page) page.classList.toggle("quiz-mode", on);
  if (!on) QuizKeys.clear();
  syncStickyOffsets();
}

/* The quiz bar parks directly under the tab bar. Its offset used to be two
 * hard-coded numbers — one for desktop, one for phones — and every change to the
 * tab bar's padding left the two bands overlapping on one of them. Measure it
 * instead; `--quiz-top` also drives scroll-padding, so deep links from quiz
 * feedback land clear of both bands. */
function syncStickyOffsets() {
  const bar = document.querySelector(".tabbar");
  if (!bar) return;
  const top = parseFloat(getComputedStyle(bar).top) || 0;
  document.documentElement.style.setProperty("--quiz-top", `${Math.round(top + bar.offsetHeight)}px`);
}
addEventListener("resize", syncStickyOffsets);

/* The question loop. Three screens use it — the module quiz, the mock exam and
 * the mistakes-review pass — so everything mode-specific arrives through `ctx`
 * instead of being read off a module object:
 *
 *   items[]              questions in play; each carries `modId`
 *   feedback             "instant"  — verdict on every pick (module, review)
 *                        "deferred" — exam conditions: nothing until submit
 *   read(qid)            -> {picked, correct} | undefined
 *   write(qid, entry)    persist one answer
 *   isFlagged/toggleFlag(qid)
 *   learnHref(item)      where "re-read section N.M" points
 *   onFinish()           the caller renders its own results screen
 *   badge(item)          chip text, defaults to the question's topic
 *   aside()              extra HTML in the quiz bar (the exam timer)
 *
 * Answer keys are not passed in. Instant mode fetches the key for the question on
 * screen (and quietly warms the next few) through `Keys`; deferred mode fetches
 * none at all, because an exam shows no verdict until it is submitted — the whole
 * sitting happens without a single answer reaching the browser.
 */
function playMcq(ctx, body) {
  const { items } = ctx;
  const deferred = ctx.feedback === "deferred";
  const total = items.length;
  const order = items.map(x => x.id);
  const answeredCount = () => order.filter(id => ctx.read(id)).length;

  const firstOpen = order.findIndex(id => !ctx.read(id));
  // Instant mode walks the unanswered questions and stops when there are none
  // left. Deferred mode is free navigation, so it just opens where the student
  // stopped — submitting is an explicit act there, never an automatic one.
  if (!deferred && firstOpen === -1) return ctx.onFinish();

  quizMode(true);
  showQuestion(order[firstOpen === -1 ? 0 : firstOpen]);

  async function showQuestion(qid) {
    const item = items.find(x => x.id === qid);
    const pos = order.indexOf(qid);

    // The one place a key is waited for. It is already in the store whenever the
    // student moved through the quiz in order — the previous screen warmed it —
    // so this branch is the first question and nothing else.
    if (!deferred && !Keys.has(qid)) {
      body.innerHTML = `<div class="card"><p class="muted">Loading question ${pos + 1}…</p></div>`;
      try { await Keys.ensure([qid]); }
      catch (e) { return renderBlocked(body, e, () => showQuestion(qid)); }
    }

    const key = Keys.get(qid);
    const letters = Object.keys(item.options);
    const prior = ctx.read(qid);

    body.innerHTML = `
      <div class="quiz-bar">
        <div class="quiz-top">
          <span class="chip">${ctx.badge ? ctx.badge(item) : item.topic}</span>
          <span class="q-count">Question ${pos + 1} of ${total}</span>
          ${ctx.aside ? ctx.aside() : ""}
          <button class="flag-btn ${ctx.isFlagged(qid) ? "on" : ""}" id="flag-q"
                  aria-pressed="${ctx.isFlagged(qid)}" aria-label="Flag this question for another pass"
                  title="Flag for another pass">${icon("flag")}</button>
        </div>
        <div class="progress-track"><div class="progress-fill" style="width:${100 * answeredCount() / total}%"></div></div>
      </div>
      <div class="card">
        <p class="q-stem">${MD.inline(item.stem)}</p>
        <div class="options">
          ${Object.entries(item.options).map(([letter, text], i) =>
            `<button class="option" data-letter="${letter}"
                     aria-label="${letter}: ${stripMd(text)}">
              <span class="letter">${letter}</span><span>${MD.inline(text)}</span>
              <span class="key-hint">${i + 1}</span>
            </button>`).join("")}
        </div>
        <div id="feedback" role="status" aria-live="polite"></div>
        <div class="quiz-nav" id="quiz-nav"></div>
      </div>`;

    body.querySelectorAll(".option").forEach(btn =>
      btn.addEventListener("click", () => pick(btn.dataset.letter)));

    const flagBtn = $("#flag-q", body);
    flagBtn.addEventListener("click", () => {
      const on = ctx.toggleFlag(qid);
      flagBtn.classList.toggle("on", on);
      flagBtn.setAttribute("aria-pressed", String(on));
    });

    // 1–4 or A–D answers, Enter moves on. Repeat practice is the whole point of
    // the quiz, and reaching for the mouse 18 times per module is the friction.
    QuizKeys.set(e => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (/^(INPUT|TEXTAREA)$/.test(e.target.tagName)) return;
      const next = $("#next-q", body);
      if (e.key === "Enter" && next) { e.preventDefault(); next.click(); return; }
      // Instant mode locks the options once answered; in an exam the student is
      // allowed to come back and change their mind.
      if (ctx.read(qid) && !deferred) return;
      const byNumber = letters[Number(e.key) - 1];
      const byLetter = letters.find(l => l.toLowerCase() === e.key.toLowerCase());
      const letter = byNumber || byLetter;
      if (letter) { e.preventDefault(); pick(letter); }
    });

    if (prior) paint(prior.picked, false);
    navButtons();

    // Warm the next few so the click that moves on has its key already. Three is
    // enough to hide the round trip without pulling questions the student may
    // never reach — every id fetched is a id spent against the hourly budget.
    if (!deferred) Keys.prefetch(order.slice(pos + 1, pos + 4));

    /* `announce` is false when we are only restoring a screen the student has
       already seen — re-firing the aria-live region on every back-navigation
       would read the whole explanation out again. */
    function paint(letter, announce) {
      if (deferred) {
        // Exam conditions: show what was picked, never whether it was right.
        body.querySelectorAll(".option").forEach(btn =>
          btn.classList.toggle("picked", btn.dataset.letter === letter));
        return;
      }
      body.querySelectorAll(".option").forEach(btn => {
        btn.disabled = true;
        const l = btn.dataset.letter;
        if (l === key.answer) btn.classList.add("correct");
        else if (l === letter) btn.classList.add("wrong");
        else btn.classList.add("dim");
      });

      const fb = $("#feedback", body);
      if (letter === key.answer) {
        fb.innerHTML = `<div class="feedback good">
          <p class="verdict">✓ Correct</p>
          <p>${MD.inline(key.explanation)}</p>
          ${licensedNote()}
        </div>`;
      } else {
        const diag = key.diagnostics[letter] || "";
        fb.innerHTML = `<div class="feedback bad">
          <p class="verdict">✗ Not quite — the answer is (${key.answer})</p>
          <p class="diag">What this mistake means: ${MD.inline(diag)}</p>
          <p>${MD.inline(key.explanation)}</p>
          <a class="review-link" href="${ctx.learnHref(item)}" data-review="${key.review}">
            → Re-read section ${key.review} in the notes</a>
          ${licensedNote()}
        </div>`;
        const link = fb.querySelector("[data-review]");
        link.addEventListener("click", () => {
          sessionStorage.setItem("lhs-scroll", "sec-" + key.review.replace(".", "-"));
        });
      }
      if (announce) fb.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    function navButtons() {
      const nav = $("#quiz-nav", body);
      const answered = !!ctx.read(qid);

      if (!deferred) {
        // Nothing to press until the student has committed to an answer.
        if (!answered) { nav.innerHTML = ""; return; }
        const next = order.find(id => !ctx.read(id));
        nav.innerHTML = `<button class="btn" id="next-q">${
          next ? "Next question →" : "See results →"}</button>`;
        $("#next-q", nav).addEventListener("click", () => next ? showQuestion(next) : ctx.onFinish());
        return;
      }

      const last = pos === total - 1;
      nav.innerHTML = `
        ${pos > 0 ? `<button class="btn secondary" id="prev-q">← Previous</button>` : ""}
        <button class="btn" id="next-q">${last ? "Finish and submit →" : "Next question →"}</button>
        ${last ? "" : `<button class="btn secondary" id="submit-now">Submit</button>`}`;
      const prev = $("#prev-q", nav);
      if (prev) prev.addEventListener("click", () => showQuestion(order[pos - 1]));
      $("#next-q", nav).addEventListener("click", () =>
        last ? ctx.onFinish() : showQuestion(order[pos + 1]));
      const now = $("#submit-now", nav);
      if (now) now.addEventListener("click", () => ctx.onFinish());
    }

    function pick(letter) {
      const first = !ctx.read(qid);
      // Under exam conditions the browser does not know the answer yet, so it
      // records the pick alone; the whole paper is marked in one call on submit.
      ctx.write(qid, deferred ? { picked: letter } : { picked: letter, correct: letter === key.answer });
      paint(letter, true);
      navButtons();

      // In an exam a fresh answer moves on by itself — 48 questions is a lot of
      // clicking otherwise. Changing an existing answer stays put, because the
      // student navigated back here on purpose.
      if (deferred && first && pos < total - 1) return showQuestion(order[pos + 1]);

      const next = $("#next-q", body);
      // preventScroll: a plain focus() yanked the page down ~280px on every
      // answer, throwing the feedback the student is reading off screen.
      if (next) next.focus({ preventScroll: true });
    }
  }
}

/* The module quiz. It speaks qualified ids like every other screen — the key
 * store is course-wide — while progress stays keyed by the local id, so nothing
 * already saved in localStorage changes shape. */
async function runMcq(m, q, body) {
  const p = Store.module(m.id);
  const total = q.mcq.length;
  if (!p.flagged) p.flagged = {};
  const local = qid => qid.split(":")[1];
  const order = q.mcq.map(x => qualify(m.id, x.id));

  playMcq({
    items: q.mcq.map(x => ({ ...x, id: qualify(m.id, x.id), localId: x.id, modId: m.id })),
    feedback: "instant",
    read: qid => p.mcq[local(qid)],
    write: (qid, entry) => { p.mcq[local(qid)] = entry; Store.save(); renderNav(m.id); },
    isFlagged: qid => !!p.flagged[local(qid)],
    toggleFlag: qid => {
      const id = local(qid);
      p.flagged[id] = !p.flagged[id];
      Store.save();
      return !!p.flagged[id];
    },
    learnHref: () => `#/${m.id}/learn`,
    onFinish: showResults,
  }, body);

  function showResults() {
    QuizKeys.clear();
    const entries = order.map(id => ({ id, ...p.mcq[local(id)] }));
    const correct = entries.filter(e => e.correct).length;
    const missed = entries.filter(e => !e.correct).map(e => e.id);
    const flagged = order.filter(id => p.flagged[local(id)]);
    // Proportional, so the thresholds still make sense if a module ever ships
    // a quiz that is not 18 questions long. At 18 these are 16 and 13.
    const pass = Math.ceil(0.72 * total);
    const verdict =
      correct >= Math.ceil(0.88 * total) ? "Solid — you're ready to move on." :
      correct >= pass ? "Good, but review your weak topics below." :
      `Below ${pass} — re-read the notes before moving to the next module.`;

    body.innerHTML = `
      ${noticeBar()}
      <div class="card">
        <div class="score-hero">
          <div><span class="big">${correct}</span><span class="of"> / ${total}</span></div>
          <p>${verdict}</p>
        </div>
      </div>
      <div class="card">
        <h3>By topic</h3>
        <div id="topic-summary"></div>
      </div>
      ${weakSections(missed)}
      <div class="quiz-nav">
        ${missed.length ? `<button class="btn" id="retry-missed">Retry the ${missed.length} you missed</button>` : ""}
        ${flagged.length ? `<button class="btn secondary" id="retry-flagged">Retry ${flagged.length} flagged</button>` : ""}
        <button class="btn secondary" id="retry-all">Start over</button>
        <button class="btn secondary" id="back-to-practice">Back to practice</button>
      </div>`;

    renderTopicSummary(m, q, $("#topic-summary", body));
    body.querySelectorAll("[data-review]").forEach(a =>
      a.addEventListener("click", () =>
        sessionStorage.setItem("lhs-scroll", "sec-" + a.dataset.review.replace(".", "-"))));

    const rm = $("#retry-missed", body);
    if (rm) rm.addEventListener("click", () => {
      missed.forEach(id => delete p.mcq[local(id)]);
      Store.save();
      runMcq(m, q, body);
    });
    const rf = $("#retry-flagged", body);
    if (rf) rf.addEventListener("click", () => {
      flagged.forEach(id => delete p.mcq[local(id)]);
      Store.save();
      runMcq(m, q, body);
    });
    $("#retry-all", body).addEventListener("click", () => {
      p.mcq = {}; Store.save(); renderNav(m.id);
      runMcq(m, q, body);
    });
    $("#back-to-practice", body).addEventListener("click", () => {
      quizMode(false);
      go(`#/${m.id}/practice`);
    });
  }
}

/* The answer key already names the notes section behind every question
 * (`review`), so the sections a student actually lost marks on fall out of the
 * missed list — a concrete reading assignment instead of "review your weak topics".
 *
 * `missed` is a list of qualified ids, so the exam and the review pass can list
 * sections from twelve modules in one block. */
function weakSections(missed, limit = 4) {
  if (!missed.length) return "";
  const count = {};
  missed.forEach(id => {
    // Only questions the student has actually answered reach this screen, so
    // their keys are in the store; anything else is simply left out.
    const ref = (Keys.get(id) || {}).review;
    if (!ref) return;
    const k = `${modOfQid(id)}|${ref}`;
    count[k] = (count[k] || 0) + 1;
  });
  const top = Object.entries(count).sort((a, b) => b[1] - a[1]).slice(0, limit);
  if (!top.length) return "";
  const many = new Set(top.map(([k]) => k.split("|")[0])).size > 1;
  return `
    <div class="card">
      <h3>Re-read these first</h3>
      <p class="muted">The sections behind the questions you missed.</p>
      <div class="weak-list">
        ${top.map(([k, n]) => {
          const [modId, ref] = k.split("|");
          const mod = MODULES.find(x => x.id === modId);
          return `
          <a class="weak-row" href="#/${modId}/learn" data-review="${ref}">
            <span class="weak-sec">${many && mod ? `Module ${mod.num} · ` : ""}Section ${ref}</span>
            <span class="weak-n">${n} question${n > 1 ? "s" : ""} missed</span>
            <span class="weak-go">→</span>
          </a>`;
        }).join("")}
      </div>
    </div>`;
}

/* ---------- written questions (Parts B & C) ---------- */

/* Twelve written items rendered open at once made the practice tab thousands of
 * pixels tall and impossible to scan. They now collapse to one row each; the
 * editor is built the first time a row is opened. */
function renderWritten(m, q, kind) {
  const holder = kind === "short" ? $("#short-list") : $("#ext-list");
  const items = kind === "short" ? q.short : q.extended;
  const p = Store.module(m.id);

  holder.innerHTML = items.map(item => {
    const st = p.written[item.id] || {};
    const started = st.text || (st.parts && Object.values(st.parts).some(Boolean));
    const state = st.revealed ? "checked" : started ? "draft" : "";
    return `<div class="written-card ${state}" id="wc-${item.id}">
      <button class="w-head" aria-expanded="false" aria-controls="wbody-${item.id}"
              aria-label="${item.id}: ${stripMd(item.title || item.intro || item.prompt).slice(0, 90)}">
        <span class="w-id">${item.id}</span>
        <span class="w-prompt">${item.title ? `<em>${item.title}.</em> ` : ""}${MD.inline(item.intro || item.prompt)}</span>
        <span class="w-state">${st.revealed ? "✓ checked" : started ? "draft" : ""}</span>
        <span class="w-caret">▾</span>
      </button>
      <div class="w-body" id="wbody-${item.id}" hidden></div>
    </div>`;
  }).join("");

  items.forEach(item => {
    const card = $(`#wc-${item.id}`, holder);
    const head = $(".w-head", card);
    const bodyEl = $(`#wbody-${item.id}`, card);
    let built = false;
    head.addEventListener("click", () => {
      const open = card.classList.toggle("open");
      head.setAttribute("aria-expanded", String(open));
      bodyEl.hidden = !open;
      if (open && !built) { built = true; renderWrittenBody(m, item, kind); }
    });
  });
}

function renderWrittenBody(m, item, kind) {
  const p = Store.module(m.id);
  const st = p.written[item.id] || (p.written[item.id] = {});
  const el = $(`#wbody-${item.id}`);

  if (kind === "short") {
    el.innerHTML = `
      <textarea placeholder="Write your answer in full sentences…">${st.text || ""}</textarea>
      <div class="row-gap">
        <button class="btn secondary" id="reveal-${item.id}">
          ${st.revealed ? "Marking checklist below" : "Mark my answer"}</button>
      </div>
      <div id="model-${item.id}"></div>`;
  } else {
    el.innerHTML = item.parts.map(part => `
      <div class="part-block">
        <div class="p-prompt">${part.id}) ${MD.inline(part.prompt)}</div>
        <textarea placeholder="Your answer…" data-part="${part.id}">${(st.parts && st.parts[part.id]) || ""}</textarea>
      </div>`).join("") + `
      <div class="row-gap">
        <button class="btn secondary" id="reveal-${item.id}">
          ${st.revealed ? "Marking checklist below" : "Mark my answers"}</button>
      </div>
      <div id="model-${item.id}"></div>`;
  }

  const card = $(`#wc-${item.id}`);
  const markCardState = () => {
    const started = st.text || (st.parts && Object.values(st.parts).some(Boolean));
    card.classList.toggle("checked", !!st.revealed);
    card.classList.toggle("draft", !st.revealed && !!started);
    $(".w-state", card).textContent = st.revealed ? "✓ checked" : started ? "draft" : "";
  };

  el.querySelectorAll("textarea").forEach(ta =>
    ta.addEventListener("input", () => {
      if (kind === "short") st.text = ta.value;
      else { st.parts = st.parts || {}; st.parts[ta.dataset.part] = ta.value; }
      Store.save();
      markCardState();
    }));

  $(`#reveal-${item.id}`).addEventListener("click", async () => {
    st.revealed = true;
    Store.save();
    markCardState();
    await showModel(m, item, kind, st);
    $(`#reveal-${item.id}`).textContent = "Marking checklist below";
  });

  if (st.revealed) showModel(m, item, kind, st);
}

/* One written item's mark scheme and model answer — never the module's. Marking
 * yourself against B3 must not also hand over B1, B2 and every extended question
 * the student has not looked at yet. */
async function showModel(m, item, kind, st) {
  const box = $(`#model-${item.id}`);
  box.innerHTML = `<p class="muted">Loading the mark scheme…</p>`;
  let key;
  try {
    key = await Api.getWritten(m.id, item.id, kind);
  } catch (e) {
    return renderBlocked(box, e, () => showModel(m, item, kind, st));
  }
  st.checks = st.checks || {};

  /* Marking checklist first, model answer second. Reading a polished model
     before self-marking makes everyone believe they wrote it; ticking the
     criteria off your own words first is what actually finds the gaps. */
  if (kind === "short") {
    box.innerHTML = `
      <div class="model-box">
        <div class="m-label">Mark yourself — did you state:</div>
        <div class="marks-list">
          ${key.marks.map((mark, i) => `
            <label><input type="checkbox" data-i="${i}" ${st.checks[i] ? "checked" : ""}> ${MD.inline(mark)}</label>`).join("")}
        </div>
        <div class="self-score" id="ss-${item.id}"></div>
        <div class="row-gap">
          <button class="btn secondary" id="model-toggle-${item.id}">
            ${st.modelShown ? "Hide model answer" : "Show model answer"}</button>
        </div>
        <div class="model-text" id="model-text-${item.id}" ${st.modelShown ? "" : "hidden"}>
          <div class="m-label">Model answer</div>
          ${MD.render(key.model)}
        </div>
        <a class="review-link" href="#/${m.id}/learn" data-review="${key.review}">→ Related notes: section ${key.review}</a>
        ${licensedNote()}
      </div>`;
    wireChecks(box, st, key.marks.length, item.id, key.review);
  } else {
    const allMarks = [];
    box.innerHTML = `
      <div class="model-box">
        ${item.parts.map(part => {
          const pk = key.parts[part.id];
          const start = allMarks.length;
          pk.marks.forEach(mk => allMarks.push(mk));
          return `
            <div class="m-label${part.id === "a" ? "" : " stack-top"}">Part ${part.id}) — did you state:</div>
            <div class="marks-list">
              ${pk.marks.map((mark, j) => `
                <label><input type="checkbox" data-i="${start + j}" ${st.checks[start + j] ? "checked" : ""}> ${MD.inline(mark)}</label>`).join("")}
            </div>`;
        }).join("")}
        <div class="self-score" id="ss-${item.id}"></div>
        <div class="row-gap">
          <button class="btn secondary" id="model-toggle-${item.id}">
            ${st.modelShown ? "Hide model answers" : "Show model answers"}</button>
        </div>
        <div class="model-text" id="model-text-${item.id}" ${st.modelShown ? "" : "hidden"}>
          ${item.parts.map(part => `
            <div class="m-label${part.id === "a" ? "" : " stack-top"}">Part ${part.id}) — model answer</div>
            ${MD.render(key.parts[part.id].model)}`).join("")}
        </div>
        <a class="review-link" href="#/${m.id}/learn" data-review="${key.review}">→ Related notes: section ${key.review}</a>
        ${licensedNote()}
      </div>`;
    wireChecks(box, st, allMarks.length, item.id, key.review);
  }

  const toggle = $(`#model-toggle-${item.id}`, box);
  const text = $(`#model-text-${item.id}`, box);
  toggle.addEventListener("click", () => {
    st.modelShown = !st.modelShown;
    Store.save();
    text.hidden = !st.modelShown;
    const plural = kind === "short" ? "answer" : "answers";
    toggle.textContent = st.modelShown ? `Hide model ${plural}` : `Show model ${plural}`;
  });
}

function wireChecks(box, st, totalMarks, itemId, review) {
  const scoreEl = $(`#ss-${itemId}`, box);
  const update = () => {
    const got = Object.values(st.checks).filter(Boolean).length;
    scoreEl.textContent = `Self-score: ${got} / ${totalMarks} marking points`;
  };
  box.querySelectorAll("input[type=checkbox]").forEach(cb =>
    cb.addEventListener("change", () => {
      st.checks[cb.dataset.i] = cb.checked;
      Store.save();
      update();
    }));
  update();
  const link = box.querySelector("[data-review]");
  if (link) link.addEventListener("click", () => {
    sessionStorage.setItem("lhs-scroll", "sec-" + review.replace(".", "-"));
  });
}

route();

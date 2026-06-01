import { executionBlockers, payload, riskMap, savingsOwners, summary, takeoutQueue, verification } from "./verticalBriefService.js";

const productTitle = "Board Cost Takeout Command Center";
const domain = "https://takeout.kineticgain.com";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function shell(title: string, path: string, body: string, description: string) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)} · Kinetic Gain</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <style>
      :root {
        color-scheme: dark;
        --bg: #07111d;
        --panel: #0d1a2b;
        --panel-2: #102032;
        --border: rgba(103, 224, 190, 0.22);
        --text: #edf2ff;
        --muted: #9fb0cf;
        --accent: #67e0be;
        --accent-2: #7dc4ff;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: "Segoe UI", system-ui, sans-serif;
        background:
          radial-gradient(circle at top left, rgba(125, 196, 255, 0.12), transparent 30%),
          linear-gradient(180deg, #050c16 0%, var(--bg) 100%);
        color: var(--text);
      }
      a { color: var(--accent-2); text-decoration: none; }
      .wrap { max-width: 1180px; margin: 0 auto; padding: 32px 24px 64px; }
      .hero, .section {
        background: linear-gradient(180deg, rgba(14, 28, 45, 0.95), rgba(10, 19, 33, 0.98));
        border: 1px solid var(--border);
        border-radius: 28px;
        padding: 28px;
        box-shadow: 0 18px 60px rgba(2, 7, 16, 0.35);
      }
      .hero { margin-bottom: 24px; }
      .eyebrow {
        display: inline-block;
        padding: 10px 16px;
        border-radius: 999px;
        border: 1px solid var(--border);
        background: rgba(103, 224, 190, 0.08);
        color: var(--accent);
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.28em;
      }
      h1, h2 { margin: 18px 0 12px; font-family: Georgia, serif; line-height: 0.95; }
      h1 { font-size: clamp(56px, 8vw, 92px); max-width: 980px; }
      h2 { font-size: clamp(36px, 4vw, 54px); }
      .lede { color: var(--muted); font-size: 20px; line-height: 1.6; max-width: 920px; }
      .nav { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 22px; }
      .nav a {
        padding: 10px 14px;
        border: 1px solid rgba(125, 196, 255, 0.18);
        border-radius: 999px;
        color: var(--muted);
      }
      .nav a.active { color: var(--text); border-color: var(--accent); background: rgba(103, 224, 190, 0.08); }
      .metrics, .grid {
        display: grid;
        gap: 18px;
      }
      .metrics { grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); margin-top: 26px; }
      .metric, .card, .table-wrap {
        background: rgba(16, 32, 50, 0.76);
        border: 1px solid rgba(125, 196, 255, 0.12);
        border-radius: 22px;
        padding: 18px;
      }
      .metric-label, .chip {
        color: var(--accent);
        text-transform: uppercase;
        letter-spacing: 0.18em;
        font-size: 12px;
      }
      .metric-value { display: block; font-size: 40px; font-weight: 700; margin-top: 10px; }
      .metric-copy { margin-top: 10px; color: var(--muted); line-height: 1.5; }
      .section { margin-top: 24px; }
      .grid { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
      .card h3 { margin: 12px 0 10px; font-size: 30px; line-height: 1.05; }
      .card p, li { color: var(--muted); line-height: 1.6; }
      .table-wrap { overflow-x: auto; }
      table { width: 100%; border-collapse: collapse; }
      th, td { text-align: left; padding: 12px; border-bottom: 1px solid rgba(125, 196, 255, 0.12); vertical-align: top; }
      th { color: var(--accent); font-size: 12px; text-transform: uppercase; letter-spacing: 0.18em; }
      ul { padding-left: 20px; }
      pre {
        white-space: pre-wrap;
        overflow-wrap: anywhere;
        color: var(--muted);
        background: rgba(7, 17, 29, 0.75);
        border: 1px solid rgba(125, 196, 255, 0.12);
        border-radius: 18px;
        padding: 18px;
      }
      .footer {
        margin-top: 24px;
        color: var(--muted);
        font-size: 14px;
        display: flex;
        gap: 18px;
        flex-wrap: wrap;
      }
    </style>
  </head>
  <body>
    <div class="wrap">
      ${body}
      <div class="footer">
        <span>${productTitle}</span>
        <a href="${domain}">${domain.replace("https://", "")}</a>
        <a href="https://github.com/mizcausevic-dev/">GitHub</a>
        <a href="https://www.linkedin.com/in/mirzacausevic/">LinkedIn</a>
        <a href="https://kineticgain.com/">Kinetic Gain</a>
      </div>
    </div>
  </body>
</html>`;
}

function navLinks(path: string) {
  return [
    ["/", "Overview"],
    ["/takeout-queue", "Takeout queue"],
    ["/savings-owners", "Savings owners"],
    ["/execution-blockers", "Execution blockers"],
    ["/verification", "Verification"],
    ["/docs", "Docs"]
  ]
    .map(([href, label]) => {
      const active = href === path ? ' class="active"' : "";
      return `<a${active} href="${href}">${label}</a>`;
    })
    .join("");
}

export function renderOverview() {
  const executiveSummary = summary();
  const lanes = takeoutQueue().slice(0, 4);
  const findings = riskMap().slice(0, 5);
  const cards = lanes
    .map(
      (item) => `<article class="card">
        <div class="chip">${escapeHtml(item.action)}</div>
        <h3>${escapeHtml(item.spendCategory)}</h3>
        <p><strong>Audience:</strong> ${escapeHtml(item.audience)}</p>
        <p><strong>Theme:</strong> ${escapeHtml(item.takeoutTheme)}</p>
        <p>${escapeHtml(item.recommendedMove)}</p>
      </article>`
    )
    .join("");

  const risks = findings
    .map((item) => `<li><strong>${escapeHtml(item.severity.toUpperCase())}</strong> · ${escapeHtml(item.message)}</li>`)
    .join("");

  return shell(
    productTitle,
    "/",
    `<section class="hero">
      <span class="eyebrow">Board Cost Takeout</span>
      <h1>Where can leadership cut, consolidate, protect, or hold to take cost out cleanly?</h1>
      <p class="lede">Board Cost Takeout Command Center turns AI, identity, revenue, FinTech, biotech, procurement, and public-sector complexity into one board-readable takeout packet.</p>
      <div class="nav">${navLinks("/")}</div>
      <div class="metrics">
        <div class="metric"><span class="metric-label">Takeout lanes</span><span class="metric-value">${executiveSummary.items}</span><div class="metric-copy">Modeled lanes in the current board takeout packet.</div></div>
        <div class="metric"><span class="metric-label">Savings realization</span><span class="metric-value">${executiveSummary.averageSavingsRealizationScore}</span><div class="metric-copy">Average ability to land savings cleanly across the current queue.</div></div>
        <div class="metric"><span class="metric-label">Protected lanes</span><span class="metric-value">${executiveSummary.protectedLanes}</span><div class="metric-copy">Lanes leadership should defend from crude cost-takeout pressure.</div></div>
        <div class="metric"><span class="metric-label">Annual savings</span><span class="metric-value">$${executiveSummary.annualSavingsMillions}M</span><div class="metric-copy">Modeled annual savings across the current takeout queue.</div></div>
      </div>
    </section>
    <section class="section">
      <h2>Takeout queue</h2>
      <div class="grid">${cards}</div>
    </section>
    <section class="section">
      <h2>Takeout findings</h2>
      <ul>${risks}</ul>
    </section>`,
    "Board-ready surface for cost takeout, savings ownership, and execution blockers across the executive estate."
  );
}

export function renderTakeoutQueue() {
  const rows = takeoutQueue()
    .map(
      (item) => `<tr>
        <td>${escapeHtml(item.owner)}</td>
        <td>${escapeHtml(item.audience)}</td>
        <td>${escapeHtml(item.action)}</td>
        <td>${escapeHtml(item.spendCategory)}</td>
        <td>${escapeHtml(item.takeoutTheme)}</td>
      </tr>`
    )
    .join("");

  return shell(
    "Takeout queue",
    "/takeout-queue",
    `<section class="hero">
      <span class="eyebrow">Takeout queue</span>
      <h1>Every takeout move stays tied to one audience, one spend category, and one savings theme.</h1>
      <p class="lede">The takeout queue keeps cut, consolidate, protect, and hold decisions readable instead of scattering them across disconnected budget arguments.</p>
      <div class="nav">${navLinks("/takeout-queue")}</div>
    </section>
    <section class="section table-wrap">
      <table>
        <thead><tr><th>Owner</th><th>Audience</th><th>Action</th><th>Spend category</th><th>Theme</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </section>`,
    "Takeout queue showing audience, spend category, and next move."
  );
}

export function renderSavingsOwners() {
  const rows = savingsOwners()
    .map(
      (item) => `<tr>
        <td>${escapeHtml(item.owner)}</td>
        <td>${escapeHtml(item.audience)}</td>
        <td>${escapeHtml(item.action)}</td>
        <td>${item.savingsRealizationScore}</td>
        <td>${item.ownerClarityScore}</td>
        <td>$${item.annualSavingsMillions}M</td>
      </tr>`
    )
    .join("");

  return shell(
    "Savings owners",
    "/savings-owners",
    `<section class="hero">
      <span class="eyebrow">Savings owners</span>
      <h1>See who owns the takeout motion and whether leadership can trust the savings path.</h1>
      <p class="lede">This view keeps realization score, owner clarity, and annual savings together so the board can separate credible takeout from hand-wavy cuts.</p>
      <div class="nav">${navLinks("/savings-owners")}</div>
    </section>
    <section class="section table-wrap">
      <table>
        <thead><tr><th>Owner</th><th>Audience</th><th>Action</th><th>Savings realization</th><th>Owner clarity</th><th>Annual savings</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </section>`,
    "Savings-owner view for realization scores, ownership clarity, and annual savings."
  );
}

export function renderExecutionBlockers() {
  const rows = executionBlockers()
    .map(
      (item) => `<tr>
        <td>${escapeHtml(item.owner)}</td>
        <td>${escapeHtml(item.audience)}</td>
        <td>${item.continuityRiskScore}</td>
        <td>${item.boardDefensibilityScore}</td>
        <td>${item.urgencyScore}</td>
      </tr>`
    )
    .join("");
  const notes = verification().map((item) => `<li>${escapeHtml(item)}</li>`).join("");

  return shell(
    "Execution blockers",
    "/execution-blockers",
    `<section class="hero">
      <span class="eyebrow">Execution blockers</span>
      <h1>Continuity risk, board defensibility, and urgency stay visible in one blocker view.</h1>
      <p class="lede">The execution-blockers route shows which lanes are hard to cut cleanly and where the board still needs tighter proof before approving takeout.</p>
      <div class="nav">${navLinks("/execution-blockers")}</div>
    </section>
    <section class="section table-wrap">
      <table>
        <thead><tr><th>Owner</th><th>Audience</th><th>Continuity risk</th><th>Board defensibility</th><th>Urgency</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </section>
    <section class="section">
      <h2>Verification</h2>
      <ul>${notes}</ul>
    </section>`,
    "Execution-blockers view for continuity risk, board defensibility, and urgency."
  );
}

export function renderVerification() {
  const notes = verification().map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  return shell(
    "Verification",
    "/verification",
    `<section class="hero">
      <span class="eyebrow">Verification</span>
      <h1>How this cost-takeout packet is modeled and what it is safe to infer from it.</h1>
      <p class="lede">This route keeps the synthetic nature, proof boundaries, and reproducibility notes visible before anyone treats the sample as live board advice.</p>
      <div class="nav">${navLinks("/verification")}</div>
    </section>
    <section class="section">
      <ul>${notes}</ul>
    </section>`,
    "Verification notes for the Board Cost Takeout Command Center sample and modeled outputs."
  );
}

export function renderDocs() {
  return shell(
    "Docs",
    "/docs",
    `<section class="hero">
      <span class="eyebrow">Docs</span>
      <h1>Board Cost Takeout Command Center docs</h1>
      <p class="lede">This surface packages board-readable cost-takeout decisions into reproducible routes and JSON outputs.</p>
      <div class="nav">${navLinks("/docs")}</div>
    </section>
    <section class="section">
      <ul>
        <li><code>/takeout-queue</code> keeps audiences, spend categories, actions, and next moves readable.</li>
        <li><code>/savings-owners</code> compares realization score, owner clarity, and annual savings.</li>
        <li><code>/execution-blockers</code> shows continuity risk, board defensibility, and urgency.</li>
        <li><code>/api/payload</code> exposes the reproducible takeout packet.</li>
      </ul>
      <pre>${escapeHtml(JSON.stringify(payload(), null, 2))}</pre>
    </section>`,
    "Product documentation for Board Cost Takeout Command Center and its board-takeout routes."
  );
}

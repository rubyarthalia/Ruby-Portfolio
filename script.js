/**
 * script.js — Portfolio
 * Modules:
 *  1. PROJECT DATA  — edit this to add/update your projects
 *  2. GITHUB STATS  — live star/fork counts via GitHub API
 *  3. RENDER        — builds project cards (bjornmelin-style)
 *  4. FILTER        — type, language, search + live count
 *  5. THEME TOGGLE  — dark ↔ light, persisted to localStorage
 *  6. NAV           — sticky header + active link on scroll
 *  7. MOBILE DRAWER — hamburger open/close
 *  8. SCROLL REVEAL — IntersectionObserver fade-in
 *  9. CONTACT FORM  — Formspree async submit
 */


/* ══════════════════════════════════════════════
   1. PROJECT DATA
   ─────────────────────────────────────────────
   Fill in your real GitHub repos in `repo`.
   The script will fetch live star/fork counts.
   Set repo: null to skip GitHub stats for a project.

   Fields:
     id        — unique number
     featured  — adds "Featured" badge
     type      — "analyst" | "develop"
     langs     — filter keys: "python" | "sql" | "r"
     title     — display title
     desc      — one-paragraph description
     bullets   — 2 key highlights (shown in card)
     tags      — tech stack tags
     repo      — "owner/reponame" (for GitHub API) or null
     demo      — live demo URL or null
     ghUrl     — full GitHub URL (shown as Open link)
══════════════════════════════════════════════ */
const PROJECTS = [
  {
    id: 1, featured: true,
    type: "analyst", langs: ["sql", "python"],
    title: "sales-performance-dashboard",
    desc: "End-to-end Power BI dashboard tracking KPIs across 5 regions. Reduced manual reporting by 80% and improved decision-making speed for stakeholders.",
    bullets: [
      "Automated data refresh pipeline connecting SQL Server → Power BI",
      "DAX measures for YoY growth, rolling averages, and forecast variance"
    ],
    tags: ["Power BI", "SQL", "Python", "DAX", "Pandas"],
    repo: "yourusername/sales-performance-dashboard",
    demo: null,
    ghUrl: "https://github.com/yourusername/sales-performance-dashboard"
  },
  {
    id: 2, featured: true,
    type: "develop", langs: ["python"],
    title: "customer-churn-prediction",
    desc: "Random Forest + Logistic Regression model predicting customer churn with 89% accuracy. Deployed as an interactive Streamlit app for non-technical users.",
    bullets: [
      "Feature engineering on 20+ customer behavioral variables",
      "Streamlit dashboard with real-time prediction and SHAP explainability"
    ],
    tags: ["Python", "Scikit-learn", "Streamlit", "Pandas", "SHAP"],
    repo: "yourusername/customer-churn-prediction",
    demo: null,
    ghUrl: "https://github.com/yourusername/customer-churn-prediction"
  },
  {
    id: 3, featured: false,
    type: "analyst", langs: ["python", "sql"],
    title: "ecommerce-rfm-segmentation",
    desc: "Customer segmentation using Recency-Frequency-Monetary analysis on 100k+ transactions. Results visualized in an interactive Tableau dashboard.",
    bullets: [
      "RFM scoring pipeline processing 100k+ transaction records",
      "Tableau dashboard with dynamic segment drilldowns"
    ],
    tags: ["Python", "SQL", "Tableau", "NumPy", "Pandas"],
    repo: "yourusername/ecommerce-rfm-segmentation",
    demo: null,
    ghUrl: "https://github.com/yourusername/ecommerce-rfm-segmentation"
  },
  {
    id: 4, featured: false,
    type: "develop", langs: ["python", "sql"],
    title: "job-listings-scraper",
    desc: "Automated web scraping pipeline collecting job listing data from 3 platforms, storing results to PostgreSQL and sending daily digest emails.",
    bullets: [
      "Scrapers for 3 Indonesian job platforms with deduplication logic",
      "Airflow DAG scheduling daily runs with email alerts on failures"
    ],
    tags: ["Python", "BeautifulSoup", "PostgreSQL", "Airflow"],
    repo: "yourusername/job-listings-scraper",
    demo: null,
    ghUrl: "https://github.com/yourusername/job-listings-scraper"
  },
  {
    id: 5, featured: false,
    type: "analyst", langs: ["python", "r"],
    title: "idx-stock-eda",
    desc: "Exploratory analysis on Indonesian Stock Exchange (IDX) data including correlation heatmaps, rolling averages, and sector volatility comparison.",
    bullets: [
      "Cleaned and processed 5 years of IDX OHLCV data",
      "Interactive Plotly charts with rolling correlation and Bollinger Bands"
    ],
    tags: ["Python", "R", "Plotly", "Pandas", "Statsmodels"],
    repo: "yourusername/idx-stock-eda",
    demo: null,
    ghUrl: "https://github.com/yourusername/idx-stock-eda"
  },
  {
    id: 6, featured: false,
    type: "analyst", langs: ["sql"],
    title: "hospital-wait-time-analytics",
    desc: "SQL-based patient flow analysis identifying operational bottlenecks. Findings contributed to a 22% reduction in average patient wait times.",
    bullets: [
      "Window functions to calculate patient flow and queue build-up by hour",
      "Power BI report highlighting peak bottleneck windows for management"
    ],
    tags: ["SQL", "Power BI", "Excel"],
    repo: "yourusername/hospital-wait-time-analytics",
    demo: null,
    ghUrl: "https://github.com/yourusername/hospital-wait-time-analytics"
  },
  {
    id: 7, featured: false,
    type: "develop", langs: ["python"],
    title: "sentiment-analysis-reviews",
    desc: "NLP pipeline classifying Indonesian-language product reviews using a fine-tuned IndoBERT model, achieving 91% F1-score on the held-out test set.",
    bullets: [
      "Fine-tuned IndoBERT on 15k labeled Indonesian reviews",
      "Inference API built with FastAPI for real-time classification"
    ],
    tags: ["Python", "HuggingFace", "PyTorch", "FastAPI", "BERT"],
    repo: "yourusername/sentiment-analysis-reviews",
    demo: null,
    ghUrl: "https://github.com/yourusername/sentiment-analysis-reviews"
  },
  {
    id: 8, featured: false,
    type: "analyst", langs: ["python", "sql"],
    title: "geospatial-retail-heatmap",
    desc: "Folium + GeoPandas visualization of retail store foot-traffic patterns in Surabaya. Used by management to identify optimal expansion locations.",
    bullets: [
      "Processed GPS check-in data with GeoPandas spatial joins",
      "Folium choropleth heatmap with district-level density overlays"
    ],
    tags: ["Python", "GeoPandas", "Folium", "SQL", "Plotly"],
    repo: "yourusername/geospatial-retail-heatmap",
    demo: null,
    ghUrl: "https://github.com/yourusername/geospatial-retail-heatmap"
  },
];


/* ══════════════════════════════════════════════
   2. GITHUB STATS — live fetch via public API
   Fetches stars + forks for each project repo.
   Gracefully falls back (no stats shown) if repo
   is private, doesn't exist, or rate-limited.
══════════════════════════════════════════════ */

// Cache fetched stats to avoid re-fetching
const ghCache = {};

async function fetchGhStats(repoPath) {
  if (!repoPath) return null;
  if (ghCache[repoPath]) return ghCache[repoPath];
  try {
    const res = await fetch(`https://api.github.com/repos/${repoPath}`, {
      headers: { Accept: "application/vnd.github.v3+json" }
    });
    if (!res.ok) return null;
    const data = await res.json();
    const stats = {
      stars:   data.stargazers_count ?? 0,
      forks:   data.forks_count ?? 0,
      updated: data.pushed_at ? formatDate(data.pushed_at) : null,
    };
    ghCache[repoPath] = stats;
    return stats;
  } catch {
    return null;
  }
}

function formatDate(iso) {
  const d = new Date(iso);
  const now = new Date();
  const diff = Math.floor((now - d) / 86400000); // days
  if (diff === 0) return "Updated today";
  if (diff === 1) return "Updated yesterday";
  if (diff < 30)  return `Updated ${diff} days ago`;
  if (diff < 365) return `Updated ${Math.floor(diff/30)} month${Math.floor(diff/30)>1?'s':''} ago`;
  return `Updated ${d.toLocaleDateString('en-US', { month:'short', year:'numeric' })}`;
}

// Star icon SVG
const starSVG = `<svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
  <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"/>
</svg>`;

// Fork icon SVG
const forkSVG = `<svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
  <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"/>
</svg>`;


/* ══════════════════════════════════════════════
   3. BUILD PROJECT CARD
   Mirrors bjornmelin.io card structure exactly:
   [type · lang · Featured?]
   [title as link]
   [desc]
   [bullet points]
   [tech tags]
   [★ stars  ⑂ forks  Updated X ago]
   [Open]  [Live]
══════════════════════════════════════════════ */
function buildCard(p, stats) {
  const card = document.createElement("article");
  card.className = "proj-card";
  card.dataset.type  = p.type;
  card.dataset.langs = p.langs.join(",");

  // Type row
  const typeLabel = p.type === "analyst" ? "Data Analytics" : "Development";
  const langLabel = p.langs.map(l => l.charAt(0).toUpperCase() + l.slice(1)).join(" · ");
  const featuredBadge = p.featured
    ? `<span class="proj-badge-featured">Featured</span>`
    : "";

  // Stats row
  let statsHTML = "";
  if (stats) {
    statsHTML = `
      <div class="proj-stats">
        <span class="proj-stat stat-stars">${starSVG} ${stats.stars.toLocaleString()}</span>
        <span class="proj-stat stat-forks">${forkSVG} ${stats.forks.toLocaleString()}</span>
        ${stats.updated ? `<span class="proj-stat stat-updated">${stats.updated}</span>` : ""}
      </div>`;
  }

  // Links
  const openLink = p.ghUrl
    ? `<a href="${p.ghUrl}" class="proj-link" target="_blank" rel="noopener">Open</a>`
    : "";
  const liveLink = p.demo
    ? `<a href="${p.demo}" class="proj-link proj-link--primary" target="_blank" rel="noopener">Live</a>`
    : "";

  // Bullets
  const bulletsHTML = p.bullets && p.bullets.length
    ? `<ul class="proj-bullets">${p.bullets.map(b => `<li>${b}</li>`).join("")}</ul>`
    : "";

  card.innerHTML = `
    <div class="proj-type-row">
      <span class="proj-type">${typeLabel}</span>
      <span class="proj-type-sep" aria-hidden="true"></span>
      <span class="proj-type">${langLabel}</span>
      ${featuredBadge ? `<span class="proj-type-sep" aria-hidden="true"></span>${featuredBadge}` : ""}
    </div>
    <a href="${p.ghUrl || "#"}" class="proj-title-link" target="_blank" rel="noopener">${p.title}</a>
    <p class="proj-desc">${p.desc}</p>
    ${bulletsHTML}
    <div class="proj-tags">${p.tags.map(t => `<span class="proj-tag">${t}</span>`).join("")}</div>
    ${statsHTML}
    <div class="proj-links">${openLink}${liveLink}</div>
  `;

  return card;
}

/** Render project list into a grid, fetching GitHub stats for each */
async function renderProjects(list, gridEl) {
  gridEl.innerHTML = "";

  if (!list.length) {
    gridEl.innerHTML = `<div class="no-results">No projects match your current filters.</div>`;
    return;
  }

  // Build cards immediately with placeholder stats, then update with real stats
  const cards = list.map(p => {
    const card = buildCard(p, null);
    gridEl.appendChild(card);
    return { p, card };
  });

  // Fetch stats in parallel and update each card's stats row
  await Promise.all(cards.map(async ({ p, card }) => {
    if (!p.repo) return;
    const stats = await fetchGhStats(p.repo);
    if (!stats) return;

    // Inject stats row just before the links div
    const linksDiv = card.querySelector(".proj-links");
    if (!linksDiv) return;

    const statsDiv = document.createElement("div");
    statsDiv.className = "proj-stats";
    statsDiv.innerHTML = `
      <span class="proj-stat stat-stars">${starSVG} ${stats.stars.toLocaleString()}</span>
      <span class="proj-stat stat-forks">${forkSVG} ${stats.forks.toLocaleString()}</span>
      ${stats.updated ? `<span class="proj-stat stat-updated">${stats.updated}</span>` : ""}
    `;
    card.insertBefore(statsDiv, linksDiv);
  }));
}


/* ══════════════════════════════════════════════
   4. FILTER LOGIC
   Type chips + Language chips + Search input
   Live count updates as filters change
══════════════════════════════════════════════ */
function initProjects() {
  // Home preview — top 3 (featured first)
  const homeGrid = document.getElementById("home-proj-grid");
  if (homeGrid) {
    const top3 = [...PROJECTS].sort((a, b) => b.featured - a.featured).slice(0, 3);
    renderProjects(top3, homeGrid);
  }

  // Full gallery
  const allGrid   = document.getElementById("all-proj-grid");
  if (!allGrid) return;

  const countEl   = document.getElementById("count-num");
  const searchEl  = document.getElementById("proj-search");
  const typeGroup = document.getElementById("type-chips");
  const langGroup = document.getElementById("lang-chips");

  let activeType = "all";
  let activeLang = "all";
  let searchQ    = "";

  function applyFilters() {
    const q = searchQ.toLowerCase().trim();
    const filtered = PROJECTS.filter(p => {
      const typeOk   = activeType === "all" || p.type === activeType;
      const langOk   = activeLang === "all" || p.langs.includes(activeLang);
      const searchOk = !q
        || p.title.toLowerCase().includes(q)
        || p.desc.toLowerCase().includes(q)
        || p.tags.some(t => t.toLowerCase().includes(q));
      return typeOk && langOk && searchOk;
    });

    renderProjects(filtered, allGrid);
    if (countEl) countEl.textContent = filtered.length;
  }

  // Type chip clicks
  typeGroup.addEventListener("click", e => {
    const btn = e.target.closest(".fchip");
    if (!btn) return;
    typeGroup.querySelectorAll(".fchip").forEach(c => {
      c.classList.remove("fchip--on");
      c.setAttribute("aria-checked", "false");
    });
    btn.classList.add("fchip--on");
    btn.setAttribute("aria-checked", "true");
    activeType = btn.dataset.val;
    applyFilters();
  });

  // Language chip clicks
  langGroup.addEventListener("click", e => {
    const btn = e.target.closest(".fchip");
    if (!btn) return;
    langGroup.querySelectorAll(".fchip").forEach(c => {
      c.classList.remove("fchip--on");
      c.setAttribute("aria-checked", "false");
    });
    btn.classList.add("fchip--on");
    btn.setAttribute("aria-checked", "true");
    activeLang = btn.dataset.val;
    applyFilters();
  });

  // Search
  searchEl.addEventListener("input", e => {
    searchQ = e.target.value;
    applyFilters();
  });

  // Initial render
  applyFilters();
}


/* ══════════════════════════════════════════════
   5. THEME TOGGLE — dark ↔ light, persisted
══════════════════════════════════════════════ */
function initTheme() {
  const html  = document.documentElement;
  const btn   = document.getElementById("theme-btn");
  const icon  = document.getElementById("theme-icon");
  const label = document.getElementById("theme-label");

  function setTheme(theme) {
    html.setAttribute("data-theme", theme);
    localStorage.setItem("portfolio-theme", theme);
    if (icon)  icon.textContent  = theme === "dark" ? "☀" : "☾";
    if (label) label.textContent = theme === "dark" ? "Light mode" : "Dark mode";
  }

  // Restore saved preference
  const saved = localStorage.getItem("portfolio-theme");
  if (saved) setTheme(saved);
  else setTheme("dark"); // default dark

  btn?.addEventListener("click", () => {
    const current = html.getAttribute("data-theme");
    setTheme(current === "dark" ? "light" : "dark");
  });
}


/* ══════════════════════════════════════════════
   6. STICKY NAV + ACTIVE LINK
══════════════════════════════════════════════ */
function initNav() {
  const header   = document.getElementById("site-header");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = [...document.querySelectorAll("section[id]")];

  window.addEventListener("scroll", () => {
    // Blur on scroll
    header?.classList.toggle("scrolled", window.scrollY > 20);

    // Active section tracking
    let current = "";
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 80) current = s.id;
    });
    navLinks.forEach(a => {
      a.classList.toggle("active", a.getAttribute("href") === "#" + current);
    });
  }, { passive: true });
}


/* ══════════════════════════════════════════════
   7. MOBILE DRAWER
══════════════════════════════════════════════ */
function initDrawer() {
  const hamburger = document.getElementById("hamburger");
  const drawer    = document.getElementById("nav-drawer");
  const close     = document.getElementById("drawer-close");
  const links     = document.querySelectorAll(".drawer-link");

  const open = () => {
    drawer.classList.add("open");
    drawer.setAttribute("aria-hidden", "false");
    hamburger.setAttribute("aria-expanded", "true");
  };
  const shut = () => {
    drawer.classList.remove("open");
    drawer.setAttribute("aria-hidden", "true");
    hamburger.setAttribute("aria-expanded", "false");
  };

  hamburger?.addEventListener("click", open);
  close?.addEventListener("click", shut);
  links.forEach(a => a.addEventListener("click", shut));
}


/* ══════════════════════════════════════════════
   8. SCROLL REVEAL
══════════════════════════════════════════════ */
function initReveal() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll(".reveal").forEach(el => io.observe(el));
}


/* ══════════════════════════════════════════════
   9. CONTACT FORM — Formspree
   Replace YOUR_FORM_ID in index.html with your
   actual Formspree form ID (free at formspree.io)
══════════════════════════════════════════════ */
function initForm() {
  const form   = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  if (!form) return;

  form.addEventListener("submit", async e => {
    e.preventDefault();
    const btn = document.getElementById("form-submit");
    btn.textContent = "Sending…";
    btn.disabled = true;
    status.className = "form-status";

    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        status.className = "form-status ok";
        status.textContent = "✓ Message sent! I'll get back to you within 24 hours.";
        form.reset();
      } else {
        throw new Error();
      }
    } catch {
      status.className = "form-status err";
      status.textContent = "✕ Something went wrong. Please email me directly.";
    } finally {
      btn.textContent = "Send Message";
      btn.disabled = false;
    }
  });
}


/* ══════════════════════════════════════════════
   INIT
══════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initNav();
  initDrawer();
  initReveal();
  initProjects();
  initForm();
});
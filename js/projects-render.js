/**
 * js/projects-render.js
 * Shared GitHub stats fetcher + project card builder.
 * Loaded by index.html and projects.html.
 */

/* ── GitHub API helpers ── */
const ghCache = {};

async function fetchGhStats(repo) {
  if (!repo) return null;
  if (ghCache[repo]) return ghCache[repo];
  try {
    const res = await fetch(`https://api.github.com/repos/${repo}`, {
      headers: { Accept: "application/vnd.github.v3+json" }
    });
    if (!res.ok) return null;
    const d = await res.json();
    const stats = {
      stars:   d.stargazers_count ?? 0,
      forks:   d.forks_count ?? 0,
      updated: d.pushed_at ? relativeDate(d.pushed_at) : null,
    };
    ghCache[repo] = stats;
    return stats;
  } catch { return null; }
}

function relativeDate(iso) {
  const diff = Math.floor((Date.now() - new Date(iso)) / 86400000);
  if (diff === 0) return "Updated today";
  if (diff === 1) return "Updated yesterday";
  if (diff < 30)  return `Updated ${diff} days ago`;
  if (diff < 365) return `Updated ${Math.floor(diff / 30)} month${Math.floor(diff/30) > 1 ? "s" : ""} ago`;
  return `Updated ${new Date(iso).toLocaleDateString("en-US", { month: "short", year: "numeric" })}`;
}

const STAR_SVG = `<svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"/></svg>`;
const FORK_SVG = `<svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"/></svg>`;

/* ── Card builder ── */
function buildProjectCard(p, stats = null) {
  const card = document.createElement("article");
  card.className = "proj-card";
  card.dataset.type  = p.type;
  card.dataset.langs = p.langs.join(",");

  const typeLabel = p.type === "analyst" ? "Data Analytics" : "Development";
  const langLabel = p.langs.map(l => l.charAt(0).toUpperCase() + l.slice(1)).join(" · ");

  const featuredBadge = p.featured
    ? `<span class="proj-sep" aria-hidden="true"></span><span class="proj-featured-badge">Featured</span>`
    : "";

  const statsHTML = stats ? `
    <div class="proj-stats">
      <span class="proj-stat stat-stars">${STAR_SVG} ${stats.stars.toLocaleString()}</span>
      <span class="proj-stat stat-forks">${FORK_SVG} ${stats.forks.toLocaleString()}</span>
      ${stats.updated ? `<span class="proj-stat stat-updated">${stats.updated}</span>` : ""}
    </div>` : "";

  const bulletsHTML = p.bullets?.length
    ? `<ul class="proj-bullets">${p.bullets.map(b => `<li>${b}</li>`).join("")}</ul>`
    : "";

  const openLink = p.ghUrl
    ? `<a href="${p.ghUrl}" class="proj-link" target="_blank" rel="noopener">Open</a>` : "";
  const liveLink = p.demo
    ? `<a href="${p.demo}" class="proj-link proj-link--primary" target="_blank" rel="noopener">Live</a>` : "";

  card.innerHTML = `
    <div class="proj-type-row">
      <span class="proj-type">${typeLabel}</span>
      <span class="proj-sep" aria-hidden="true"></span>
      <span class="proj-type">${langLabel}</span>
      ${featuredBadge}
    </div>
    <a href="${p.ghUrl || "#"}" class="proj-title-link" target="_blank" rel="noopener">${p.title}</a>
    <p class="proj-desc">${p.desc}</p>
    ${bulletsHTML}
    <div class="proj-tags">${p.tags.map(t => `<span class="proj-tag">${t}</span>`).join("")}</div>
    ${statsHTML}
    <div class="proj-links">${openLink}${liveLink}</div>`;

  return card;
}

/* ── Render list into grid, then fetch + inject live GitHub stats ── */
async function renderProjectGrid(list, gridEl) {
  gridEl.innerHTML = "";
  if (!list.length) {
    gridEl.innerHTML = `<div class="no-results">No projects match your current filters.</div>`;
    return;
  }

  // Render cards immediately (no stats yet)
  const rendered = list.map(p => {
    const card = buildProjectCard(p, null);
    gridEl.appendChild(card);
    return { p, card };
  });

  // Fetch GitHub stats in parallel, inject into each card
  await Promise.all(rendered.map(async ({ p, card }) => {
    if (!p.repo) return;
    const stats = await fetchGhStats(p.repo);
    if (!stats) return;

    const statsDiv = document.createElement("div");
    statsDiv.className = "proj-stats";
    statsDiv.innerHTML = `
      <span class="proj-stat stat-stars">${STAR_SVG} ${stats.stars.toLocaleString()}</span>
      <span class="proj-stat stat-forks">${FORK_SVG} ${stats.forks.toLocaleString()}</span>
      ${stats.updated ? `<span class="proj-stat stat-updated">${stats.updated}</span>` : ""}`;

    const linksDiv = card.querySelector(".proj-links");
    if (linksDiv) card.insertBefore(statsDiv, linksDiv);
  }));
}

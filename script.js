/**
 * portfolio — script.js
 * Handles:
 *  1. Theme toggle (dark ↔ light)
 *  2. Sticky nav + active link on scroll
 *  3. Mobile drawer
 *  4. Scroll-reveal animations
 *  5. Typed hero text
 *  6. Radar chart (SVG, Feature #1)
 *  7. Currently Learning widget (Feature #2)
 *  8. Project data + render (home preview & full gallery)
 *  9. Project filtering (type, language, search) + live count (Feature #3)
 * 10. Contact form (Formspree)
 */


/* ══════════════════════════════════════════════
   1. PROJECT DATA
   Update this array to add / edit your projects.
   Each entry:
     id       — unique number
     icon     — emoji
     featured — show "Featured" badge instead of type badge
     type     — "analyst" | "develop"
     langs    — array of filter keys: "python" | "sql" | "r"
     title    — project title
     desc     — short description
     tags     — displayed tag chips (any strings)
     demo     — URL or null
     repo     — URL or null
══════════════════════════════════════════════ */
const PROJECTS = [
  {
    id: 1, icon: '📊', featured: true,
    type: 'analyst', langs: ['sql', 'python'],
    title: 'Sales Performance Dashboard',
    desc: 'End-to-end Power BI dashboard tracking KPIs across 5 regions. Reduced manual reporting by 80% and accelerated business decision-making.',
    tags: ['Power BI', 'SQL', 'Python', 'DAX'],
    demo: '#', repo: 'https://github.com/yourusername'
  },
  {
    id: 2, icon: '🔮', featured: false,
    type: 'develop', langs: ['python'],
    title: 'Customer Churn Prediction',
    desc: 'Random Forest + Logistic Regression model achieving 89% accuracy. Deployed as an interactive Streamlit app for non-technical stakeholders.',
    tags: ['Python', 'Scikit-learn', 'Streamlit', 'Pandas'],
    demo: '#', repo: 'https://github.com/yourusername'
  },
  {
    id: 3, icon: '🛒', featured: true,
    type: 'analyst', langs: ['python', 'sql'],
    title: 'E-Commerce RFM Segmentation',
    desc: 'Customer segmentation using Recency-Frequency-Monetary analysis on 100k+ transactions. Visualized in an interactive Tableau dashboard.',
    tags: ['Python', 'SQL', 'Tableau', 'NumPy'],
    demo: '#', repo: 'https://github.com/yourusername'
  },
  {
    id: 4, icon: '🌐', featured: false,
    type: 'develop', langs: ['python', 'sql'],
    title: 'Job Listings Scraping Pipeline',
    desc: 'Automated scraper collecting job listing data from 3 platforms. Stores results to PostgreSQL and sends a daily digest email summary.',
    tags: ['Python', 'BeautifulSoup', 'PostgreSQL', 'Airflow'],
    demo: null, repo: 'https://github.com/yourusername'
  },
  {
    id: 5, icon: '📉', featured: false,
    type: 'analyst', langs: ['python', 'r'],
    title: 'IDX Stock Price EDA',
    desc: 'Exploratory analysis on Indonesian Stock Exchange data. Includes correlation heatmaps, rolling averages, and volatility comparison charts.',
    tags: ['Python', 'R', 'Plotly', 'Pandas'],
    demo: '#', repo: 'https://github.com/yourusername'
  },
  {
    id: 6, icon: '🏥', featured: false,
    type: 'analyst', langs: ['sql'],
    title: 'Hospital Wait Time Analytics',
    desc: 'SQL-based patient flow analysis identifying bottlenecks. Presented findings that contributed to a 22% reduction in average wait times.',
    tags: ['SQL', 'Excel', 'Power BI'],
    demo: null, repo: 'https://github.com/yourusername'
  },
  {
    id: 7, icon: '🧠', featured: false,
    type: 'develop', langs: ['python'],
    title: 'Sentiment Analysis — Product Reviews',
    desc: 'NLP pipeline classifying Indonesian-language product reviews. Fine-tuned IndoBERT model achieving 91% F1-score on the test set.',
    tags: ['Python', 'HuggingFace', 'BERT', 'PyTorch'],
    demo: null, repo: 'https://github.com/yourusername'
  },
  {
    id: 8, icon: '📍', featured: false,
    type: 'analyst', langs: ['python', 'sql'],
    title: 'Geospatial Retail Heatmap',
    desc: 'Folium + GeoPandas visualization of retail store foot-traffic in Surabaya. Used by management to identify expansion opportunities.',
    tags: ['Python', 'GeoPandas', 'Folium', 'SQL'],
    demo: '#', repo: 'https://github.com/yourusername'
  },
];


/* ══════════════════════════════════════════════
   2. CURRENTLY LEARNING DATA (Feature #2)
   Update topics, percentage, and color as you learn.
   Colors: "accent" | "green" | "amber"
══════════════════════════════════════════════ */
const LEARNING = [
  { name: 'Deep Learning (PyTorch)',         pct: 60, color: 'accent', sub: 'CNNs, RNNs, Transformers basics' },
  { name: 'dbt (data build tool)',            pct: 45, color: 'green',  sub: 'Data modeling & transformation' },
  { name: 'Apache Spark / PySpark',           pct: 35, color: 'amber',  sub: 'Big data processing pipelines' },
];


/* ══════════════════════════════════════════════
   3. SKILLS RADAR DATA (Feature #1)
   Edit values 0–100 for each skill axis.
══════════════════════════════════════════════ */
const RADAR_SKILLS = [
  { label: 'Python',       value: 85 },
  { label: 'SQL',          value: 80 },
  { label: 'ML',           value: 65 },
  { label: 'Viz / BI',     value: 78 },
  { label: 'Statistics',   value: 70 },
  { label: 'Data Eng.',    value: 50 },
];


/* ══════════════════════════════════════════════
   4. TYPED PHRASES
══════════════════════════════════════════════ */
const TYPED_PHRASES = [
  'Data Analytics',
  'Machine Learning',
  'SQL & Python',
  'Power BI Dashboards',
  'Data Visualization',
];


/* ══════════════════════════════════════════════
   HELPERS
══════════════════════════════════════════════ */

/** Build a project card element */
function buildCard(p) {
  const badgeClass = p.featured ? 'badge--featured' : `badge--${p.type}`;
  const badgeText  = p.featured ? 'Featured' : (p.type === 'analyst' ? 'Analytics' : 'Development');

  const card = document.createElement('div');
  card.className = 'proj-card';
  card.dataset.type  = p.type;
  card.dataset.langs = p.langs.join(',');

  const demoLink = p.demo
    ? `<a href="${p.demo}" class="proj-link" target="_blank" rel="noopener">Live Demo ↗</a>`
    : '';
  const repoLink = p.repo
    ? `<a href="${p.repo}" class="proj-link" target="_blank" rel="noopener">GitHub ↗</a>`
    : '';

  card.innerHTML = `
    <span class="proj-badge ${badgeClass}">${badgeText}</span>
    <div class="proj-icon">${p.icon}</div>
    <h3 class="proj-title">${p.title}</h3>
    <p class="proj-desc">${p.desc}</p>
    <div class="proj-tags">${p.tags.map(t => `<span class="proj-tag">${t}</span>`).join('')}</div>
    <div class="proj-links">${demoLink}${repoLink}</div>
  `;
  return card;
}

/** Render an array of projects into a grid element */
function renderProjects(list, gridEl) {
  gridEl.innerHTML = '';
  if (list.length === 0) {
    gridEl.innerHTML = `
      <div class="no-results">
        <div class="no-results-icon">🔍</div>
        No projects match your filters. Try a different combination.
      </div>`;
    return;
  }
  list.forEach(p => gridEl.appendChild(buildCard(p)));
}


/* ══════════════════════════════════════════════
   5. THEME TOGGLE
══════════════════════════════════════════════ */
function initTheme() {
  const html      = document.documentElement;
  const btn       = document.getElementById('theme-toggle');
  const label     = document.getElementById('toggle-label');
  const navLabel  = btn.querySelector('.toggle-label');

  // Restore saved preference
  const saved = localStorage.getItem('portfolio-theme');
  if (saved) html.setAttribute('data-theme', saved);

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
    if (navLabel) navLabel.textContent = theme === 'dark' ? 'Light' : 'Dark';
  }

  btn.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });

  // Set initial label
  const current = html.getAttribute('data-theme');
  if (navLabel) navLabel.textContent = current === 'dark' ? 'Light' : 'Dark';
}


/* ══════════════════════════════════════════════
   6. STICKY NAV + ACTIVE LINK
══════════════════════════════════════════════ */
function initNav() {
  const navbar   = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = [...document.querySelectorAll('section[id]')];

  window.addEventListener('scroll', () => {
    // Scrolled class for blur effect
    navbar.classList.toggle('scrolled', window.scrollY > 30);

    // Active link tracking
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 90) current = s.id;
    });
    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }, { passive: true });
}


/* ══════════════════════════════════════════════
   7. MOBILE DRAWER
══════════════════════════════════════════════ */
function initDrawer() {
  const hamburger = document.getElementById('hamburger');
  const drawer    = document.getElementById('mobile-drawer');
  const close     = document.getElementById('drawer-close');
  const links     = document.querySelectorAll('.drawer-link');

  const open  = () => { drawer.classList.add('open');  hamburger.setAttribute('aria-expanded', 'true'); };
  const shut  = () => { drawer.classList.remove('open'); hamburger.setAttribute('aria-expanded', 'false'); };

  hamburger.addEventListener('click', open);
  close.addEventListener('click', shut);
  links.forEach(a => a.addEventListener('click', shut));
}


/* ══════════════════════════════════════════════
   8. SCROLL REVEAL
══════════════════════════════════════════════ */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  const io  = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  els.forEach(el => io.observe(el));
}


/* ══════════════════════════════════════════════
   9. TYPED EFFECT
══════════════════════════════════════════════ */
function initTyped() {
  const el     = document.getElementById('typed');
  if (!el) return;

  let pi = 0, ci = 0, deleting = false;

  function tick() {
    const word = TYPED_PHRASES[pi];

    if (!deleting) {
      el.textContent = word.slice(0, ++ci);
      if (ci === word.length) {
        deleting = true;
        setTimeout(tick, 1800);
        return;
      }
    } else {
      el.textContent = word.slice(0, --ci);
      if (ci === 0) {
        deleting = false;
        pi = (pi + 1) % TYPED_PHRASES.length;
      }
    }
    setTimeout(tick, deleting ? 55 : 80);
  }
  tick();
}


/* ══════════════════════════════════════════════
   10. RADAR CHART — SVG (Feature #1)
   Pure SVG, no external library.
══════════════════════════════════════════════ */
function initRadar() {
  const svg = document.getElementById('radar-chart');
  if (!svg) return;

  const CX = 100, CY = 100, R = 72;
  const n  = RADAR_SKILLS.length;
  const ns = 'http://www.w3.org/2000/svg';

  // Get accent color from CSS variable
  const style   = getComputedStyle(document.documentElement);
  const accent  = style.getPropertyValue('--accent').trim() || '#4D8EFF';

  /** Polar to cartesian */
  function pt(radius, index) {
    const angle = (Math.PI * 2 * index) / n - Math.PI / 2;
    return {
      x: CX + radius * Math.cos(angle),
      y: CY + radius * Math.sin(angle),
    };
  }

  function polyPoints(radius) {
    return Array.from({ length: n }, (_, i) => {
      const p = pt(radius, i);
      return `${p.x},${p.y}`;
    }).join(' ');
  }

  // Background grid rings
  [0.25, 0.5, 0.75, 1].forEach(frac => {
    const poly = document.createElementNS(ns, 'polygon');
    poly.setAttribute('points', polyPoints(R * frac));
    poly.setAttribute('fill', 'none');
    poly.setAttribute('stroke', 'currentColor');
    poly.setAttribute('stroke-width', '0.5');
    poly.setAttribute('opacity', '0.15');
    svg.appendChild(poly);
  });

  // Axis lines
  for (let i = 0; i < n; i++) {
    const p = pt(R, i);
    const line = document.createElementNS(ns, 'line');
    line.setAttribute('x1', CX); line.setAttribute('y1', CY);
    line.setAttribute('x2', p.x); line.setAttribute('y2', p.y);
    line.setAttribute('stroke', 'currentColor');
    line.setAttribute('stroke-width', '0.5');
    line.setAttribute('opacity', '0.2');
    svg.appendChild(line);
  }

  // Data polygon
  const dataPoints = RADAR_SKILLS.map((s, i) => {
    const r = R * (s.value / 100);
    const p = pt(r, i);
    return `${p.x},${p.y}`;
  }).join(' ');

  const fill = document.createElementNS(ns, 'polygon');
  fill.setAttribute('points', dataPoints);
  fill.setAttribute('fill', accent);
  fill.setAttribute('fill-opacity', '0.18');
  fill.setAttribute('stroke', accent);
  fill.setAttribute('stroke-width', '1.5');
  svg.appendChild(fill);

  // Dots + labels
  RADAR_SKILLS.forEach((s, i) => {
    const r = R * (s.value / 100);
    const p = pt(r, i);

    // Dot
    const dot = document.createElementNS(ns, 'circle');
    dot.setAttribute('cx', p.x); dot.setAttribute('cy', p.y); dot.setAttribute('r', '3');
    dot.setAttribute('fill', accent);
    svg.appendChild(dot);

    // Label
    const lp    = pt(R + 14, i);
    const text  = document.createElementNS(ns, 'text');
    text.setAttribute('x', lp.x); text.setAttribute('y', lp.y);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('dominant-baseline', 'middle');
    text.setAttribute('font-size', '7.5');
    text.setAttribute('font-family', 'Inter, sans-serif');
    text.setAttribute('font-weight', '600');
    text.setAttribute('fill', 'currentColor');
    text.setAttribute('opacity', '0.65');
    text.textContent = s.label;
    svg.appendChild(text);
  });

  // Re-draw on theme change (accent color changes)
  const observer = new MutationObserver(() => {
    svg.innerHTML = '';
    initRadar();
  });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
}


/* ══════════════════════════════════════════════
   11. CURRENTLY LEARNING WIDGET (Feature #2)
══════════════════════════════════════════════ */
function initLearning() {
  const list = document.getElementById('learning-list');
  if (!list) return;

  LEARNING.forEach(item => {
    const li = document.createElement('li');
    li.className = 'learning-item';
    li.innerHTML = `
      <div class="learning-top">
        <span class="learning-name">${item.name}</span>
        <span class="learning-pct">${item.pct}%</span>
      </div>
      <div class="learning-bar-bg">
        <div class="learning-bar-fill learning-bar-fill--${item.color}" data-pct="${item.pct}"></div>
      </div>
      <span class="learning-sub">${item.sub}</span>
    `;
    list.appendChild(li);
  });

  // Animate bars in when visible
  const fills = list.querySelectorAll('.learning-bar-fill');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        fills.forEach(f => {
          f.style.width = f.dataset.pct + '%';
        });
        io.disconnect();
      }
    });
  }, { threshold: 0.4 });
  io.observe(list);
}


/* ══════════════════════════════════════════════
   12. PROJECTS — RENDER + FILTERING (Feature #3)
══════════════════════════════════════════════ */
function initProjects() {
  // Home preview — top 3 featured first, then by id
  const previewGrid = document.getElementById('preview-grid');
  if (previewGrid) {
    const top3 = [...PROJECTS]
      .sort((a, b) => b.featured - a.featured)
      .slice(0, 3);
    renderProjects(top3, previewGrid);
  }

  // Update home stat
  const projStat = document.getElementById('proj-stat');
  if (projStat) projStat.innerHTML = `${PROJECTS.length}<span class="accent">+</span>`;

  // Full gallery
  const fullGrid  = document.getElementById('proj-grid');
  if (!fullGrid) return;

  const typeChips  = document.querySelectorAll('#type-chips .chip');
  const langChips  = document.querySelectorAll('#lang-chips .chip');
  const searchEl   = document.getElementById('proj-search');
  const countEl    = document.getElementById('count-num');

  let activeType = 'all';
  let activeLang = 'all';
  let searchQuery = '';

  function applyFilters() {
    const q = searchQuery.toLowerCase().trim();

    const filtered = PROJECTS.filter(p => {
      const typeOk = activeType === 'all' || p.type === activeType;
      const langOk = activeLang === 'all' || p.langs.includes(activeLang);
      const searchOk = !q
        || p.title.toLowerCase().includes(q)
        || p.desc.toLowerCase().includes(q)
        || p.tags.some(t => t.toLowerCase().includes(q));
      return typeOk && langOk && searchOk;
    });

    renderProjects(filtered, fullGrid);

    // Live count update (Feature #3)
    if (countEl) countEl.textContent = filtered.length;
  }

  // Type filter chips
  document.getElementById('type-chips').addEventListener('click', e => {
    const btn = e.target.closest('.chip');
    if (!btn) return;
    typeChips.forEach(c => { c.classList.remove('chip--on'); c.setAttribute('aria-checked', 'false'); });
    btn.classList.add('chip--on');
    btn.setAttribute('aria-checked', 'true');
    activeType = btn.dataset.val;
    applyFilters();
  });

  // Language filter chips
  document.getElementById('lang-chips').addEventListener('click', e => {
    const btn = e.target.closest('.chip');
    if (!btn) return;
    langChips.forEach(c => { c.classList.remove('chip--on'); c.setAttribute('aria-checked', 'false'); });
    btn.classList.add('chip--on');
    btn.setAttribute('aria-checked', 'true');
    activeLang = btn.dataset.val;
    applyFilters();
  });

  // Search
  searchEl.addEventListener('input', e => {
    searchQuery = e.target.value;
    applyFilters();
  });

  // Initial render
  applyFilters();
}


/* ══════════════════════════════════════════════
   13. CONTACT FORM (Formspree)
   Register at https://formspree.io, get a form ID,
   and replace YOUR_FORM_ID in index.html action attr.
══════════════════════════════════════════════ */
function initForm() {
  const form   = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('#form-submit');
    btn.textContent = 'Sending…';
    btn.disabled = true;
    status.className = 'form-status';
    status.style.display = 'none';

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        status.className = 'form-status ok';
        status.textContent = '✓ Message sent! I\'ll get back to you within 24 hours.';
        form.reset();
      } else {
        throw new Error('Server error');
      }
    } catch {
      status.className = 'form-status err';
      status.textContent = '✕ Something went wrong. Please email me directly.';
    } finally {
      btn.textContent = 'Send Message →';
      btn.disabled = false;
    }
  });
}


/* ══════════════════════════════════════════════
   INIT — run all modules when DOM is ready
══════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNav();
  initDrawer();
  initReveal();
  initTyped();
  initRadar();
  initLearning();
  initProjects();
  initForm();
});
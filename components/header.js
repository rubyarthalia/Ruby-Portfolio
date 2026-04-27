(function () {
  const NAME  = "Ruby Arthalia Golden";
  const PAGES = [
    { label: "Home",     href: "index.html" },
    { label: "About",    href: "about.html" },
    { label: "Projects", href: "projects.html" },
    { label: "Contact",  href: "contact.html" },
  ];

  /* ── Detect active page ── */
  const current = window.location.pathname.split("/").pop() || "index.html";

  /* ── nav HTML ── */
  const links = PAGES.map(p => {
    const active = (current === p.href || (current === "" && p.href === "index.html"))
      ? ' class="nav-link active"' : ' class="nav-link"';
    return `<li><a href="${p.href}"${active}>${p.label}</a></li>`;
  }).join("");

  const html = `
<header class="site-header" id="site-header">
  <nav class="nav-inner" aria-label="Main navigation">

    <a href="index.html" class="nav-brand">
      ${NAME} <span class="nav-pipe">|</span>
      <span class="nav-brand-sub">Portfolio</span>
    </a>

    <ul class="nav-links" role="list">${links}</ul>

    <div class="nav-actions">
      <button class="theme-switch" id="theme-btn" aria-label="Toggle theme" aria-pressed="false">
        <span class="switch-track">
          <span class="switch-knob" id="theme-icon">☀</span>
        </span>
      </button>
      <button class="hamburger" id="hamburger" aria-label="Open menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>

  </nav>
</header>

<!-- Mobile drawer -->
<div class="nav-drawer" id="nav-drawer" aria-hidden="true">
  <div class="nav-drawer__head">
    <span class="nav-brand">${NAME}</span>
    <button class="drawer-close" id="drawer-close" aria-label="Close menu">✕</button>
  </div>
  <ul role="list">
    ${PAGES.map(p => `<li><a href="${p.href}" class="drawer-link">${p.label}</a></li>`).join("")}
  </ul>
</div>`;

  /* ── Inject before <main> or at start of body ── */
  document.body.insertAdjacentHTML("afterbegin", html);

  /* ── Styles specific to header (not in style.css) ── */
  const css = `
.site-header {
  position: fixed; top: 0; left: 0; right: 0; z-index: 500;
  height: 60px; border-bottom: 1px solid transparent;
  transition: background .25s, border-color .25s, backdrop-filter .25s;
}
.site-header.scrolled {
  background: var(--nav-bg);
  backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
  border-color: var(--border);
}
.nav-inner {
  max-width: 960px; margin: 0 auto; height: 100%;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 clamp(1.25rem, 4vw, 2.5rem);
}
.nav-brand { font-size: .88rem; font-weight: 600; color: var(--text); letter-spacing: -.01em; white-space: nowrap; }
.nav-pipe  { color: var(--border-h); margin: 0 .28rem; font-weight: 300; }
.nav-brand-sub { color: var(--text-2); font-weight: 400; }
.nav-links { display: flex; align-items: center; gap: 1.75rem; }
.nav-link  {
  font-size: .8rem; font-weight: 500; color: var(--text-2);
  letter-spacing: .02em; padding-bottom: 2px; position: relative;
  transition: color .2s;
}
.nav-link::after {
  content: ''; position: absolute; bottom: -2px; left: 0; right: 0;
  height: 1.5px; background: var(--accent); border-radius: 2px;
  transform: scaleX(0); transform-origin: left; transition: transform .22s;
}
.nav-link:hover, .nav-link.active { color: var(--text); }
.nav-link.active::after, .nav-link:hover::after { transform: scaleX(1); }
.nav-actions { display: flex; align-items: center; gap: .6rem; }
.theme-switch {
  position: relative; width: 56px; height: 32px;
  padding: 0; border: none; background: transparent;
  cursor: pointer; border-radius: 16px; transition: all .3s ease;
}
.switch-track {
  position: absolute; inset: 0; border-radius: 16px;
  background: var(--border); border: 1px solid var(--border);
  display: flex; align-items: center; transition: all .3s ease;
}
.theme-switch:hover .switch-track { border-color: var(--border-h); }
.theme-switch[aria-pressed="true"] .switch-track {
  background: var(--accent-dim); border-color: var(--accent-bdr);
}
.switch-knob {
  display: flex; align-items: center; justify-content: center;
  width: 28px; height: 28px; border-radius: 50%;
  background: var(--bg-card); border: 1px solid var(--border);
  font-size: .9rem; color: var(--text-2);
  position: absolute; left: 2px; transition: all .3s ease;
}
.theme-switch[aria-pressed="true"] .switch-knob {
  left: 26px; color: var(--accent); border-color: var(--accent);
}
.hamburger { display: none; flex-direction: column; gap: 5px; padding: 5px; }
.hamburger span { display: block; width: 20px; height: 1.5px; background: var(--text); border-radius: 2px; transition: all .25s; }
.nav-drawer {
  position: fixed; inset: 0; z-index: 600; background: var(--bg-alt);
  padding: 1.5rem 2rem; display: flex; flex-direction: column;
  transform: translateX(100%); transition: transform .3s ease;
}
.nav-drawer.open { transform: translateX(0); }
.nav-drawer__head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2.5rem; }
.drawer-close { color: var(--text-2); font-size: 1.1rem; cursor: pointer; background: none; border: none; }
.drawer-link { display: block; font-size: 1.4rem; font-weight: 300; color: var(--text); margin-bottom: 1.1rem; letter-spacing: -.02em; transition: color .2s; }
.drawer-link:hover { color: var(--accent); }
@media (max-width: 680px) {
  .nav-links { display: none; }
  .hamburger { display: flex; }
}`;

  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  /* ── Behaviour: scroll + theme + drawer ── */
  document.addEventListener("DOMContentLoaded", () => {
    const header   = document.getElementById("site-header");
    const themeBtn = document.getElementById("theme-btn");
    const themeIcon= document.getElementById("theme-icon");
    const themeLbl = document.getElementById("theme-label");
    const hamburger= document.getElementById("hamburger");
    const drawer   = document.getElementById("nav-drawer");
    const dClose   = document.getElementById("drawer-close");
    const dLinks   = document.querySelectorAll(".drawer-link");

    /* Scroll — sticky blur */
    window.addEventListener("scroll", () => {
      header.classList.toggle("scrolled", window.scrollY > 20);
    }, { passive: true });

    /* Theme */
    const html = document.documentElement;
    function applyTheme(t) {
      html.setAttribute("data-theme", t);
      localStorage.setItem("pf-theme", t);
      if (themeIcon) themeIcon.textContent  = t === "dark" ? "☀" : "☾";
      if (themeBtn) themeBtn.setAttribute("aria-pressed", t === "light" ? "true" : "false");
    }
    const saved = localStorage.getItem("pf-theme") || "dark";
    applyTheme(saved);
    themeBtn?.addEventListener("click", () => {
      applyTheme(html.getAttribute("data-theme") === "dark" ? "light" : "dark");
    });

    /* Mobile drawer */
    const openDrawer = () => { drawer.classList.add("open"); drawer.setAttribute("aria-hidden","false"); hamburger.setAttribute("aria-expanded","true"); };
    const shutDrawer = () => { drawer.classList.remove("open"); drawer.setAttribute("aria-hidden","true"); hamburger.setAttribute("aria-expanded","false"); };
    hamburger?.addEventListener("click", openDrawer);
    dClose?.addEventListener("click", shutDrawer);
    dLinks.forEach(a => a.addEventListener("click", shutDrawer));
  });
})();

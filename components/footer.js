/**
 * components/footer.js
 * Injects the shared footer into every page.
 * Edit social links and your name here once — applies everywhere.
 */

(function () {
  /* ── CONFIG — edit these ── */
  const NAME    = "Ruby Arthalia Golden";
  const YEAR    = new Date().getFullYear();
  const UNI     = "Universitas Ciputra Surabaya";
  const EMAIL   = "rubyarthalia@gmail.com";
  const SOCIALS = {
    linkedin:  "https://linkedin.com/in/rubyarthalia",
    github:    "https://github.com/rubyarthalia",
    instagram: "https://instagram.com/rubyarthalia",
  };

  const html = `
    <footer class="site-footer">
      <div class="footer-inner">
        <div class="footer-grid">

          <!-- Brand -->
          <div class="footer-brand">
            <p class="footer-title">Portfolio</p>
            <p class="footer-copy">© ${YEAR} ${NAME}. All rights reserved.</p>
            <p class="footer-uni">${UNI}</p>
          </div>

          <!-- Quick links -->
          <nav class="footer-col" aria-label="Quick links">
            <h4 class="footer-col-title">Quick Links</h4>
            <ul role="list">
              <li><a href="about.html">About</a></li>
              <li><a href="projects.html">Projects</a></li>
              <li><a href="contact.html">Contact</a></li>
            </ul>
          </nav>

          <!-- Connect -->
          <div class="footer-col">
            <h4 class="footer-col-title">Connect</h4>
            <div class="footer-socials">
              <a href="${SOCIALS.linkedin}" target="_blank" rel="noopener" class="soc-link">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>
              <a href="${SOCIALS.github}" target="_blank" rel="noopener" class="soc-link">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                </svg>
                GitHub
              </a>
              <a href="${SOCIALS.instagram}" target="_blank" rel="noopener" class="soc-link">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
                Instagram
              </a>
              <a href="mailto:${EMAIL}" class="soc-link">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                Email
              </a>
            </div>
          </div>

        </div>
      </div>
    </footer>`;

  /* ── Inject at end of body ── */
  document.body.insertAdjacentHTML("beforeend", html);

  /* ── Footer-specific styles ── */
  const css = `
    .site-footer {
      background: var(--footer-bg);
      color: rgba(255,255,255,.65);
      padding: 3rem clamp(1.25rem,4vw,2.5rem) 2rem;
      border-top: 1px solid rgba(255,255,255,.06);
      margin-top: auto;
    }
    .footer-inner { max-width: 960px; margin: 0 auto; }
    .footer-grid {
      display: grid; grid-template-columns: 1.5fr 1fr 1fr;
      gap: 2.5rem; padding-bottom: 2rem;
      border-bottom: 1px solid rgba(255,255,255,.06); margin-bottom: 1.5rem;
    }
    .footer-title  { font-size: .88rem; font-weight: 700; color: #fff; margin-bottom: .3rem; }
    .footer-copy   { font-size: .74rem; color: rgba(255,255,255,.4); margin-bottom: .18rem; }
    .footer-uni    { font-size: .7rem;  color: rgba(255,255,255,.3); }
    .footer-col-title { font-size: .64rem; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: rgba(255,255,255,.3); margin-bottom: .8rem; }
    .footer-col ul { display: flex; flex-direction: column; gap: .45rem; }
    .footer-col a  { font-size: .8rem; color: rgba(255,255,255,.5); transition: color .2s; }
    .footer-col a:hover { color: #fff; }
    .footer-socials { display: flex; flex-direction: column; gap: .55rem; }
    .soc-link { display: flex; align-items: center; gap: 8px; font-size: .8rem; color: rgba(255,255,255,.5); transition: color .2s; }
    .soc-link:hover { color: #fff; }
    @media (max-width: 680px) {
      .footer-grid { grid-template-columns: 1fr 1fr; }
      .footer-brand { grid-column: 1/-1; }
    }
    @media (max-width: 440px) {
      .footer-grid { grid-template-columns: 1fr; }
    }`;

      const style = document.createElement("style");
      style.textContent = css;
      document.head.appendChild(style);
    })();

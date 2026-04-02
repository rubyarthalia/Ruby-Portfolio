/**
 * js/main.js
 * Shared utilities loaded on every page.
 * - Scroll reveal
 * - Contact form (contact.html only)
 */

document.addEventListener("DOMContentLoaded", () => {

  /* ── SCROLL REVEAL ── */
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));

  /* ── CONTACT FORM (only on contact.html) ── */
  const form   = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  if (form) {
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
        } else { throw new Error(); }
      } catch {
        status.className = "form-status err";
        status.textContent = "✕ Something went wrong. Please email me directly.";
      } finally {
        btn.textContent = "Send Message";
        btn.disabled = false;
      }
    });
  }

});

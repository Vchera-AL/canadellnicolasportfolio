/* ===================================================
   script.js — Nicolas Canadell Portfolio
   =================================================== */

/* ── 1. REVEAL ON SCROLL ── */
const revealEls = document.querySelectorAll('.reveal');
const tlItems   = document.querySelectorAll('.tl-item');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));
tlItems.forEach(el => revealObserver.observe(el));


/* ── 2. SKILL BARS ── */
const barFills = document.querySelectorAll('.bar-fill');

const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = entry.target;
      const width  = target.dataset.w + '%';
      target.style.width = width;
      barObserver.unobserve(target);
    }
  });
}, { threshold: 0.3 });

barFills.forEach(bar => barObserver.observe(bar));


/* ── 3. SIDEBAR ACTIVE DOT ── */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.classList.toggle(
          'active',
          link.getAttribute('href') === '#' + id
        );
      });
    }
  });
}, { rootMargin: '-40% 0px -50% 0px' });

sections.forEach(s => sectionObserver.observe(s));


/* ── 4. PARCOURS FILTER ── */
const filterBtns = document.querySelectorAll('.tl-filter');
const parcoursItems = document.querySelectorAll('#parcours-timeline .tl-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    parcoursItems.forEach(item => {
      const cat = item.dataset.cat;
      if (filter === 'all' || cat === filter) {
        item.classList.remove('hidden');
        // re-trigger animation
        item.classList.remove('visible');
        setTimeout(() => item.classList.add('visible'), 50);
      } else {
        item.classList.add('hidden');
        item.classList.remove('visible');
      }
    });
  });
});


/* ── 5. CONTACT FORM ── */
const form     = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name    = form.querySelector('#f-name').value.trim();
    const email   = form.querySelector('#f-email').value.trim();
    const message = form.querySelector('#f-msg').value.trim();

    if (!name || !email || !message) {
      formNote.textContent = '⚠ Veuillez remplir tous les champs.';
      formNote.className   = 'form-note error';
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      formNote.textContent = '⚠ Adresse email invalide.';
      formNote.className   = 'form-note error';
      return;
    }

    // Simuler l'envoi (pas de backend)
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled    = true;
    btn.textContent = 'Envoi en cours…';

    setTimeout(() => {
      formNote.textContent = '✓ Message envoyé ! Je vous réponds rapidement.';
      formNote.className   = 'form-note success';
      form.reset();
      btn.disabled    = false;
      btn.textContent = 'Envoyer le message →';
    }, 1200);
  });
}


/* ── 6. SMOOTH ANCHOR SCROLL (fallback pour vieux navigateurs) ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

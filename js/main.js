
// NAV scroll effect
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 30);
});

// Hamburger
const hamburger = document.querySelector('.hamburger');
if (hamburger) {
  hamburger.addEventListener('click', () => nav.classList.toggle('mobile-open'));
}
document.querySelectorAll('.nav-links a').forEach(l => l.addEventListener('click', () => nav.classList.remove('mobile-open')));

// Active nav
const page = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(l => { if (l.getAttribute('href') === page) l.classList.add('active'); });

// Typing animation
const typedEl = document.querySelector('.hero-typing');
if (typedEl) {
  const phrases = [
    'We save you 10+ hours every week.',
    'We turn your data into clear decisions.',
    'We build tools your team actually uses.',
    'We grow your business, together.'
  ];
  let pi = 0, ci = 0, del = false;
  function type() {
    const cur = phrases[pi];
    if (!del) {
      typedEl.textContent = cur.slice(0, ++ci);
      if (ci === cur.length) { del = true; setTimeout(type, 2000); return; }
    } else {
      typedEl.textContent = cur.slice(0, --ci);
      if (ci === 0) { del = false; pi = (pi + 1) % phrases.length; }
    }
    setTimeout(type, del ? 40 : 70);
  }
  type();
}

// Scroll reveal
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 70);
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// Counter animation
function animateCount(el) {
  const target = parseFloat(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const prefix = el.dataset.prefix || '';
  const isFloat = el.dataset.float === 'true';
  const duration = 1600;
  const steps = duration / 16;
  const inc = target / steps;
  let cur = 0;
  const t = setInterval(() => {
    cur = Math.min(cur + inc, target);
    el.textContent = prefix + (isFloat ? cur.toFixed(1) : Math.floor(cur)) + suffix;
    if (cur >= target) clearInterval(t);
  }, 16);
}
const countObs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { animateCount(e.target); countObs.unobserve(e.target); } });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-number').forEach(el => countObs.observe(el));

// FAQ accordion
document.querySelectorAll('.faq-question').forEach(q => {
  q.addEventListener('click', () => {
    const item = q.parentElement;
    const open = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!open) item.classList.add('open');
  });
});

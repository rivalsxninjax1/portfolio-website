document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Mobile nav toggle ---------- */
  const header = document.getElementById('header');
  const toggle = document.getElementById('header-toggle');
  toggle?.addEventListener('click', () => {
    header.classList.toggle('open');
    toggle.classList.toggle('bi-list');
    toggle.classList.toggle('bi-x-lg');
  });
  document.querySelectorAll('.navmenu a').forEach(a => {
    a.addEventListener('click', () => header.classList.remove('open'));
  });

  /* ---------- Active link on scroll ---------- */
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.navmenu a');
  const setActive = () => {
    let current = sections[0]?.id;
    const pos = window.scrollY + 140;
    sections.forEach(sec => { if (pos >= sec.offsetTop) current = sec.id; });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  };
  window.addEventListener('scroll', setActive);
  setActive();

  /* ---------- Typed role line ---------- */
  const typedEl = document.querySelector('.typed');
  const roles = [
    'a Cybersecurity Researcher',
    'an Information Security Student',
    'a Penetration Tester in training',
    'exploring Vulnerability Research',
    'building Safer Digital Infrastructure',
    'bridging Technology and Policy'
  ];
  if (typedEl) {
    let ri = 0, ci = 0, deleting = false;
    const tick = () => {
      const word = roles[ri];
      ci += deleting ? -1 : 1;
      typedEl.textContent = word.slice(0, ci);
      let delay = deleting ? 35 : 55;
      if (!deleting && ci === word.length) { delay = 1600; deleting = true; }
      else if (deleting && ci === 0) { deleting = false; ri = (ri + 1) % roles.length; delay = 300; }
      setTimeout(tick, delay);
    };
    tick();
  }

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));

  /* ---------- Scroll-to-top button ---------- */
  const scrollTop = document.getElementById('scroll-top');
  window.addEventListener('scroll', () => {
    scrollTop.classList.toggle('show', window.scrollY > 500);
  });
  scrollTop?.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Contact form (Web3Forms) ---------- */
  const form = document.querySelector('.contact-form');
  const status = document.querySelector('.form-status');
  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.textContent = 'Sending…';
    status.className = 'form-status';
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });
      const data = await res.json();
      if (data.success) {
        status.textContent = 'Message sent — thank you. I\'ll reply soon.';
        status.className = 'form-status ok';
        form.reset();
      } else {
        throw new Error(data.message || 'Send failed');
      }
    } catch (err) {
      status.textContent = 'Something went wrong — please email me directly instead.';
      status.className = 'form-status err';
    }
  });

});

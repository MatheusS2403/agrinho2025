// helpers
const qs = s => document.querySelector(s);
const qsa = s => document.querySelectorAll(s);

// smooth scroll nav & “Saiba Mais”
qs('#learn-more').onclick = () =>
  qs('#objetivos').scrollIntoView({behavior:'smooth'});

// theme toggle
const toggle = qs('#theme-toggle');
toggle.onclick = () => {
  const theme = document.documentElement.toggleAttribute('data-theme') ? 'dark' : 'light';
  toggle.textContent = theme==='dark' ? '☀️' : '🌙';
  localStorage.setItem('theme', theme);
};
// persist theme
(() => {
  const saved = localStorage.getItem('theme');
  if (saved==='dark') { document.documentElement.setAttribute('data-theme','dark'); toggle.textContent='☀️'; }
})();

// reveal on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('show');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.2 });
qsa('.reveal').forEach(el => observer.observe(el));

// back to top
const btnTop = qs('#back-to-top');
window.addEventListener('scroll', () => {
  btnTop.classList.toggle('show', window.scrollY > 300);
});
btnTop.onclick = () => window.scrollTo({top:0,behavior:'smooth'});

// form submission (simulado)
qs('#contact-form').addEventListener('submit', e => {
  e.preventDefault();
  const status = qs('#form-status');
  status.textContent = 'Enviando…';
  setTimeout(() => {
    status.textContent = 'Mensagem enviada com sucesso!';
    e.target.reset();
  }, 1500);
});

// Помечаем, что JS активен (иначе reveal-контент виден по умолчанию)
document.documentElement.classList.add('js');

// Мобильное меню
const burger = document.querySelector('.burger');
const links = document.querySelector('.nav-links');
if (burger) {
  burger.addEventListener('click', () => {
    links.classList.toggle('open');
    burger.setAttribute('aria-expanded', links.classList.contains('open'));
  });
  links.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => links.classList.remove('open'))
  );
}

// Активная ссылка по имени файла
const path = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  if (a.getAttribute('href') === path) a.classList.add('active');
});

// Reveal при скролле (с защитой: если IO недоступен — показываем сразу)
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -5% 0px' });
  revealEls.forEach(el => io.observe(el));
  // Подстраховка: всё, что уже в зоне видимости при загрузке
  requestAnimationFrame(() => {
    revealEls.forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('in');
    });
  });
} else {
  revealEls.forEach(el => el.classList.add('in'));
}

// Год в футере
document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());

// Заглушка формы
document.querySelectorAll('form[data-mock]').forEach(f => {
  f.addEventListener('submit', (e) => {
    e.preventDefault();
    const note = f.querySelector('.form-note');
    if (note) { note.textContent = 'Заявка отправлена — мы свяжемся с вами в течение рабочего дня.'; note.style.color = 'var(--orange-600)'; }
    f.reset();
  });
});

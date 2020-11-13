window.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.nav');
  [].forEach.call(nav.querySelectorAll('a'), (el) => {
    el.addEventListener('click', (e) => {
      nav.classList.remove('open');
      nav.classList.add('closed');
      document.body.classList.remove('nav-open');
    });
  });
  document.querySelector('.nav__button')
    .addEventListener('click', () => {
      if (nav.classList.contains('open')) {
        nav.classList.remove('open');
        nav.classList.add('closed');
        document.body.classList.remove('nav-open');
      } else {
        nav.classList.add('open');
        nav.classList.remove('closed');
        document.body.classList.add('nav-open');
      }
    });

  const setVH = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  window.addEventListener('resize', setVH);
  setVH();
});

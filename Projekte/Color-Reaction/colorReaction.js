window.addEventListener('DOMContentLoaded', () => {
  const loadIframe = () => {
    const iframe = document.getElementById('gameFrame');
    if (iframe && iframe.dataset.src) {
      iframe.src = iframe.dataset.src;
    }
  };

  if (sessionStorage.getItem('showTransition') === 'true') {
    setTimeout(loadIframe, 2400);
  } else {
    loadIframe();
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transition = 'opacity 0.6s ease';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('section').forEach(sec => {
    sec.style.opacity = '0';
    observer.observe(sec);
  });});

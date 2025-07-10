window.addEventListener('DOMContentLoaded', () => {
  fetch('header.html')
    .then(res => res.text())
    .then(data => {
      const placeholder = document.getElementById('header-placeholder');
      placeholder.innerHTML = data;
      placeholder.querySelectorAll('script').forEach(oldScript => {
        const newScript = document.createElement('script');
        if (oldScript.src) {
          newScript.src = oldScript.src;
        } else {
          newScript.textContent = oldScript.textContent;
        }
        document.body.appendChild(newScript);
        oldScript.remove();
      });
    });

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
  });
});

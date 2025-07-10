document.querySelector('body').classList.add('futuristic'); // Default futuristic theme


  document.addEventListener("DOMContentLoaded", function () {
    document.body.style.visibility = "visible";
    document.body.style.opacity = "1";
  });

// Mobile navigation toggle
const navToggle = document.getElementById('navToggle');
const navbar = document.getElementById('navbar');

navToggle.addEventListener('click', () => {
    navbar.classList.toggle('show');
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
            navbar.classList.remove('show');
        }
    });
});

// Portfolio filter
const filterButtons = document.querySelectorAll('[data-filter]');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const themeToggle = document.getElementById('themeToggle');

// wrap portfolio item text in word-spans, then letter-spans for animation & line-break friendliness
portfolioItems.forEach(item => {
    const text = item.textContent.trim();
    item.textContent = '';

    const words = text.split(' ');
    words.forEach((word, wordIndex) => {
        const wordSpan = document.createElement('span');

        [...word].forEach((ch, chIndex) => {
            const letterSpan = document.createElement('span');
            letterSpan.textContent = ch;
            letterSpan.style.setProperty('--delay', `${(wordIndex + chIndex) * 0.005}s`);
            wordSpan.appendChild(letterSpan);
        });

        item.appendChild(wordSpan);
        item.appendChild(document.createTextNode(' ')); // Echt sichtbares Leerzeichen für Layout & Umbruch
    });
});

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        portfolioItems.forEach(item => {
            if (filter === 'all' || item.classList.contains(filter)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Toggle futuristic theme
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('futuristic');
});

// Interactive portfolio items
portfolioItems.forEach(item => {
    item.addEventListener('click', () => {
        item.classList.toggle('active');
        setTimeout(() => item.classList.remove('active'), 4000);
    });
});

// Reveal sections on scroll
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.section').forEach(sec => observer.observe(sec));

// Carousel functionality
const track = document.querySelector('.carousel-track');
if (track) {
    const slides = Array.from(track.children);
    const nextBtn = document.querySelector('.carousel-btn.next');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    let currentSlide = 0;

    function updateCarousel() {
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateCarousel();
    });

    slides.forEach(card => {
        card.addEventListener('mouseenter', () => card.classList.add('hover'));
        card.addEventListener('mouseleave', () => card.classList.remove('hover'));
    });
}

// Dropdown
const dropToggle = document.querySelector('.drop-toggle');
const dropContent = document.querySelector('.drop-content');
if (dropToggle && dropContent) {
    dropToggle.addEventListener('click', () => {
        dropContent.classList.toggle('show');
    });
}

// Slide bar / sidebar
const slideToggle = document.querySelector('.slide-toggle');
const sidePanel = document.querySelector('.side-panel');
if (slideToggle && sidePanel) {
    slideToggle.addEventListener('click', () => {
        sidePanel.classList.toggle('show');
    });
}

// Skills ticker
document.addEventListener('DOMContentLoaded', () => {
    const ticker = document.querySelector('.skill-carousel span');
    const container = document.querySelector('.skill-carousel');
    if (ticker && container) {
        const skills = [
        'UX Design',
        'UI Design',
        'Visual Design',
        'Grafikdesign',
        'UX Writing',
        'Erstellung von Informationsarchitektur',
        'Responsive Design',
        'Logoentwicklung und -optimierung',
        'Projektplanung und -analyse',
        'Projektmanagement',
        'Designsprint-Organisation',
        'Analyse bestehender Websites',
        'Benchmarking und Wettbewerbsanalyse',
        'Erkennung von Usability-Problemen',
        'Zeitkritisches Re-Design',
        'Umsetzung von Mobile-First-Strategien',
        'Optimierung von Call-to-Actions',
        'Verbesserung visueller Hierarchien',
        'Sicherstellung von Markenkohärenz im Design',
        'Dokumentation von Designentscheidungen',
        'Gestaltung effektiver Preis- und Produktdarstellungen',
        'Entfernung ausschließender Designelemente',
        'Kommunikation mit Entwicklern und Stakeholdern',
        'Strategien zur Abstimmung von Unternehmenszielen und UX-Erkenntnissen',
        'Technische Abstimmung im Designprozess',
        'Einbringen und Bewertung neuer Feature-Ideen',
        'Entwicklung kreativer Marketingkonzepte',
        'Optimierung von Farbkonzepten',
        'Integration von Kundenbewertungen im Web'
        ];
        ticker.textContent = skills.join(' • ');
        let pos = container.offsetWidth;
        const speed = 1;
        setInterval(() => {
            pos -= speed;
            if (pos <= -ticker.offsetWidth) {
                pos = container.offsetWidth;
            }
            ticker.style.transform = `translateX(${pos}px)`;
        }, 20);
    }
});

function delayNavigation(event, el) {
  event.preventDefault(); // verhindert sofortiges Springen
  el.classList.add('clicked'); // z. B. für Animation
  setTimeout(() => {
    window.location.href = el.href;
  }, 1000); // 1000 ms = 1 Sekunde Verzögerung
}

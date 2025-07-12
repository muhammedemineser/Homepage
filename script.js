  document.addEventListener("DOMContentLoaded", function () {
    document.body.style.visibility = "visible";
    document.body.style.opacity = "1";
  });

// Mobile navigation toggle
const navToggle = document.getElementById('navToggle');
const navbar = document.getElementById('navbar');

if (navToggle && navbar) {
  navToggle.addEventListener('click', () => {
    navbar.classList.toggle('show');
  });
}

// Smooth scroll for anchor links
document.addEventListener("DOMContentLoaded", function () {
    // Sichtbarkeit aktivieren
    document.body.style.visibility = "visible";

    // Smooth Scroll für Anker-Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });

                // Navigation einklappen (nur wenn navbar existiert)
                const navbar = document.getElementById("navbar");
                if (navbar) navbar.classList.remove('show');
            }
        });
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

const sun = document.getElementById('sunIcon');
const moon = document.getElementById('moonIcon');

function updateThemeAssets(isDark) {
  const personaImg = document.querySelector('img[alt="User Persona"]');
  if (personaImg) {
    personaImg.src = isDark
      ? 'media/Google UX Design Certificate - Persona [Template] (2).png'
      : 'media/Persona_weiss.jpeg';
  }

  const empathyImages = document.querySelectorAll('.empathy-map');
  if (empathyImages.length === 3) {
    empathyImages[0].src = isDark
      ? 'media/Amina S._20250426_104117_0000.png'
      : 'media/Amina_weiss.png';
    empathyImages[1].src = isDark
      ? 'media/Mehmet T._20250426_104927_0000.png'
      : 'media/Mehmet_weiss.png';
    empathyImages[2].src = isDark
      ? 'media/Serhat K._20250426_103242_0000.png'
      : 'media/Serhat_weiss.png';
  }

  const visionImages = document.querySelectorAll('.vision-map');
  if (visionImages.length === 3) {
    visionImages[0].src = isDark
      ? 'media/Fuse Tea - Benutzergeschichten [Template].png'
      : 'media/Benutzergeschichten_Amina_Weiss.png';
    visionImages[1].src = isDark
      ? 'media/Fuse Tea - Benutzergeschichten [Template] (1).png'
      : 'media/Benutzergeschichten_Serhat_Weiss.png';
    visionImages[2].src = isDark
      ? 'media/Fuse Tea - Benutzergeschichten [Template] (2).png'
      : 'media/Benutzergeschichten_Mehmet_Weiss.png';
  }

  const skipSymbol = document.getElementById('skipSymbol');
  if (skipSymbol) {
    skipSymbol.src = isDark ? 'media/skipSymbol.png' : 'media/skipSymbol_lila.png';
  }

  const wireframe = document.querySelector('.item-row1');
  if (wireframe) {
    wireframe.style.backgroundImage = isDark
      ? "url('media/vorher_nachher_wireframe.png')"
      : "url('media/wireframe_weiss.png')";
  }

  const products = document.getElementById('products');
  if (products) {
    products.src = isDark
      ? 'media/vergleich_produktbilder.png'
      : 'media/vergleich_produktbilder_weiss.png';
  }
}

function applyStoredTheme() {
  const saved = localStorage.getItem('theme');
  if (!saved) return;
  const isDark = saved === 'dark';
  document.documentElement.classList.toggle('dark', isDark);
  document.body.classList.toggle('futuristic', isDark);

  if (sun && moon) {
    if (isDark) {
      sun.classList.remove('visible');
      moon.classList.add('visible');
    } else {
      moon.classList.remove('visible');
      sun.classList.add('visible');
    }
  }

  const toggleLabel = document.getElementById('toggleLabel');
  if (toggleLabel) {
    if (!toggleLabel.dataset.original) {
      toggleLabel.dataset.original = toggleLabel.innerHTML;
    }
    toggleLabel.innerHTML = isDark ? 'Dunkel' : toggleLabel.dataset.original;
  }

  updateThemeAssets(isDark);
}

if (document.readyState !== 'loading') {
  applyStoredTheme();
} else {
  document.addEventListener('DOMContentLoaded', applyStoredTheme);
}

function applyStoredTheme() {
  const saved = localStorage.getItem('theme');
  if (!saved) return;
  const isDark = saved === 'dark';
  document.documentElement.classList.toggle('dark', isDark);
  document.body.classList.toggle('futuristic', isDark);

  if (sun && moon) {
    if (isDark) {
      sun.classList.remove('visible');
      moon.classList.add('visible');
    } else {
      moon.classList.remove('visible');
      sun.classList.add('visible');
    }
  }

  const toggleLabel = document.getElementById('toggleLabel');
  if (toggleLabel) {
    if (!toggleLabel.dataset.original) {
      toggleLabel.dataset.original = toggleLabel.innerHTML;
    }
    toggleLabel.innerHTML = isDark ? 'Dunkel' : toggleLabel.dataset.original;
  }
}

document.addEventListener('DOMContentLoaded', applyStoredTheme);

function playAnimation(element, animationName) {
  element.style.animation = "none"; // reset
  void element.offsetWidth;         // force reflow
  element.style.animation = `${animationName} 1s forwards`;
}

if (themeToggle) {
themeToggle.addEventListener('click', () => {
  const isDark = document.documentElement.classList.toggle('dark');
  document.body.classList.toggle('futuristic', isDark);
  localStorage.setItem('theme', isDark ? 'dark' : 'light');

 if (isDark) {
    playAnimation(sun, "fadeOut");
    setTimeout(() => {
      sun.classList.remove("visible");
      moon.classList.add("visible");
      playAnimation(moon, "fadeInMoon");
    }, 1000);
  } else {
    playAnimation(moon, "fadeOutMoon");
    setTimeout(() => {
      moon.classList.remove("visible");
      sun.classList.add("visible");
      playAnimation(sun, "fadeIn");
    }, 1000);
  }

    const toggleLabel = document.getElementById("toggleLabel");
    if (!toggleLabel.dataset.original) {
  setTimeout(() => {
    toggleLabel.dataset.original = toggleLabel.innerHTML;

    toggleLabel.style.opacity = 0;

    setTimeout(() => {
      toggleLabel.innerHTML = "Dunkel";
      toggleLabel.style.opacity = 1;
    }, 500); // Warte, bis das Ausblenden abgeschlossen ist
  }, 1000);
} else {
  setTimeout(() => {
    toggleLabel.style.opacity = 0;

    setTimeout(() => {
      if (toggleLabel.innerHTML === "Dunkel") {
        toggleLabel.innerHTML = toggleLabel.dataset.original;
      } else {
        toggleLabel.innerHTML = "Dunkel";
      }
      toggleLabel.style.opacity = 1;
    }, 500);
  }, 1000);
}

     updateThemeAssets(isDark);

  });
}

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
    let currentSlide = 0;

const track = document.querySelector('.carousel-track');
if (track) {
    const slides = Array.from(track.children);
    const nextBtn = document.querySelector('.carousel-btn.next');
    const prevBtn = document.querySelector('.carousel-btn.prev');

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

    if (currentSlide === 0) {
    document.querySelector(".drop-content").innerHTML = `<p>Color Reaction – Wenn UX auf Wissenschaft trifft
Aus der Kombination von Sporttheorie, kognitiver Psychologie und meiner Leidenschaft für Frontend-Entwicklung entstand dieses interaktive Farbreaktionsspiel. Ziel: Reaktionszeit, Konzentration und Mustererkennung auf spielerische Weise messbar machen.
Das Game analysiert Nutzerdaten wie Alter, Geschlecht und Performance, gibt direktes Feedback, bietet Rankings und fördert Metakognition. Features wie Mehrsprachigkeit, mobile Optimierung, intuitive UX und wissenschaftlicher Hintergrund machen es zu mehr als nur einem Spiel – es ist ein smartes Forschungstool im Spielformat.
Live getestet im Schulunterricht, begeistert angenommen von Lehrkräften und Mitschülern – ein Herzensprojekt mit echtem Mehrwert.</p>`;
    }

    const prevNextBtn = [nextBtn, prevBtn];
    prevNextBtn.forEach(btn => {
        btn.addEventListener('click', () => {
    if (currentSlide === 1) {
    document.querySelector(".drop-content").innerHTML = `<p>Softdrink-Website – UX-Redesign & Design Sprint
    In nur einer Woche entstand im Rahmen eines intensiven Design Sprints ein vollständiges UX-Redesign für die Website eines Startups. Ausgangspunkt war ein funktionales Dev-Konzept ohne Nutzerfokus. Durch Research, Informationsarchitektur, Wireframes und Testing entstand eine intuitive, mobile-first optimierte Seite. Das Projekt basierte auf echter Zusammenarbeit mit dem Entwickler sowie direktem Feedback aus dem Umfeld und vom Kunden. Ergebnis: ein emotionales Markenerlebnis mit klarer Struktur, das Nutzer:innen abholt – und ein zufriedener Kunde, der mich künftig wieder beauftragen will.</p>`;
    } else if (currentSlide === 0) {
    document.querySelector(".drop-content").innerHTML = `<p>Color Reaction – Wenn UX auf Wissenschaft trifft
Aus der Kombination von Sporttheorie, kognitiver Psychologie und meiner Leidenschaft für Frontend-Entwicklung entstand dieses interaktive Farbreaktionsspiel. Ziel: Reaktionszeit, Konzentration und Mustererkennung auf spielerische Weise messbar machen.
Das Game analysiert Nutzerdaten wie Alter, Geschlecht und Performance, gibt direktes Feedback, bietet Rankings und fördert Metakognition. Features wie Mehrsprachigkeit, mobile Optimierung, intuitive UX und wissenschaftlicher Hintergrund machen es zu mehr als nur einem Spiel – es ist ein smartes Forschungstool im Spielformat.
Live getestet im Schulunterricht, begeistert angenommen von Lehrkräften und Mitschülern – ein Herzensprojekt mit echtem Mehrwert.</p>`;
    } else if (currentSlide === 2) {
        document.querySelector(".drop-content").innerHTML = `<p></p>`;
    }

    console.log(currentSlide);
});
})
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

//twentytwenty

window.addEventListener('load', () => {
  $(".twentytwenty-container").twentytwenty();

  const beforeImg = document.getElementById('beforeImg');
  const afterImg = document.getElementById('afterImg');

  const setHeight = () => {
    if (beforeImg && afterImg) {
      const height = afterImg.clientHeight;
      if (height > 0) {
        beforeImg.style.height = height + 'px';
        beforeImg.style.width = 'auto';
      }
    }
  };

  if (afterImg) {
    if (afterImg.complete) {
      setHeight();
    } else {
      afterImg.onload = setHeight;
    }
  }
});


  const scrollWrapper = document.querySelector('.scroll-wrapper');
  const root = document.documentElement;

  if (scrollWrapper) {
    const updatePositions = () => {
      const scrollY = scrollWrapper.scrollTop;
      const scrollHeight = scrollWrapper.scrollHeight - scrollWrapper.clientHeight;
      const basePercent = 3;
      const maxPercent = 90;
      const progress = scrollHeight > 0 ? scrollY / scrollHeight : 0;
      const newPercent = basePercent + progress * 1.1 *(maxPercent - basePercent);

      root.style.setProperty('--handle-top', newPercent + '%');
      root.style.setProperty('--label-top', newPercent + '%');
    };

    updatePositions();
    scrollWrapper.addEventListener('scroll', updatePositions);
  }

  // ---------- Page transition logic ----------
(function(){
const addTransitionMarkup = () => {
  if (document.querySelector('.layers')) return;
  
  const section = document.createElement('section');
  section.className = 'layers';
  section.style.display = 'none';

  section.innerHTML = `
    <div class="layer layer1"></div>
    <div class="layer layer2"></div>
    <div class="layer layer3"></div>
    <div class="transition-content">
      <img src="meinIcon.png" class="transition-image" />
      <span class="image-credit">Presented by Mee Studios</span>
    </div>
  `;
  document.body.prepend(section);
};


 const playTransition = () => {
  const overlay = document.querySelector('.layers');
  if (!overlay || typeof anime === 'undefined') return;

  overlay.style.display = 'block';

  anime.timeline()
    .add({
      targets: '.layer',
      rotateY: 180,
      duration: 800,
      easing: 'easeInOutQuad'
    })
    .add({
      targets: '.layer',
      boxShadow: '0 0 90px 18px rgba(0,255,255,0.8)',
      duration: 600,
      easing: 'easeInOutQuad',
     begin: () => {
  anime({
    targets: '.transition-image',
    opacity: [0, 1],
    scale: [0.95, 1],
    duration: 400,
    easing: 'easeOutQuad'
  });
  anime({
    targets: '.image-credit',
    opacity: [0, 1],
    scale: [0.95, 1],
    duration: 400,
    delay: 100,
    easing: 'easeOutQuad'
  });
}
    })
    .add({
      targets: '.layer',
      opacity: 0,
      duration: 800,
      easing: 'easeInOutQuad',
     complete: () => {
  anime({
    targets: ['.transition-image', '.image-credit'],
    opacity: [1, 0],
    scale: [1, 0.9],
    duration: 500,
    easing: 'easeInOutQuad'
  });
}
    });



  // Overlay nach Animation wieder ausblenden
  setTimeout(() => {
    overlay.style.display = 'none';
  }, 2300); // Dauer sollte zu Timeline passen
};

  const prepareAnchors = () => {
    document.querySelectorAll('a[href$=".html"]').forEach(a => {
      if (a.getAttribute('href').startsWith('#')) return;
      a.addEventListener('click', () => {
        sessionStorage.setItem('showTransition', 'true');
      });
    });
  };

  document.addEventListener('DOMContentLoaded', () => {
if (sessionStorage.getItem('showTransition') === 'true') {
  document.body.style.opacity = '0.3';
  document.body.style.transition = 'opacity 0.3s ease';
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 1500);
} else {
  document.body.style.opacity = '1'; // sofort sichtbar, wenn kein Übergang
}

    addTransitionMarkup();
    prepareAnchors();

    const animeScript = document.createElement('script');
    animeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js';
    animeScript.onload = () => {
      if (sessionStorage.getItem('showTransition') === 'true') {
        sessionStorage.removeItem('showTransition');
        playTransition();
      }
    };
    document.head.appendChild(animeScript);
  });
})();

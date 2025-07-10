window.addEventListener("DOMContentLoaded", () => {

  document.querySelector("body").style.display = "block"; 
    document.querySelector("html").style.display = "block"; 


    // Animation für Bilder
    for (let i = 1; i <= 4; i++) {
        document.getElementById("pic" + i).style.opacity = "0";
        document.getElementById("pic" + i).style.transition = "opacity 0.3s ease";
        document.getElementById("pic" + i).style.willChange = "opacity";
        setTimeout(() => {
            document.getElementById("pic" + i).style.opacity = "1";
        }, 300);
    }


    // Intersection Observer
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.transition = "opacity 0.6s ease";
            entry.target.style.opacity = "1";
            observer.unobserve(entry.target); 
        } else {
            entry.target.style.opacity = "0";
        }
    });
}, { threshold: 0.3 });

// Observe all .cartoonBilder elements
document.querySelectorAll(".cartoonBilder").forEach(box => {
    observer.observe(box);
});

// Animation für Buchstaben
document.querySelectorAll(".cartoonText").forEach(e => {
    const text = e.innerHTML;
    e.textContent = "";

    // Split text and wrap each part in a span
    text.split(/(<br\s*\/?>|\s)/).forEach((t, i) => {
        const span = document.createElement("span");
        if (t === "\n" || t === "\r" || t === "\r\n" || t === "<br>") {
            span.innerHTML = "<br>";
        } else if (t === " ") {
            span.innerHTML = "&nbsp;";
        } else {
            span.textContent = t;
        }
        span.style.opacity = "0";
        span.style.transition = "opacity 0.3s ease";
        e.appendChild(span);
    });

    // Observe the text element
    observer.observe(e);
});

// Add a new IntersectionObserver for .cartoonText to animate letters
const textObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const spans = entry.target.querySelectorAll("span");
            spans.forEach((span, i) => {
                setTimeout(() => {
                    span.style.opacity = "1";
                    span.classList.add("animation");
                }, i * 10);
            });
            textObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll(".cartoonText").forEach(e => {
    textObserver.observe(e);
});

const maps = document.querySelectorAll('.empathy-map');
let current = 0;
let clickLocked = false; // Sperrvariable

function switchMap(next) {
  if (clickLocked) return; // Falls blockiert: abbrechen
  clickLocked = true;

  const currentMap = maps[current];
  const nextMap = maps[next];

  currentMap.classList.remove('active');
  currentMap.classList.add('exit-left');

  nextMap.style.display = 'block';
  nextMap.classList.remove('active', 'exit-left', 'enter-right');
  nextMap.classList.add('enter-right');

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      nextMap.classList.remove('enter-right');
      nextMap.classList.add('active');
      current = next;
    });
  });

  setTimeout(() => {
    currentMap.style.display = 'none';
    currentMap.classList.remove('exit-left');
    clickLocked = false; // Sperre wieder freigeben
  }, 1000); // Dauer der Sperre (1 Sekunde)
}

// Klick auf Karte: weiter zur nächsten
document.querySelector('.empathy-card').addEventListener('click', () => {
  const next = (current + 1) % maps.length;
  switchMap(next);
});

// Navigation via Buttons
document.getElementById('prevEmpathy').addEventListener('click', (e) => {
  e.stopPropagation();
  const prev = (current - 1 + maps.length) % maps.length;
  switchMap(prev);
});

document.getElementById('nextEmpathy').addEventListener('click', (e) => {
  e.stopPropagation();
  const next = (current + 1) % maps.length;
  switchMap(next);
});
const visionMaps = document.querySelectorAll('.vision-map');
let currentVision = 0;
let visionClickLocked = false;

function switchVisionMap(next) {
  if (visionClickLocked) return;
  visionClickLocked = true;

  const currentMap = visionMaps[currentVision];
  const nextMap = visionMaps[next];

  currentMap.classList.remove('active');
  currentMap.classList.add('exit-left');

  nextMap.style.display = 'block';
  nextMap.classList.remove('active', 'exit-left', 'enter-right');
  nextMap.classList.add('enter-right');

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      nextMap.classList.remove('enter-right');
      nextMap.classList.add('active');
      currentVision = next;
    });
  });

  setTimeout(() => {
    currentMap.style.display = 'none';
    currentMap.classList.remove('exit-left');
    visionClickLocked = false;
  }, 1000);
}

// Klick auf Karte
document.querySelector('.vision-card').addEventListener('click', () => {
  const next = (currentVision + 1) % visionMaps.length;
  switchVisionMap(next);
});

// Navigation Buttons
document.getElementById('prevVision').addEventListener('click', (e) => {
  e.stopPropagation();
  const prev = (currentVision - 1 + visionMaps.length) % visionMaps.length;
  switchVisionMap(prev);
});

document.getElementById('nextVision').addEventListener('click', (e) => {
  e.stopPropagation();
  const next = (currentVision + 1) % visionMaps.length;
  switchVisionMap(next);
});


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
//onload
});



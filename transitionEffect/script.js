//will change to click event for every element that navigates to a html file
document.addEventListener('DOMContentLoaded', () => {
  anime({
    targets: '.layer',
    rotateY: [
      { value: 200, duration: 1000 },
      { value: -1, duration: 1000 },
      { value: 0, duration: 1000 }
    ],
    easing: 'easeInOutSine',
    loop: true,
    direction: 'alternate',
    delay: anime.stagger(150)
  });
});
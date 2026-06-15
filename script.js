// ----------------------------------------------------------------
// Camera viewfinder cursor — "kijken door de lens"
// ----------------------------------------------------------------
const viewfinder = document.querySelector('.viewfinder');

if (viewfinder && window.matchMedia('(hover: hover)').matches) {
  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;
  let currentX = targetX;
  let currentY = targetY;

  document.addEventListener('mousemove', (event) => {
    targetX = event.clientX;
    targetY = event.clientY;
  });

  // Smooth, slightly lagging follow for a "focusing lens" feel
  function animateViewfinder() {
    currentX += (targetX - currentX) * 0.18;
    currentY += (targetY - currentY) * 0.18;
    viewfinder.style.transform = `translate(${currentX}px, ${currentY}px)`;
    requestAnimationFrame(animateViewfinder);
  }
  animateViewfinder();

  // Tighten the focus ring over interactive elements
  const focusables = document.querySelectorAll('a, button, .wegwijzer-card, .over-photo-wrap');
  focusables.forEach((el) => {
    el.addEventListener('mouseenter', () => viewfinder.classList.add('vf-focus'));
    el.addEventListener('mouseleave', () => viewfinder.classList.remove('vf-focus'));
  });
}

// ----------------------------------------------------------------
// Reusable 3D tilt-on-mousemove
// ----------------------------------------------------------------
function applyTilt(wrap, target, maxTilt) {
  wrap.addEventListener('mousemove', (event) => {
    const rect = wrap.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    const rotateX = (-y * maxTilt).toFixed(2);
    const rotateY = (x * maxTilt).toFixed(2);

    target.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  wrap.addEventListener('mouseleave', () => {
    target.style.transform = 'rotateX(0deg) rotateY(0deg)';
  });
}

const tiltWrap = document.getElementById('tilt-wrap');
const tiltPhoto = document.getElementById('tilt-photo');
if (tiltWrap && tiltPhoto) {
  applyTilt(tiltWrap, tiltPhoto, 14);
}

document.querySelectorAll('.wegwijzer-card').forEach((card) => {
  applyTilt(card, card, 6);
});

// ----------------------------------------------------------------
// Hero parallax forest layers (3D depth)
// ----------------------------------------------------------------
const heroLayers = document.querySelectorAll('.hero-layer');
const hero = document.querySelector('.hero');

if (hero && heroLayers.length) {
  hero.addEventListener('mousemove', (event) => {
    const rect = hero.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    heroLayers.forEach((layer) => {
      const depth = parseFloat(layer.dataset.depth || '0');
      const moveX = x * depth;
      const moveY = y * depth * 0.5;
      layer.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
  });

  hero.addEventListener('mouseleave', () => {
    heroLayers.forEach((layer) => {
      layer.style.transform = 'translate(0, 0)';
    });
  });
}

// ----------------------------------------------------------------
// Hide photo if asset missing, hide hero video fallback once playable
// ----------------------------------------------------------------
if (tiltPhoto) {
  tiltPhoto.addEventListener('error', () => {
    tiltPhoto.style.visibility = 'hidden';
  });
}

const heroVideo = document.querySelector('.hero-video');
const heroFallback = document.querySelector('.hero-fallback');

if (heroVideo && heroFallback) {
  heroVideo.addEventListener('loadeddata', () => {
    heroFallback.style.display = 'none';
  });

  heroVideo.addEventListener('error', () => {
    heroVideo.style.display = 'none';
  });
}

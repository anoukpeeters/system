// 3D tilt effect on the "Over Anouk" photo
const tiltWrap = document.getElementById('tilt-wrap');
const tiltPhoto = document.getElementById('tilt-photo');

if (tiltWrap && tiltPhoto) {
  const maxTilt = 10;

  tiltWrap.addEventListener('mousemove', (event) => {
    const rect = tiltWrap.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    const rotateX = (-y * maxTilt).toFixed(2);
    const rotateY = (x * maxTilt).toFixed(2);

    tiltPhoto.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  tiltWrap.addEventListener('mouseleave', () => {
    tiltPhoto.style.transform = 'rotateX(0deg) rotateY(0deg)';
  });
}

// Hide the photo element if the asset hasn't been added yet, so the
// cream placeholder background shows instead of a broken-image icon
if (tiltPhoto) {
  tiltPhoto.addEventListener('error', () => {
    tiltPhoto.style.visibility = 'hidden';
  });
}

// Hide the gradient fallback once the hero video has data to play
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

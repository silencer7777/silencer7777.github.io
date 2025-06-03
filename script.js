function adjustFontSizes() {
  const heading = document.querySelector("h1");
  const paragraphs = document.querySelectorAll("p");
  const boldText = document.querySelector("b");

  if (heading) {
    heading.style.fontSize = `clamp(24px, 2vw, 48px)`;
  }

  paragraphs.forEach((p) => {
    p.style.fontSize = `clamp(16px, 1.5vw, 24px)`;
  });

  if (boldText) {
    boldText.style.fontSize = `clamp(20px, 2rem, 32px)`;
  }
}

// Function to autoplay YouTube background music
function playBackgroundMusic() {
  const iframe = document.getElementById("backgroundMusic");
  
  if (iframe) {
    // Attempt to load and play the embedded YouTube video
    console.log("YouTube background music is set to autoplay.");
  } else {
    console.log("YouTube iframe element not found.");
  }
}

// --- Space Animation Code ---
function createSpaceAnimation(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = 120;
  canvas.height = window.innerHeight;

  const stars = Array.from({length: 40}, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.8 + 0.5,
    speed: Math.random() * 0.6 + 0.2,
    alpha: Math.random() * 0.5 + 0.5
  }));

  const planets = [
    {x: 60, y: 100, r: 18, color: '#6cf', speed: 0.2, angle: 0},
    {x: 90, y: 350, r: 12, color: '#fc6', speed: 0.1, angle: 0},
    {x: 30, y: 600, r: 8, color: '#c6f', speed: 0.15, angle: 0}
  ];

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw stars
    stars.forEach(star => {
      ctx.save();
      ctx.globalAlpha = star.alpha;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.r, 0, 2 * Math.PI);
      ctx.fillStyle = '#fff';
      ctx.shadowColor = '#fff';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.restore();

      // Animate star
      star.y += star.speed;
      if (star.y > canvas.height) {
        star.y = 0;
        star.x = Math.random() * canvas.width;
      }
    });

    // Draw planets
    planets.forEach(planet => {
      ctx.save();
      ctx.beginPath();
      ctx.arc(planet.x, planet.y + Math.sin(planet.angle) * 10, planet.r, 0, 2 * Math.PI);
      ctx.fillStyle = planet.color;
      ctx.shadowColor = planet.color;
      ctx.shadowBlur = 20;
      ctx.fill();
      ctx.restore();

      // Animate planet
      planet.angle += planet.speed * 0.01;
    });

    requestAnimationFrame(draw);
  }

  draw();
}

// Helper function to detect mobile
function isMobile() {
  return window.innerWidth <= 767;
}

// Run on page load
adjustFontSizes();
playBackgroundMusic();

// Only run space animations if not on mobile
if (!isMobile()) {
  createSpaceAnimation('leftSpaceAnim');
  createSpaceAnimation('rightSpaceAnim');
}

// Run on window resize
window.addEventListener("resize", adjustFontSizes);
window.addEventListener('resize', () => {
  // Adjust canvas height and re-run or clear animation based on device size
  document.querySelectorAll('.space-anim').forEach(canvas => {
    canvas.height = window.innerHeight;
    if (isMobile()) {
      const ctx = canvas.getContext('2d');
      ctx && ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  });
});

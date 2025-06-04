const planetTextures = {
  mars:    'https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg',
  neptune: 'https://upload.wikimedia.org/wikipedia/commons/5/56/Neptune_Full.jpg',
  saturn:  'https://upload.wikimedia.org/wikipedia/commons/c/c7/Saturn_during_Equinox.jpg',
  moon:    'https://upload.wikimedia.org/wikipedia/commons/e/e1/FullMoon2010.jpg',
  saturnRing: 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Saturn_Ring_PNG.png',
  milkyway: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Milky_Way_Arch.jpg'
};

function preloadImages(urls, callback) {
  const images = {};
  let loaded = 0, total = Object.keys(urls).length;
  for (const key in urls) {
    images[key] = new Image();
    images[key].crossOrigin = "anonymous";
    images[key].src = urls[key];
    images[key].onload = () => {
      loaded++;
      if (loaded === total) callback(images);
    };
    images[key].onerror = () => {
      loaded++;
      if (loaded === total) callback(images);
    };
  }
}

function startSideSpaceAnimation(images, canvasId, isLeft) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let planets = [];
  let stars = [];

  function init() {
    canvas.width = 320;
    canvas.height = window.innerHeight;

    stars = Array.from({length: 50}, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2.2 + 0.5,
      alpha: Math.random() * 0.5 + 0.5,
      speed: Math.random() * 0.8 + 0.2
    }));

    planets = [
      {
        name: 'Mars',
        x: canvas.width * 0.70, y: 120, r: 44,
        texture: images.mars,
        moons: [
          { r: 12, dist: 62, speed: 0.008, angle: Math.random() * Math.PI * 2 }
        ]
      },
      {
        name: 'Neptune',
        x: canvas.width * 0.78, y: canvas.height/2, r: 54,
        texture: images.neptune,
        moons: [
          { r: 14, dist: 88, speed: 0.006, angle: Math.random() * Math.PI * 2 }
        ]
      },
      {
        name: 'Saturn',
        x: canvas.width * 0.65, y: canvas.height-160, r: 62,
        texture: images.saturn,
        ring: images.saturnRing,
        moons: [
          { r: 16, dist: 98, speed: 0.004, angle: Math.random() * Math.PI * 2 },
          { r: 10, dist: 80, speed: 0.007, angle: Math.random() * Math.PI * 2 }
        ]
      }
    ];
  }

  function drawMilkyWay() {
    ctx.save();
    ctx.globalAlpha = 0.22;
    ctx.translate(canvas.width/2, canvas.height/2);
    ctx.rotate(isLeft ? -0.3 : 0.3);
    ctx.drawImage(images.milkyway, -canvas.width*1.5/2, -canvas.height*0.7/2, canvas.width*1.5, canvas.height*0.7);
    ctx.restore();
    ctx.globalAlpha = 1;
  }

  function drawStars() {
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

      star.y += star.speed;
      if (star.y > canvas.height) {
        star.y = 0;
        star.x = Math.random() * canvas.width;
      }
    });
  }

  function drawPlanet(planet) {
    if (planet.ring) {
      ctx.save();
      ctx.globalAlpha = 0.8;
      ctx.translate(planet.x, planet.y);
      ctx.rotate(-0.3);
      ctx.drawImage(planet.ring, -planet.r*2.2, -planet.r*0.5, planet.r*4.4, planet.r*1.0);
      ctx.restore();
    }
    ctx.save();
    ctx.beginPath();
    ctx.arc(planet.x, planet.y, planet.r, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(planet.texture, planet.x-planet.r, planet.y-planet.r, planet.r*2, planet.r*2);
    ctx.restore();
    ctx.save();
    ctx.globalAlpha = 0.22;
    ctx.shadowColor = "#fff";
    ctx.shadowBlur = 24;
    ctx.beginPath();
    ctx.arc(planet.x, planet.y, planet.r, 0, 2 * Math.PI);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.restore();
  }

  function drawMoon(planet, moon) {
    moon.angle += moon.speed;
    const mx = planet.x + Math.cos(moon.angle) * moon.dist;
    const my = planet.y + Math.sin(moon.angle) * moon.dist;
    ctx.save();
    ctx.beginPath();
    ctx.arc(mx, my, moon.r, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(images.moon, mx-moon.r, my-moon.r, moon.r*2, moon.r*2);
    ctx.restore();
    ctx.save();
    ctx.globalAlpha = 0.12;
    ctx.beginPath();
    ctx.arc(planet.x, planet.y, moon.dist, 0, 2 * Math.PI);
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 1;
    ctx.setLineDash([2, 6]);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMilkyWay();
    drawStars();
    planets.forEach(planet => {
      drawPlanet(planet);
      planet.moons.forEach(moon => drawMoon(planet, moon));
    });
    requestAnimationFrame(animate);
  }

  init();
  animate();
  window.addEventListener('resize', () => {
    init();
  });
}

preloadImages(planetTextures, function(images) {
  startSideSpaceAnimation(images, 'leftSpaceCanvas', true);
  startSideSpaceAnimation(images, 'rightSpaceCanvas', false);
});

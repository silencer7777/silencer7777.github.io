javascript
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

// Run on page load
adjustFontSizes();

// Run on window resize
window.addEventListener('resize', adjustFontSizes);

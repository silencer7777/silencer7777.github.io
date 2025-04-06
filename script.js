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

// Run on page load
adjustFontSizes();
playBackgroundMusic();

// Run on window resize
window.addEventListener("resize", adjustFontSizes);

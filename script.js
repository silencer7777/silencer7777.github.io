<script>
// Set the font size for the first <h1> element
const heading = document.querySelector("h1");
if (heading) {
  heading.style.fontSize = "2vw";
}

// Select all <p> elements and set their font sizes
const paragraphs = document.querySelectorAll("p");
paragraphs.forEach((p) => {
  p.style.fontSize = "1.5vw";
});

// Select the first <b> element and increase its font size
const boldText = document.querySelector("b");
if (boldText) {
  boldText.style.fontSize = "2rem"; // Adjust as needed
}

// Add a resize event listener to adjust font sizes on window resize
window.addEventListener('resize', () => {
  if (heading) {
    heading.style.fontSize = "2vw";
  }
  paragraphs.forEach((p) => {
    p.style.fontSize = "1.5vw";
  });
  if (boldText) {
    boldText.style.fontSize = "2rem";
  }
});
</script>

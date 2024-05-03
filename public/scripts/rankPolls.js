let points = {};

// Initialize points object with keys corresponding to the text content of draggable elements
document.querySelectorAll("#decList .decItem").forEach((draggable) => {
  const text = draggable.querySelector("span").textContent.trim();
  points[text] = 0;
});

const draggables = document.querySelectorAll("#decList .decItem");
const submitBtn = document.getElementById("submitBtn");

submitBtn.addEventListener("click", () => {
  console.log("TEST");
  const sortedDraggables = Array.from(draggables).sort((a, b) => {
    return a.getBoundingClientRect().top - b.getBoundingClientRect().top;
  });

  let currentPoints = Object.keys(points).length; // Starting points

  sortedDraggables.forEach((draggable, index) => {
    const text = draggable.querySelector("span").textContent.trim(); // Get the text content of the span inside the draggable
    points[text] += currentPoints;
    currentPoints--; // Decrease points for the next option
  });

  let results = "Title: " + document.getElementById("title").innerText + "   "; // Add title to results
  // Generate results string with option and points
  for (const [key, value] of Object.entries(points)) {
    results += `${key}: ${value}   `;
  }
  console.log(results);
});

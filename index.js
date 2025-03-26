// Get the canvas and its drawing context
const canvas = document.getElementById('progressCanvas');
const ctx = canvas.getContext('2d');
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const radius = 120; // Radius for the circular progress arc

// Generate a random target value between 1500 and 3500 that is a multiple of 5
function generateTarget() {
  const minMultiple = 300; // 300 * 5 = 1500
  const maxMultiple = 700; // 700 * 5 = 5500
  const randomMultiple = Math.floor(Math.random() * (maxMultiple - minMultiple + 1)) + minMultiple;
  return randomMultiple * 5;
}

const targetValue = generateTarget();
let currentValue = 0;

// For animation timing
let startTime = null;
const animationDuration = 3000; // Animation duration in milliseconds

// Function to format a number with commas
function formatNumber(num) {
  return num.toLocaleString('en-US');
}

// Function to draw the progress indicator on the canvas
function drawProgress(value) {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the background circle (light gray)
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  ctx.strokeStyle = '#eee';
  ctx.lineWidth = 20;
  ctx.stroke();

  // Calculate the progress angle (starting from -90° so that it begins at the top)
  const progress = value / targetValue;
  const endAngle = -Math.PI / 2 + progress * 2 * Math.PI;

  // Draw the progress arc (blue)
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, -Math.PI / 2, endAngle);
  ctx.strokeStyle = '#007BFF';
  ctx.lineWidth = 20;
  ctx.stroke();

  // Display the current value as formatted text in the center
  ctx.fillStyle = '#333';
  ctx.font = '28px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('Ksh ' + formatNumber(value), centerX, centerY);
}

// Animate the progress indicator from 0 up to the targetValue
function animateProgress(timestamp) {
  if (!startTime) startTime = timestamp;
  const elapsed = timestamp - startTime;
  const progressRatio = Math.min(elapsed / animationDuration, 1);
  
  // Calculate the current value
  currentValue = Math.floor(progressRatio * targetValue);
  // Ensure the value ends with 0 or 5 by rounding to the nearest multiple of 5
  currentValue = Math.round(currentValue / 5) * 5;

  drawProgress(currentValue);

  if (progressRatio < 1) {
    requestAnimationFrame(animateProgress);
  }
}

// Start the animation
requestAnimationFrame(animateProgress);

document.getElementById('viewSavings').addEventListener('click', function() {
    window.location.href = 'verification.html';
});

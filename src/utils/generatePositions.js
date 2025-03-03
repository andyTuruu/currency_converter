// Generates a random position with random rotation.
function generatePosition() {
  // Restrict left to be between 10% and 90%
  const left = 10 + Math.random() * 80;
  let top;
  // If left is within the special ranges, allow a wider range for top.
  if ((left >= 10 && left < 25) || (left > 75 && left <= 90)) {
    top = 10 + Math.random() * 80; // top between 10% and 90%
  } else {
    // Otherwise, force top to be between 75% and 90%
    top = 75 + Math.random() * 15;
  }
  // Random rotation between 0 and 360 degrees
  const rotate = Math.random() * 360;
  return { left, top, rotate };
}

// Generates positions for a given count ensuring a minimum distance between symbols.
export default function generatePositions(count, minDistance) {
  const positions = [];
  let attempts = 0;
  const maxAttempts = count * 50;
  while (positions.length < count && attempts < maxAttempts) {
    attempts++;
    const pos = generatePosition();
    const isFar = positions.every((existing) => {
      const dx = pos.left - existing.left;
      const dy = pos.top - existing.top;
      const distance = Math.sqrt(dx * dx + dy * dy);
      return distance >= minDistance;
    });
    if (isFar) {
      positions.push(pos);
    }
  }
  return positions;
}

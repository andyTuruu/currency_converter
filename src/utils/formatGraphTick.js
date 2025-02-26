// src/utils/formatGraphTick.js
export default function formatGraphTick(value) {
  const num = parseFloat(value);
  if (num === 0) return "0";

  // For very small numbers, use scientific notation.
  if (num < 0.01) {
    return num.toExponential(2);
  }

  // Otherwise, format with 2 to 6 decimal places.
  return num.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 4,
  });
}

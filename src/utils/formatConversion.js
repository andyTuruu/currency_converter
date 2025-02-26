// utils/formatConversion.js
export default function formatConversion(value) {
  const num = parseFloat(value);
  if (num === 0) return "0";
  if (num < 0.001) return num.toExponential(2);
  if (num >= 10000000000000) return num.toExponential(3);
  if (num >= 10000)
    return num.toLocaleString(undefined, { maximumFractionDigits: 0 });
  return num.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 6,
  });
}

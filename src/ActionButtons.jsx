// ActionButtons.jsx
export default function ActionButtons({
  onSwap,
  toggleHistorical,
  showHistorical,
  isLoading,
}) {
  return (
    <div className="action-row">
      <button onClick={onSwap} disabled={isLoading}>
        Swap Currency
      </button>
      <button onClick={toggleHistorical} disabled={isLoading}>
        {showHistorical ? "Hide" : "Show"} Historical Rates
      </button>
    </div>
  );
}

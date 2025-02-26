// HistoricalSection.jsx
import HistoricalChart from "./HistoricalChart";

const toggleHistoricalData = () => {
  setShowHistorical((prev) => {
    const newVal = !prev;
    if (newVal) {
      document.body.classList.add("historical-active");
    } else {
      document.body.classList.remove("historical-active");
    }
    return newVal;
  });
};

export default function HistoricalSection({
  date,
  setDate,
  historicalRates,
  isLoading,
  theme,
}) {
  return (
    <div className="historical-section">
      <div className="calendar">
        <label htmlFor="historicalDate">Historical Date:</label>
        <input
          id="historicalDate"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          disabled={isLoading}
        />
      </div>
      {historicalRates.length > 0 && (
        <div className="chart-section">
          <HistoricalChart data={historicalRates} theme={theme} />
        </div>
      )}
    </div>
  );
}

// HistoricalSection.jsx
import HistoricalChart from "./HistoricalChart";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function HistoricalSection({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  historicalRates,
  isLoading,
  theme,
}) {
  const commonDatePickerProps = {
    disabled: isLoading,
    dateFormat: "yyyy-MM-dd",
    showYearDropdown: true,
    scrollableYearDropdown: true,
    yearDropdownItemNumber: 50,
    minDate: new Date("1999-01-05"), // Correct minimum date
    maxDate: new Date(),
  };

  return (
    <div className="historical-section">
      <div className="date-pickers">
        <div className="calendar">
          <label htmlFor="historicalStartDate">Start Date:</label>
          <DatePicker
            id="historicalStartDate"
            selected={startDate}
            onChange={setStartDate}
            {...commonDatePickerProps}
          />
        </div>
        <div className="calendar">
          <label htmlFor="historicalEndDate">End Date:</label>
          <DatePicker
            id="historicalEndDate"
            selected={endDate}
            onChange={setEndDate}
            {...commonDatePickerProps}
          />
        </div>
      </div>
      {historicalRates.length > 0 && (
        <div className="chart-section">
          <HistoricalChart data={historicalRates} theme={theme} />
        </div>
      )}
    </div>
  );
}

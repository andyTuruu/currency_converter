import { useState } from "react";
import "./App.css";
import TopBar from "./TopBar";
import ConversionForm from "./ConversionForm";
import ActionButtons from "./ActionButtons";
import HistoricalSection from "./HistoricalSection";
import useTheme from "./hooks/useTheme";
import useConversion from "./hooks/useConversion";
import useHistoricalRates from "./hooks/useHistoricalRates";
import useWindowWidth from "./hooks/useWindowWidth";

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [convertFrom, setConvertFrom] = useState("USD");
  const [convertTo, setConvertTo] = useState("EUR");
  const [amount, setAmount] = useState(100);
  const [date, setDate] = useState("");
  const [showHistorical, setShowHistorical] = useState(false);

  // Inside your component:
  const { convertedAmount, isLoading: conversionLoading } = useConversion(
    convertFrom,
    convertTo,
    amount
  );

  const { historicalRates, isLoading: historicalLoading } = useHistoricalRates(
    convertFrom,
    convertTo,
    date,
    showHistorical
  );
  const isLoading = conversionLoading || historicalLoading;

  const windowWidth = useWindowWidth();

  let watermarkClass = "";
  let symbols = ["$", "¥", "€", "£"];

  if (windowWidth > 820) {
    watermarkClass = "large-watermark";
  } else if (windowWidth > 480) {
    watermarkClass = "mid-watermark";
  } else {
    watermarkClass = "small-watermark";
    // Use fewer symbols on very small screens if desired
    symbols = ["$", "¥", "€"];
  }

  const handleSwap = () => {
    setConvertFrom(convertTo);
    setConvertTo(convertFrom);
  };

  return (
    <div className="app-container">
      {!showHistorical && (
        <div className={`watermark ${watermarkClass}`}>
          {symbols.map((symbol, index) => (
            <span key={index}>{symbol}</span>
          ))}
        </div>
      )}
      <div className="card">
        <TopBar theme={theme} toggleTheme={toggleTheme} />

        {isLoading && (
          <div className="loading-indicator">
            <div className="spinner"></div>
          </div>
        )}

        <ConversionForm
          amount={amount}
          setAmount={setAmount}
          convertFrom={convertFrom}
          setConvertFrom={setConvertFrom}
          convertTo={convertTo}
          setConvertTo={setConvertTo}
          convertedAmount={convertedAmount}
          isLoading={isLoading}
        />

        <ActionButtons
          onSwap={handleSwap}
          toggleHistorical={() => setShowHistorical(!showHistorical)}
          showHistorical={showHistorical}
          isLoading={isLoading}
        />

        {showHistorical && (
          <HistoricalSection
            date={date}
            setDate={setDate}
            historicalRates={historicalRates}
            isLoading={isLoading}
            theme={theme}
          />
        )}
      </div>
    </div>
  );
}

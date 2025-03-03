import { useState } from "react";
import "../App.css";
import TopBar from "./TopBar";
import ConversionForm from "./ConversionForm";
import ActionButtons from "./ActionButtons";
import HistoricalSection from "./HistoricalSection";
import GlowingEffect from "./GlowingEffect";
import useTheme from "../hooks/useTheme";
import useConversion from "../hooks/useConversion";
import useHistoricalRates from "../hooks/useHistoricalRates";
import useWindowWidth from "../hooks/useWindowWidth";

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [convertFrom, setConvertFrom] = useState("USD");
  const [convertTo, setConvertTo] = useState("EUR");
  const [amount, setAmount] = useState(100);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(new Date());
  const [showHistorical, setShowHistorical] = useState(false);

  const { convertedAmount, isLoading: conversionLoading } = useConversion(
    convertFrom,
    convertTo,
    amount
  );

  const { historicalRates, isLoading: historicalLoading } = useHistoricalRates(
    convertFrom,
    convertTo,
    startDate,
    endDate,
    showHistorical
  );
  const isLoading = conversionLoading || historicalLoading;

  const windowWidth = useWindowWidth();

  let watermarkClass = "";
  let currencySymbols = ["$", "¥", "€", "£"];

  if (windowWidth > 820) {
    watermarkClass = "large-watermark";
  } else if (windowWidth > 480) {
    watermarkClass = "mid-watermark";
  } else {
    watermarkClass = "small-watermark";
    currencySymbols = ["$", "¥", "€"];
  }

  const handleSwap = () => {
    setConvertFrom(convertTo);
    setConvertTo(convertFrom);
  };

  return (
    <>
      <GlowingEffect theme={theme} count={6} minDistance={20} />
      <div className="app-container">
        {!showHistorical && (
          <div className={`watermark ${watermarkClass}`}>
            {currencySymbols.map((symbol, index) => (
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
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              historicalRates={historicalRates}
              isLoading={isLoading}
              theme={theme}
            />
          )}
        </div>
      </div>
    </>
  );
}

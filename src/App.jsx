import { useEffect, useState } from "react";
import "./App.css";
import Options from "./Options";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function HistoricalChart({ data }) {
  return (
    <div className="chart-wrapper">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="date" stroke="#4CAF50" />
          <YAxis
            stroke="#4CAF50"
            domain={["dataMin * 0.95", "dataMax * 1.05"]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#2c2c3a",
              border: "none",
              borderRadius: "8px",
            }}
          />
          <Line
            type="monotone"
            dataKey="rate"
            stroke="#4CAF50"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default function App() {
  const [convertFrom, setConvertFrom] = useState("USD");
  const [convertTo, setConvertTo] = useState("CAD");
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState("");
  const [historicalRates, setHistoricalRates] = useState([]);
  const [showHistorical, setShowHistorical] = useState(false);

  // Theme logic (dark/light)
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme;
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    return prefersDark ? "dark" : "light";
  });

  useEffect(() => {
    document.body.classList.remove("light-theme", "dark-theme");
    document.body.classList.add(`${theme}-theme`);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  // Fetch current conversion
  async function fetchConversion(base, symbol, amt) {
    setIsLoading(true);
    try {
      const res = await fetch(
        `https://api.frankfurter.app/latest?base=${base}&symbols=${symbol}`
      );
      if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
      const data = await res.json();
      if (!data.rates || !data.rates[symbol])
        throw new Error("Rate data not available");
      const thisAmount = (amt * data.rates[symbol]).toFixed(3);
      setConvertedAmount(thisAmount);
    } catch (err) {
      console.error("Error fetching conversion:", err);
      setConvertedAmount("Error");
    } finally {
      setIsLoading(false);
    }
  }

  // Fetch historical data
  async function fetchHistoricalRate(base, symbol, startDate) {
    setIsLoading(true);
    try {
      const res = await fetch(
        `https://api.frankfurter.app/${startDate}..?base=${base}&symbols=${symbol}`
      );
      if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
      const data = await res.json();
      if (!data.rates) throw new Error("Rate data not available");
      const points = Object.keys(data.rates)
        .sort()
        .map((dateKey) => ({
          date: dateKey,
          rate: data.rates[dateKey][symbol],
        }));
      setHistoricalRates(points);
    } catch (err) {
      console.error("Error fetching historical data:", err);
    } finally {
      setIsLoading(false);
    }
  }

  // Update conversion on input changes
  useEffect(() => {
    if (!amount || isNaN(amount) || amount < 0) {
      setConvertedAmount("N/A");
      return;
    }
    if (convertFrom === convertTo) {
      setConvertedAmount(amount);
      return;
    }
    fetchConversion(convertFrom, convertTo, amount);
  }, [amount, convertFrom, convertTo]);

  // Update historical data when needed
  useEffect(() => {
    if (!date) {
      setHistoricalRates([]);
      return;
    }
    if (showHistorical) fetchHistoricalRate(convertFrom, convertTo, date);
  }, [date, convertFrom, convertTo, showHistorical]);

  return (
    <div className="app-container">
      <div className="card">
        {/* Top bar */}
        <div className="top-bar">
          <h1>Currency Converter</h1>
          <button onClick={toggleTheme} className="theme-button">
            Switch to {theme === "dark" ? "light" : "dark"} theme
          </button>
        </div>

        {isLoading && <div className="loading-indicator">Loading...</div>}

        {/* Conversion controls */}
        <div className="input-row">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
          />
          <select
            value={convertFrom}
            onChange={(e) => setConvertFrom(e.target.value)}
            disabled={isLoading}
          >
            <Options />
          </select>
          <select
            value={convertTo}
            onChange={(e) => setConvertTo(e.target.value)}
            disabled={isLoading}
          >
            <Options />
          </select>
        </div>

        <div className="swap-row">
          <button
            onClick={() => {
              setConvertFrom(convertTo);
              setConvertTo(convertFrom);
            }}
            disabled={isLoading}
          >
            Swap
          </button>
        </div>

        <div className="converted-amount">{convertedAmount}</div>

        <div className="historical-toggle">
          <button
            onClick={() => setShowHistorical(!showHistorical)}
            disabled={isLoading}
          >
            {showHistorical ? "Hide" : "Show"} Historical Data
          </button>
        </div>

        {/* Historical data section */}
        {showHistorical && (
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
            {!!historicalRates.length && (
              <div className="chart-section">
                <HistoricalChart data={historicalRates} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

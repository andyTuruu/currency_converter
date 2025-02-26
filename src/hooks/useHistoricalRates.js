// hooks/useHistoricalRates.js
import { useState, useEffect } from "react";

export default function useHistoricalRates(base, symbol, date, showHistorical) {
  const [historicalRates, setHistoricalRates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // If there's no date or user hasn't opted to view historical data, clear any data.
    if (!date || !showHistorical) {
      setHistoricalRates([]);
      return;
    }

    const fetchHistoricalRates = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://api.frankfurter.app/${date}..?base=${base}&symbols=${symbol}`
        );
        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }
        const data = await res.json();
        if (!data.rates) {
          throw new Error("Rate data not available");
        }
        const points = Object.keys(data.rates)
          .sort()
          .map((dateKey) => ({
            date: dateKey,
            rate: data.rates[dateKey][symbol],
          }));
        setHistoricalRates(points);
      } catch (err) {
        console.error("Error fetching historical data:", err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistoricalRates();
  }, [base, symbol, date, showHistorical]);

  return { historicalRates, isLoading, error };
}

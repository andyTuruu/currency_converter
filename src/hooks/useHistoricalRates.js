// hooks/useHistoricalRates.js
import { useState, useEffect } from "react";

export default function useHistoricalRates(
  base,
  symbol,
  startDate,
  endDate,
  showHistorical
) {
  const [historicalRates, setHistoricalRates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Clear data if no startDate, endDate, or historical view is toggled off.
    if (!startDate || !endDate || !showHistorical) {
      setHistoricalRates([]);
      return;
    }

    // Check if startDate is after endDate
    if (startDate > endDate) {
      setHistoricalRates([]);
      setError(new Error("Start date must be earlier than end date."));
      return;
    }

    const fetchHistoricalRates = async () => {
      setIsLoading(true);
      setError(null);
      const formattedStartDate = startDate.toISOString().split("T")[0];
      const formattedEndDate = endDate.toISOString().split("T")[0];
      try {
        const res = await fetch(
          `https://api.frankfurter.app/${formattedStartDate}..${formattedEndDate}?base=${base}&symbols=${symbol}`
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
  }, [base, symbol, startDate, endDate, showHistorical]);

  return { historicalRates, isLoading, error };
}

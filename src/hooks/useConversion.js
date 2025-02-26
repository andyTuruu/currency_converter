// hooks/useConversion.js
import { useState, useEffect } from "react";

export default function useConversion(base, symbol, amount) {
  const [convertedAmount, setConvertedAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Validate amount
    if (!amount || isNaN(amount) || amount < 0) {
      setConvertedAmount("N/A");
      return;
    }
    // If currencies are the same, no conversion is needed.
    if (base === symbol) {
      setConvertedAmount(amount);
      return;
    }

    const fetchConversion = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://api.frankfurter.app/latest?base=${base}&symbols=${symbol}`
        );
        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }
        const data = await res.json();
        if (!data.rates || !data.rates[symbol]) {
          throw new Error("Rate data not available");
        }
        const result = amount * data.rates[symbol];
        setConvertedAmount(result);
      } catch (err) {
        console.error("Error fetching conversion:", err);
        setError(err);
        setConvertedAmount("Error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchConversion();
  }, [base, symbol, amount]);

  return { convertedAmount, isLoading, error };
}

import { useEffect, useState } from "react";
import "./App.css"; // Ensure App.css is in the same directory

function Options() {
  return (
    <>
      <option value="AUD">AUD (Australian Dollar)</option>
      <option value="BGN">BGN (Bulgarian Lev)</option>
      <option value="BRL">BRL (Brazilian Real)</option>
      <option value="CAD">CAD (Canadian Dollar)</option>
      <option value="CHF">CHF (Swiss Franc)</option>
      <option value="CNY">CNY (Chinese Yuan / Renminbi)</option>
      <option value="CZK">CZK (Czech Koruna)</option>
      <option value="DKK">DKK (Danish Krone)</option>
      <option value="EUR">EUR (Euro)</option>
      <option value="GBP">GBP (British Pound Sterling)</option>
      <option value="HKD">HKD (Hong Kong Dollar)</option>
      <option value="HUF">HUF (Hungarian Forint)</option>
      <option value="IDR">IDR (Indonesian Rupiah)</option>
      <option value="ILS">ILS (Israeli New Shekel)</option>
      <option value="INR">INR (Indian Rupee)</option>
      <option value="ISK">ISK (Icelandic Krona)</option>
      <option value="JPY">JPY (Japanese Yen)</option>
      <option value="KRW">KRW (South Korean Won)</option>
      <option value="MXN">MXN (Mexican Peso)</option>
      <option value="MYR">MYR (Malaysian Ringgit)</option>
      <option value="NOK">NOK (Norwegian Krone)</option>
      <option value="NZD">NZD (New Zealand Dollar)</option>
      <option value="PHP">PHP (Philippine Peso)</option>
      <option value="PLN">PLN (Polish Zloty)</option>
      <option value="RON">RON (Romanian Leu)</option>
      <option value="SEK">SEK (Swedish Krona)</option>
      <option value="SGD">SGD (Singapore Dollar)</option>
      <option value="THB">THB (Thai Baht)</option>
      <option value="TRY">TRY (Turkish Lira)</option>
      <option value="USD">USD (United States Dollar)</option>
      <option value="ZAR">ZAR (South African Rand)</option>
    </>
  );
}

export default function App() {
  const [convertFrom, setConvertFrom] = useState("USD");
  const [convertTo, setConvertTo] = useState("CAD");
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getConvertedAmount() {
      setIsLoading(true);
      try {
        const res = await fetch(
          `https://api.frankfurter.app/latest?base=${convertFrom}&symbols=${convertTo}`
        );
        const data = await res.json();
        const thisAmount = (amount * data.rates[convertTo]).toFixed(3);
        setConvertedAmount(thisAmount);
      } catch (err) {
        console.error("Error fetching conversion:", err);
      } finally {
        setIsLoading(false);
      }
    }

    if (convertFrom === convertTo) {
      setConvertedAmount(amount);
    } else {
      getConvertedAmount();
    }
  }, [amount, convertFrom, convertTo]);

  return (
    <div className="App">
      <div className={`converter-container ${isLoading ? "loading" : ""}`}>
        <h1>Currency Converter</h1>
        <div className="converter-group">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
          />
        </div>
        <div className="converter-group">
          <select
            value={convertFrom}
            onChange={(e) => setConvertFrom(e.target.value)}
            disabled={isLoading}
          >
            <Options />
          </select>
        </div>
        <div className="converter-group">
          <select
            value={convertTo}
            onChange={(e) => setConvertTo(e.target.value)}
            disabled={isLoading}
          >
            <Options />
          </select>
        </div>
        <div className="converted-amount">{convertedAmount}</div>
      </div>
    </div>
  );
}

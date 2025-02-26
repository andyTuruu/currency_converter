// ConversionForm.jsx
import Options from "./Options";
import formatConversion from "./utils/formatConversion";

export default function ConversionForm({
  amount,
  setAmount,
  convertFrom,
  setConvertFrom,
  convertTo,
  setConvertTo,
  convertedAmount,
  isLoading,
}) {
  return (
    <>
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

      <div className="converted-amount">
        {formatConversion(convertedAmount)}
      </div>
    </>
  );
}

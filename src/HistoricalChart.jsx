// src/HistoricalChart.jsx
import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Line,
} from "recharts";
import useIsNarrow from "./hooks/useIsNarrow";
import formatGraphTick from "./utils/formatGraphTick";

export default function HistoricalChart({ data, theme }) {
  const isNarrow = useIsNarrow();

  // Choose a color based on the theme.
  const lineColor = theme === "dark" ? "#4CAF50" : "#cf850f"; // dark: green, light: golden

  return (
    <div className="chart-wrapper">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 10, right: 10, left: isNarrow ? -18 : -5, bottom: 20 }}
        >
          <XAxis
            dataKey="date"
            stroke={lineColor}
            tickMargin={5}
            tick={{
              fill: lineColor,
              fontSize: isNarrow ? 9 : 12,
              angle: -45,
              textAnchor: "end",
              dy: -5,
              dx: 2,
            }}
            tickFormatter={(tick) => tick.substring(2)}
            interval="preserveStartEnd"
          />
          <YAxis
            stroke={lineColor}
            tick={{
              fill: lineColor,
              fontSize: isNarrow ? 9 : 12,
            }}
            domain={["dataMin * 0.95", "dataMax * 1.05"]}
            tickFormatter={formatGraphTick}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: theme === "dark" ? "#2c2c3a" : "#333",
              border: "none",
              borderRadius: "8px",
            }}
            // formatter={(value) => formatGraphTick(value)}
          />
          <Line
            type="monotone"
            dataKey="rate"
            stroke={lineColor}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

import { useMemo } from "react";
import "../App.css"; // Or import a dedicated CSS file for dazzling styles if you prefer
import generatePositions from "../utils/generatePositions";

export default function GlowingEffect({ theme, count = 6, minDistance = 20 }) {
  const dazzlingSymbols = useMemo(() => {
    return generatePositions(count, minDistance).map((pos) => ({
      left: `${pos.left.toFixed(1)}%`,
      top: `${pos.top.toFixed(1)}%`,
      rotate: `${pos.rotate.toFixed(1)}deg`,
    }));
  }, [count, minDistance]);

  return (
    <div
      className={`dazzle ${theme === "light" ? "dazzle-light" : "dazzle-dark"}`}
    >
      {dazzlingSymbols.map((pos, index) => (
        <span
          key={index}
          style={{
            left: pos.left,
            top: pos.top,
            "--init-rotation": pos.rotate,
          }}
        >
          {theme === "light" ? "☼" : "★"}
        </span>
      ))}
    </div>
  );
}

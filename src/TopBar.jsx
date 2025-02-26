// TopBar.jsx
export default function TopBar({ theme, toggleTheme }) {
  return (
    <div className="top-bar">
      <h1>Currency Converter</h1>
      <button onClick={toggleTheme} className="theme-button">
        Switch to {theme === "dark" ? "light" : "dark"} theme
      </button>
    </div>
  );
}

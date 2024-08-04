function DarkModeSwitch({ isDarkMode, toggleDarkMode }) {
  return (
    <span className="dark-mode-toggle" onClick={toggleDarkMode}>
      {isDarkMode ? '☀️' : '🌙'}
    </span>
  );
}

export default  DarkModeSwitch
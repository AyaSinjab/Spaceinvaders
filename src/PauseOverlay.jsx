import React from "react";

function PauseOverlay({ onClose, onEndGame }) {
  return (
    <div style={overlayStyle}>
      <div style={contentStyle}>
        <h2 style={gamePausedStyle}>Game paused</h2>
        <button style={buttonStyle} onClick={onClose}>
          Continue
        </button>
        <button style={buttonStyle} onClick={onEndGame}>
          Cancel
        </button>
      </div>
    </div>
  );
}

// Bakgrund och positionering för overlay
const overlayStyle = {
  position: "fixed",
  top: "0",
  left: "0",
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  zIndex: "1000",
};

// Stil för innehåll i overlay
const contentStyle = {
  backgroundColor: "#333",
  padding: "20px",
  borderRadius: "8px",
  maxWidth: "400px",
  textAlign: "center",
};

// Stil för "Game paused"-texten, med PixelFont och liknande styling
const gamePausedStyle = {
  fontFamily: "PixelFont, 'Courier New', sans-serif",  // Säkerställer att PixelFont används, annars fallback
  textTransform: "uppercase",  // Liknande effekt som på titeln "Course Slayer"
  color: "blue",  // Färg, kan justeras om du vill
  fontSize: "100px",  // Storlek som på "Course Slayer"-titeln
  marginBottom: "20px",  // Justering av mellanrum
};

// Stil för knappar
const buttonStyle = {
  margin: "10px",
  padding: "10px 20px",
  fontSize: "16px",
  cursor: "pointer",
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "4px",
};

export default PauseOverlay;

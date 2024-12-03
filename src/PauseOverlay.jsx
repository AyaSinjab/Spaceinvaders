// Pause Overlay , går endast att komma till när man är i spelvyn och
// vill pausa spelet för att tillexempel avsluta spelet.

import React from "react";

function PauseOverlay({ onClose, onEndGame }) {
  return (
    <div style={overlayStyle}>
      <div style={contentStyle}>
        <style>
          {`@font-face {
            font-family: 'PixelFont';
            src: url('src/assets/pixeboy-font/Pixeboy-z8XGD.ttf') format('truetype');
            }
            .buttons:hover {
            transform: scale(1.05); /* Slightly enlarge on hover */
            opacity: 0.9;
          }
          `}
        </style>
        <h2 style={gamePausedStyle}>Game paused</h2>
        <button style={buttonStyle} className="buttons" onClick={onClose}>
          Continue
        </button>
        <button style={buttonStyle} className="buttons" onClick={onEndGame}>
          Quit
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
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  padding: "20px",
  borderRadius: "8px",
  maxWidth: "400px",
  textAlign: "center",
};

// Stil för "Game paused"-texten, med PixelFont och liknande styling
const gamePausedStyle = {
  fontFamily: "PixelFont", // Säkerställer att PixelFont används, annars fallback
  textTransform: "uppercase", // Liknande effekt som på titeln "Course Slayer"
  color: "white", // Färg, kan justeras om du vill
  fontSize: "100px", // Storlek som på "Course Slayer"-titeln
  marginBottom: "50px", // Justering av mellanrum
  margin: "20px",
};

// Stil för knappar
const buttonStyle = {
  fontFamily: "PixelFont",
  margin: "10px",
  padding: "10px 20px",
  fontSize: "25px",
  cursor: "pointer",
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "4px",
};

export default PauseOverlay;

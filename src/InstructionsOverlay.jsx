import React from "react";

// Här kan man ändra innehållet på vad som ska vara med på overlayn
function InstructionsOverlay({ onClose }) {
  return (
    <div style={overlayStyle}>
      <div style={contentStyle}>
        <style>
          {`
            @font-face {
              font-family: 'PixelFont';
              src: url('/assets/pixeboy-font/Pixeboy-z8XGD.ttf') format('truetype'); // Viktig ändring här för korrekt sökväg
            }
          `}
        </style>
        <button style={closeButtonStyle} onClick={onClose}>
          ✖
        </button>
        {/*Instruktionerna är tillfälliga men jag har stylat dem lite*/}
        <h2 style={titleStyle}>Game Instructions</h2>
        <div>
          <div style={instStyle}>Shoot down as many books as fast as you can! </div>
          <div style={instStyle}>To Shoot: Use the upper arrow ⬆️ or the spacebar   𓈙 </div>
          <div style={instStyle}>To Move: Use the left and right arrows ⬅️➡️</div>
        </div>
      </div>
    </div>
  );
}

// Denna sköter stylingen för hela overlayn alltså hela denna sidan
const overlayStyle = {
  position: "fixed",
  top: "0",
  left: "0",
  width: "100vw", //vw är egentligen bättre att använda en px, som mått
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.9)", // Transparent svart bakgrund
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  zIndex: "1000", // Högre z-index för att säkerställa att overlayen syns över andra element
};

// Denna stylear instruktionstexten (alltihop just nu), dela in i fler div"ar för att desiggna bättre
const contentStyle = {
  padding: "20px",
  borderRadius: "8px",
  maxWidth: "700px",
  textAlign: "center",
  color: "white", // Vit text för bättre kontrast
};

// Denna stylar stängningsknappend
const closeButtonStyle = {
  position: "absolute",
  top: "20px",
  right: "40px",
  background: "transparent",
  border: "none",
  fontSize: "60px",
  color: "#007bff",
  cursor: "pointer",
};

// Inställningar för "Game instructions"
const titleStyle = {
  color: "#E0218A",
  fontFamily: "PixelFont", // Använder PixelFont
  fontSize: "78px", // Sets the font size
};

// Inställningar för instruktionerna under game instructions
const instStyle = {
  color: "white",
  fontFamily: "PixelFont", // Använder PixelFont
  fontSize: "30px", // Sets the font size
};

export default InstructionsOverlay;

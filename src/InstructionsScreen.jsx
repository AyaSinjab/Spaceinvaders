// Detta är i den fil vi kodar den overlayn som förklarar
// hur spelet fungerar och hur man spelar, därav namnet InstructionsOverlay

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
            src: url('src/assets/pixeboy-font/Pixeboy-z8XGD.ttf') format('truetype'); // Adjust the path according to your file location
          }
          .closeButton:hover {
            transform: scale(1.05); /* Slightly enlarge on hover */
            opacity: 0.9;
          }
        `}
        </style>
        <button
          style={closeButtonStyle}
          className="closeButton"
          onClick={onClose}
        >
          ✖
        </button>
        {/*Instruktionerna är tillfälliga men jag har stylat dem lite*/}
        <h2 style={titleStyle}>Game Instructions</h2>
        <div>
          <div style={instStyle}>Shoot as many books as fast as you can. if you miss 50 books or more, you lose. </div>
          <div style={instStyle}>
            To Shoot: Use the upper arrow ⬆️ or the spacebar 𓈙{" "}
          </div>
          <div style={instStyle}>
            To Move: Use the left and right arrows ⬅️➡️
          </div>
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
  backgroundColor: "rgba(0, 0, 0, 0.93)", // Transparent svart bakgrund
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  zIndex: "1000", // Högre z-index för att säkerställa att overlayen syns över andra element
};

// Denna stylear instruktionstexten (alltihop just nu), dela in i fler div"ar för att desiggna bättre
const contentStyle = {
  //backgroundColor: "rgba(0, 0, 0, 0.9)", // Mörk bakgrund för textområdet
  padding: "20px",
  borderRadius: "8px",
  maxWidth: "600px",
  textAlign: "center",
  color: "white", // Vit text för bättre kontrast
};

// Denna stylar stängningsknappen
const closeButtonStyle = {
  position: "absolute",
  top: "10px",
  right: "40px",
  background: "transparent",
  border: "none",
  fontSize: "60px",
  color: "#E0218A",
  cursor: "pointer",
};
//Inställningar för "Game instructions"
const titleStyle = {
  color: "#E0218A",
  fontFamily: "PixelFont",
  fontSize: "50px", // Sets the font size
};
//Inställningar för instruktionerna under game instructions
const instStyle = {
  color: "white",
  fontFamily: "PixelFont",
  fontSize: "30px", // Sets the font size
};

export default InstructionsOverlay;

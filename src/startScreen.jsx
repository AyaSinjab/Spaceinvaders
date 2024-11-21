import React, { useState } from "react";
import InstructionsOverlay from "./InstructionsOverlay"; // Kontrollera att detta är rätt path
import { useNavigate } from "react-router-dom"; // Importera för navigation

// Define your component
function StartScreen() {
  const [showInstructions, setShowInstructions] = useState(false);
  const [showContent, setShowContent] = useState(true); // Ny state för att visa/dölja både text och startknapp
  const navigate = useNavigate(); // Hook för att navigera

  const handleStartGame = () => {
    navigate("/game"); // Navigera till spelet
  };

  const handleInstructionsClick = () => {
    setShowContent(false); // Dölj både text och startknapp när instruktionsknappen trycks
    setShowInstructions(true);
  };

  const handleCloseInstructions = () => {
    setShowContent(true); // Visa både text och startknapp igen när instruktionerna stängs
    setShowInstructions(false);
  };

  return (
    <div style={backgroundStyle}>
      <style>
        {`
          @font-face {
            font-family: 'PixelFont';
            src: url('src/assets/pixeboy-font/Pixeboy-z8XGD.ttf') format('truetype'); // Adjust the path according to your file location
          }
          /* CSS för frågetecken-knappen */
          .button-instructions {
            align-items: center;
            background-image: linear-gradient(135deg, #007bff 30%, #66b3ff);
            border: 0;
            border-radius: 50%;
            box-sizing: border-box;
            color: #fff;
            cursor: pointer;
            display: flex;
            font-family: "Codec cold", sans-serif;
            font-size: 30px;
            font-weight: 700;
            height: 80px;
            width: 80px;
            justify-content: center;
            letter-spacing: 0.4px;
            line-height: 1;
            padding: 0;
            text-decoration: none;
            text-transform: uppercase;
            position: absolute;
            top: 30px;
            right: 30px;
            transition: all 200ms;
            user-select: none;
          }

          .button-instructions:hover {
            transform: scale(0.95);
            opacity: 0.9;
          }

          .button-instructions:active {
            outline: none;
          }

          /* CSS för startknapp */
          .button-start {
            padding: 1em 3em; 
            font-size: 24px;
            font-weight: bold;
            border: none;
            outline: none;
            color: rgb(255, 255, 255);
            background-image: linear-gradient(135deg, #007bff 30%, #66b3ff);
            cursor: pointer;
            position: relative;
            z-index: 0;
            border-radius: 10px;
            user-select: none;
            -webkit-user-select: none;
            touch-action: manipulation;
            transition: all 200ms ease;
          }

          .button-start:hover {
            transform: scale(1.05); /* Slightly enlarge on hover */
            opacity: 0.9;
          }

          .button-start:before {
            content: "";
            background: linear-gradient(
              45deg,
              #ff0000,
              #ff7300,
              #fffb00,
              #48ff00,
              #00ffd5,
              #002bff,
              #7a00ff,
              #ff00c8,
              #ff0000
            );
            position: absolute;
            top: -2px;
            left: -2px;
            background-size: 400%;
            z-index: -1;
            filter: blur(5px);
            -webkit-filter: blur(5px);
            width: calc(100% + 4px);
            height: calc(100% + 4px);
            animation: glowing-button-start 20s linear infinite;
            transition: opacity 0.3s ease-in-out;
            border-radius: 10px;
          }

          @keyframes glowing-button-start {
            0% {
              background-position: 0 0;
            }
            50% {
              background-position: 400% 0;
            }
            100% {
              background-position: 0 0;
            }
          }

          .button-start:after {
            z-index: -1;
            content: "";
            position: absolute;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #007bff 30%, #66b3ff);
            left: 0;
            top: 0;
            border-radius: 10px;
          }
        `}
      </style>

      <button className="button-instructions" onClick={handleInstructionsClick}>
        ?
      </button>

      {showInstructions && (
        <InstructionsOverlay onClose={handleCloseInstructions} />
      )}

      {showContent && ( // Både text och startknapp visas endast om showContent är true
        <div style={textContainerStyle}>
          <h1 style={titleStyle}>Course Slayer</h1>
          <h2 style={subtitleStyle}>stay sharp, slay smart</h2>
        </div>
      )}

      {showContent && ( // Startknappen visas endast om showContent är true
        <button className="button-start" onClick={handleStartGame}>
          START
        </button>
      )}
    </div>
  );
}

// Bakgrundsdesign
const backgroundStyle = {
  backgroundImage: `url(${"src/assets/startScreen.PNG"})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  height: "100vh",
  width: "100vw",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
};

// Text-container
const textContainerStyle = {
  padding: "10px",
  borderRadius: "8px",
  textAlign: "center",
};

// Titel-styling
const titleStyle = {
  color: "blue",
  fontFamily: "PixelFont",
  textTransform: "uppercase",
  fontSize: "100px",
};

// Subtitle-styling
const subtitleStyle = {
  color: "#E0218A",
  fontFamily: "PixelFont",
  fontSize: "50px",
};

export default StartScreen;

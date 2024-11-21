import React, { useState } from "react";
import InstructionsOverlay from "./InstructionsOverlay"; // Kontrollera att detta är rätt path
import { useNavigate } from "react-router-dom"; // Importera för navigation

//haj haj, test komentar
// Define your component
function StartScreen() {
  const [showInstructions, setShowInstructions] = useState(false);
  const navigate = useNavigate(); // Hook för att navigera

  const handleStartGame = () => {
    navigate("/game"); // Navigera till spelet
  };

  return (
    <div style={backgroundStyle}>
      {/*Laddade ner en font style och döpte den till Pixelfont. Nu har subtitlen den fonten :) */}
      <style>
        {`
          @font-face {
            font-family: 'PixelFont';
            src: url('src/assets/pixeboy-font/Pixeboy-z8XGD.ttf') format('truetype'); // Adjust the path according to your file location
          }
        `}
      </style>
      <button
        style={overlayButtonStyle}
        onClick={() => setShowInstructions(true)}
      >
        ?
      </button>
      {showInstructions && (
        <InstructionsOverlay onClose={() => setShowInstructions(false)} />
      )}
      <div style={textContainerStyle}>
        <h1 style={titleStyle}>Course Slayer</h1>
        <h2 style={subtitleStyle}>stay sharp, slay smart</h2>

        {/* Add other content here as needed */}
      </div>
      <button style={buttonStyle} onClick={handleStartGame}>
        Starta spel
      </button>
    </div>
  );
}

// Sennare som sista grej så kan vi flytta så att css ffår en egen fil.
// Denna stylar endast bakgrundbilden
const backgroundStyle = {
  backgroundImage: `url(${"src/assets/startScreen.PNG"})`,
  backgroundSize: "cover", // This makes the image cover the entire area
  backgroundPosition: "center", // Centers the image
  height: "100vh", // Sets the height to full viewport height
  width: "100vw", // Sets the width to full viewport width
  display: "flex", // Optional: Flex display to center your content
  alignItems: "center", // Optional: Center content vertically
  justifyContent: "center", // Optional: Center content horizontally
  //color: "white", // Optional: Text color for contrast
  flexDirection: "column", // Placera innehåll vertikalt
};

// Denna styling omringar all text på första skärmen
const textContainerStyle = {
  //backgroundColor: "rgba(0, 0, 0, 0.5)", // denna kan man använda sig av för att veta vart textcontainer området är
  padding: "10px",
  borderRadius: "8px",
  textAlign: "center",
};

const titleStyle = {
  color: "blue",
  fontFamily: "PixelFont", //leta efter bättre font
  //fontStyle: "bold",
  textTransform: "uppercase", // Optional: Transforms text to uppercase
  fontSize: "100px", // Sets the font size
};

// Inställnninggar för stay sharp, slay smart texten
const subtitleStyle = {
  color: "#E0218A",
  fontFamily: "PixelFont",
  fontSize: "50px", // Sets the font size
};

//Inställningar för "frågetecken-knappen"
const overlayButtonStyle = {
  // Här är lite bakgrundsdesign , denna krånglar lite har jag märkt, ibalnd syns den och ibland inte
  backgroundColor: "purple",
  padding: "40px",
  borderRadius: 150,

  // Resterande design för frågetecknet sjäälvt
  position: "absolute",
  top: "30px",
  right: "30px",
  background: "transparent",
  border: "none",
  fontSize: "50px",
  cursor: "pointer",
  color: "white",
};

const buttonStyle = {
  marginTop: "20px",
  padding: "10px 20px",
  fontSize: "16px",
  cursor: "pointer",
  backgroundColor: "purple",
  color: "white",
  border: "none",
  borderRadius: "4px",
};

export default StartScreen;

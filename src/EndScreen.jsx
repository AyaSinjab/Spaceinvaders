// EndScreen.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function EndScreen() {
  const navigate = useNavigate();

  // Denna hanterar när man trcker på knappen som ska ta en till startskärmen
  const handleBackToStart = () => {
    navigate("/"); // Navigerar tillbaka till startskärmen
  };

  // Denna hanterar så att man kan köra om spelet på direkten från denna skärmen
  const handleRetryGame = () => {
    navigate("/game"); // Navigerar direkt till spelet för att starta om
  };

  const location = useLocation();
  const elapsedTime = location.state?.elapsedTime || 0; //  Hämtar tid från spelet
  const score = location.state?.score || 0; // Hämtar poäng insamlat från spelet

  return (
    <div
      style={{
        // All styling för bakgrundsbild hamnade här
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        //padding: "20px",
        height: "100vh",
        justifyContent: "center",
        backgroundImage: "url('src/assets/tillfalliggameoverbakgrund.PNG')", //tillfällig bakgrundsbild tills jag fått bättre av Aya :)
        backgroundSize: "cover",
        backgroundPosition: "center",
        /* color: "white", */
      }}
    >
      <style>
        {" "}
        {/* Detta finns till endast för att fixa en cool font :) */}
        {`
          @font-face {
            font-family: 'PixelFont';
            src: url('src/assets/pixeboy-font/Pixeboy-z8XGD.ttf') format('truetype');
          }
        `}
      </style>
      {/* Om vi vill ha någon mer text eller knapp på slutskärmen läggs detta till här */}
      <p style={timestyle}>Time: {elapsedTime} s</p>
      <p style={scorestyle}>Your score: {score}</p>
      <button onClick={handleRetryGame} style={retryButtonStyle}>
        Try again?
      </button>
      <button onClick={handleBackToStart} style={buttonStyle}>
        Back to Homescreen
      </button>
    </div>
  );
}

// Stylar texten "Din tid: .. s"
const timestyle = {
  fontFamily: "PixelFont", // Samma font som Course Slayer
  //textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
  fontSize: "50px",
  color: "black",
  marginTop: "300px",
};

// Stylar texten "Ditt score"
const scorestyle = {
  fontFamily: "PixelFont", // Samma font som Course Slayer
  //textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
  fontSize: "50px",
  color: "black",
  marginTop: "-40px",
};

// Styling för knappen "Try again"
const retryButtonStyle = {
  marginTop: "1px",
  fontFamily: "PixelFont", // Samma font som Course Slayer
  padding: "10px 20px",
  fontSize: "50px",
  cursor: "pointer",
  backgroundColor: "#FF4500", // Orange färg för "Försök igen"-knappen
  color: "white",
  border: "none",
  borderRadius: "10px",
  transition: "background-color 0.3s",
};

// Styling för knappen "Back to Homescreen"
const buttonStyle = {
  fontFamily: "PixelFont", // Samma font som Course Slayer
  marginTop: "20px", // Avståndet mellan knapparna
  padding: "10px 20px",
  fontSize: "20px",
  cursor: "pointer",
  backgroundColor: "#383838",
  color: "white",
  border: "none",
  borderRadius: "4px",
  transition: "background-color 0.3s",
};

// Hover-effekter
retryButtonStyle[":hover"] = {
  backgroundColor: "#FF6347", // Ljusare orange
};

// Hover-styling (om du vill lägga till extra styling för hovereffekten på knappen)
buttonStyle[":hover"] = {
  backgroundColor: "#45a049",
};

export default EndScreen;

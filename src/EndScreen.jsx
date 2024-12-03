// EndScreen.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function EndScreen() {
  const navigate = useNavigate();

  const handleBackToStart = () => {
    navigate("/"); // Navigerar tillbaka till startskärmen
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
      <p style={timestyle}>Din tid: {elapsedTime} s</p>
      <p style={scorestyle}>Ditt score: {score}</p>
      <button onClick={handleBackToStart} style={buttonStyle}>
        Tillbaka till Startskärmen
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

// Styling för knappen "Tillbaka till startskärmen"
const buttonStyle = {
  marginTop: "5px", // Avståndet från knappen "Tillbaka till startskärmmen" upp till texten "ditt score"
  padding: "10px 20px",
  fontSize: "20px",
  cursor: "pointer",
  backgroundColor: "#383838",
  color: "white",
  border: "none",
  borderRadius: "4px",
  transition: "background-color 0.3s",
};

// Hover-styling (om du vill lägga till extra styling för hovereffekten på knappen)
buttonStyle[":hover"] = {
  backgroundColor: "#45a049",
};

export default EndScreen;

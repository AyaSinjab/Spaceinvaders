// CongratsScreen.jsx

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
        margin:0,
        height: "100vh",
        overflow:"hidden",// så att man inte kan scrolla 
        justifyContent: "center",
        backgroundImage: "url('src/assets/congratsScreen.png')", //Vad tycks om denna bakgrund???
        backgroundSize: "cover",
        backgroundPosition: "center",
        /* color: "white", */
      }}
    >
      <style>
        {" "}
        {/* Detta finns till endast för att fixa en cool font :) Hoverbutton effekten fungerade inte så jag la till en style för hover button här*/}
        {`
          @font-face {
            font-family: 'PixelFont';
            src: url('src/assets/pixeboy-font/Pixeboy-z8XGD.ttf') format('truetype');
          }
          
          .hoverButton {
          font-family: 'PixelFont';
          margin-top: 10px;
          padding: 10px 20px;
          font-size: 30px;
          cursor: pointer;
          background-color: #383838;
          border: none;
          border-radius: 4px;
          transition: background-color 0.3s;
        }

        .hoverButton:hover {
          transform: scale(1.05); /* Slightly enlarge on hover */
          
        }  
        `}
      </style>
      {/* Om vi vill ha någon mer text eller knapp på slutskärmen läggs detta till här */}
     
      <p style={Congratsstyle}>Congratulations</p>
      <p style={timestyle}>Time: {elapsedTime} s</p>
      <p style={scorestyle}>Your score: {score}</p>
      <button onClick={handleRetryGame} style={retryButtonStyle} className="hoverButton">
        Play again?
      </button>
      <button onClick={handleBackToStart} style={buttonStyle} className="hoverButton">
        Back to Homescreen
      </button>
    </div>
  );
}


//Stylar texten "Game over"
const Congratsstyle={
  fontFamily: "PixelFont",
  fontSize:"100px",
  marginTop:"20px",
  marginBottom:"70px",
  textShadow: "2px 2px 2px rgba(255, 255, 255, 0.5)" 
  
}

// Stylar texten "Din tid: .. s"
const timestyle = {
  fontFamily: "PixelFont", // Samma font som Course Slayer
  //textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
  fontSize: "50px",
  color: "black",
  marginTop: "-70px",
};

// Stylar texten "Ditt score"
const scorestyle = {
  fontFamily: "PixelFont", // Samma font som Course Slayer
  //textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
  fontSize: "50px",
  color: "black",
  marginTop: "-55px",
};

// Styling för knappen "Play again"
const retryButtonStyle = {
  marginTop: "-10px",
  fontFamily: "PixelFont", // Samma font som Course Slayer
  padding: "10px 20px",
  fontSize: "50px",
  cursor: "pointer",
  backgroundColor: "#FFD700", // Orange färg för "Försök igen"-knappen
  color: "white",
  border: "none",
  borderRadius: "10px",
  transition: "background-color 0.3s",
};

// Styling för knappen "Back to Homescreen"
const buttonStyle = {
  fontFamily: "PixelFont", // Samma font som Course Slayer
  marginTop: "10px", // Avståndet mellan knapparna
  padding: "10px 20px",
  fontSize: "30px",
  cursor: "pointer",
  backgroundColor: "#383838",
  color: "white",
  border: "none",
  borderRadius: "4px",
  transition: "background-color 0.3s",

};



export default EndScreen;

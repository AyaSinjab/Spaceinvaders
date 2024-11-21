// GameScreen.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // För navigation till EndScreenimport PauseOverlay from "./PauseOverlay"; // Importera overlay-komponenten
import PauseOverlay from "./PauseOverlay"; // Importera overlay-komponenten

function GameScreen() {
  const [isPaused, setIsPaused] = useState(false);
  const navigate = useNavigate();

  const handleEndGame = () => {
    navigate("/end"); // Navigerar till EndScreen
  };

    // Prevent scrolling when the component mounts
    useEffect(() => {
      document.body.style.margin = "0"; // Remove default margin
      document.body.style.padding = "0"; // Remove default padding
      document.body.style.overflow = "hidden"; // Prevent scrolling
      document.body.style.height = "100%"; // Ensure body takes full height
      return () => {
        document.body.style.overflow = "auto"; // Restore scrolling when unmounted
      };
    }, []);


  return (
    <div style={backgroundStyle}>

      <button style={pauseButtonStyle} onClick={() => setIsPaused(true)}>
        ⏸
      </button>
      {isPaused && (
        <PauseOverlay
          onClose={() => setIsPaused(false)}
          onEndGame={handleEndGame}
        />
      )}
      {/* Lägg till spelkomponenter och innehåll här */}
      {/*Player element*/ }
        <img
        src={"src/assets/Spelare.png"} // Path to player image
        alt="Player"
        style={playerStyle}
        />
      {/*Böcker elements*/ }
      <img
       src={"src/assets/Books.png"} // Path to Books image
       alt="Books"
       style={booksStyle}
      />
    </div>
  );
}

// Definiera stilen för bakgrundsbilden
const backgroundStyle = {
  backgroundImage: `url(${"src/assets/GameBakgrund.png"})`,
  backgroundSize:"cover" ,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat", // Prevents the image from repeating
  height: "100vh",
  width: "100vw",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#bfe9ff",
  position:"relative",//allows aboslute positioning of child elements som t.ex player element
};

//stylea pausknappen
const pauseButtonStyle = {
  position: "absolute",
  top: "30px",
  right: "30px",
  background: "transparent",
  border: "none",
  fontSize: "50px",
  cursor: "pointer",
  color: "white",
};

//stylea spelarens bild
const playerStyle={
  position:"absolute",//tillåter justering av spelarens vertikala position mha bottom.
  bottom:"-210px",//spelarens vertikala position.
  width:"60%",//spelarens storlek. 
  height:"auto",
};

//stylea böckernas bild
const booksStyle={
  position:"absolute",//tillåter justering av böckernas vertikala position mha bottom.
  bottom:"240px",//Vertikal position.
  width:"90%",//bildens storlek. 
  height:"auto",
};
export default GameScreen;

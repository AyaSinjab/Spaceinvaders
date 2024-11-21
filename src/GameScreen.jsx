// GameScreen.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // För navigation till EndScreenimport PauseOverlay from "./PauseOverlay"; // Importera overlay-komponenten
import PauseOverlay from "./PauseOverlay"; // Importera overlay-komponenten
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PauseOverlay from "./PauseOverlay";

function GameScreen() {
  const [isPaused, setIsPaused] = useState(false);
  const [playerPosition, setPlayerPosition] = useState(50); // Spelarens position, initialt i mitten
  const [bookPositions, setBookPositions] = useState([]); // Böcker som kommer att dyka upp i slumpmässig ordning
  const [bulletPosition, setBulletPosition] = useState(null); // Spelarens skott
  const [bulletYPosition, setBulletYPosition] = useState(-50); // Startposition för skottet (under skärmen)
  const [score, setScore] = useState(0); // Poäng
  const navigate = useNavigate();

  // Lista med olika bokbilder
  const bookImages = [
    "src/assets/c-direkt.jpg",
    "src/assets/envarren.jpg",
    "src/assets/flervarren.jpg",
    "src/assets/MATLAB.jpg",
    "src/assets/vektoranalys.jpg",
  ];

  // För att hantera rörelse av spelaren
  const movePlayer = (direction) => {
    setPlayerPosition((prev) => {
      let newPosition = prev + direction;
      if (newPosition < 0) return 0; // Begränsa vänster rörelse
      if (newPosition > 100) return 100; // Begränsa höger rörelse
      return newPosition;
    });
  };

  // Hantera skottet när användaren trycker på mellanslag eller uppåtpil
  const shootBullet = () => {
    if (bulletPosition === null) {
      // Skjut från mitten av spelarens bild
      setBulletPosition(playerPosition + 2.5); // Justera så skottet skjuts från mitten
      setBulletYPosition(-50); // Starta skottet under skärmen
    }
  };

  // Uppdatera böckernas rörelse (fallande)
  useEffect(() => {
    const interval = setInterval(() => {
      setBookPositions((prevBooks) =>
        prevBooks.map((book) => ({
          ...book,
          position: {
            x: book.position.x, // Behåll horisontell position
            y: book.position.y + 1 > 100 ? 0 : book.position.y + 1, // Böckerna faller nedåt
          },
        }))
      );
    }, 100); // Uppdatera var 100:e millisekund
    return () => clearInterval(interval);
  }, []);

  // Skapa slumpmässiga böcker i flera rader
  useEffect(() => {
    const generateBooks = () => {
      let newBooks = [];
      const rows = 3; // Antal rader för böcker
      const columns = 5; // Antal böcker per rad

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
          const randomImage = bookImages[Math.floor(Math.random() * bookImages.length)];
          newBooks.push({
            id: Math.random(), // Unikt ID för varje bok
            image: randomImage,
            position: {
              x: (j * 20) + Math.random() * 10, // Slumpmässig horisontell position för varje bok
              y: i * 20 + Math.random() * 5, // Vertikal position (skapar olika rader)
            },
          });
        }
      }
      setBookPositions(newBooks);
    };

    generateBooks();
  }, []);

  // Uppdatera skottets position
  useEffect(() => {
    if (bulletPosition !== null) {
      const bulletInterval = setInterval(() => {
        setBulletYPosition((prevY) => {
          const newY = prevY + 5; // Skottet rör sig uppåt
          if (newY > 100) {
            clearInterval(bulletInterval); // Stoppa skottet när det går utanför skärmen
            setBulletPosition(null); // Nollställ bullet när den går utanför skärmen
            setBulletYPosition(-50); // Återställ till startposition för nästa skott
            return -50; // Återställ till startposition för nästa skott
          }
          return newY;
        });
      }, 50); // Uppdatera position var 50 millisekund
      return () => clearInterval(bulletInterval);
    }
  }, [bulletPosition]);

  // Kontrollera om ett skott träffar en bok
  useEffect(() => {
    if (bulletPosition !== null) {
      const newBookPositions = bookPositions.filter((book) => {
        // Om bulletPosition är på samma nivå som en bok, räknas det som en träff
        const hit = Math.abs(bulletPosition - book.position.x) < 5 && Math.abs(bulletYPosition - book.position.y) < 5;
        if (hit) {
          setScore((prevScore) => prevScore + 1); // Öka poängen
        }
        return !hit; // Ta bort boken som träffades
      });

      if (newBookPositions.length !== bookPositions.length) {
        setBookPositions(newBookPositions); // Uppdatera bokpositionerna efter att en bok har försvunnit
        setBulletPosition(null); // Nollställ skottet
        setBulletYPosition(-50); // Återställ skottet till sin ursprungliga position
      }
    }
  }, [bulletPosition, bookPositions, bulletYPosition]);

  // Hantera slutet på spelet
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

    navigate("/end"); // Navigera till EndScreen
  };

  // Lyssna på tangenttryckningar för att flytta spelaren
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        movePlayer(-5); // Flytta vänster
      } else if (event.key === "ArrowRight") {
        movePlayer(5); // Flytta höger
      } else if (event.key === " " || event.key === "ArrowUp") {
        shootBullet(); // Skjut när mellanslag eller uppåtpil trycks
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Rensa eventlyssnaren när komponenten avmonteras
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    // Förhindra scrollning på hela sidan
    document.body.style.overflow = "hidden";

    // Återställ scrollning när komponenten unmountas (för att inte påverka andra delar av sidan)
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div style={backgroundStyle}>

      <button style={pauseButtonStyle} onClick={() => setIsPaused(true)}>
        ⏸
      </button>
      {isPaused && (
        <PauseOverlay onClose={() => setIsPaused(false)} onEndGame={handleEndGame} />
      )}
      {/* Lägg till spelkomponenter och innehåll här */}
      {/*Player element*/ }
        <img
        src={"src/assets/Spelare.png"} // Path to player image
      
      {/* Player */}
      <img
        src={"src/assets/player.png"}
        alt="Player"
        style={{ ...playerStyle, left: `${playerPosition}%` }}
      />
      
      {/* Böcker */}
      {bookPositions.map((book) => (
        <img
          key={book.id}
          src={book.image}
          alt={`Books ${book.id}`}
          style={{ 
            ...booksStyle, 
            top: `${book.position.y}%`, 
            left: `${book.position.x}%` 
          }}
        />
      ))}
      
      {/* Skott */}
      {bulletPosition !== null && (
        <div
          style={{
            position: "absolute",
            bottom: `${bulletYPosition}%`, // Skottets vertikala position
            left: `${bulletPosition}%`, // Skottets horisontella position
            width: "5px",
            height: "10px",
            backgroundColor: "white",
            transition: "bottom 0.1s", // Lägger till en smidig rörelse för skottet
          }}
        />
      )}

      {/* Poäng */}
      <div style={scoreStyle}>Score: {score}</div>
    </div>
  );
}

// Bakgrundsstil
const backgroundStyle = {
  backgroundImage: `url(${"src/assets/GameBakgrund.png"})`,
  backgroundSize:"cover" ,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat", // Prevents the image from repeating
  backgroundAttachment: "fixed", // Fixera bakgrunden så den inte rör sig
  height: "100vh",
  width: "100vw",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#bfe9ff",
  position:"relative",//allows aboslute positioning of child elements som t.ex player element
  color: "white",
  position: "relative", // Gör att andra element kan placeras ovanpå bakgrunden
};

// Pausknappens stil
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

// Spelarens stil
const playerStyle = {
  position: "absolute",
  bottom: "10%", // Placerar spelaren nära botten
  width: "500px", // Spelarens bredd
  height: "300px", // Spelarens höjd
};

// Böckernas stil
const booksStyle = {
  position: "absolute",
  width: "40px", // Bredden på varje bok
  height: "60px", // Höjden på varje bok
};

// Poängstil
const scoreStyle = {
  position: "absolute",
  top: "10px",
  left: "10px",
  fontSize: "24px",
};

export default GameScreen;

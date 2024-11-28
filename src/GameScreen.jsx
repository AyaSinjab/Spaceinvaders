import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PauseOverlay from "./PauseOverlay";

function GameScreen() {
  const [isPaused, setIsPaused] = useState(false);
  const [playerPosition, setPlayerPosition] = useState(50); // Spelarens position
  const [bookPositions, setBookPositions] = useState([]); // Böcker
  const [bulletPosition, setBulletPosition] = useState(null); // Skottets horisontella position
  const [bulletYPosition, setBulletYPosition] = useState(-50); // Skottets vertikala position
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

  // Hantera spelarens rörelse
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
      setBulletPosition(playerPosition); // Skjut från spelarens aktuella position
      setBulletYPosition(15); // Skottet börjar vid spelarens höjd
    }
  };

  // Uppdatera böckernas rörelse (fallande)
  useEffect(() => {
    const interval = setInterval(() => {
      setBookPositions((prevBooks) =>
        prevBooks.map((book) => ({
          ...book,
          position: {
            x: book.position.x,
            y: book.position.y + 1 > 100 ? 0 : book.position.y + 1,
          },
        }))
      );
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Skapa slumpmässiga böcker i flera rader
  useEffect(() => {
    const generateBooks = () => {
      let newBooks = [];
      const rows = 3;
      const columns = 10;

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
          const randomImage = bookImages[Math.floor(Math.random() * bookImages.length)];
          newBooks.push({
            id: Math.random(),
            image: randomImage,
            position: {
              x: (j * 10) + Math.random() * 10,
              y: i * 20 + Math.random() * 5,
            },
          });
        }
      }
      setBookPositions(newBooks);
    };

    generateBooks();
  }, []);

  // Uppdatera skottets vertikala position
  useEffect(() => {
    if (bulletPosition !== null) {
      const bulletInterval = setInterval(() => {
        setBulletYPosition((prevY) => {
          const newY = prevY + 5; // Skottet rör sig uppåt
          if (newY > 100) {
            clearInterval(bulletInterval);
            setBulletPosition(null);
            setBulletYPosition(-50);
            return -50;
          }
          return newY;
        });
      }, 50);
      return () => clearInterval(bulletInterval);
    }
  }, [bulletPosition]);

  // Synkronisera skottets horisontella position med spelarens position
  useEffect(() => {
    if (bulletPosition !== null) {
      setBulletPosition(playerPosition + 22);
    }
  }, [playerPosition, bulletPosition]);

  // Kontrollera om ett skott träffar en bok
  useEffect(() => {
    if (bulletPosition !== null) {
      const newBookPositions = bookPositions.filter((book) => {
        const hit = Math.abs(bulletPosition - book.position.x) < 5 && Math.abs(bulletYPosition - book.position.y) < 5;
        if (hit) {
          setScore((prevScore) => prevScore + 1);
        }
        return !hit;
      });

      if (newBookPositions.length !== bookPositions.length) {
        setBookPositions(newBookPositions);
        setBulletPosition(null);
        setBulletYPosition(-50);
      }
    }
  }, [bulletPosition, bookPositions, bulletYPosition]);

  // Hantera tangenttryckningar
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        movePlayer(-5);
      } else if (event.key === "ArrowRight") {
        movePlayer(5);
      } else if (event.key === " " || event.key === "ArrowUp") {
        shootBullet();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleEndGame = () => {
    navigate("/end");
  };

  return (
    <div style={backgroundStyle}>
      <style>
        {`@font-face {
          font-family: 'PixelFont';
          src: url('src/assets/pixeboy-font/Pixeboy-z8XGD.ttf') format('truetype');
        }`}
      </style>

      <button style={pauseButtonStyle} onClick={() => setIsPaused(true)}>⏸</button>
      {isPaused && (
        <PauseOverlay onClose={() => setIsPaused(false)} onEndGame={handleEndGame} />
      )}

      <img
        src={"src/assets/Spelare.png"}
        alt="Player"
        style={{ ...playerStyle, left: `${playerPosition}%` }}
      />
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
      {bulletPosition !== null && (
        <div
          style={{
            position: "absolute",
            bottom: `${bulletYPosition}%`,
            left: `${bulletPosition}%`,
            width: "5px",
            height: "10px",
            backgroundColor: "white",
          }}
        />
      )}
      <div style={scoreStyle}>Score: {score}</div>
    </div>
  );
}

const backgroundStyle = {
  backgroundImage: `url(${"src/assets/GameBakgrund.png"})`,
  backgroundSize: "contain",
  backgroundAttachment: "fixed",
  height: "100vh",
  width: "100vw",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  position: "relative",
};

const pauseButtonStyle = {
  position: "absolute",
  top: "30px",
  right: "40px",
  background: "transparent",
  border: "none",
  color: "white",
  fontSize: "45px",
  cursor: "pointer",
};

const playerStyle = {
  position: "absolute",
  bottom: "-28%",
  width: "700px",
  height: "400px",
};

const booksStyle = {
  position: "absolute",
  width: "3%",
};

const scoreStyle = {
  position: "absolute",
  top: "20px",
  left: "15px",
  fontSize: "35px",
  fontWeight: "bold",
  fontFamily: "PixelFont",
  color: "white",
  textShadow: "2px 3px 4px rgba(0, 0, 0, 0.9)",
};

export default GameScreen;

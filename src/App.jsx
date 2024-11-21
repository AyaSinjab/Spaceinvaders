// Denna app.jsx behöver vi oftast endast uppdatera ifall vi lägger till navigering till en ny jsx fil
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartScreen from "./startScreen";
import GameScreen from "./GameScreen";
import EndScreen from "./EndScreen"; // Importera EndScreen

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartScreen />} />
        <Route path="/game" element={<GameScreen />} />
        <Route path="/end" element={<EndScreen />} />{" "}
        {/* Ny väg för EndScreen */}
      </Routes>
    </Router>
  );
}

export default App;


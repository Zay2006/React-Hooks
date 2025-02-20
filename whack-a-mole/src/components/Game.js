import React, { useState, useEffect } from "react";
import Grid from "./Grid";
import ScoreBoard from "./ScoreBoard";

const Game = () => {
  const [score, setScore] = useState(0);
  const [grid, setGrid] = useState(new Array(9).fill(false));

  // Function to handle clicking a mole
  const handleMoleClick = (index) => {
    if (grid[index]) {
      setScore(score + 1);
    }
  };

  // Function to randomly show a mole
  useEffect(() => {
    const highlightMole = () => {
      const newGrid = new Array(9).fill(false);
      const randomIndex = Math.floor(Math.random() * 9);
      newGrid[randomIndex] = true;
      setGrid(newGrid);
    };

    highlightMole();
    const moleTimer = setInterval(highlightMole, 1000);

    return () => clearInterval(moleTimer); // Cleanup function
  }, []);

  return (
    <div className="game">
      <h1>Whack-a-Mole</h1>
      <ScoreBoard score={score} />
      <Grid grid={grid} onMoleClick={handleMoleClick} />
    </div>
  );
};

export default Game;

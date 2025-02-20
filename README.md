Prerequisites
Basic understanding of HTML and JavaScript
Node.js installed on your computer
Basic familiarity with React components
Project Setup
Create a new React project using Create React App:

npx create-react-app whack-a-mole
cd whack-a-mole


Create the following file structure:

src/
  ├── components/
  │   ├── Game.js
  │   ├── Grid.js
  │   ├── Mole.js
  │   └── ScoreBoard.js
  ├── App.js
  └── styles.css

Understanding the Components
Let's break down our game following the Single Responsibility Principle, where each component has one specific job:
App.js: Main container component
Game.js: Manages game state and logic
Grid.js: Renders the game grid
Mole.js: Individual mole cell
ScoreBoard.js: Displays the score
Step 1: Creating the Base Components
Mole.js

import React from 'react';

const Mole = ({ isVisible, onClick }) => {
  return (
    <div 
      className={`grid-item ${isVisible ? "mole" : ""}`}
      onClick={onClick}
    />
  );
};

export default Mole;


ScoreBoard.js

import React from 'react';

const ScoreBoard = ({ score }) => {
  return (
    <div className="scoreboard">
      <h2>Score: {score}</h2>
    </div>
  );
};

export default ScoreBoard;


Grid.js

import React from 'react';
import Mole from './Mole';

const Grid = ({ grid, onMoleClick }) => {
  return (
    <div className="game-grid">
      {grid.map((isMole, index) => (
        <Mole
          key={index}
          isVisible={isMole}
          onClick={() => onMoleClick(index)}
        />
      ))}
    </div>
  );
};

export default Grid;


Step 2: Understanding useState
The useState hook allows us to add state to functional components. Let's implement it in our Game component. We can think of this as the “CheckPoint” in the game. This is also true for your application state.
Game.js

import React, { useState, useEffect } from 'react';
import Grid from './Grid';
import ScoreBoard from './ScoreBoard';

const Game = () => {
  // State declarations using useState
  const [score, setScore] = useState(0);
  const [grid, setGrid] = useState(new Array(9).fill(false));

  // Game logic will go here...

  return (
    <div className="game">
      <h1>Whack-a-Mole</h1>
      <ScoreBoard score={score} />
      <Grid grid={grid} onMoleClick={handleMoleClick} />
    </div>
  );
};

export default Game;



Understanding the useState Implementation:
score state:
Initial value: 0
Updated when player hits a mole
Uses setScore to modify the value
grid state:
Initial value: Array of 9 false values
Each position represents a mole hole
True means mole is visible, false means hidden
Step 3: Understanding useEffect
The useEffect hook handles side effects in our component. We'll use it to control the mole appearance timing. Think of this hook like a status checker for your Game. It’s checking the State and providing an update at a given frequency. 

// In Game.js
useEffect(() => {
  // Function to randomly show a mole
  const highlightMole = () => {
    const newGrid = new Array(9).fill(false);
    const randomIndex = Math.floor(Math.random() * 9);
    newGrid[randomIndex] = true;
    setGrid(newGrid);
  };

  // Initial mole placement
  highlightMole();

  // Set up interval for mole movement
  const moleTimer = setInterval(highlightMole, 1000);

  // Cleanup function
  return () => clearInterval(moleTimer);
}, []); // Empty dependency array means this runs once on mount





Understanding the useEffect Implementation:
The effect runs once when the component mounts (empty dependency array)
Sets up an interval to move the mole every second
Includes a cleanup function to prevent memory leaks
Manages game timing independently of other component logic
Step 4: Implementing Game Logic
Add the click handler to the Game component:

const handleMoleClick = (index) => {
  if (grid[index]) {
    setScore(score + 1);
  }
};

Step 5: Styling
Create styles.css in your src folder:

.game {
  text-align: center;
  padding: 20px;
}

.game-grid {
  display: grid;
  grid-template-columns: repeat(3, 100px);
  gap: 10px;
  margin: 20px auto;
  width: 320px;
}

.grid-item {
  height: 100px;
  background-color: #8b4513;
  border-radius: 50%;
  cursor: pointer;
}

.mole {
  background-color: #654321;
  border: 2px solid #3e2723;
  transform: scale(1.1);
  transition: all 0.1s ease;
}

.scoreboard {
  font-size: 24px;
  margin: 20px;
}


Understanding Single Responsibility Principle (SRP)
Notice how we've separated our components based on their responsibilities:
Mole.js: Only responsible for rendering a single mole cell
Grid.js: Only handles the layout of moles
ScoreBoard.js: Only displays the score
Game.js: Manages game state and coordinates components
App.js: Acts as the application container

Each component has one clear purpose, making the code:
Easier to understand
Easier to maintain
Easier to test
More reusable
Practice Exercises
Try adding a "Start Game" button that initiates the mole movement
Implement a game timer that limits each round to 30 seconds
Add different speeds for the moles as the score increases
Create a "High Score" feature using localStorage
Common Pitfalls to Avoid
State Updates: Remember that setState functions are asynchronous. Don't rely on the state value immediately after setting it.
useEffect Dependencies: Be careful with the dependency array in useEffect. Missing dependencies can cause stale closures.
Cleanup: Always clean up side effects (like intervals or timeouts) to prevent memory leaks.

Conclusion
You've learned how to:
Use useState for state management
Implement useEffect for side effects
Apply the Single Responsibility Principle
Build a complete React game

Try expanding the game with the practice exercises, and remember to keep your components focused on single responsibilities as you add features!

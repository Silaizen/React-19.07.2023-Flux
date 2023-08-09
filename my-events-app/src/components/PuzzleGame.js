import React, { useState, useEffect } from 'react';
import Tile from './Tile';

const PuzzleGame = () => {
  const [tiles, setTiles] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [solving, setSolving] = useState(false);
  const [targetTime, setTargetTime] = useState(0);
  const [timer, setTimer] = useState(null);

  
  const gridSize = 4;

  
  const shuffleTiles = () => {
    
    const shuffledTiles = Array.from({ length: gridSize * gridSize }, (_, i) => i + 1).sort(() => Math.random() - 0.5);
    setTiles(shuffledTiles);
  };

  
  const swapTiles = (index1, index2) => {
    const newTiles = [...tiles];
    [newTiles[index1], newTiles[index2]] = [newTiles[index2], newTiles[index1]];
    setTiles(newTiles);
    setMoves((prevMoves) => prevMoves + 1);
  };

  
  const checkGameOver = () => {
    return tiles.every((tile, index) => (index === tiles.length - 1 ? tile === gridSize * gridSize : tile === index + 1));
  };


  const handleTileClick = (number) => {
    if (!gameStarted) {
      setGameStarted(true);
      setStartTime(Date.now());
    }

    const emptyTileIndex = tiles.indexOf(gridSize * gridSize);
    const tileIndex = tiles.indexOf(number);

    if (tileIndex === emptyTileIndex - 1 || tileIndex === emptyTileIndex + 1 || tileIndex === emptyTileIndex - gridSize || tileIndex === emptyTileIndex + gridSize) {
      swapTiles(tileIndex, emptyTileIndex);
    }

    if (checkGameOver()) {
      setGameStarted(false);
      setEndTime(Date.now());
    }
  };


  const solvePuzzle = () => {
    
    shuffleTiles();
  };

  
  const handleSolveClick = () => {
    if (!gameStarted) {
      setGameStarted(true);
      setStartTime(Date.now());
    }
    setSolving(true);
  };

 
  useEffect(() => {
    if (solving) {
      solvePuzzle();
      setSolving(false);
      setEndTime(Date.now());
    }
  }, [solving]);

 
  useEffect(() => {
    shuffleTiles();
  }, []);

 
  const handleStartGame = () => {
    if (targetTime > 0) {
      setGameStarted(true);
      setStartTime(Date.now());
      setEndTime(0);

      
      const gameTimer = setTimeout(() => {
        if (!checkGameOver()) {
          setGameStarted(false);
          setEndTime(Date.now());
        }
      }, targetTime * 1000);

      setTimer(gameTimer);
    }
  };

  
  useEffect(() => {
    return () => {
      clearTimeout(timer);
    };
  }, [timer]);

  return (
    <div>
      <div className="grid">
        {tiles.map((tileNumber, index) => (
          <Tile key={index} number={tileNumber} onClick={handleTileClick} />
        ))}
      </div>
      {gameStarted && <p>Moves: {moves}</p>}
      {gameStarted && <p>Залишилося часу: {((targetTime - (Date.now() - startTime) / 1000).toFixed(1))} секунд</p>}
      {!gameStarted && endTime > 0 && <p>Гра завершена! Час: {(endTime - startTime) / 1000} секунд</p>}
      {!gameStarted && <input type="number" value={targetTime} onChange={(e) => setTargetTime(parseInt(e.target.value))} />}
      {!gameStarted && <button onClick={handleStartGame}>Розпочати гру</button>}
      <button onClick={handleSolveClick} disabled={gameStarted}>
        Зібрати автоматично
      </button>
    </div>
  );
};

export default PuzzleGame;
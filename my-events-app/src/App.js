import React from 'react';
import EventForm from './components/EventForm';
import CommentForm from './components/CommentForm';
import PuzzleGame from './components/PuzzleGame';
import './styles.css';

function App() {
  return (
    <div>
      <h1>Додавання подій</h1>
      <EventForm />
      <h1>Додавання коментарів</h1>
      <CommentForm />
      <h1>Гра "П'ятнашки"</h1>
      <PuzzleGame />
    </div>
  );
}

export default App;
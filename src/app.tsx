import { Client } from 'boardgame.io/react';
import game from './game';
import board from './board';

const App = Client({ 
  game: game,
  board: board,
});

export default App;

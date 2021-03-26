import { SocketIO } from 'boardgame.io/multiplayer'
import { Client } from 'boardgame.io/react';
import game from './game';
import board from './board';

function App() {
  const GameClient = Client({
    game: game,
    board: board,
    multiplayer: SocketIO({ server: 'localhost:8000' }),
  });

  return <GameClient playerID='0'/>
}

export default App;

import React from 'react';
import { CreateMatch, JoinGame, Player } from './lobby';
import { SocketIO } from 'boardgame.io/multiplayer'
import { Client } from 'boardgame.io/react';
import game from './game';
import board from './board';
import { parseURL, makeURL } from './url-tools';


function App() {
  const location = window.location;
  const [matchID, player] = parseURL(location);

  const setMatchID = (matchID: string) => {
    window.location.href = makeURL(location, matchID);
  }

  const setPlayer = (player: Player) => {
    window.location.href = makeURL(location, matchID!, player);
  }

  if (!matchID) {
    return <CreateMatch setMatchID={setMatchID} />;
  }

  if (!player) {
    const href = makeURL(location, matchID);
    return (<>
      <JoinGame matchID={matchID} setPlayer={setPlayer} />
      <div><a href={href} target='blank'>{href}</a></div>
    </>);
  }

  const GameClient = Client({
    game: game,
    board: board,
    multiplayer: SocketIO({ server: 'localhost:8000' }),
  });

  return (<div>
    <div>{`Match: ${matchID}  Player: ${player.id} (${player.credentials})`}</div>
    <GameClient matchID={matchID} playerID={player.id} credentials={player.credentials} />
  </div>
  )
}

export default App;

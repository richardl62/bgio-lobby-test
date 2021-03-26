import React from 'react';
import { CreateMatch, JoinGame, Player } from './lobby';
import { SocketIO } from 'boardgame.io/multiplayer'
import { Client } from 'boardgame.io/react';
import game from './game';
import board from './board';

function playerParse(string: string | null) : Player | null {
  if(string === null) {
    return null;
  }

  const obj = JSON.parse(string);
  if(obj instanceof Array && obj.length === 2) {
    const [id, credentials] = obj;
    return {id:id, credentials: credentials};
  } 

  throw new Error("Invalid player information in URL " + string);
}

const inputURL = new URL(window.location.href);
const urlMatchID = inputURL.searchParams.get('match');
const urlPlayer = playerParse(inputURL.searchParams.get('player'));

interface MakeLinkArgs {
  matchID?: string;
  player?: Player;
}

export function makeLink({matchID, player}: MakeLinkArgs) {
  let params = new URLSearchParams();
  const matchID_ = matchID || urlMatchID;
  const player_ = player || urlPlayer;

  if(matchID_)  {
    params.set('match', matchID_);
  }
  
  if(player_)  {
    params.set('player', JSON.stringify([player_.id,player_.credentials]));
  }

  let newURL = new URL(inputURL.toString());
  newURL.search = params.toString();
  
  return newURL.toString();
}

function setMatchID(matchID: string) {
  window.location.href = makeLink({matchID: matchID});
}

function setPlayer(player: Player) {
  window.location.href = makeLink({player: player});
}

function App() {

  if (urlMatchID === null) {
    return <CreateMatch setMatchID={setMatchID} />;
  } 
  
  if (urlPlayer === null ) {
    return <JoinGame matchID={urlMatchID} setPlayer={setPlayer} />;
  }

  const GameClient = Client({
    game: game,
    board: board,
    multiplayer: SocketIO({ server: 'localhost:8000' }),
  });

  return (<div>
      <div>{`Match: ${urlMatchID}  Player: ${urlPlayer.id} (${urlPlayer.credentials})`}</div>
      <GameClient matchID={urlMatchID} playerID={urlPlayer.id} credentials={urlPlayer.credentials}/>
    </div>
    )
}

export default App;

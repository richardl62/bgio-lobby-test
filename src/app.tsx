import React from 'react';
import { CreateMatch, JoinGame } from './lobby';
// import { SocketIO } from 'boardgame.io/multiplayer'
// import { Client } from 'boardgame.io/react';
// import game from './game';
// import board from './board';

const inputURL = new URL(window.location.href);
const urlMatchID = inputURL.searchParams.get('match');
const urlPlayerID = inputURL.searchParams.get('player');

interface MakeLinkArgs {
  matchID?: string;
  playerID?: string;
}

export function makeLink({matchID, playerID}: MakeLinkArgs) {
  let params = new URLSearchParams();
  const matchID_ = matchID || urlMatchID;
  const playerID_ = playerID || urlPlayerID;

  if(matchID_)  {
    params.set('match', matchID_);
  }
  
  if(playerID_)  {
    params.set('player', playerID_);
  }

  let newURL = new URL(inputURL.toString());
  newURL.search = params.toString();
  
  return newURL.toString();
}

function setMatchID(matchID: string) {
  window.location.href = makeLink({matchID: matchID});
}

function setPlayerID(playerID: string) {
  window.location.href = makeLink({playerID: playerID});
}

function App() {

  if (urlMatchID === null) {
    return <CreateMatch setMatchID={setMatchID} />;
  } 
  
  if (urlPlayerID === null ) {
    return <JoinGame setPlayerID={setPlayerID} />;
  }

  // const GameClient = Client({
  //   game: game,
  //   board: board,
  //   multiplayer: SocketIO({ server: 'localhost:8000' }),
  // });

  return (<div>{`Match: ${urlMatchID}  Player: ${urlPlayerID}`}</div>)
}

export default App;

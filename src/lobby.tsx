import React, {useState} from 'react';
import { LobbyClient } from 'boardgame.io/client';
import game from './game';

const server='http://localhost:8000/';

export interface Player {
  id: string;
  credentials: string;
}

function createMatch() {
  const lobbyClient = new LobbyClient({server: server});
  return lobbyClient.createMatch(game.name, { numPlayers: 2 });
}

async function joinMatch(matchID: string) : Promise<Player> {
  const lobbyClient = new LobbyClient({server: server});

  const match = await lobbyClient.getMatch(game.name, matchID);
  console.log(match);

  const players = match.players;
  let index = 0; 
  while(index < players.length && players[index].name) {
    ++index;
  } 

  if(index === players.length) {
    throw new Error("Match full - cannot join");
  }
  
  const playerID = players[index].id.toString();
  const joinMatchResult = await lobbyClient.joinMatch(game.name, matchID, 
    {
      playerID: playerID,
      playerName: 'Player ' + playerID,
    });

  console.log("joinMatchResult", joinMatchResult);

  return {
    id: playerID,
    credentials: joinMatchResult.playerCredentials,
  }
} 

// Edited copy of JoinGame
export function CreateMatch({setMatchID} : {setMatchID: (id: string) => void}) {
  const [progress, setProgress] = useState<null|'waiting'|Error>(null);

  if(progress === 'waiting') {
    return <div>waiting ...</div>
  }

  if(progress instanceof Error) {
    console.log("createMatch", progress);
    return <div>{`Error: ${progress.message}`}</div>
  }

  const onClick = () => {
    setProgress('waiting');
    createMatch().then(match => setMatchID(match.matchID)).catch(setProgress);
  }

  return <button type='button' onClick={onClick}>Start New Match</button>;
}

export function JoinGame({matchID, setPlayer} : {matchID: string, setPlayer: (player: Player) => void}) {
  const [progress, setProgress] = useState<null|'waiting'|Error>(null);

  if(progress === 'waiting') {
    return <div>waiting ...</div>
  }

  if(progress instanceof Error) {
    console.log("createMatch", progress);
    return <div>{`Error: ${progress.message}`}</div>
  }

  const onClick = () => {
    setProgress('waiting');
    joinMatch(matchID).then(player => setPlayer(player)).catch(setProgress);
  }

  return <button type='button' onClick={onClick}>Join Game</button>;
}

import React from 'react';

export function CreateMatch({setMatchID} : {setMatchID: (id: string) => void}) {
  const onClick = () => setMatchID('a match');
  return <button type='button' onClick={onClick}>Start New Match</button>;
}
export function JoinGame({setPlayerID} : {setPlayerID: (id: string) => void}) {
  const onClick = () => setPlayerID('someone');
  return <button type='button' onClick={onClick}>Join Match</button>;
}

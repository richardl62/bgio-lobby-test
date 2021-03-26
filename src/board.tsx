import React from 'react';
import { G } from './game';

function Board({G, moves}: {G:G, moves: any}) {
    return (
        <div>
            <button type="button" onClick={(()=>moves.add(1))}>+1</button>
            <button type="button" onClick={(()=>moves.add(-1))}>-1</button>
            <div>{G.value}</div> 
        </div>
    )
}

export default Board;
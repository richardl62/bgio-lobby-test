interface G {
    value: number;
};

const game = {
  // The name of the game.
  name: 'counter',

  // Function that returns the initial value of G.
  // setupData is an optional custom object that is
  // passed through the Game Creation API.
  setup: () : G=> {return {value: 0};},

  moves: {
    // short-form move.
    add: (G: G, ctx: any, value: number) => {G.value += value},
  },
}

export default game;
export type {G};
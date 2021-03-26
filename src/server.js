const { Server } = require('boardgame.io/server');
const game = require('./game').default;
console.log(game);

const server = Server({ games: [ game ] });

server.run(8000);
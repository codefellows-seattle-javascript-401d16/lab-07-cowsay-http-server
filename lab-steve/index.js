'use strict';

const server = require('./lib/server.js');

server.server.listen(3000, () => {
  console.log('server up :: 3000');
});

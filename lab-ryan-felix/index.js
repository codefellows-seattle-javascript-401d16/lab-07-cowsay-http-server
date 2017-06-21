const server = require('./lib/server.js')();
server.listen(3000, () => {
  console.log('Server listening on port 3000');
});

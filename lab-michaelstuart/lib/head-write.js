const cowsay = require('cowsay');
const displayMessage = 'hello world';

module.exports = (res, code, display = null, text) => {
  res.writeHead(code, display);
  display && res.write(text ? cowsay.say({ text }) : displayMessage);
  res.end();
};

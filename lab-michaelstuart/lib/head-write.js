const cowsay = require('cowsay');

module.exports = (res, code, option = null, text) => {
  res.writeHead(code, option);
  option && res.write(text ? cowsay.say({ text }) : 'hello world');
  res.end();
};

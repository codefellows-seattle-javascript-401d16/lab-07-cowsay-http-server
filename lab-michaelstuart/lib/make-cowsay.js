const cowsay = require('cowsay');

module.exports = (req, res) => {
  let text = req.method === 'GET' ? req.url.query.text : req.body.text;
  let code = 200;

  if (!text) {
    code = 400;
    text = 'bad request\ntry: localhost:3000/cowsay?text=howdy';
  }

  res.writeHead(code, { 'Content-Type' : 'text/plain' });
  res.write(cowsay.say({ text }));
  res.end();
};

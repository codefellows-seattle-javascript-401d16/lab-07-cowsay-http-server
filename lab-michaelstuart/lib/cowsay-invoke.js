const cowsay = require('cowsay');

module.exports = (req, res) => {
  let text = req.method === 'GET' ? req.url.query.text : req.body.text;
  let code = 200;

  if (!text) {
    text = 'bad request\ntry: localhost:3000/cowsay?text=howdy';
    code = 400;
  }

  res.writeHead(code, { 'Content-Type' : 'text/plain' });
  res.write(cowsay.say({ text }));
  res.end();
};

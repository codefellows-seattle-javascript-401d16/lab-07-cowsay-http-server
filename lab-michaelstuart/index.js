const http = require('http');
const url = require('url');
const querystring = require('querystring');
const cowsay = require('cowsay');
const bodyParse = require('./lib/body-parse');

const makeCowsay = (req, res) => {
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

module.exports = http.createServer((req, res) => {
  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query);

  bodyParse(req, (err, body) => {
    if(err) {
      res.writeHead(500);
      res.end();
      return;
    }

    try {
      req.body = JSON.parse(body);
    }
    catch (err) {
      res.writeHead(400);
      res.end();
      return;
    }

    if (req.url.pathname === '/') {
      res.writeHead(200, { 'Content-Type' : 'text/plain' });
      res.write('hello world');
      res.end();
      return;
    }

    if (req.url.pathname === '/cowsay') {
      makeCowsay(req, res);
      return;
    }

    res.writeHead(404);
    res.end();
  });

}).listen(8080, () => console.log('server running on port 8080'));

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const cowsay = require('cowsay');
const bodyParse = require('./lib/body-parse');

const server = module.exports = http.createServer((req, res) => {
  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query);

  bodyParse(req, (err, body) => {
    if(err) {
      res.writeHead(500);
      res.end();
      return;
    } try {
      req.body = JSON.parse(body);
    } catch (err) {
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

    if (req.method === 'GET' && req.url.pathname === '/cowsay') {
      const text = req.url.query.text;
      if (text) {
        res.writeHead(200, { 'Content-Type' : 'text/plain' });
        res.write(cowsay.say({ text }));
      } else {
        res.writeHead(400, { 'Content-Type' : 'text/plain' });
        res.write(cowsay.say({text: 'bad request\ntry: localhost:3000/cowsay?text=howdy'}));
      }
      res.end();
      return;
    }

    if (req.method === 'POST' && req.url.pathname === '/cowsay') {
      const text = req.body.text;
      if (text) {
        res.writeHead(200, { 'Content-Type' : 'text/plain' });
        res.write(cowsay.say({ text }));
      } else {
        res.writeHead(400, { 'Content-Type' : 'text/plain' });
        res.write(cowsay.say({text: 'bad request\ntry: localhost:3000/cowsay?text=howdy'}));
      }
      res.end();
      return;
    }

    res.writeHead(404);
    res.end();
  });

});

server.listen(8080, () => {
  console.log('server up on port 8080');
});

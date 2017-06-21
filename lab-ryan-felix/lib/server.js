const http = require('http');
const url = require('url');
const queryString = require('querystring');
const parseBody = require('./parsebody.js');
const cowsay = require('cowsay');

module.exports = () => http.createServer( (req, res) => {
  req.url = url.parse(req.url);
  req.url.query = queryString.parse(req.url.query);
  parseBody(req, (err, body) => {

    if(err) {
      res.writeHead(500); // internal server error
      res.end();
      return;
    }

    try {
      req.body = JSON.parse(body);
    } catch (err) {
      res.writeHead(400); // bad request
      res.end();
      return;
    }

    if(req.url.pathname === '/') {
      res.writeHead(200, {
        'Content-Type': 'text/plain',
      });
      res.write('hello world');
      res.end();
      return;
    } else if(req.url.pathname === '/cowsay') {
      if(req.method === 'GET') {
        if(req.url.query.text && req.url.query.text.length > 0) {
          res.writeHead(200);
          res.write(cowsay.say({
            text: req.url.query.text,
          }));
          res.end();
          return;
        } else {
          res.writeHead(400);
          res.write(cowsay.say({text: 'bad request\ntry: localhost:3000/cowsay?text=howdy'}));
          res.end();
          return;
        }
      } else
      if(req.method === 'POST') {
        if(req.body.text) {
          res.writeHead(200);
          res.write(cowsay.say({
            text: req.body.text,
          }));
          res.end();
          return;
        } else {
          res.writeHead(400);
          res.write(cowsay.say({text: 'bad request\ntry: localhost:3000/cowsay?text=howdy'}));
          res.end();
          return;
        }
      } else {
        res.writeHead(405); // method not allowed
        res.write(cowsay.say({text: 'bad request\ntry: localhost:3000/cowsay?text=howdy'}));
        res.end();
        return;
      }
    } else {
      res.writeHead(404);
      res.end();
      return;
    }

  });
});

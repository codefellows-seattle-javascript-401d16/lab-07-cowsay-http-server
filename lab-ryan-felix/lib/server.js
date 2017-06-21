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
      console.log('before parse');
      console.log(body);
      req.body = JSON.parse(body);
      console.log('\nafter parse');
      console.log(body);
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
        if(req.url.query.message && req.url.query.message.length > 0) {
          res.writeHead(200);
          res.write(cowsay.say({
            text: req.url.query.message,
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
        if(req.body.message) {
          res.writeHead(200);
          res.write(cowsay.say({
            text: req.body.message,
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

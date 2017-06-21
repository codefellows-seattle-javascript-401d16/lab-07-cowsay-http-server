'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const cowsay = require('cowsay');
const bodyParser = require('./lib/body-parse');

const server = module.exports = http.createServer((req, res) => {
  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query);

  if(req.url.pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain'});
    res.write('hello world');
    res.end();
    return;
  }

  if(req.method === 'GET' && req.url.pathname === '/cowsay') {
    console.log('REQ BODY:', req.url);
    if(req.url.query.text){
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write(cowsay.say({
        text: JSON.stringify(req.url.query.text),
      }));
      res.end();
      return;
    } else {
      res.writeHead(400, {'Content-Type':'text/plain'});
      res.write(cowsay.say({text: 'bad request\ntry localhost:3000/cowsay?text=howdy'}));
      res.end();
      return;
    }
  }

  if(req.method === 'POST' && req.url.pathname === '/cowsay') {
    bodyParser(req, (err, body) => {
      if(err) {console.error(err);
        res.writeHead(400, {});
      } else {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write(cowsay.say({text: body.text}));
        res.end();
        return;
      }
    });
  }
});
server.listen(3000, () => {
  console.log('servin up some peaky blinderz on port 3000');
});

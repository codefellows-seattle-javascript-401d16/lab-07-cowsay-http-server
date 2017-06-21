'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const cowsay = require('cowsay');

const bodyparse = (req, callback) => {
  if(req.method === 'POST' || req.method === 'PUT') {
    let body = '';
    req.on('data', (buf) => {
      body += buf.toString();
    });
    req.on('end', () => callback(null, body));
    req.on('err', (err) => callback(err));
  } else {
    callback(null, '{}');
  }
};

const server = http.createServer((req, res) => {
  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query);
  bodyparse(req, (err, body) => {
    if(err) {
      res.writeHead(500);
      res.end();
      return;
    }
    try {
      req.body = JSON.parse(body);
    } catch(err) {
      res.writeHead(400);
      res.end();
      return;
    }
    if(req.url.pathname === '/') {
      res.writeHead(200, {
        'Content-Type' : 'text/plain',
      });
      res.write('Hello World');
      res.end();
      return;
    }
    if(req.method === 'GET' && req.url.pathname === '/cowsay') {

      try {
        res.writeHead(200, {
          'Content-Type' : 'text/plain',
        });
        res.write(cowsay.say(req.url.query));
      } catch(err) {
        res.writeHead(400);
        res.write(cowsay.say({text: 'bad request\ntry: localhost:3000/cowsay?text=<message>'}));
      }
      res.end();
      return;
    }
    if(req.method === 'POST' && req.url.pathname === '/cowsay') {

      try {
        res.writeHead(200, {
          'Content-Type' : 'text/plain',
        });
        res.write(cowsay.say(req.body));
      } catch(err) {
        res.writeHead(400, {
          'Content-Type' : 'text/plain',
        });
        res.write(cowsay.say({text: 'bad request\ntry: localhost:3000/cowsay?text=<message>'}));
      }
      res.end();
      return;
    }
    res.writeHead(404);
    res.end();
  });
});

server.listen(5000, () => {
  console.log('server is up on 5000!');
});

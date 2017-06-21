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
    req.on('error', (err) => callback(err));
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
      console.log('200');
      res.writeHead(200, {
        'Content-Type' : 'text/plain',
      });
      res.write('Hello World!');
      res.end();
      return;
    }
    if(req.method === 'GET' && req.url.pathname === '/cowsay') {
      try {
        res.writeHead(200, {
          'Content-Type' : 'text/plain',
        });
        res.write(cowsay(req.url.query));
      } catch(err) {
        res.writeHead(400);
        res.write(cowsay.say({text: 'bad request, use POST'}));
      }
      res.end();
      return;
    }
    if (req.method === 'POST' && req.url.pathname ==='/cowsay') {
      try {
        res.writeHead(200, {
          'Content-Type' : 'text/plain',
        });
        res.write(cowsay.say({text: req.body['text']}));
      } catch(err) {
        res.writeHead(400, {
          'Content-Type' : 'text/plain',
        });
        res.write(cowsay.say({text: 'bad request'}));
      }
      res.end();
      return;
    }
    res.writeHead(404);
    res.end();
  });
});

server.listen(3000, () => {
  console.log('server up :: 3000');
});

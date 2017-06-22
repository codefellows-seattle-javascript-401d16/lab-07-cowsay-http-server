'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const cowsay = require('cowsay');

const server = module.exports = {};

server.bodyparse = (req, callback) => {
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

server.server = module.exports = http.createServer((req, res) => {
  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query);
  server.bodyparse(req, (err, body) => {
    if(err) {
      res.writeHead(500);
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
        res.write(cowsay.say({text: 'oops, you mooooootilated that request\nPOST localhost:3000/cowsay text=<message>', f: 'mutilated'}));
      }
      res.end();
      return;
    }
    if (req.method === 'POST' && req.url.pathname ==='/cowsay') {
      if(body) req.body = JSON.parse(body);
      try {
        res.writeHead(200, {
          'Content-Type' : 'text/plain',
        });
        res.write(cowsay.say({text: req.body['text']}));
      } catch(err) {
        res.writeHead(400, {
          'Content-Type' : 'text/plain',
        });
        res.write(cowsay.say({text: 'oops, you mooooootilated that request\nPOST localhost:3000/cowsay text=<message>', f: 'mutilated'}));
      }
      res.end();
      return;
    }
    res.writeHead(404);
    res.end();
  });
});

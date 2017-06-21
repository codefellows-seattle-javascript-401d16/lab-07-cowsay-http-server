'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const cowsay = require('cowsay');

const bodyParse = (req, callback) => {
  if (req.method === 'POST' || req.method === 'PUT') {
    let body = '';
    req.on('data', (buffer) => {
      body += buffer.toString();
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
  bodyParse(req, (err, concatedBody) => {
    if (err) {
      res.writeHead(500, {
        'Content-Type': 'text/plain',
      });
      res.write('Internal Server Error');
      res.end();
      return;
    }

    try {
      req.body = JSON.parse(concatedBody);
    } catch (err) {
      res.writeHead(400, {
        'Content-Type': 'text/plain',
      });
      res.write('Your JSON is bad');
      res.end();
      return;
    }

    if (req.url.pathname === '/') {
      res.writeHead(200, {
        'Content-Type': 'text/plain',
      });
      res.write('hello world');
      res.end();
      return;
    }

    if (req.method === 'GET' && req.url.pathname === '/cowsay') {
      if (req.url.query['text']) {
        res.writeHead(200, {
          'Content-type': 'text/plain',
        });
        res.write(cowsay.say({text: req.url.query['text']}));
        res.end();
        return;
      }
      res.writeHead(400, {
        'Content-type': 'text/plain',
      });
      res.write(cowsay.say({text: 'bad request\ntry: localhost:3000/cowsay?text=howdy'}));
      res.end();
      return;
    }

    if (req.method === 'POST' && req.url.pathname === '/cowsay') {
      if (req.url.quert['text']) {
        res.writeHead(200, {
          'Content-Type': 'text/plain',
        });
        res.write(cowsay.say({text: req.url.query['text']}));
        res.end();
        return;
      }
      res.writeHead(400, {
        'Content-Type': 'text/plain',
      });
      res.write(cowsay.say({text: 'bad request\ntry: localhost:3000/cowsay?text=howdy'}));
      res.end();
      return;
    }

    res.writeHead(404);
    res.end();
  });
});

server.listen(3000, () => {
  console.log('Server is live on port 3000');
});

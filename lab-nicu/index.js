'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const cowsay = require('cowsay');

function bodyParser(req, callback) {
  if (req.method === 'POST') {
    let body = '';
    req.on('data', (buf) => {
      body += buf.toString();
    });
    req.on('end', () => callback(null, body));
    req.on('error', (err) => callback(err));
  } else {
    callback(null, '{}');
  }



}

const server = http.createServer((req, res) => {
  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query);
  bodyParser(req, (err, body) => {
    if (err) {
      res.writeHead(500);
      res.write('Internal Server Error');
      res.end();
    }


    try {
      req.body = JSON.parse(body);
    } catch (err) {
      res.writeHead(400);
      res.end();
      return;
    }

    if (req.url.pathname === '/') {
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.write('Hello World');
      res.end();
      return;
    }
    if (req.url.pathname === '/cowsay') {
      if (req.method === 'GET') {
        if (req.url.query.text) {
          res.writeHead(200, {
            'Content-Type': 'application/json',
          });
          res.write(cowsay.say({ text: req.url.query.text }));
          res.end();
        }
        else {
          res.writeHead(400, {
            'Content-Type': 'application/json',
          });
          res.write(cowsay.say({ text: 'bad request\ntry: localhost:3000/cowsay?text=howdy' }));
          res.end();
        }
        return;
      }
      if (req.method === 'POST') {

        if (req.body.text) {
          res.writeHead(200, {
            'Content-Type': 'application/json',
          });
          res.write(cowsay.say({ text: req.body.text }));
          res.end();
        } else {
          res.writeHead(400, {
            'Content-Type': 'application/json',
          });
          res.write(cowsay.say({ text: 'bad request\ntry: localhost:3000/cowsay?text=howdy' }));
          res.end();
        }
      }
      return;

    }
    res.writeHead(404);
    res.end();
    return;
  });
});

server.listen(3000, () => {
  console.log('Server is listeing in PORT 3000');
});
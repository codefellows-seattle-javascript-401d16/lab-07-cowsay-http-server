'use strict';

const http = require('http');
const url = require('url');
const querystring = require('quertystring');

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
  bodyParse(req, (err, body) => {
    if (err) {
      res.writeHead(500);
      res.end();
      return;
    }

    try {
      req.body = JSON.parse(body);
    } catch (err) {
      res.writeHead(400);
      res.end();
      return;
    }

    if (req.method === 'GET' && req.url.pathname === '/time') {
      res.writeHead(200, {
        'Content-Type' : 'application/json',
      });
      res.write(JSON.stringify({
        
      }));
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

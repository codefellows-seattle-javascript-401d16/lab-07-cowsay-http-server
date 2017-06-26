'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const cowsay = require('cowsay');

const bodyParser = (req, cb) => {
  if(req.method === 'POST' || req.method === 'PUT') {
    let body = '';

    req.on('data', (buf) => {
      body += buf.toString();
    });
    req.on('end', () => {
      cb(null,body);
    });
    req.on('error', (err) => {
      cb(err);
    });
  }else{
    cb(null, '{}');
  }
};

const server = http.createServer((req, res) => {
  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.querystring);

  bodyParser(req, (err, body) => {
    if(err) {
      res.writeHead(500);
      res.end();
      return;
    }

    try {
      req.body = JSON.parse(body);
    }catch (err){
      res.writeHead(500);
      res.end();
      return;
    }

    if(req.url.pathname === '/') {
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.write('Hello, world');
      res.end();
      return;
    }

    if(req.url.pathname === '/cowsay') {
      if(req.method === 'GET') {
        if(req.url.query['text']) {
          res.writeHead(200, {
            'Content-Type': 'text/plain'
          });
          res.write(cowsay.say({
            text: req.url.query['text']
          }));
          res.end();
          return;
        }else{
          res.writeHead(400, {
            'Content-Type': 'text/plain'
          });
          res.write(cowsay.say({
            text: 'bad request\ntry: localhost:3000/cowsay?text=howdy'
          }));
          res.end();
          return;
        }
      }
    }
  })
})

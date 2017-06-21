'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const cowsay = require('cowsay');

const bodyParse = (req, callback) => {
  if(req.method === 'POST' || req.method === 'PUT'){
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
  reg.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query);
  bodyParse(req, (error, body) => {
    if(err) {
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
    if(req.url.pathname === '/'){
      res.writeHead(200);
      res.write('hello world');
      res.end();
      return;
    }
    if(req.method === 'GET' && req.url.pathname === '/cowsay'){
      if(req.url.query.text){
        res.writeHead(200, {
          'Content-type': 'text/plain',
        });
        res.write(cowsay.say({text: req.url.query.text}));
        res.end();
        return;
      } else {
        res.writeHead(400);
        res.write(cowsay.say({text: req.url.query.text}));
        res.end();
        return;
      }
      if(req.method === 'PUT' && req.url.pathname === '/cowsay'){
        try {
          res.writeHead(200, {
            'Content-type': 'text/plain',
          });
          res.write(cowsay.say(req.body));
        } catch (err) {
          res.write(cowsay.say({text: 'bad request\ntry: localhost:3000/cowsay?text=message'}));
          res.end();
        }
        return;
    }
    res.writeHead(444);
    res.write(req.url.pathname);
    res.write(cowsay.say({text: '\We are saying cows!'}));
    res.end();
  });
});
server.listen(3000, () => {
  console.log('server up :: 3000');
});

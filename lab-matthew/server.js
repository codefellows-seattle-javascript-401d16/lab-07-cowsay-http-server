'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const cowsay = require('cowsay');

// callbacks should be (err, body) => undefined

const bodyParse = (req, callback) => {
  if(req.method === 'POST' || req.method === 'PUT'){
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

// Factory function - plays role of constructor without new keyword; function that returns an Object
// Returns server object
const server = http.createServer((req, res) => {
  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query);
  console.log('req.url', req.url);
  console.log('req.method', req.method);
  bodyParse(req, (err, body) => {
    if(err) {
      res.writeHead(500);
      res.end();
      return;
    }

    try {
      req.body = JSON.parse(body);
    } catch (err) {
      res.writeHead(400, {
        'Content-Type': 'text/plain',
      });
      res.write(cowsay.say({text: 'bad request\ntry: localhost:3000/cowsay?text=cows+are+cute'}));
      res.end();
      return;
    }

    if(req.url.pathname === '/'){
      res.writeHead(200, {
        'Content-Type' : 'text/plain',
      });
      res.write('hello world');
      res.end();
      return;
    }

    if(req.method === 'GET' && req.url.pathname === '/cowsay' && req.url.query.text != undefined){
      res.writeHead(200, {
        'Content-Type' : 'text/plain',
      });
      res.write(cowsay.say({
        text: `${req.url.query.text}`,
        e: 'oO',
        T : 'U ',
      }));
      res.end();
      return;
    }

    if(req.method === 'GET' && req.url.pathname === '/cowsay' && req.url.query.text === undefined){
      res.writeHead(400, {
        'Content-Type' : 'text/plain',
      });
      res.write(cowsay.say({
        text: 'bad request\ntry: localhost:3000/cowsay?text=cows+are+cute',
        e: 'oO',
        T: 'U ',
      }));
      res.end();
      return;
    }

    if(req.method === 'POST' && req.url.pathname === '/cowsay' && req.body.text != undefined){

      try{
        res.writeHead(200, {
          'Content-Type' : 'text/plain',
        });
        res.write(cowsay.say({
          text: `${req.body.text}`,
          e: 'oO',
          T : 'U ',
        }));
      } catch (err) {
        res.writeHead(400);
        res.write(cowsay.say({
          text: `'bad request\ntry: localhost:3000/cowsay?text=cows+are+cute`,
          e: 'oO',
          T : 'U ',
        }));
      }
      res.end();
      return;
    }

    if(req.method === 'POST' && req.url.pathname === '/cowsay' && req.body.text === undefined){
      res.writeHead(400, {
        'Content-Type' : 'text/plain',
      });
      res.write(cowsay.say({
        text: 'bad request\ntry: localhost:3000/cowsay?text=cows+are+cute',
        e: 'oO',
        T: 'U ',
      }));
      res.end();
      return;
    }

    if(req.method === 'POST' && req.url.pathname === '/echo'){
      console.log('sweetness echo worked');
      res.writeHead(200, {
        'Content-Type' : 'application/json',
      });
      res.write(JSON.stringify(req.body));
      res.end();
      return;
    }

    res.writeHead(444);
    res.end();
  });

});

// on server instance invoking listen method, passing in 3000 port and callback)
server.listen(3000, () => {
  console.log('server up :: 3000');
});

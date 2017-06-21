'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const cowsay = require('cowsay');

const bodyParse = (req, callback) => {
  if(req.method === 'POST'){
    let body = '';
    req.on('data', (buf) =>{
      body += buf.toString();
    });
    req.on('end', () => callback(null, body));
  } else {
    callback(null, '{}');
  }
};

const server = http.createServer((req, res) =>{
  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query);

  console.log('req.body', req.body);
  console.log('req.query', req.url.query);

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
      res.write(cowsay.say({text: 'bad request\ntry: localhost:3000/cowsay?text=howdy'}));
      res.end();
      return;
    }

    if(req.method === 'POST' && req.url.pathname ==='/cowsay'){
      res.writeHead(200, {
        'Content-Type': 'text/plain',
      });
      res.write(cowsay.say({text : `${req.body.text}`, e : 'oO', T : 'U'}));
      res.end();
      return;
    }
    if(req.method === 'GET' && req.url.pathname === '/'){
      res.writeHead(200, {
        'Content-Type': 'text/plain',
      });
      res.write(cowsay.say({ text : 'Hello World', e : 'oO', T : 'U'}));
      res.end();
      return;
    }
    if(req.method === 'GET' && req.url.pathname === '/cowsay' && req.url.query.text === undefined){
      res.writeHead(400, {
        'Content-Type': 'text/plain',
      });
      res.write(cowsay.say({text: 'bad request\ntry: localhost:3000/cowsay?text=howdy'}));
      res.end();
      return;
    }
    if(req.method === 'GET' && req.url.pathname === '/cowsay'){
      res.writeHead(200, {
        'Content-Type': 'text/plain',
      });
      res.write(cowsay.say({ text: `${req.url.query.text}`, e : 'oO', T : 'U'}));
      res.end();
      return;
    }

  });
});

server.listen(3000, () =>{
  console.log('server is up on port: 300');
});

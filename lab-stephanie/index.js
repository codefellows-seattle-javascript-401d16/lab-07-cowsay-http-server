'use strict';

const http = require('http');
const cowsay = require('cowsay');
const url = require('url');
const querystring = require('querystring');

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
      res.writeHead(400);
      res.end();
      return;
    }

    if(req.method === 'GET' && req.url.pathname === '/'){
      try{
        res.writeHead(200, {
          'Content-Type': 'text/plain',
        });
        res.write('hello world');
        res.end();
        return;
      }
      catch (err){
        res.writeHead(404);
      }
      res.end();
    }
    if(req.method === 'POST' && req.url.pathname === '/'){
      try{
        res.writeHead(200, {
          'Content-Type': 'text/plain',
          'text' : 'message',
        });
        res.write('hello world');
        res.end();
        return;
      }
      catch (err){
        res.writeHead(404);
      }
      res.end();
    }

    if(req.method === 'GET' && req.url.pathname === '/cowsay'){
      try{
        res.writeHead(200, {
          'Content-Type': 'text/plain',
        });
        res.write(cowsay.say(req.url.query));
        res.end();
        return;
      }
      catch (err){
        res.writeHead(404);
        res.write(cowsay.say({text:'bad request\ntry: localhost: 3000/cowsay?text=<message>'}));
      }
      res.end();
    }
    if(req.method === 'POST' && req.url.pathname === '/cowsay'){
      try{
        res.writeHead(200, {
          'Content-Type': 'text/plain',
          'text' : 'message',
        });
        res.write(cowsay.say(req.url.query));
        res.end();
        return;
      }
      catch (err){
        res.writeHead(404);
        res.write(cowsay.say({text:'bad request\ntry: localhost: 3000/cowsay?text=<message>'}));
      }
      res.end();
    }
  });
});
server.listen(3000, () => {
  console.log('server up on 3000');
});

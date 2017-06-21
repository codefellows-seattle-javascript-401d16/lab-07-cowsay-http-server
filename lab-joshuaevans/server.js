'use strict';

const http = require('http');
const url= require('url');
const querystring = require('querystring');
const cowsay = require('cowsay');

const server = module.exports = {};

server.bodyParse = (req, callback) => {
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

server.server = http.createServer((req, res) => {
  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query);

  server.bodyParse(req, (err, body) => {
    if(err) {
      res.writeHead(500);
      res.end();
      return;
    }


    if (req.url.pathname == '/'){
      res.writeHead(200, {
        'Content-Type': 'text/plain',
      });
      res.write('Hello, World');
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

    if (req.url.pathname == '/cowsay' && req.method == 'GET'){
      if(req.url.query.text){
        res.writeHead(200, {
          'Content-Type': 'text/plain',
        });
        res.write(cowsay.say({text: req.url.query.text}));
        res.end();
        return;
      } else {
        res.writeHead(400, {
          'Content-Type': 'text/plain',
        });
        res.write(cowsay.say({text: `bad request\ntry: localhost:3000/cowsay?text=howdy`}));
      }
      res.end();
      return;
    }



    if (req.url.pathname == '/cowsay' && req.method == 'POST'){
      if(req.body.text){
        const text = req.body.text;
        res.writeHead(200, {
          'Content-Type': 'text/plain',
        });
        res.write(cowsay.say({text}));
        res.end();
        return;
      } else {
        res.writeHead(400, {
          'Content-Type': 'text/plain',
        });
        res.write(cowsay.say({text: `bad request\ntry: localhost:3000/cowsay?text=hhhh`}));
      }
      res.end();
      return;
    }
  });
});

server.server.listen(3000, () => {
  console.log('server is up on port 3000');
});

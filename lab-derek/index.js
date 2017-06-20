'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const cowsay = require('cowsay');

console.log(cowsay.say({text: 'hello', e: 'oO', T: 'U'}));

const bodyParse = (req, callback) => {
  if (req.method === 'POST' || req.method === 'PUT'){
    let body = '';
    req.on('data', (buf) => {
      body += buf.toString();
    });

    req.on('end', () => callback(null, body));
    req.on('error', (err) => callback(err));
  }
  callback(null, {});
};

const server = http.createServer((req, res) => {
  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query);
  bodyParse(req, (err, body) => {
    if(err) {
      res.writeHead(500);
      res.end();
      return;
    }

    if(){

    }

    res.writeHead(404);
    res.end();
  })

});

server.listen(3000, () => {
  console.log('serv\'s up on 3000. Cowabunga.')
})

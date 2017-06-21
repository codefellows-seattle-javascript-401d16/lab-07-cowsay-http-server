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
    // if(){
    //
    // }
    res.writeHead(444);
    res.end();
  });
});
  server.listen(3000, () => {
    console.log('server up :: 3000');
  });

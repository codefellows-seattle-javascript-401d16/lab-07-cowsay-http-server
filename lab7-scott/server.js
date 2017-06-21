'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const cowsay = require('cowsay');

//the callback signature will be a (err, body) which will be used inthe server function.
const bodyParse = (req, callback) => {
  if (req.method === 'POST') {
    let body = '';
    req.on('data', (buffer) => {
      body += buffer.toString();
      console.log(`body pre parse`, body);
    });
    req.on('end', () => callback(null, body));
    req.on('error', (err) => callback(err));
  } else {
    callback(null, '{}');
  }
};

const server = http.createServer((req, res) =>{
  // console.log(`req: `, req);
  // console.log(`requrl: `, req.url);
  // console.log(`requrlpathname: `, req.url.pathname);
  // console.log(`requrlquery: `, req.url.query);
  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query);
  console.log(`requrl parse: `, req.url);
  console.log(`requrlpathname parse: `, req.url.pathname);
  console.log(`requrlquery parse: `, req.url.query);
  bodyParse(req, (err, body) =>{
    if (err) {
      res.writeHead(500);
      res.end();
      return;
    }
    ///////
    try {
      req.body = JSON.parse(body);
    } catch (err) {
      res.writeHead(400);
      res.end();
      return;
    }
    ///////
    if (req.url.pathname === `/`) {
      res.writeHead(200, {
        'Content-Type' : 'text/plain',
      });
      res.write('hello world');
      res.end();
    }
    /////this is where it's not recognizing the query
    if (req.url.pathname === `/cowsay` && req.url.query['text']) {
      if (err) {
        res.writeHead(400);
        res.end();
        return;
      }
      res.writeHead(200, {
        'Content-Type' : 'text/plain',
      });
      res.write(cowsay.say({text: req.url.query['text']}));
      res.end();
    }
  });
});



server.listen(3000, () => console.log(`server up on 3000`));

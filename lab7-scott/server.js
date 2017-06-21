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
      console.log(`body post parse: `, req.body);
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
    /////this is where it recognizing query on a get request
    if (req.url.pathname === `/cowsay` && req.method === `GET` ) {
      if (req.url.query['text']) {
        res.writeHead(200, {
          'Content-Type' : 'text/plain',
        });
        res.write(cowsay.say({text: req.url.query['text']}));
        res.end();
        return;
      } else {
        res.writeHead(400);
        res.write(cowsay.say({text: `bad request\ntry: localhost:3000/cowsay?text=howdy`}));
        res.end();
        return;
      }
    }
    ////this is where it recognizes query on a post request
    if (req.url.pathname === `/cowsay` && req.method === `POST`) {
      if (JSON.stringify(req.body).includes(`text`)) {
        res.writeHead(200, {
          'Content-Type' : 'text/plain',
        });
        res.write(cowsay.say({text: req.url.query['text']}));
        res.end();
        return;
      }
    }
  });
});



server.listen(3000, () => console.log(`server up on 3000`));

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

const server = http.createServer((req, res) => {
  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query);
  console.log('req.url', req.url);
  console.log('req.method', req.method);
  bodyParse(req, (err, body) => {
    if(err) {
      // respond to the user with a 500 server error
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
      res.writeHead(200, {
        'Content-Type' : 'text/plain',
      });
      res.write(typeof req.url.query);
      res.end();
      return;
    }

    if(req.method === 'GET' && req.url.pathname === '/cowsay' && req.url.query.text != undefined){
      res.writeHead(200, {
        'Content-Type' : 'text/plain',
      });
      res.write(cowsay.say({
        // text: JSON.stringify(req.url.query).split(':')[1],
        text: `${req.url.query.text}`,
        e: 'oO',
        T : 'U ',
      }));
      res.end();
      return;
    }

    if(req.method === 'GET' && req.url.pathname === '/cowsay' && req.url.query.text === undefined){
      res.writeHead(400, {
        'Content-Type' : 'test/plain',
      });
      res.write(cowsay.say({
        text: 'bad request\ntry: localhost:3000/cowsay?text=cows+are+cute',
        e: 'oO',
        T: 'U ',
      }));
      res.end();
      return;
    }


    // respond with a 200 status code aw jeah

    // if the pathname is /time and a GET req send back the date

    if(req.method === 'GET' && req.url.pathname === '/time'){
      res.writeHead(200, {
        'Content-Type' : 'application/json',
      });
      res.write(JSON.stringify({
        now: Date.now(),
        date: new Date(),
      }));
      res.end();
      return;
    }

    // if the pathname is /echo and a POST req send back their body as JSON
    if(req.method === 'POST' && req.url.pathname === '/echo'){
      console.log('sweetness echo worked');
      res.writeHead(200, {
        'Content-Type' : 'application/json',
      });
      res.write(JSON.stringify(req.body));
      res.end();
      return;
    }

    // otherwise 404
    res.writeHead(444);
    res.end();
  });

});

server.listen(3000, () => {
  console.log('server up :: 3000');
});

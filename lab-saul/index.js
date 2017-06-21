'use strict';
const http = require('http');
const url = require('url');
const querystring = require('querystring');
const cowsay = require('cowsay');

// callback should be (err, body) => undefined
//move to lib
const bodyParse = (req, callback) => {
  if(req.method === 'POST' || req.method === 'PUT'){
    let body = ''
    req.on('data', (buf) => {
      body += buf.toString();
    });
    req.on('end', () => callback(null, body));
    req.on('error', (err) => callback(err))
  } else {
    callback(null, '{}')
  }
}

const server = http.createServer((req, res) => {
  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query)
  console.log('req.url', req.url);
  console.log('req.method', req.method);
  bodyParse(req, (err, body) => {
    if(err) {
      // resond to the user with a 500 server error
      res.writeHead(500);
      res.end();
      return;
    }

    // parse the body as json
    try {
      req.body = JSON.parse(body)
    } catch (err) {
      // if there was mal formated JSON we send back a 400 bad request
      res.writeHead(400);
      res.end();
      return;
    }

    // respond with a 200 status code and yay

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
      return
    }

    // if the pathname is /echo and a POST req send back their body as json
    if(req.method === 'POST' && req.url.pathname === '/echo'){
      console.log('cooooool');
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.write(JSON.stringify(req.body));
      res.end()
      return;
    }
    /////////////////////////////////////////////////////////
    if(req.method === 'POST') {

    if(req.url.pathname === '/cowsay') {
      // bodyParser(req, function(err) {``
        // if(err) console.error(err);
        let message = cowsay.say({text: req.body.text});
        console.log(req.body);
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write(message);
        res.end();
      // });
    } else {
      let message = cowsay.say(
        {text: 'bad request\ntry localhost:3000/cowsay with a proper body'}
      );
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write(message);
      res.end();
    }
  }

  if(req.method === 'GET') {
    if(req.url.pathname === '/cowsay') {
      if(req.url.query.text){
        let message = cowsay.say({text: req.url.query.text});
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write(message);
        res.end();
      }else{
        res.writeHead(400);
        res.write(cowsay.say({text: 'bad request\ntry: localhost:3000/cowsay?text=howdy'}));
        res.end();
      }
    }else {
      let message = cowsay.say({text: 'bad request\ntry: localhost:3000/cowsay?text=howdy'}
      );
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write(message);
      res.end();
    }
    // if('/') //return 'hello world'
  }
  //////////////////////////////////////////////////////////
    // otherwise 404
    res.writeHead(444);
    res.end();
  });

});

server.listen(3000, () => {
  console.log('server up :: 3000');
});

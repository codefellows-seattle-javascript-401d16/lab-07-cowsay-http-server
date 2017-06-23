'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const cowsay = require('cowsay');

const port = process.env.PORT || 3000;

const bodyParse = (req, callback) => {
  let body = '';
  req.on('data', buf => {
    body += buf.toString();
  });
  req.on('end', () => callback(null, body));
  req.on('error', err => callback(err));
};

const server = http.createServer((req, res) => {
  
  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query);

  if(req.url.pathname === '/') {
    res.writeHead(200, {
      'Content-Type': 'text/plain',
    });
    res.write(cowsay.say({text: 'hello world'}));
    res.end();
    return;
  }

  if(req.url.pathname === '/cowsay') {
    if(req.method === 'GET') {
      if(req.url.query['text']) {
        res.writeHead(200, {
          'Content-Type': 'text/plain',
        });
        res.write(cowsay.say({text: req.url.query['text']}));
        res.end();
        return;
      }
      res.writeHead(400, {
        'Content-Type': 'text/plain',
      });
      res.write(cowsay.say({text: `Bad request\ntry: localhost:${port}/cowsay?text=howdy`}));
      res.end();
      return;
    } else if(req.method === 'POST') {
      bodyParse(req, (err, body) => {
        if(err) {
          res.writeHead(500, {
            'Content-Type': 'text/plain',
          });
          res.write('There was an error with the server.');
          res.end();
          return;
        }

        try {
          req.body = JSON.parse(body);
        } catch(err) {
          res.writeHead(400, {
            'Content-Type': 'text/plain',
          });
          res.write(cowsay.say({text: `There was an issue with the body format.`}));
          res.end();
          return;
        }

        if(req.body['text']) {
          res.writeHead(200, {
            'Content-Type': 'text/plain',
          });
          res.write(cowsay.say({text: req.body['text']}));
          res.end();
          return;
        }

        res.writeHead(400, {
          'Content-Type': 'text/plain',
        });
        res.write(cowsay.say({text: `You need to take a long look at your body...`}));
        res.end();
        return;
      });
    } else {
      res.writeHead(400, {
        'Content-Type': 'text/plain',
      });
      res.write(cowsay.say({text: `Make sure you are using the correct method.`}));
      res.end();
      return;
    }
  } else {
    res.writeHead(404, {
      'Content-Type': 'text/plain',
    });
    res.write(cowsay.say({text: `Uh, naw. Try checking that route again.`}));
    res.end();
    return;
  }
});

server.listen(port, () => {
  console.log(cowsay.say({
    text : `Howdy, the server is now running on localhost:${port}.`,
  }));
});

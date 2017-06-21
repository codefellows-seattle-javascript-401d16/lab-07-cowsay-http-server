'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const port = process.env.PORT || 3000;
const cowsay = require('cowsay');

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
    res.write('hello world');
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
      res.write(cowsay.say({text: `bad request\ntry: localhost:${port}/cowsay?text=howdy`}));
      res.end();
      return;
    }

    if(req.method === 'POST') {
      bodyParse(req, (err, body) => {
        if(err) {
          res.writeHead(500, {
            'Content-Type': 'text/plain',
          });
          res.write('Server error');
          res.end();
          return;
        }

        try {
          req.body = JSON.parse(body);
        } catch(err) {
          res.writeHead(400, {
            'Content-Type': 'text/plain',
          });
          res.write(cowsay.say({text: `Bad request\nMake sure you are using the format {"text": "message"} as your body`}));
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
        res.write(cowsay.say({text: `Bad request\nMake sure you are using the format {"text": "message"} as your body`}));
        res.end();
        return;
      });
    }
  } else {
    res.writeHead(404, {
      'Content-Type': 'text/plain',
    });
    res.write('Route not found');
    res.end();
    return;
  }
});

server.listen(port, () => {
  console.log(`Server is up at localhost:${port}`);
});

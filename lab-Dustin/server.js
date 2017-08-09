'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const cowsay = require('cowsay');

const bodyParse = (req, callback) => {
  req.body = '';
  req.on('data', function(data) {
    req.body += data.toString();
  });

  req.on('end', function() {
    try {
      req.body = JSON.parse(req.body);
      callback(null, req.body);
    } catch (e) {
      callback(e);
    }
  });
};

const server = http.createServer((req, res) => {
  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query);

  if (req.method === 'GET' && req.url.pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end();
  }

  if (
		req.method === 'GET' &&
		req.url.pathname === '/cowsay' &&
		req.url.query.text
	) {
    res.writeHead(200);
    res.write(cowsay.say({ text: req.url.query.text }));
    res.end();
  } else if (
		req.method === 'GET' &&
		req.url.pathname === '/cowsay' &&
		!req.url.query.text
	) {
    res.writeHead(400);
    res.write(
			cowsay.say({
  text: 'bad request\ntry localhost:3000/cowsay?text=howdy',
})
		);
    res.end();
  }

  if (req.method === 'POST' && req.url.pathname === '/cowsay') {
    bodyParse(req, function(err) {
      if (err) return console.error(err);
      if (req.body.text) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write(cowsay.say({ text: req.body.text }));
        res.end();
      } else {
        res.writeHead(400);
        res.write(
					cowsay.say({
  text: 'bad request\ntry: localhost:3000/cowsay?text=howdy',
})
				);
        res.end();
      }
    });
  }
});

server.listen(3000, () => {
  console.log('server up :: 3000');
});

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const bodyParse = require('./lib/body-parse');
const cowsayInvoke = require('./lib/cowsay-invoke');
const headWrite = require('./lib/head-write.js');

module.exports = http.createServer((req, res) => {
  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query);
  const contentType = { 'Content-Type' : 'text/plain' };

  bodyParse(req, (err, body) => {
    if(err) return headWrite(res, 500);

    try { req.body = JSON.parse(body); }

    catch (err) { return headWrite(res, 400); }

    if (req.url.pathname === '/') return headWrite(res, 200, contentType);

    if (req.url.pathname === '/cowsay') return cowsayInvoke(req, res, contentType);

    headWrite(res, 404);
  });

}).listen(8080, () => console.log('server running on port 8080'));

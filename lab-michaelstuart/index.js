const http = require('http');
const url = require('url');
const querystring = require('querystring');
const bodyParse = require('./lib/body-parse');
const makeCowsay = require('./lib/make-cowsay');
const headEnd = require('./lib/head-end.js');

module.exports = http.createServer((req, res) => {
  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query);

  bodyParse(req, (err, body) => {
    if(err) return headEnd(res, 500);

    try { req.body = JSON.parse(body); }

    catch (err) { return headEnd(res, 400); }

    if (req.url.pathname === '/') return headEnd(res, 200, true);

    if (req.url.pathname === '/cowsay') return makeCowsay(req, res);

    headEnd(res, 404);
  });

}).listen(8080, () => console.log('server running on port 8080'));

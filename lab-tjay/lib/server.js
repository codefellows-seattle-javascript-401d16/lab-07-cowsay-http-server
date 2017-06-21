'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const cowsay = require('cowsay');

// const bodyParse = (req, callback) => {
//   if(req.method === 'POST' || req.method === 'PUT'){
//     let body = '';
//     req.on('data', (buf) => {
//       body += buf.toString();
//     });
//     req.on('end', () => callback(null, body));
//     req.on('error', (err) => callback(err));
//   } else {
//     callback(null, '{}');
//   }
// };

const server = http.createServer((req, res) =>{
  req.url = url.parse(req.url);
  console.log('req.url', req.url);
  req.url.query = querystring.parse(req.url.query);

});

server.listen(3000, () => {
  console.log('server up : 3000');
});

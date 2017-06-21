'use strict';

const url = require('url');
const http = require('http');
const querystring = require('querystring');
const cowsay = require('cowsay');
const port = process.env.PORT || 3000;
const bodyParse = (req, callback) => {
  let body = '';
  req.on('data', (buffer) => {
    body += buffer.toString();
  });
  req.on('end', () => callback(null, body));
  req.on('error', err => callback(err));
};

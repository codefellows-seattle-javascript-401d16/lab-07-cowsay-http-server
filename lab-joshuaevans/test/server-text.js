'use strict';

let expect = require('expect');
let http = require('http');
let server = require('../server.js');
let request = require('request');


describe('testing the get request to cowsay', () => {
  it('should return 200', function (done) {
    request.get('http://localhost:3000/', (err, res, body) => {
      expect(res.statusCode).toEqual(400);
      expect(res.body).toEqual('Hello, World');
      done();
    });

    before(function () {
      server.server.listen(3000);
    });
    after(function () {
      server.server.close();
    });
  });
});

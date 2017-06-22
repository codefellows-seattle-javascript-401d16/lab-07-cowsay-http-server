'use strict';

const expect = require('expect');
const request = require('superagent');
const server = require('../lib/server.js');

describe('testing cowsay server', () => {
  before((done) => {
    server.server.listen(3000, () => done());
  });
  after((done) => {
    server.server.close(() => done());
  });
  it('should return \'200: Hello World!\'', (done) => {
    request
      .get('localhost:3000')
      .end(function(err, res){
        if (err) return done(err);
        expect(res.status).toEqual(200);
        expect(res.text).toEqual('Hello World!');
        done();
      });
  });
  it('should return \'404: GET localhost:3000/does-not-exist\'', (done) => {
    request
      .get('localhost:3000/does-not-exist')
      .end(function(err){
        expect(err.response.error.status).toEqual(404);
        expect(err.response.error.method).toEqual('GET');
        expect(err.response.request.url).toEqual('localhost:3000/does-not-exist');
        done();
      });
  });
  it('should return \'200: Hello World!\'', (done) => {
    request
      .post('localhost:3000')
      .end(function(err, res){
        if (err) return done(err);
        expect(res.status).toEqual(200);
        expect(res.text).toEqual('Hello World!');
        done();
      });
  });
  it('should return \'400\'', (done) => {
    request
      .post('localhost:3000/cowsay')
      .end(function(err){
        expect(err.response.error.status).toEqual(400);
        done();
      });
  });
  it('should return \'400\'', (done) => {
    request
      .post('localhost:3000/cowsay')
      .send({text: ''})
      .end(function(err){
        expect(err.response.error.status).toEqual(400);
        done();
      });
  });
  it('should return \'200\'', (done) => {
    request
      .post('localhost:3000/cowsay')
      .send({text: 'hello'})
      .end(function(err, res){
        if (err) return done(err);
        expect(res.status).toEqual(200);
        done();
      });
  });
});

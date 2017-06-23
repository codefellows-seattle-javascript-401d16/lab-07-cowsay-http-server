'use strict';

const superagent = require('superagent');
const expect = require('expect');
const server = require('../server.js');

describe('testing paths', () => {
  before((done) => {
    server.listen(3000, () => done());
  });
  after((done) => {
    server.close(() => done());
  });

  describe('testing /', () => {
    // It will never error because we always finish bodyParse with {}
    it('should respond with a GET 200', (done) => {
      superagent.get('localhost:3000/')
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).toEqual(200);
          expect(res.text).toEqual(' _____________\n< hello world >\n -------------\n        \\   ^__^\n         \\  (oo)\\_______\n            (__)\\       )\\/\\\n                ||----w |\n                ||     ||');
          done();
        });
    });
    it('should respond with a POST 200', (done) => {
      superagent.post('localhost:3000/')
        .send({})
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(res.text).toEqual(' _____________\n< hello world >\n -------------\n        \\   ^__^\n         \\  (oo)\\_______\n            (__)\\       )\\/\\\n                ||----w |\n                ||     ||');
          done();
        });
    });
  });

  describe('testing GET /cowsay', () => {
    it('should respond with a GET 200 and a cowsay response', (done) => {
      superagent.get('localhost:3000/cowsay?text=potato')
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).toEqual(200);
          expect(res.text).toEqual(' ________\n< potato >\n --------\n        \\   ^__^\n         \\  (oo)\\_______\n            (__)\\       )\\/\\\n                ||----w |\n                ||     ||');
          done();
        });
    });
    it('should respond with a GET 400 and way to properly request', (done) => {
      superagent.get('localhost:3000/cowsay')
        .end((err, res) => {
          expect(res.status).toEqual(400);
          expect(res.text).toEqual(' _______________________________________\n/ bad request                           \\\n\\ try: localhost:3000/cowsay?text=howdy /\n ---------------------------------------\n        \\   ^__^\n         \\  (oo)\\_______\n            (__)\\       )\\/\\\n                ||----w |\n                ||     ||');
          done();
        });
    });
  });

  describe('testing POST /cowsay', () => {
    it('should respond with a POST and cowsay response', (done) => {
      superagent.post('localhost:3000/cowsay')
        .send({text: 'hello cow'})
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).toEqual(200);
          expect(res.text).toEqual(' ___________\n< hello cow >\n -----------\n        \\   ^__^\n         \\  (oo)\\_______\n            (__)\\       )\\/\\\n                ||----w |\n                ||     ||');
          done();
        });
    });
    it('should respond with a POST 400 and the way to properly request', (done) => {
      superagent.post('localhost:3000/cowsay')
        .send({})
        .end((err, res) => {
          expect(res.status).toEqual(400);
          expect(res.text).toEqual(' _______________________________________________________\n/ bad request                                           \\\n\\ try: localhost:3000/cowsay with body {text : \'howdy\'} /\n -------------------------------------------------------\n        \\   ^__^\n         \\  (oo)\\_______\n            (__)\\       )\\/\\\n                ||----w |\n                ||     ||');
          done();
        });
    });
  });

  describe('bad request /potato', () => {
    it('should respond with a GET 404', (done) => {
      superagent.get('localhost:3000/potato')
        .end((err, res) => {
          expect(res.status).toEqual(404);
          done();
        });
    });
  });

});

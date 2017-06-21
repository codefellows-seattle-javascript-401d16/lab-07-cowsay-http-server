'use strict';

require('../server.js');
const superagent = require('superagent');
const port = process.env.PORT || 3000;
const expect = require('expect');

describe('HTTP Requests', () => {
  describe('/', () => {
    describe('GET', () => {
      it('Should respond 200 \'hello world\'', done => {
        superagent
        .get(`localhost:${port}/`)
        .set('Accept', 'text/plain')
        .end((err, res) => {
          expect(err).toNotExist();
          if(err) done(err);
          expect(res.status).toEqual(200);
          expect(res.text).toContain('hello world');
          done();
        });
      });
    });
    describe('POST', () => {
      it('Should respond 200 \'hello world\'', done => {
        superagent
        .post(`localhost:${port}/`)
        .send({ test: 'test', test2: 'test' })
        .set('Accept', 'text/plain')
        .end((err, res) => {
          expect(err).toNotExist();
          if(err) done(err);
          expect(res.status).toEqual(200);
          expect(res.text).toContain('hello world');
          done();
        });
      });
    });
  });
  describe('/cowsay', () => {
    describe('GET', () => {
      it('Should respond 200 \'yoyoyo\'', done => {
        superagent
        .get(`localhost:${port}/cowsay?text=yoyoyo`)
        .set('Accept', 'text/plain')
        .end((err, res) => {
          expect(err).toNotExist();
          if(err) done(err);
          expect(res.status).toEqual(200);
          expect(res.text).toContain('yoyoyo');
          done();
        });
      });
      it('Should respond 400 and include \'Bad request\'', done => {
        superagent
        .get(`localhost:${port}/cowsay?texasfdsat=yoyoyo`)
        .set('Accept', 'text/plain')
        .end((err, res) => {
          expect(err).toExist();
          expect(res.status).toEqual(400);
          expect(res.text).toContain('Bad request');
          done();
        });
      });
    });
    describe('POST', () => {
      it('Should respond 200 \'yoyoyo\'', done => {
        superagent
        .post(`localhost:${port}/cowsay`)
        .send({ text: 'yoyoyo' })
        .set('Accept', 'text/plain')
        .end((err, res) => {
          expect(err).toNotExist();
          if(err) done(err);
          expect(res.status).toEqual(200);
          expect(res.text).toContain('yoyoyo');
          done();
        });
      });
      it('Should respond 400 and include \'Bad request\'', done => {
        superagent
        .post(`localhost:${port}/cowsay`)
        .send({ yoooooo: 'yoyoyo' })
        .set('Accept', 'text/plain')
        .end((err, res) => {
          expect(err).toExist();
          expect(res.status).toEqual(400);
          expect(res.text).toContain('Bad request');
          done();
        });
      });
    });
    describe('PUT', () => {
      it('Should respond 400 and include \'Bad request, invalid request type\'', done => {
        superagent
        .put(`localhost:${port}/cowsay`)
        .send({ text: 'yoyoyo' })
        .set('Accept', 'text/plain')
        .end((err, res) => {
          expect(err).toExist();
          expect(res.status).toEqual(400);
          expect(res.text).toContain('This route does not accept that type of request');
          done();
        });
      });
    });
  });
  describe('Non-existent route', () => {
    describe('GET', () => {
      it('Should respond 404 and include \'Route not found\'', done => {
        superagent
        .get(`localhost:${port}/kasljflaksf`)
        .set('Accept', 'text/plain')
        .end((err, res) => {
          expect(err).toExist();
          expect(res.status).toEqual(404);
          expect(res.text).toContain('Route not found');
          done();
        });
      });
    });
  });
});

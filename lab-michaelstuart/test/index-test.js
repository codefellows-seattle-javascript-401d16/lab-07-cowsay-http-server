const expect = require('expect');
const request = require('request');
const server = require('../index.js');

describe('server response', () => {
  before(() => server.listen(8080));
  it('should return status code 200', done => {
    request.get('http://localhost:8080/', (err, res) => {
      expect(res.statusCode).toEqual(200);
      done();
    });
  });
  it('should return hello world', done => {
    request.get('http://localhost:8080/', (err, res) => {
      expect(res.body).toEqual('hello world');
      done();
    });
  });
  after(() => server.close());
});

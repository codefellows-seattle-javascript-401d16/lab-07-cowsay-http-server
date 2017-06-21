const headWrite = require('./head-write');

module.exports = (req, res, contentType) => {
  let text = req.method === 'GET' ? req.url.query.text : req.body.text;
  let code = 200;

  if (!text) {
    text = 'bad request\ntry: localhost:3000/cowsay?text=howdy';
    code = 400;
  }

  headWrite(res, code, contentType, text);
};

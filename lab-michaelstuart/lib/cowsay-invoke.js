const headWrite = require('./head-write');

module.exports = (req, res, contentType, code = 200) => {
  let text = req.method === 'GET' ? req.url.query.text : req.body.text;

  if (!text) {
    text = 'bad request\ntry: localhost:3000/cowsay?text=howdy';
    code = code < 400 ? 400 : code;
  }

  headWrite(res, code, contentType, text);
};

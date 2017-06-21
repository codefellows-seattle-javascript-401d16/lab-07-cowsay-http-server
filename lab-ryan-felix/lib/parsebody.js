module.exports = (req, callback) => {
  if(req.method === 'PUT' || req.method === 'POST') {
    let body = '';
    req.on('data', (buffer) => {
      body += buffer.toString();
    });
    req.on('end', () => {
      callback(null, body);
    });
    req.on('error', (err) => {
      callback(err);
    });
  } else {
    callback(null, JSON.stringify({}));
  }
}

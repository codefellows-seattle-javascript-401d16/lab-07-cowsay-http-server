module.exports = (res, code, option) => {
  const args = [code];

  option && args.push({ 'Content-Type' : 'text/plain' });

  res.writeHead(...args);

  option && res.write('hello world');

  res.end();
};

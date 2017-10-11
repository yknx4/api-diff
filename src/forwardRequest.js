const http = require('http');

module.exports = (fullhost, req, res, { forward = false }) =>
  new Promise((resolve, reject) => {
    const { method, url: path, headers } = req;
    const [hostname, port] = fullhost.split(':');
    const opt = {
      method,
      path,
      headers,
      hostname,
      port
    };

    const request = http.request(opt, response => {
      let data = '';
      if (forward) {
        res.set(response.headers);
        res.status(response.statusCode);
      }

      response.on('data', chunk => {
        data += chunk;
        if (forward) {
          res.write(chunk);
        }
      });
      response.on('end', () => {
        try {
          const b = JSON.parse(data);
          resolve({ headers: response.headers, body: b });
        } catch (error) {
          resolve(null);
        }
        if (forward) {
          res.end();
        }
      });
    });
    req.on('error', e => {
      reject(e);
    });
    if (req.body) {
      request.write(JSON.stringify(req.body));
    }
    request.end();
  });

import request from 'request';

export default (url, req, res, forward) =>
  new Promise((resolve, reject) => {
    const { method, headers } = req;
    request(
      {
        method,
        headers,
        url
      },
      (error, response) => {
        if (forward) {
          res.set(response.headers);
          res.status(response.statusCode);
          res.send(response.body);
        }
        if (error) {
          return reject(error);
        }
        let { body: rBody } = response;
        if (
          response.headers['content-type'].indexOf('application/json;') !== -1
        ) {
          rBody = JSON.parse(rBody);
        }
        return resolve({
          headers: Object.assign(response.headers, {
            statusCode: response.statusCode
          }),
          body: rBody
        });
      }
    );
  });

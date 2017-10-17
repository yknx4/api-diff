import request from 'request-promise-native';

export default (uri, req, res, forward) => {
  const { method, headers } = req;
  return request({
    method,
    headers,
    uri,
    resolveWithFullResponse: true
  })
    .then(response => {
      if (forward) {
        res.set(response.headers);
        res.status(response.statusCode);
        res.send(response.body);
      }
      let { body: rBody } = response;
      if (
        response.headers['content-type'].indexOf('application/json;') !== -1
      ) {
        rBody = JSON.parse(rBody);
      }
      return {
        headers: Object.assign(response.headers, {
          statusCode: response.statusCode
        }),
        body: rBody
      };
    })
    .catch(error => error);
};

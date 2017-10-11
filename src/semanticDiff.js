const { pickBy, omit } = require('lodash');
const { diff } = require('json-diff');

module.exports = function semanticDiff(production, noise, preproduction) {
  const bodyNoiseKeys = [];
  const headersNoiseKeys = [];
  const withoutNoise = {
    headers: pickBy(production.headers, (value, key) => {
      const notNoise = noise.headers[key] === value;
      if (!notNoise) {
        headersNoiseKeys.push(key);
      }
      return notNoise;
    }),
    body: pickBy(production.body, (value, key) => {
      const notNoise = noise.body[key] === value;
      if (!notNoise) {
        bodyNoiseKeys.push(key);
      }
      return notNoise;
    })
  };
  const preWithoutNoise = {
    headers: omit(preproduction.headers, headersNoiseKeys),
    body: omit(preproduction.body, bodyNoiseKeys)
  };
  return diff(withoutNoise, preWithoutNoise);
};

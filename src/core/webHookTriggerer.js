import request from 'request-promise-native';

const webHookTriggerer = ({
  primaryResponse,
  candidateResponse,
  diff,
  req: { query, params, headers, originalUrl }
}) => {
  const opts = {
    uri: config.WEBHOOK_URL,
    method: 'POST',
    data: {
      primaryResponse,
      candidateResponse,
      diff,
      originalRequest: {
        query,
        params,
        headers,
        originalUrl
      }
    },
    json: true
  };
  return request(opts)
    .then(() => 'webhook sent')
    .catch(error => error);
};

export default webHookTriggerer;

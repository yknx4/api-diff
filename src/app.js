const express = require('express');
const bodyParser = require('body-parser');
const forwardRequest = require('./forwardRequest');
const semanticDiff = require('./semanticDiff');

logger.info('App Started');
const hosts = [
  ['127.0.0.1:1234', { forward: true }],
  ['127.0.0.1:1235', { forward: false }],
  ['127.0.0.1:1236', { forward: false }]
];

const diff = express();
diff.use(bodyParser.raw({ limit: '5mb' }));

diff.get('*', async (req, res) => {
  const responses = hosts.map(async h => {
    const [host, opts] = h;
    return forwardRequest(host, req, res, opts);
  });
  const realResponses = await Promise.all(responses);
  console.log(semanticDiff(...realResponses));
});

diff.listen(8000, () => {
  logger.debug('Example app listening on port 8000!');
});

const app = express();

app.get('/', (req, res) => {
  res.header('holy', 'holo');
  res.status(201);
  res.json({ hello: 'world' });
});

app.listen(1234, () => {
  logger.debug('Example app listening on port 3000!');
});

const app2 = express();

app2.get('/', (req, res) => {
  res.json({ hello: 'world' });
});

app2.listen(1235, () => {
  logger.debug('Example app listening on port 3000!');
});

const app3 = express();

app3.get('/', (req, res) => {
  res.header('anuma', 'sicierto');
  res.json({ hello: 'world1', simon: 'ajua' });
});

app3.listen(1236, () => {
  logger.debug('Example app listening on port 3000!');
});
export default true;

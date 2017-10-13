import express from 'express';
import bodyParser from 'body-parser';
import forwardRequest from './core/forwardRequest';
import semanticDiff from './core/semanticDiff';
import brain from './core/fishBrain';
import './admin-server';

logger.info('App Started');

const diff = express();
diff.use(bodyParser.raw({ limit: '5mb' }));

diff.get('*', async (req, res) => {
  const { url, method } = req;
  const responses = config.testHosts.map(async (host, k) =>
    forwardRequest(`${host}${url}`, req, res, k === 0)
  );
  const realResponses = await Promise.all(responses);
  const sDiff = await semanticDiff(...realResponses);
  brain.set(sDiff, { url, method });
});

diff.listen(config.PROXY_PORT, () => {
  logger.info(`Proxy app listening on port ${config.PROXY_PORT}!`);
});

export default true;

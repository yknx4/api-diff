import express from 'express';
import { middleware as stylus } from 'stylus';
import brain from '../core/fishBrain';

const app = express();
app.set('view engine', 'pug');
app.set('views', `${__dirname}/views`);
app.use(stylus({ src: `${__dirname}/assets`, compress: true }));
app.use(express.static(`${__dirname}/assets`));

app.get('/', (req, res) => {
  res.render('./index.pug');
});

app.get('/data.json', (req, res) => {
  res.json(brain.get());
});

app.listen(config.ADMIN_PORT, () => {
  logger.info(`Admin app listening on port ${config.ADMIN_PORT}!`);
});

export default true;

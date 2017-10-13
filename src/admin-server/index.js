import express from 'express';
import { middleware as stylus } from 'stylus';
import babel from 'express-babel';
import brain from '../core/fishBrain';

const app = express();
app.set('view engine', 'pug');
app.set('views', `${__dirname}/views`);
app.use(
  '/scripts/scripts',
  babel(`${__dirname}/assets`, {
    presets: ['es2015']
  })
);
app.use(stylus({ src: `${__dirname}/assets`, compress: true }));
app.use(express.static(`${__dirname}/assets`));

const authGateway = (req, res, next) => {
  const [login, password] = config.SECRET.split(':');
  const auth = { login, password };
  const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
  const [lgn, pswd] = Buffer.from(b64auth, 'base64')
    .toString()
    .split(':');

  if (!lgn || !pswd || lgn !== auth.login || pswd !== auth.password) {
    res.set('WWW-Authenticate', 'Basic realm="Ricklantis"');
    res.status(401).render('./unauthorized.pug');
    return;
  }
  next();
};

app.get('/', (req, res) => {
  res.render('./index.pug');
});

app.use(authGateway);

app.get('/admin', (req, res) => {
  res.render('./admin.pug');
});

app.get('/data.json', (req, res) => {
  res.json(brain.get(parseInt(req.query.page, 10)));
});

app.listen(config.ADMIN_PORT, () => {
  logger.info(`Admin app listening on port ${config.ADMIN_PORT}!`);
});

export default true;

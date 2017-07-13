import express from 'express';
import morgan from 'morgan';
import path from 'path';
import bodyParser from 'body-parser';

import config from '../config';
import routes from './routes';

const app = express();

let isDevelopment = config.env === 'development';

if(isDevelopment) {
  app.set('views', path.join(__dirname, '..', '..', 'views'));
  app.set('view engine', 'pug');
}

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);

app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  let error = {
    message: err.message,
    status: err.status || 500,
  };

  res.status(error.status);

  if(isDevelopment) {
    res.locals.message = error.message;
    res.locals.error = err;
    res.render('error');
  } else {
    res.send({ error });
  }
});

export default app;

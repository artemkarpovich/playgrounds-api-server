import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import passport from 'passport';
import expressSession from 'express-session';
import Promise from 'bluebird';
import cors from 'cors';
import morgan from 'morgan';
import config from './config';
import routes from './routes';
import passportStrategy from './middlewares/passport';

const app = express();

mongoose.Promise = Promise;
mongoose.connect(config.database);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use(morgan('dev'));

app.use(expressSession({
  secret: 'mySecretKey',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

passportStrategy(passport);

app.use('/api/v1', routes);

app.listen(config.port, () => {
  console.log('server is running on port: ', config.port);
});

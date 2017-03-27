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
import errorHandler from './middlewares/errorHandler';

const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);

mongoose.Promise = Promise;
mongoose.connect(config.database);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

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
app.use(errorHandler);

io.on('connection', (socket) => {
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  socket.on('disconnect', () => {
    console.log('a user disconnected');
  });
});

http.listen(config.port, () => {
  console.log('server is running on port: ', config.port);
});

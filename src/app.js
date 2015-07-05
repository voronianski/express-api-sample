import http from 'http';
import path from 'path';
import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { host, port, env } from 'c0nfig';

import apiFirstVersion from './v1';
import * as middleware from './middleware';

const app = express();

if ('test' !== env) {
    app.use(logger('dev'));
}

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/doc', express.static(path.join(__dirname, '../doc/v1')));
app.use('/v1', apiFirstVersion());
app.use(middleware.handleNotFound);
app.use(middleware.handleErrors);

http.createServer(app).listen(port, () => {
    console.log(`Example API is listening on http://${host}:${port} env=${env}`);
});

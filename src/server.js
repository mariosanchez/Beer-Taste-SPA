/* eslint no-console: "off"*/

import path from 'path';
import { Server } from 'http';
import Express from 'express';
import React from 'react';
import redis from 'redis';
import { renderToString } from 'react-dom/server';
import { StaticRouter as Router } from 'react-router-dom';
import { App } from './components/App';
import { Logged } from './components/Logged';
import auth from './auth';
import config from './config/config';

const app = new Express();
const server = new Server(app);
const redisClient = new redis.createClient(config.redis.port, config.redis.host);

redisClient.on('error', (err) => {
  console.log(`REDIS CONNECTION ERROR: ${err}`);
  process.exit(1);
});

redisClient.auth(config.redis.auth);
redisClient.select(config.redis.db);

// use ejs templates
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// define the folder that will be used for static assets
app.use(Express.static(path.join(__dirname, 'static')));

app.get('/check/:id', (req, res) => {
  const phpSessionId = req.params.id;
  auth.isAuthenticated({
    cookie: req.headers.cookie,
    phpSessionId,
    redisClient,
  }).then((result) => {
    console.log(result);
    res.send(JSON.stringify({ html: renderToString(<Logged {...result} />) }));
  }).catch((err) => {
    console.log(err);
    res.send(JSON.stringify({ html: renderToString(<Logged {...err} />) }));
  });
});

// universal routing and rendering
app.get('*', (req, res) => {
  let markup = '';
  let status = 200;

  if (process.env.UNIVERSAL) {
    const context = {};
    markup = renderToString(
      <Router location={req.url} context={context}>
        <App />
      </Router>,
    );

    // context.url will contain the URL to redirect to if a <Redirect> was used
    if (context.url) {
      return res.redirect(302, context.url);
    }

    if (context.is404) {
      status = 404;
    }
  }

  return res.status(status).render('index', { markup });
});

// start the server
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';
server.listen(port, (err) => {
  if (err) {
    return console.error(err);
  }
  return console.info(
    `
      Server running on http://localhost:${port} [${env}]
      Universal rendering: ${process.env.UNIVERSAL ? 'enabled' : 'disabled'}
    `);
});

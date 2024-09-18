import express from 'express';
import bodyParser from 'body-parser';
import { addRouteHandler, subtractRouteHandler } from './lib.js';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));

// Required routes
app.post('/add', addRouteHandler);
app.post('/subtract', subtractRouteHandler);

// Handles not found routes
app.use('*', (req, res) => {
  res.status(404).send({
    message: 'Page not found'
  });
});

export default app;
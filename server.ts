import { Database } from './Database';
import { ObjectID } from 'bson';
import * as express from 'express';
import bodyParser = require('body-parser');
import * as winston from 'winston';

require('dotenv').config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${
  process.env.DB_HOST
}`;
const database = new Database(uri);
database.connect();

const app = express();
app.use(bodyParser.json());

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: './log/console.log' })
  ]
});

//allow CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

//get all cars in db
app.get('/cars', (req, res) => {
  if (database.connected) {
    logger.info(`GET at /cars called.`);
    database
      .fetchAll('cars')
      .then(response => {
        logger.info('Cars loaded from DB successfull.');
        logger.debug(response);
        res.json(response);
      })
      .catch(error => {
        logger.error(error);
        res.status(500).send(error);
      });
  } else {
    logger.error('Database not connected yet.');
    res.status(500).send('Database not connected yet.');
  }
});

//get specific car by id
app.get('/cars/:id', (req, res) => {
  if (database.connected) {
    logger.info(`GET at /cars/${req.params.id} called.`);
    database
      .fetch('cars', { _id: new ObjectID(req.params.id) })
      .then(response => {
        logger.info('Car loaded from DB successfull.');
        logger.debug(response);
        res.json(response);
      })
      .catch(error => {
        logger.error(error);
        res.status(400).send(error);
      });
  } else {
    logger.error('Database not connected yet.');
    res.status(500).send('Database not connected yet.');
  }
});

//create new car
app.post('/cars', (req, res) => {
  if (database.connected) {
    logger.info('POST at /cars called. Creating new car.');
    //delete _id
    if (req.body._id) delete req.body._id;
    //parse date/time obj
    if (req.body.time) req.body.time = new Date(req.body.time);
    logger.info(req.body);

    database
      .insert('cars', req.body)
      .then(response => {
        logger.info('Car successfull created.');
        logger.debug(response);
        res.json(response);
      })
      .catch(error => {
        logger.error(error);
        res.status(400).send(error);
      });
  } else {
    logger.error('Database not connected yet.');
    res.status(500).send('Database not connected yet.');
  }
});

//update a car
app.put('/cars/:id', (req, res) => {
  if (database.connected) {
    logger.info(`PUT at /cars/${req.params.id} called. Updating existing car.`);
    //delete _id
    if (req.body._id) delete req.body._id;
    //parse date/time obj
    if (req.body.time) req.body.time = new Date(req.body.time);
    logger.info(req.body);

    database
      .updateById('cars', req.params.id, req.body)
      .then(response => {
        logger.info('Car successfull updated.');
        logger.debug(response);
        res.json(response);
      })
      .catch(error => {
        logger.error(error);
        res.status(400).send(error);
      });
  } else {
    logger.error('Database not connected yet.');
    res.status(500).send('Database not connected yet.');
  }
});

//deletes a car
app.delete('/cars/:id', (req, res) => {
  if (database.connected) {
    logger.info(`DELETE at /cars/${req.params.id} called. Deleting car.`);
    database
      .deleteById('cars', req.params.id)
      .then(response => {
        logger.info('Car successfull deleted.');
        logger.debug(response);
        res.json(response);
      })
      .catch(error => {
        logger.error(error);
        res.status(400).send(error);
      });
  } else {
    logger.error('Database not connected yet.');
    res.status(500).send('Database not connected yet.');
  }
});

app.listen(3000);

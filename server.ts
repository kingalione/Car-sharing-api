import { Database } from './Database';
import { ObjectID } from 'bson';
import * as express from 'express';
import bodyParser = require('body-parser');

require('dotenv').config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${
  process.env.DB_HOST
}`;
const database = new Database(uri);
database.connect();

const app = express();
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.get('/cars', (req, res) => {
  let result: object[] = [];

  if (database.connected) {
    database
      .fetchAll('cars')
      .then(response => {
        res.json(response);
      })
      .catch(error => {
        console.log(error);
        res.status(500).send(error);
      });
  } else {
    res.status(500).send('Database not connected yet.');
  }
});

app.get('/cars/:id', (req, res) => {
  if (database.connected) {
    database
      .fetch('cars', { _id: new ObjectID(req.params.id) })
      .then(response => {
        res.json(response);
      })
      .catch(error => {
        console.log(error);
        res.status(400).send(error);
      });
  } else {
    res.status(500).send('Database not connected yet.');
  }
});

//create new car
app.post('/cars', (req, res) => {
  if (database.connected) {
    database
      .insert('cars', req.body)
      .then(response => {
        res.json(response);
      })
      .catch(error => {
        console.log(error);
        res.status(400).send(error);
      });
  } else {
    res.status(500).send('Database not connected yet.');
  }
});

//update a car
app.put('/cars/:id', (req, res) => {
  if (database.connected) {
    database
      .updateById('cars', req.params.id, req.body)
      .then(response => {
        res.json(response);
      })
      .catch(error => {
        console.log(error);
        res.status(400).send(error);
      });
  } else {
    res.status(500).send('Database not connected yet.');
  }
});

//deletes a car
app.delete('/cars/:id', (req, res) => {
  if (database.connected) {
    database
      .deleteById('cars', req.params.id)
      .then(response => {
        res.json(response);
      })
      .catch(error => {
        console.log(error);
        res.status(400).send(error);
      });
  } else {
    res.status(500).send('Database not connected yet.');
  }
});

app.listen(3000);

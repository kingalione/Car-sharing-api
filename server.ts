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

app.get('/cars', (req, res) => {
  let result: object[] = [];

  if (database.connected) {
    database
      .fetchAll('cars')
      .then((cars: object[]) => {
        result = cars;
        res.json(result);
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
  let result: object[] = [];

  if (database.connected) {
    database
      .fetch('cars', { _id: new ObjectID(req.params.id) })
      .then(car => {
        result = car;
        res.json(result);
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
      .then(() => {
        res.send();
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
  let result: object[] = [];

  if (database.connected) {
    database
      .updateById('cars', req.params.id, req.body)
      .then(car => {
        result = car;
        res.json(result);
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

import { Database } from './Database';
import { ObjectID } from 'bson';
import * as express from 'express';

require('dotenv').config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${
  process.env.DB_HOST
}`;

const database = new Database(uri);
database.connect();

database
  .connect()
  .then(() => {
    database
      .insert('cars', {
        name: 'Koloss',
        count: -1,
        time: new Date()
      })
      .catch((error: any) => {
        //console.log(error);
      });
  })
  .catch((error: any) => {
    //console.log(error);
  });

//-------------//
//-------------//
//-------------//
//-------------//
//-------------//

const app = express();

app.get('/cars', function(req, res) {
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
        res.send(error);
      });
  } else {
    res.send('Database not connected yet.');
  }
});

app.get('/cars/:id', function(req, res) {
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
        res.send(error);
      });
  } else {
    res.send('Database not connected yet.');
  }
});

app.listen(3000);

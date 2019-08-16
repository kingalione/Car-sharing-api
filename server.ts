import { DBConnector } from './DBConnector';
import * as express from 'express';

require('dotenv').config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${
  process.env.DB_HOST
}`;

const dbConnector = new DBConnector(uri);
dbConnector.connect();

dbConnector
  .connect()
  .then(() => {
    dbConnector
      .insert('cars', {
        name: 'Koloss',
        count: -1,
        time: new Date()
      })
      .catch(error => {
        //console.log(error);
      });
  })
  .catch(error => {
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

  if (dbConnector.connected) {
    dbConnector
      .fetchAll('cars')
      .then(cars => {
        result = cars;
        res.json(result);
      })
      .catch(error => {
        console.log(error);
      });
  } else {
    res.send('Database not connected yet.');
  }
});

app.listen(3000);

import { DBConnector } from './DBConnector';
require('dotenv').config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${
  process.env.DB_HOST
}`;

const dbConnector = new DBConnector(uri);

dbConnector
  .connect()
  .then(() => {
    dbConnector
      .fetchAll('cars')
      .then(cars => {
        console.log(cars);
      })
      .catch(error => {
        console.log(error);
      });

    dbConnector
      .insert('cars', {
        name: 'Koloss',
        count: -1,
        time: new Date()
      })
      .catch(error => {
        console.log(error);
      });
  })
  .catch(error => {
    console.log(error);
  });

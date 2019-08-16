import { DBConnector } from './DBConnector';

const uri = 'mongodb+srv://e-go:password4e-go@e-go-project-edbkz.mongodb.net';

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

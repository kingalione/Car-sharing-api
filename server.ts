import { DBConnector } from './DBConnector';

const uri = 'mongodb+srv://e-go:password4e-go@e-go-project-edbkz.mongodb.net';

const dbConnector = new DBConnector(uri);
dbConnector.connect().then(() => {
  dbConnector.fetchAll('cars').then(cars => {
    console.log(cars);
  });

  dbConnector.insert('cars', {
    name: 'Magnus',
    count: 123,
    time: new Date()
  });
});

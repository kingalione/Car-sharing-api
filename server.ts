import { DBConnector } from './DBConnector';

const uri = 'mongodb+srv://e-go:password4e-go@e-go-project-edbkz.mongodb.net';

const dbConnector = new DBConnector(uri);
dbConnector.connect().then(() => {
  dbConnector.fetch('cars', { name: 'Titan' }).then(cars => {
    console.log(cars);
  });
});

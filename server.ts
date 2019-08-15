import { MongoClient } from 'mongodb';

const uri =
  'mongodb+srv://e-go:password4e-go@e-go-project-edbkz.mongodb.net/E-Go-Project?retryWrites=true&w=majority';

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

client.connect((err, db) => {
  if (err) throw err;
  var dbo = db.db('e-go_project');
  var query = { name: 'Titan' };

  dbo
    .collection('cars')
    .find(query)
    .toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
    });
});

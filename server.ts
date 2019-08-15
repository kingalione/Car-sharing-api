import { MongoClient } from 'mongodb';

const uri: string =
  'mongodb+srv://e-go:password4e-go@e-go-project-edbkz.mongodb.net/test?retryWrites=true&w=majority';

const client: MongoClient = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

client.connect(err => {
  if (err) {
    console.log(err);
    return;
  }

  const collection = client.db('test').collection('devices');
  console.log(collection);

  client.close();
});

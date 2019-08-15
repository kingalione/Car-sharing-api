import { MongoClient, Db } from 'mongodb';

class DBConnector {
  client: MongoClient;
  databaseObject: Db;

  constructor(uri: string) {
    this.client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }

  //connect to database and project
  connect(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client.connect((err, db) => {
        if (err) reject(err);
        this.databaseObject = db.db('e-go_project');
        resolve(this.databaseObject);
      });
    });
  }

  //fetch data from specific collection for a query
  fetch(from: string, query: object) {
    return new Promise((resolve, reject) => {
      this.databaseObject
        .collection(from)
        .find(query)
        .toArray(function(err, result) {
          if (err) reject(err);
          resolve(result);
        });
    });
  }

  close(): void {
    this.client.close();
  }
}

export { DBConnector };

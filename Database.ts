import { MongoClient, Db } from 'mongodb';

class Database {
  connected: boolean;
  client: MongoClient;
  databaseObject: Db;

  constructor(uri: string) {
    this.connected = false;
    this.client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }

  //connect to database and project
  connect(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client.connect((err, db) => {
        if (err) {
          this.connected = false;
          reject(err);
        } else {
          this.connected = true;
          this.databaseObject = db.db('e-go_project');
          resolve(this.databaseObject);
        }
      });
    });
  }

  //fetch data from specific collection for a query
  fetch(from: string, query: object): Promise<any> {
    return new Promise((resolve, reject) => {
      this.databaseObject
        .collection(from)
        .find(query)
        .toArray((err, result) => {
          if (err) reject(err);
          else resolve(result);
        });
    });
  }

  //fetch all data from specific collection
  fetchAll(from: string): Promise<any> {
    return this.fetch(from, {});
  }

  //insert a single document to specific collection
  insert(into: string, obj: object): Promise<any> {
    return new Promise((resolve, reject) => {
      this.databaseObject.collection(into).insertOne(obj, (err, res) => {
        if (err) reject(err);
        else {
          resolve();
        }
      });
    });
  }

  close(): void {
    this.client.close();
    this.connected = false;
  }
}

export { Database };
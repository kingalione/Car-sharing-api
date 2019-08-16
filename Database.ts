import { MongoClient, Db, ObjectID } from 'mongodb';

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

  //updates a single document by its id
  updateById(inside: string, id: string, update: object): Promise<any> {
    return new Promise((resolve, reject) => {
      this.databaseObject
        .collection(inside)
        .updateOne({ _id: new ObjectID(id) }, { $set: update }, (err, res) => {
          if (err) reject(err);
          else {
            //double check if any update happend because if the id does not exists
            //there will be no error thrown by mongodb
            if (res.result.n === 1) resolve(res);
            else
              reject(
                `Update for id: ${id} could not get accomplished. Maybe the id is not existing.`
              );
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

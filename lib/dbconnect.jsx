import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://Nidinbose999:tS%BUa5ER5xNanS@cluster0.xatjanb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const options = {};

let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, options);
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export default clientPromise;

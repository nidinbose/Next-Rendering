import clientPromise from './dbconnect';

(async () => {
  const client = await clientPromise;
  const db = client.db('Assignment');
  const collections = await db.listCollections().toArray();
  console.log('Collections:', collections);
})();

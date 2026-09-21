import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {};

let clientPromise: Promise<MongoClient>;

function createClientPromise(): Promise<MongoClient> {
  if (!uri) {
    return Promise.reject(new Error('Missing environment variable: "MONGODB_URI"'));
  }
  try {
    const client = new MongoClient(uri, options);
    return client.connect();
  } catch (err) {
    return Promise.reject(err);
  }
}

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    globalWithMongo._mongoClientPromise = createClientPromise();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  clientPromise = createClientPromise();
}

// Export a module-cached promise. By doing this in a separate module,
// we can use the client in both `getServerSideProps` and API routes.
export default clientPromise;

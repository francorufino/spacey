import { MongoClient, ServerApiVersion } from "mongodb";

let clientPromise;

const getClientPromise = () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    return null;
  }

  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      const client = new MongoClient(uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true
        }
      });

      global._mongoClientPromise = client.connect();
    }

    clientPromise = global._mongoClientPromise;
  } else {
    if (!clientPromise) {
      const client = new MongoClient(uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true
        }
      });

      clientPromise = client.connect();
    }
  }

  return clientPromise;
};

const getDatabase = async () => {
  const connection = getClientPromise();

  if (!connection) {
    return null;
  }

  const client = await connection;
  return client.db(process.env.MONGODB_DATABASE || "spacey");
};

export default getDatabase;

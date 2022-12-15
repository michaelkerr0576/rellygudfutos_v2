import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

/* 
 $ mongoMemoryServer
  - clearDB
  - connectDB
  - disconnectDB
*/

async function createMongoServer(): Promise<MongoMemoryServer> {
  return MongoMemoryServer.create();
}
const mongoServer = createMongoServer();

export const clearDB = async (): Promise<void> => {
  const collections = Object.values(mongoose.connection.collections);

  collections.forEach(async (collection): Promise<void> => {
    await collection.deleteMany({});
  });
};

export const connectDB = async (): Promise<void> => {
  const uri = (await mongoServer).getUri();

  const mongooseOpts = {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  await mongoose.connect(uri, mongooseOpts);
};

export const disconnectDB = async (): Promise<void> => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await (await mongoServer).stop();
};

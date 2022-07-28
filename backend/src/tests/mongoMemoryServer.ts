import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

async function createMongoServer(): Promise<MongoMemoryServer> {
  return MongoMemoryServer.create();
}
const mongoServer = createMongoServer();

const connectDB = async (): Promise<void> => {
  const uri = (await mongoServer).getUri();

  const mongooseOpts = {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  await mongoose.connect(uri, mongooseOpts);
};

const disconnectDB = async (): Promise<void> => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await (await mongoServer).stop();
};

const mongoMemoryServer = {
  connectDB,
  disconnectDB,
};

export default mongoMemoryServer;

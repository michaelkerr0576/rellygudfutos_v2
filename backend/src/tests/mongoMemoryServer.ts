import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

const mongoServer = await MongoMemoryServer.create();

/* Drop database, close the connection and stop mongoServer */
const closeDatabase = async (): Promise<void> => {
  // const mongod = await mongoServer();
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
};

/* Connect to the in-memory database */
const connectDatabase = async (): Promise<void> => {
  const uri = mongoServer.getUri();

  const mongooseOpts = {
    autoReconnect: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  await mongoose.connect(uri, mongooseOpts);
};

const mongoMemoryServer = {
  closeDatabase,
  connectDatabase,
};

export default mongoMemoryServer;

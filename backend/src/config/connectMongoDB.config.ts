import mongoose, { Mongoose } from 'mongoose';

const mongoURI = process.env.MONGO_URI || '';

const handleSuccess = (result: Mongoose): void =>
  console.log(`MongoDB connected: ${result.connection.host}`.cyan.underline);

const handleError = (error: Error): void => {
  console.log(error);
  throw new Error('MongoDB connection failed');
};

const connectMongoDB = (): Promise<void> =>
  mongoose
    .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result): void => handleSuccess(result))
    .catch((error): void => handleError(error));

export default connectMongoDB;

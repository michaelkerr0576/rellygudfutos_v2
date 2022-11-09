import mongoose, { Mongoose } from 'mongoose';

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

const mongoURI = process.env.MONGO_URI || '';

const handleSuccess = (result: Mongoose): void =>
  console.log(`MongoDB connected: ${result.connection.host}`.cyan.underline);

const handleError = (error: Error): void => {
  console.log(error);
  throw new Error('MongoDB connection failed');
};

const connectMongoDB = (): Promise<void> =>
  mongoose
    .connect(mongoURI)
    .then((result): void => handleSuccess(result))
    .catch((error): void => handleError(error));

export default connectMongoDB;

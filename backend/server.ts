import 'dotenv/config';
import 'colors';

import express from 'express';
import bodyParser from 'body-parser';

import connectMongoDB from '@/config/connectMongoDB.config';
import errorHandler from '@/middlewares/errorHandler.middleware';
import photosRoutes from '@/routes/photos.routes';

const app = express();
const port = process.env.PORT || 5000;

connectMongoDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/photos', photosRoutes);

app.use(errorHandler);

app.listen(port, (): void =>
  console.log(`Server started on port ${port}`.cyan.underline),
);

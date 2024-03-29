import 'dotenv/config';
import 'colors';

import express from 'express';
import bodyParser from 'body-parser';

import connectMongoDb from '@/configs/connectMongoDb.config';
import errorHandler from '@/middlewares/errorHandler.middleware';
import photosRoutes from '@/routes/photos.routes';
import tagsRoutes from '@/routes/tags.routes';
import usersRoutes from '@/routes/users.routes';

const app = express();
const port = process.env.PORT || 5000;

connectMongoDb();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/photos', photosRoutes);
app.use('/api/tags', tagsRoutes);
app.use('/api/users', usersRoutes);

app.use(errorHandler);

app.listen(port, (): void => console.log(`Server started on port ${port}`.cyan.underline));

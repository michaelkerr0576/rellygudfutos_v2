import 'dotenv/config';

import express from 'express';
import bodyParser from 'body-parser';

import errorHandler from '@middlewares/errorHandler.middleware';
import photosRoutes from '@routes/photos.routes';

const port = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/photos', photosRoutes);

app.use(errorHandler);

app.listen(port, (): void => console.log(`Server started on port ${port}`));

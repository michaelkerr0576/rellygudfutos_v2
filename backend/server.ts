import 'dotenv/config';

import photosRoutes from '@routes/photos.routes';
import express from 'express';

const port = process.env.PORT || 5000;
const app = express();

app.use('/photos', photosRoutes);

app.listen(port, () => console.log(`Server started on port ${port}`));

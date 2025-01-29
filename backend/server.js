import express from 'express';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

import productRouter from './routes/productRoutes.js';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

const port = process.env.PORT || 4000;
dotenv.config();
connectDB(); // connect to mongoDB
const app = express();

app.get('/', (req, res) => {
    res.send('API is running.....');
});

app.use('/api/products', productRouter);

// app.get('/api/products', productRouter);
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running at port ${port}`));

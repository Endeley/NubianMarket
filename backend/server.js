import express from 'express';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

import productRouter from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';

const port = process.env.PORT || 4000;
dotenv.config();
connectDB(); // connect to mongoDB
const app = express();

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.get('/', (req, res) => {
    res.send('API is running.....');
});

app.use('/api/products', productRouter);
app.use('/api/users', userRoutes);

// app.get('/api/products', productRouter);
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running at port ${port}`));

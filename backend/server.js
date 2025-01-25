import express from 'express';
import products from './data/products.js';
import dotenv from 'dotenv';
dotenv.config();
const app = express();

const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
    res.send('API is running.....');
});

app.get('/api/products', (req, res) => {
    res.json(products);
});

app.get('/api/products/:_id', (req, res) => {
    const product = products.find((p) => p.id === Number(req.params._id));
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
});

app.listen(port, () => console.log(`Server running at port ${port}`));

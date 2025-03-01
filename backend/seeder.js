import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();
 
const importData = async () => {
    try {
        console.log('🔄 Clearing existing data...'.yellow);

        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log('✅ Existing data cleared.'.green);

        // Insert users and get admin user ID
        const createdUsers = await User.insertMany(users);
        const adminUser = createdUsers[0]._id;

        // Assign admin user to products
        const sampleProducts = products.map((product) => ({
            ...product,
            user: adminUser,
        }));

        await Product.insertMany(sampleProducts);

        console.log('✅ Data successfully imported!'.green.inverse);

        await mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error(`❌ Error: ${error.message}`.red.inverse);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        console.log('🗑️ Destroying all data...'.yellow);

        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log('✅ Data successfully destroyed!'.red.inverse);

        await mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error(`❌ Error: ${error.message}`.red.inverse);
        process.exit(1);
    }
};

// Run script based on argument
if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}

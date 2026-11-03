import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import userRouter from './Routes/user.js';
import productRouter from './Routes/product.js';
import cartRouter from './Routes/cart.js';
import addressRouter from './Routes/address.js';
import cors from 'cors';

const app = express();
app.use(express.json());

app.use(cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

// Home testing route
app.get('/', (req, res) => {
    res.send('Ecommerce API is running...');
});

// Routes
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/address', addressRouter);

const PORT = process.env.PORT || 3000;
const primaryUri = process.env.MONGO_URI || process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/Ecommerce';
const fallbackLocalUri = 'mongodb://127.0.0.1:27017/Ecommerce';

const connectDB = async () => {
    try {
        await mongoose.connect(primaryUri);
        console.log(`Connected to MongoDB: ${primaryUri.includes('mongodb+srv') ? 'MongoDB Atlas' : 'Local MongoDB'}`);
    } catch (err) {
        console.error('Primary MongoDB connection failed:', err.message);
        if (primaryUri !== fallbackLocalUri) {
            console.log('Attempting fallback to local MongoDB (mongodb://127.0.0.1:27017/Ecommerce)...');
            try {
                await mongoose.connect(fallbackLocalUri);
                console.log('Connected to Local MongoDB successfully!');
            } catch (fallbackErr) {
                console.error('Fallback MongoDB connection also failed:', fallbackErr.message);
            }
        }
    }
};

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import userRouter from './routes/userRoutes.js';
import imageRouter from './routes/imageRoutes.js';

const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.json());

import cors from 'cors';

app.use(cors({
  origin: 'https://imagify-frontend-ui5f.onrender.com', // Your deployed frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Authorization', 'Content-Type'],
  credentials: true, // If your frontend uses cookies or authentication
}));


// Connect to MongoDB
await connectDB();

// Routes
app.use('/api/user', userRouter);
app.use('/api/image', imageRouter);

// Root endpoint
app.get('/', (req, res) => res.send("API Working"));

// Start the server
app.listen(PORT, () =>
  console.log('Server running on port ' + PORT)
);

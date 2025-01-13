import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import userRouter from './routes/userRoutes.js';
import imageRouter from './routes/imageRoutes.js';

const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.json());

app.use(cors({
  origin: 'https://imagify-frontend-ui5f.onrender.com', // Your deployed frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Authorization', 'Content-Type'],
  credentials: true, // If your frontend uses cookies or authentication
}));

// Handle preflight requests
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'https://imagify-frontend-ui5f.onrender.com');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Authorization, Content-Type');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.sendStatus(200);
});

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

import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js'; // Assuming this is your database connection
import userRouter from './routes/userRoutes.js';
import imageRouter from './routes/imageRoutes.js';

const PORT = process.env.PORT || 4000;
const app = express();

// Configure CORS with specific origin (BEST PRACTICE for production)
const allowedOrigins = ['https://imagify-frontend-ui5f.onrender.com']; // Replace with your frontend URL(s)

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) { // Allow requests with no origin (like mobile apps or curl requests)
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allow all common methods
  credentials: true, // Important for cookies and authorization headers
  optionsSuccessStatus: 204, // Some legacy browsers choke on 204
};

app.use(cors(corsOptions)); // Use the configured CORS options

app.use(express.json()); // Enable parsing of JSON request bodies

await connectDB(); // Connect to the database

app.use('/api/user', userRouter);
app.use('/api/image', imageRouter);

app.get('/', (req, res) => res.send("API Working"));

app.listen(PORT, () => console.log('Server running on port' + PORT));
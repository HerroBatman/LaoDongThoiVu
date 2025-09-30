import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import router from './routers/index.js'

// Load environment variables
// dotenv.config()

// Connect to MongoDB
// connectDB()

export const app = express()
// Body parsing middleware
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

// Cookie parser
app.use(cookieParser())

// CORS middleware
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
    ],
    credentials: true,
  })
);

app.use("/api/v1", router);

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'TimWork Server is running',
    timestamp: new Date().toISOString()
  })
})


/// http://localhost:8000/api/v1/employer/create
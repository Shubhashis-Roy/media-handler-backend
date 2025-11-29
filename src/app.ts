import express, { Application } from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import connectDB from './config/database';
// import cors from 'cors';

dotenv.config();

// Connect to MongoDB
connectDB();

const app: Application = express();

// CORS configuration
// app.use(
//   cors({
//     origin: process.env.FE_URL,
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
//     credentials: true,
//   })
// );

app.use(express.json());
app.use(cookieParser());

export default app;

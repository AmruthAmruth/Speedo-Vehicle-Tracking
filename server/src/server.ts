import 'reflect-metadata';
import dotenv from 'dotenv';
import app from './app';
import { connectDB } from './shared/config/db';

dotenv.config();

const PORT = process.env.PORT || 7000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
};

startServer();
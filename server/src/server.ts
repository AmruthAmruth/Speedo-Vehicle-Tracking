import 'reflect-metadata';
import dotenv from 'dotenv';
import dns from 'dns';

// Force use of Google DNS to bypass local SRV resolution issues
dns.setServers(['8.8.8.8', '8.8.4.4']);

import { container } from './di/container';
import app from './app';
import { connectDB } from './shared/config/db';
import { createServer } from 'http';
import { SocketService } from './services/socket.service';

dotenv.config();

const PORT = process.env.PORT || 7000;
const httpServer = createServer(app);

// Initialize Socket.IO via SocketService
const socketService = container.resolve<SocketService>('SocketService');
socketService.initialize(httpServer);

const startServer = async () => {
  await connectDB();

  httpServer.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
};

startServer(); 
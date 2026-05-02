import { ConnectionOptions } from 'bullmq';
import dotenv from 'dotenv';

import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

// If we are using Upstash or a managed Redis, we need TLS (SSL)
const useTls = process.env.REDIS_HOST && !process.env.REDIS_HOST.includes('127.0.0.1');

export const redisConfig: any = {
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD || undefined,
  tls: useTls ? {} : undefined, // Enable TLS for cloud providers like Upstash
  maxRetriesPerRequest: null,   // Required by BullMQ
};

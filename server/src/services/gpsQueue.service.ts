import { Queue } from 'bullmq';
import { redisConfig } from '../shared/config/redis.config';
import { IGPSQueueService } from '../interfaces/IGPSQueueService';
import { injectable, singleton } from 'tsyringe';

@singleton()
@injectable()
export class GPSQueueService implements IGPSQueueService {
  private gpsQueue: Queue;

  constructor() {
    this.gpsQueue = new Queue('gps-telemetry', {
      connection: redisConfig,
    });
    console.log('🚀 GPS Queue Initialized');
  }

  async addGPSJob(tripId: string, gpsPoint: any): Promise<void> {
    await this.gpsQueue.add('process-point', {
      tripId,
      gpsPoint,
    }, {
      removeOnComplete: true,
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 1000,
      },
    });
    console.log(`📥 Point added to queue for trip: ${tripId}`);
  }
}

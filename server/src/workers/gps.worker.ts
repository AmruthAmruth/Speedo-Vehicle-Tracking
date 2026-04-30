import { Worker, Job } from 'bullmq';
import { redisConfig } from '../shared/config/redis.config';
import { IGPSPointRepository } from '../interfaces/IGPSPointRepository';
import { SocketService } from '../services/socket.service';
import { injectable, inject } from 'tsyringe';

@injectable()
export class GPSWorker {
  private worker: Worker;

  constructor(
    @inject('IGPSPointRepository') private _gpsRepo: IGPSPointRepository,
    @inject('SocketService') private _socketService: SocketService
  ) {
    this.worker = new Worker(
      'gps-telemetry',
      async (job: Job) => {
        const { tripId, gpsPoint } = job.data;
        
        try {
          // 1. Save to Database
          const savedPoint = await this._gpsRepo.create({
            ...gpsPoint,
            tripId,
            timestamp: new Date(gpsPoint.timestamp || Date.now()),
          });

          // 2. Broadcast to Socket Room
          this._socketService.emitToRoom(tripId, 'locationUpdate', savedPoint);
          
          console.log(`✅ Processed & Broadcasted point for trip: ${tripId}`);
        } catch (error) {
          console.error(`❌ Failed to process GPS job:`, error);
          throw error; // Let BullMQ handle retry
        }
      },
      { connection: redisConfig }
    );

    this.worker.on('completed', (job) => {
      console.log(`🏁 Job ${job.id} completed`);
    });

    this.worker.on('failed', (job, err) => {
      console.error(`🚨 Job ${job?.id} failed:`, err);
    });

    console.log('👷 GPS Worker Started');
  }
}

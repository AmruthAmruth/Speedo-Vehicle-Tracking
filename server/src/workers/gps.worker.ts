import { Worker, Job } from 'bullmq';
import { redisConfig } from '../shared/config/redis.config';
import { IGPSPointRepository } from '../interfaces/IGPSPointRepository';
import { ITripRepository } from '../interfaces/ITripRepository';
import { ICacheService } from '../interfaces/ICacheService';
import { SocketService } from '../services/socket.service';
import { injectable, inject } from 'tsyringe';
import { getDistance } from 'geolib';
import { calculateBearing } from '../shared/utils/geo.util';

@injectable()
export class GPSWorker {
  private worker: Worker;

  constructor(
    @inject('IGPSPointRepository') private _gpsRepo: IGPSPointRepository,
    @inject('ITripRepository') private _tripRepo: ITripRepository,
    @inject('ICacheService') private _cacheService: ICacheService,
    @inject('SocketService') private _socketService: SocketService
  ) {
    this.worker = new Worker(
      'gps-telemetry',
      async (job: Job) => {
        const { tripId, gpsPoint } = job.data;
        
        try {
          const cacheKey = `trip:${tripId}:lkp`;
          const lastPoint = await this._cacheService.get<any>(cacheKey);
          
          let speed = gpsPoint.speed || 0;
          let heading = gpsPoint.heading || 0;
          let distanceDelta = 0;

          if (lastPoint) {
            // 1. Calculate Distance
            distanceDelta = getDistance(
              { latitude: lastPoint.latitude, longitude: lastPoint.longitude },
              { latitude: gpsPoint.latitude, longitude: gpsPoint.longitude }
            );

            // 2. Calculate Speed if not provided
            if (gpsPoint.speed === undefined || gpsPoint.speed === 0) {
              const timeDiff = (new Date(gpsPoint.timestamp).getTime() - new Date(lastPoint.timestamp).getTime()) / 1000;
              if (timeDiff > 0) {
                speed = (distanceDelta / timeDiff) * 3.6; // km/h
              }
            }

            // 3. Calculate Heading
            heading = calculateBearing(
              lastPoint.latitude,
              lastPoint.longitude,
              gpsPoint.latitude,
              gpsPoint.longitude
            );
          }

          // 4. Save to Database
          const savedPoint = await this._gpsRepo.create({
            ...gpsPoint,
            tripId,
            speed,
            heading,
            timestamp: new Date(gpsPoint.timestamp || Date.now()),
          });

          // 5. Update Trip Incremental Metrics
          if (distanceDelta > 0) {
              const trip = await this._tripRepo.findById(tripId);
              if (trip) {
                  await this._tripRepo.update(tripId, {
                      totalDistance: (trip.totalDistance || 0) + distanceDelta
                  });
              }
          }

          // 6. Update Cache (LKP)
          await this._cacheService.set(cacheKey, savedPoint, 3600); // 1 hour TTL

          // 7. Broadcast to Socket Room
          this._socketService.emitToRoom(tripId, 'locationUpdate', savedPoint);
          
          console.log(`✅ [Phase 2] Optimized point processed for trip: ${tripId} (Speed: ${speed.toFixed(1)} km/h, Heading: ${heading.toFixed(0)}°)`);
        } catch (error) {
          console.error(`❌ Failed to process GPS job:`, error);
          throw error;
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

    console.log('👷 GPS Worker Started (Optimized Mode)');
  }
}

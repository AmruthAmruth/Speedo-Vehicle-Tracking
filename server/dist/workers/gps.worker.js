"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GPSWorker = void 0;
const bullmq_1 = require("bullmq");
const redis_config_1 = require("../shared/config/redis.config");
const socket_service_1 = require("../services/socket.service");
const tsyringe_1 = require("tsyringe");
const geolib_1 = require("geolib");
const geo_util_1 = require("../shared/utils/geo.util");
let GPSWorker = class GPSWorker {
    constructor(_gpsRepo, _tripRepo, _cacheService, _socketService) {
        this._gpsRepo = _gpsRepo;
        this._tripRepo = _tripRepo;
        this._cacheService = _cacheService;
        this._socketService = _socketService;
        this.worker = new bullmq_1.Worker('gps-telemetry', async (job) => {
            const { tripId, gpsPoint } = job.data;
            try {
                const cacheKey = `trip:${tripId}:lkp`;
                const lastPoint = await this._cacheService.get(cacheKey);
                let speed = gpsPoint.speed || 0;
                let heading = gpsPoint.heading || 0;
                let distanceDelta = 0;
                if (lastPoint) {
                    // 1. Calculate Distance
                    distanceDelta = (0, geolib_1.getDistance)({ latitude: lastPoint.latitude, longitude: lastPoint.longitude }, { latitude: gpsPoint.latitude, longitude: gpsPoint.longitude });
                    // 2. Calculate Speed if not provided
                    if (gpsPoint.speed === undefined || gpsPoint.speed === 0) {
                        const timeDiff = (new Date(gpsPoint.timestamp).getTime() - new Date(lastPoint.timestamp).getTime()) / 1000;
                        if (timeDiff > 0) {
                            speed = (distanceDelta / timeDiff) * 3.6; // km/h
                        }
                    }
                    // 3. Calculate Heading
                    heading = (0, geo_util_1.calculateBearing)(lastPoint.latitude, lastPoint.longitude, gpsPoint.latitude, gpsPoint.longitude);
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
            }
            catch (error) {
                console.error(`❌ Failed to process GPS job:`, error);
                throw error;
            }
        }, { connection: redis_config_1.redisConfig });
        this.worker.on('completed', (job) => {
            console.log(`🏁 Job ${job.id} completed`);
        });
        this.worker.on('failed', (job, err) => {
            console.error(`🚨 Job ${job?.id} failed:`, err);
        });
        console.log('👷 GPS Worker Started (Optimized Mode)');
    }
};
exports.GPSWorker = GPSWorker;
exports.GPSWorker = GPSWorker = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('IGPSPointRepository')),
    __param(1, (0, tsyringe_1.inject)('ITripRepository')),
    __param(2, (0, tsyringe_1.inject)('ICacheService')),
    __param(3, (0, tsyringe_1.inject)('SocketService')),
    __metadata("design:paramtypes", [Object, Object, Object, socket_service_1.SocketService])
], GPSWorker);

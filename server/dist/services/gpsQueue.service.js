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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GPSQueueService = void 0;
const bullmq_1 = require("bullmq");
const redis_config_1 = require("../shared/config/redis.config");
const tsyringe_1 = require("tsyringe");
let GPSQueueService = class GPSQueueService {
    constructor() {
        this.gpsQueue = new bullmq_1.Queue('gps-telemetry', {
            connection: redis_config_1.redisConfig,
        });
        console.log('🚀 GPS Queue Initialized');
    }
    async addGPSJob(tripId, gpsPoint) {
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
};
exports.GPSQueueService = GPSQueueService;
exports.GPSQueueService = GPSQueueService = __decorate([
    (0, tsyringe_1.singleton)(),
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [])
], GPSQueueService);

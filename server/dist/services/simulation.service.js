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
exports.SimulationService = void 0;
const socket_service_1 = require("./socket.service");
const tsyringe_1 = require("tsyringe");
let SimulationService = class SimulationService {
    constructor(_gpsRepo, _socketService) {
        this._gpsRepo = _gpsRepo;
        this._socketService = _socketService;
        this.activeSimulations = new Map();
    }
    async startSimulation(tripId, intervalMs = 2000) {
        // Clear any existing simulation for this trip
        if (this.activeSimulations.has(tripId)) {
            clearInterval(this.activeSimulations.get(tripId));
            this.activeSimulations.delete(tripId);
            console.log(`♻️ Resetting simulation for trip: ${tripId}`);
        }
        console.log(`🎬 Starting simulation for trip: ${tripId}`);
        const points = await this._gpsRepo.findByTripId(tripId);
        if (points.length === 0) {
            console.log(`⚠️ No points found for trip ID: ${tripId}`);
            return;
        }
        console.log(`✅ Found ${points.length} points. Beginning broadcast...`);
        let index = 0;
        const interval = setInterval(() => {
            if (index >= points.length) {
                clearInterval(interval);
                this.activeSimulations.delete(tripId);
                console.log(`🏁 Simulation finished for trip: ${tripId}`);
                return;
            }
            const point = points[index];
            // Convert Mongoose document to plain JSON object
            const pointData = point.toJSON ? point.toJSON() : point;
            // Broadcast the point to the specific trip room
            console.log(`📡 Emitting point ${index + 1} to room ${tripId}`);
            this._socketService.emitToRoom(tripId, 'locationUpdate', pointData);
            console.log(`📡 Broadcasted point ${index + 1}/${points.length} for trip ${tripId}`);
            index++;
        }, intervalMs);
        this.activeSimulations.set(tripId, interval);
        return interval;
    }
    stopSimulation(tripId) {
        if (this.activeSimulations.has(tripId)) {
            clearInterval(this.activeSimulations.get(tripId));
            this.activeSimulations.delete(tripId);
            console.log(`🛑 Simulation manually stopped for trip: ${tripId}`);
            return true;
        }
        return false;
    }
};
exports.SimulationService = SimulationService;
exports.SimulationService = SimulationService = __decorate([
    (0, tsyringe_1.singleton)(),
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('IGPSPointRepository')),
    __param(1, (0, tsyringe_1.inject)('SocketService')),
    __metadata("design:paramtypes", [Object, socket_service_1.SocketService])
], SimulationService);

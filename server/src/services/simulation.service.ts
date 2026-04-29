import { IGPSPointRepository } from '../interfaces/IGPSPointRepository';
import { SocketService } from './socket.service';
import { injectable, inject, singleton } from 'tsyringe';

@singleton()
@injectable()
export class SimulationService {
    private activeSimulations: Map<string, NodeJS.Timeout> = new Map();

    constructor(
        @inject('IGPSPointRepository') private _gpsRepo: IGPSPointRepository,
        @inject('SocketService') private _socketService: SocketService
    ) {}

    async startSimulation(tripId: string, intervalMs: number = 2000) {
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

    stopSimulation(tripId: string) {
        if (this.activeSimulations.has(tripId)) {
            clearInterval(this.activeSimulations.get(tripId));
            this.activeSimulations.delete(tripId);
            console.log(`🛑 Simulation manually stopped for trip: ${tripId}`);
            return true;
        }
        return false;
    }
}

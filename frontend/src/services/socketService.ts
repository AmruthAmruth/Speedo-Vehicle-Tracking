import { io, Socket } from 'socket.io-client';
import { GPSPoint } from '../types/trip.types';

const SOCKET_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:7000';

class SocketService {
    private socket: Socket | null = null;
    private currentTripId: string | null = null;

    connect() {
        if (!this.socket) {
            this.socket = io(SOCKET_URL, {
                transports: ['websocket'],
                reconnection: true,
                reconnectionAttempts: Infinity,
                reconnectionDelay: 1000,
            });

            this.socket.on('connect', () => {
                console.log('📡 Connected to WebSocket server');
                // Re-join the current trip room
                if (this.currentTripId) {
                    this.joinTrip(this.currentTripId);
                }
            });

            this.socket.on('disconnect', () => {
                console.log('❌ Disconnected from WebSocket server');
            });

            this.socket.on('reconnect', () => {
                console.log('🔄 Reconnected to WebSocket server');
            });
        }
        return this.socket;
    }

    joinTrip(tripId: string) {
        this.currentTripId = tripId;
        if (this.socket) {
            this.socket.emit('joinTrip', tripId);
            console.log(`🌐 Joining trip room: ${tripId}`);
        }
    }

    onLocationUpdate(callback: (point: GPSPoint) => void) {
        if (this.socket) {
            // Remove any existing listener to avoid duplicates
            this.socket.off('locationUpdate');
            this.socket.on('locationUpdate', callback);
        }
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
            this.currentTripId = null;
        }
    }
}

export const socketService = new SocketService();

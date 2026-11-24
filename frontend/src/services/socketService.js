import { io } from 'socket.io-client';
const SOCKET_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:7000';
class SocketService {
    constructor() {
        Object.defineProperty(this, "socket", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        Object.defineProperty(this, "currentTripId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
    }
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
    joinTrip(tripId) {
        this.currentTripId = tripId;
        if (this.socket) {
            this.socket.emit('joinTrip', tripId);
            console.log(`🌐 Joining trip room: ${tripId}`);
        }
    }
    joinUserRoom(userId) {
        if (this.socket) {
            this.socket.emit('joinUserRoom', userId);
            console.log(`👤 Joining user room: user_${userId}`);
        }
    }
    onTripStarted(callback) {
        if (this.socket) {
            this.socket.off('TRIP_STARTED');
            this.socket.on('TRIP_STARTED', callback);
        }
    }
    onTripStopped(callback) {
        if (this.socket) {
            this.socket.off('TRIP_STOPPED');
            this.socket.on('TRIP_STOPPED', callback);
        }
    }
    onLocationUpdate(callback) {
        if (this.socket) {
            // Remove any existing listener to avoid duplicates
            this.socket.off('locationUpdate');
            this.socket.on('locationUpdate', callback);
        }
    }
    emitLocationUpdate(tripId, point) {
        if (this.socket) {
            this.socket.emit('locationUpdate', { tripId, point });
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

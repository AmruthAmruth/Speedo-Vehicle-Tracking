import { Server as SocketServer } from 'socket.io';
import { Server as HttpServer } from 'http';
import { injectable, singleton } from 'tsyringe';

@singleton()
@injectable()
export class SocketService {
    private _io: SocketServer | null = null;

    initialize(httpServer: HttpServer) {
        this._io = new SocketServer(httpServer, {
            cors: {
                origin: '*',
                methods: ['GET', 'POST']
            }
        });

        this._io.on('connection', (socket) => {
            console.log('📱 New client connected:', socket.id);

            socket.on('joinTrip', (tripId: string) => {
                socket.join(tripId);
                console.log(`📡 Client ${socket.id} joined trip room: ${tripId}`);
            });

            socket.on('disconnect', () => {
                console.log('❌ Client disconnected:', socket.id);
            });
        });

        console.log('📡 WebSocket server initialized');
    }

    get io(): SocketServer {
        if (!this._io) {
            throw new Error('Socket.io not initialized. Call initialize() first.');
        }
        return this._io;
    }

    emitToRoom(room: string, event: string, data: any) {
        if (this._io) {
            console.log(`[SocketService] Emitting ${event} to room ${room}`);
            // Emit to the specific room
            this._io.to(room).emit(event, data);
            // ALSO emit globally as a fallback test
            this._io.emit(event, data);
        } else {
            console.error('🚨 [SocketService] CRITICAL ERROR: _io is NULL during emitToRoom!');
        }
    }
}

import Redis from 'ioredis';
import { redisConfig } from '../shared/config/redis.config';
import { ICacheService } from '../interfaces/ICacheService';
import { injectable, singleton } from 'tsyringe';

@singleton()
@injectable()
export class RedisCacheService implements ICacheService {
    private redis: Redis;

    constructor() {
        this.redis = new Redis({
            host: redisConfig.host,
            port: redisConfig.port,
            password: redisConfig.password,
            tls: redisConfig.tls ? {} : undefined,
        });

        this.redis.on('connect', () => {
            console.log('🚀 Redis Cache Service Connected');
        });

        this.redis.on('error', (err) => {
            console.error('🚨 Redis Cache Error:', err);
        });
    }

    async set(key: string, value: any, ttlSeconds?: number): Promise<void> {
        const stringValue = JSON.stringify(value);
        if (ttlSeconds) {
            await this.redis.setex(key, ttlSeconds, stringValue);
        } else {
            await this.redis.set(key, stringValue);
        }
    }

    async get<T>(key: string): Promise<T | null> {
        const data = await this.redis.get(key);
        if (!data) return null;
        try {
            return JSON.parse(data) as T;
        } catch (e) {
            return data as unknown as T;
        }
    }

    async del(key: string): Promise<void> {
        await this.redis.del(key);
    }
}

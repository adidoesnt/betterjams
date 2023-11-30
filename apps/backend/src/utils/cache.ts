import { createClient } from 'redis';

const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = process.env;
const host = REDIS_HOST ?? '';
const port = parseInt(REDIS_PORT ?? '');
const password = REDIS_PASSWORD ?? '';

export const cache = createClient({
    socket: {
        host,
        port
    },
    password
})

await cache.connect();
await cache.flushAll();

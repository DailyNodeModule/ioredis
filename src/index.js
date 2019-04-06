const Redis = require('ioredis');

const redis = new Redis(
    // You can pass host/port as arguments, a unix socket, or a URL.
    // '127.0.0.1', 6379
    // '/var/run/redis.sock'
    process.env.REDIS_URL || 'redis://127.0.0.1:6379/0'
);

(async () => {
    // All of the usual redis commands are available, and return promises. 
    await redis.set('foo', 'bar');
    
    const result = await redis.get('foo');
    console.log(result)
    
    redis.lpush('list', [
        'New York',
        'London',
        'LA',
        'Hong Kong'
    ]);

    const cities = await redis.lrange('list', 0, -1);
    console.log(cities)

    // You can combine multiple commands and send them to the server in batches to improve performance.
    const hash = await redis
        .pipeline()
        .hset('hash', 'key1', 'value1')
        .hset('hash', 'key2', 'value2')
        .hset('hash', 'key3', 'value3')
        .hgetall('hash')
        .exec();

    console.log(hash);
})();
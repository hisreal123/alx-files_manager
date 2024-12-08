import { createClient } from 'redis';
import { promisify } from 'util'

class RedisClient {
  /**
   * connetion to redis-sever
  */

  constructor() {
    this.client = createClient();
    this.clientConnected = true;

    this.client.on('connect', () => this.clientConnected = true)
    this.client.on('error', (err) => {
      console.error('Redis client failed to connect:', err?.message)
      this.clientConnected = false;
    })
  }

  isAlive = () => {
    return this.clientConnected;
  }

  async get(key) {
    return promisify(this.client.GET).bind(this.client)(key)
  }

  async set(key, value, duration) {
    await promisify(this.client.SETEX).bind(this.client)(key, duration, value)
  }

  async del(key) {
    return promisify(this.client.DEL).bind(this.client)(key)
  }
}

// instance of RedisClient
export const redisClient = new RedisClient();
export default redisClient;


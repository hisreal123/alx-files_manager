import { createClient } from 'redis';
import { promisify } from 'util'

class RedisClient {
  /**
   * connetion to redis-sever
  */
  constructor() {
    this.client = createClient();
    this.clientConnected = true;

    this.client.on('error', (err) => {
      console.error('Redis client failed to connect:', err.message || err.toString());
      this.clientConnected = false;
    })
    this.client.on('connect', () => {
      this.clientConnected = true;
    })
  }

  /**  
  * Check if the client  connection to the Redis server is active
  * @returns {boolean}
  */
  isAlive = () => {
    return this.clientConnected;
  }

  /*
  * Retrieves the value of a given key
  * @param {String}  The key of the item to retieve 
  * @returns {String | Object}
  */
  async get(key) {
    return promisify(this.client.GET).bind(this.client)(key)
  }

  /**
  * Stores a key in and its value with duration timeout.
  * @param {String} key The key of the item store.
  * @param {String | Number | Boolean} value the item to store.
  * @param {Number} duration the expiration time of the item in seconds.
  * @return {Promie<void>}
  */
  async set(key, value, duration) {
    await promisify(this.client.SETEX).bind(this.client)(key, duration, value)
  }

  /**
  * Removes the value of a given key.
  * @param {String} key The key of the item to remove.
  * @returns {Promise<void>}
  */
  async del(key) {
    return promisify(this.client.DEL).bind(this.client)(key)
  }
}

// instance of RedisClient
export const redisClient = new RedisClient();
export default redisClient;


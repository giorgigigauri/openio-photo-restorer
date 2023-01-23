import { createClient } from 'redis';

    var redis = createClient ({
      url : process.env.UPSTASH_REDIS_REST_URL
    });
    
    redis.on("error", function(err: string) {
      throw err;
    });
    redis.connect();
    
export default redis;

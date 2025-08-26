import { createClient } from "redis";

const redis = createClient();
redis.on("error", (err) => console.log("Redis Client Error", err));

export const connectRedis = async () => {
  await redis.connect();
  console.log("Redis connected");
};

export const getOrSetCache = (key: string, cb: () => Promise<any>) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await redis.get(key);
      if (data != null) return resolve(JSON.parse(data));

      const freshData = await cb();
      redis.set(key, JSON.stringify(freshData), { EX: 3600 });
      resolve(freshData);
    } catch (err) {
      reject(err);
    }
  });
};

import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

const redis = new Redis(process.env.REDIS_URL as string);

const connectToRedis = async () => {
    redis.on("connect", () => {
        console.log("Redis clint is connected.");
    });

    redis.on("error", (error) => {
        console.log("Redis client error", error);
    });
}

export { redis, connectToRedis };
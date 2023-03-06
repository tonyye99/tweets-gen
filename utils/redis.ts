import { Redis } from "@upstash/redis"

const config = useRuntimeConfig()

const redis = new Redis({
    url: config.upstashRedisApiUrl,
    token: config.upstashRedisToken,
})

export default redis